const { Router } = require("express");
const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const cron = require('node-cron');
require('dotenv').config();

const router = Router();
const prisma = new PrismaClient();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;
const client = twilio(accountSid, authToken);

// CORS middleware
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
// Report Route
router.get("/getData", async (req, res) => {
  try {
    const data = await prisma.report.findMany();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

router.post("/postData", async (req, res) => {
  try {
    const { fromDate, toDate, place, material, supplier, transporter } = req.body;
    const createdData = await prisma.report.create({
      data: {
        fromDate,
        toDate,
        place,
        material,
        supplier,
        transporter
      }
    });
    res.status(201).json(createdData);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'An error occurred while inserting data' });
  }
});

//EMD Route
router.post("/emd", async (req, res) => {
  try {
    const {
      Date,
      VoucherType,
      Amount,
      Type,
      URNNumber,
      StatusOfRefunded,
      RefundedDate,
      NPNumbers,
      PartyName,
      NameOfWork,
      Section,
      Remarks,
    } = req.body;

    const response = await prisma.emd.create({
      data: {
        Date,
        VoucherType,
        Amount,
        Type,
        URNNumber,
        StatusOfRefunded,
        RefundedDate,
        NPNumbers,
        PartyName,
        NameOfWork,
        Section,
        Remarks,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    console.error('Error inserting EMD data:', error);
    res.status(500).json({ error: 'An error occurred while inserting EMD data' });
  }
});

router.get("/getAbstractData", async (req, res) => {
  try {
    const abstractData = await prisma.emd.findMany();
    res.status(200).json(abstractData);
  } catch (error) {
    console.error('Error fetching EMD abstract data:', error);
    res.status(500).json({ error: 'An error occurred while fetching EMD abstract data' });
  }
});

// FD Route
router.post("/FD", async (req, res) => {
  try {
    const {
      Date,
      FDR_BG,
      Particular,
      Party_Name,
      Name_of_Work,
      Bank,
      FD_Amount,
      BG_Amount,
      Refunded_Amount,
      Status_of_Refund,
      Date_of_Refund,
      Bank_Issued_Date,
      Date_of_Expiry,
      FDR_Number,
      BG_Number,
      FD_present_Value,
      FD_End_Value,
      Section,
      Remarks,
      ROI,
    } = req.body;

    const response = await prisma.FD.create({
      data: {
        Date,
        FDR_BG,
        Particular,
        Party_Name,
        Name_of_Work,
        Bank,
        FD_Amount,
        BG_Amount,
        Refunded_Amount,
        Status_of_Refund,
        Date_of_Refund,
        Bank_Issued_Date,
        Date_of_Expiry,
        FDR_Number,
        BG_Number,
        FD_present_Value,
        FD_End_Value,
        Section,
        Remarks,
        ROI,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    console.error('Error inserting FD data:', error);
    res.status(500).json({ error: 'An error occurred while inserting FD data' });
  }
});

router.get("/getFDabstractData", async (req, res) => {
  try {
    const abstractFDData = await prisma.FD.findMany();
    res.status(200).json(abstractFDData);
  } catch (error) {
    console.error('Error fetching FD abstract data:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching FD abstract data' });
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

const formatDataForEmail = (data) => {
  const pad = (str, length) => str.padEnd(length, ' ');
  const entries = data.map(item => {
    return [
      `${pad('Date:', 6)} ${new Date(item.Date).toLocaleDateString()}`,
      `${pad('Amount:', 6)} ${item.Amount}`,
      `${pad('URN Number:', 6)} ${item.URNNumber}`,
      `${pad('Status Of Refunded:', 6)} ${item.StatusOfRefunded}`,
      `${pad('Refunded Date:', 6)} ${new Date(item.RefundedDate).toLocaleDateString()}`,
      `${pad('NP Numbers:', 6)} ${item.NPNumbers}`,
      `${pad('Party Name:', 6)} ${item.PartyName}`,
      `${pad('Name Of Work:', 6)} ${item.NameOfWork}`,
      `${pad('Remarks:', 6)} ${item.Remarks}`,
    ].join('\n');
  }).join('\n\n');

  return entries;
};

const sendNotRefundedEmail = async () => {
  try {
    const abstractData = await prisma.emd.findMany();

    const notRefundedData = abstractData.filter(item => item.StatusOfRefunded === "Not Refunded");

    if (notRefundedData.length > 0) {
      const emailBody = formatDataForEmail(notRefundedData);
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.NOTIFICATION_EMAIL,
        subject: 'Not Refunded Abstract Data',
        text: `The following entries have not been refunded:\n\n${emailBody}`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
  } catch (error) {
    console.error('Error fetching abstract data:', error);
  }
};

// Schedule the email to be sent every Monday at 8 AM
cron.schedule('0 8 * * 1', sendNotRefundedEmail);

router.get("/getAbstractData", async (req, res) => {
  try {
    const abstractData = await prisma.emd.findMany();
    res.status(200).json(abstractData);
  } catch (error) {
    console.error('Error fetching abstract data:', error);
    res.status(500).json({ error: 'An error occurred while fetching abstract data' });
  }
});

// New route to send WhatsApp message 
router.post("/sendWhatsApp", async (req, res) => {
  try {
    const abstractData = await prisma.emd.findMany();
    const notRefundedData = abstractData.filter(item => item.StatusOfRefunded === "Not Refunded");

    if (notRefundedData.length > 0) {
      const messageBody = formatDataForEmail(notRefundedData);

      const response = await client.messages.create({
        from: whatsappNumber,
        body: `Not Refunded Entries:\n\n${messageBody}`,
        to: `whatsapp:${req.body.to}`
      });

      res.status(200).send({ success: true, response });
    } else {
      res.status(200).send({ success: true, message: "No Not Refunded entries to send." });
    }
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    res.status(500).send({ success: false, error });
  }
});

module.exports = router;
