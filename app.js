const express = require("express");
const mysql = require("mysql2");

const app = express();
const router = express.Router();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Your DB Password",
  waitForConnections: true,
  pool: 5,
  charset: "UTF8_GENERAL_CI",
  port: 3306,
  debug: false,
  timezone: "local",
  database: "educationdb",
});

const createOneToOneTable = () => {
  const query = `
      CREATE TABLE IF NOT EXISTS employee_cv
      (
        employee_cv_id INT AUTO_INCREMENT PRIMARY KEY,
        employee_cv_name VARCHAR(100)
      )
      `;
  connection.query(query, (err, result) => {
    if (!err) {
      connection.query(
        `
              CREATE TABLE IF NOT EXISTS employee
              (
                employee_id INT AUTO_INCREMENT PRIMARY KEY,
                employee_cv_id INT NOT NULL,
                employee_name VARCHAR(100),
                employee_surname VARCHAR(100),
                employee_salary VARCHAR(100),
                FOREIGN KEY (employee_cv_id) REFERENCES employee_cv(employee_cv_id) ON DELETE CASCADE
              )
              `,
        (err,
        (result) => {
          if (err) {
            console.log("ERR =>", err);
          }
          console.log("RESULT => ", result);
        })
      );
    } else {
      console.log("ERR =>", err);
    }
  });
};

connection.connect((err) => {
  if (err) {
    console.log("Error", err);
  }
  console.log("Connected");
  createOneToOneTable();
});

app.use(router);

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
