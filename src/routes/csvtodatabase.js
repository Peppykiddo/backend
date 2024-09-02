const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name',
});

// Function to execute MySQL queries
function executeQuery(sql, values) {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Read data from CSV file and insert into EMD database
fs.createReadStream('path/to/your/csv/file.csv')
  .pipe(csv())
  .on('data', async (row) => {
    try {
      // Map CSV data to EMD data structure
      const emdData = {
        Date: row.Date,
        VchType: row.VchType,
        Amount: parseFloat(row.Amount),
        Type: row.Type,
        URNNumber: row.URNNumber,
        StatusOfRefunded: row.StatusOfRefunded,
        RefundedDate: row.RefundedDate,
        NPNumbers: row.NPNumbers,
        PartyName: row.PartyName,
        NameOfWork: row.NameOfWork,
        Section: row.Section,
        Remarks: row.Remarks
      };

      // Insert data into EMD database
      const sql = `
        INSERT INTO emd_table (Date, VchType, Amount, Type, URNNumber, StatusOfRefunded, RefundedDate, NPNumbers, PartyName, NameOfWork, Section, Remarks)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        emdData.Date,
        emdData.VchType,
        emdData.Amount,
        emdData.Type,
        emdData.URNNumber,
        emdData.StatusOfRefunded,
        emdData.RefundedDate,
        emdData.NPNumbers,
        emdData.PartyName,
        emdData.NameOfWork,
        emdData.Section,
        emdData.Remarks
      ];

      await executeQuery(sql, values);
      console.log('Data inserted successfully:', emdData);
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

  // Read data from CSV file and insert into FD database
fs.createReadStream('path/to/your/csv/file.csv')
.pipe(csv())
.on('data', async (row) => {
  try {
    // Map CSV data to EMD data structure
    const fdData = {
      Date: row.Date,
      FDR_BG: row.FDR_BG,
      Particular: row.Particular,
      Party_Name: row.Party_Name, 
      Name_of_Work: row.Name_of_Work,
      Bank: row.Bank,
      FD_Amount: parseFloat(row.FD_Amount),      
      BG_Amount: parseFloat(row.BG_Amount),      
      Refunded_Amount: parseFloat(row.Refunded_Amount),
      Status_of_Refund: row.Status_of_Refund,
      Date_of_Refund: row.Date_of_Refund,
      Bank_Issued_Date: row.Bank_Issued_Date,
      Date_of_Expiry: row.Date_of_Expiry,
      FDR_Number: row.FDR_Number,
      BG_Number: row.BG_Number,
      FD_present_Value: parseFloat(row.FD_present_Value),
      FD_End_Value: parseFloat(row.FD_End_Value),
      Section: row.Section,
      Remarks: row.Remarks,
      ROI: parseFloat(row.ROI)
    };

    // Insert data into FD database
    const sql = `
      INSERT INTO fd_table (Date, FDR_BG, Particular, Party_Name, Name_of_Work, Bank, FD_Amount, BG_Amount, Refunded_Amount, Status_of_Refund, Date_of_Refund, Bank_Issued_Date, Date_of_Expiry, FDR_Number, BG_Number, FD_present_Value, FD_End_Value, Section, Remarks, ROI)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      fdData.Date,
      fdData.FDR_BG,
      fdData.Particular,
      fdData.Party_Name,
      fdData.Name_of_Work,
      fdData.Bank,
      fdData.FD_Amount,
      fdData.BG_Amount,
      fdData.Refunded_Amount,
      fdData.Status_of_Refund,
      fdData.Date_of_Refund,
      fdData.Bank_Issued_Date,
      fdData.Date_of_Expiry,
      fdData.FDR_Number,
      fdData.BG_Number,
      fdData.FD_present_Value,
      fdData.FD_End_Value,
      fdData.Section,
      fdData.Remarks,
      fdData.ROI
    ];

    await executeQuery(sql, values);
    console.log('Data inserted successfully:', fdData);
  } catch (error) {
    console.error('Error inserting data:', error);
  }
})
.on('end', () => {
  console.log('CSV file successfully processed');
});