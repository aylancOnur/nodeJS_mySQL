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

const createEmployeeCV = () => {
  const query =
    "INSERT INTO employee_cv (employee_cv_name) VALUES ('employee_cv_name2')";
  connection.query(query, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    console.log("result", result);
  });
};

const createEmployee = () => {
  const query =
    "INSERT INTO employee (employee_cv_id,employee_name,employee_surname,employee_salary) VALUES ('2','employee_name2','employee_surname2','5500')";
  connection.query(query, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    console.log("result", result);
  });
};

const getAllRelationsData = () => {
  const query =
    "SELECT * FROM employee_cv AS c INNER JOIN employee AS e ON c.employee_cv_id = e.employee_cv_id";
  connection.query(query, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    console.log("result", result);
  });
};

const updateById = (employee_cv_name, employee_cv_id) => {
  const query =
    "UPDATE employee_cv SET employee_cv_name = ? WHERE employee_cv_id = ?";
  connection.query(query, [employee_cv_name, employee_cv_id], (err, result) => {
    if (err) {
      console.log("err", err);
    }
    console.log("result", result);
  });
};

connection.connect((err) => {
  if (err) {
    console.log("Error", err);
  }
  console.log("Connected");
  // createOneToOneTable();
  // createEmployeeCV();
  // createEmployee()
  // getAllRelationsData();
  updateById("updated_cv_name",2)
  getAllRelationsData();


});

app.use(router);

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
