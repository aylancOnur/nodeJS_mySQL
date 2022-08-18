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

const createOneToManyTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users
    (user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100),
    user_surname VARCHAR(100)
    )
    `;
  connection.query(query, (err, result) => {
    if (!err) {
      connection.query(
        `
            CREATE TABLE IF NOT EXISTS social_media
            (social_media_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            social_media_name VARCHAR(100),
            FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
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

const createUser = () => {
  const query =
    "INSERT INTO users (user_name,user_surname) VALUES ('user_name5','user_surname5)";
  connection.query(query, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    console.log("result", result);
  });
};

const createSocialMediaUser = () => {
  const query =
    "INSERT INTO social_media (user_id,social_media_name) VALUES ('5','PINTEREST')";
  connection.query(query, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    console.log("result", result);
  });
};

const getAllRelationsData = () => {
  const query =
    "SELECT * FROM users AS u INNER JOIN social_media AS s ON u.user_id=s.user_id";
  connection.query(query, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    console.log("result", result);
  });
};

const getAllRelationsById = (id) => {
  const query =
    "SELECT u.user_name, s.social_media_name , s.social_media_id FROM users AS u INNER JOIN social_media AS s ON u.user_id=s.user_id WHERE u.user_id=?";
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.log("err", err);
    }
    console.log("result", result);
  });
};

const updateById = (user_id, social_media_id, social_media_name) => {
  const query =
    "UPDATE social_media SET social_media_name = ? WHERE user_id = ? AND social_media_id = ?";
  connection.query(
    query,
    [social_media_name, user_id, social_media_id],
    (err, result) => {
      if (err) {
        console.log("err", err);
      }
      console.log("result", result);
    }
  );
};

const deleteById = (id) => {
  const query = "DELETE FROM users WHERE user_id = ?";
  connection.query(query, [id], (err, result) => {
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
//   createOneToManyTable();
//   createUser();
//   createSocialMediaUser();
  // getAllRelationsData();
  // getAllRelationsById(4);
  // updateById(4, 5, "TWITTER");
  deleteById(5);
});

app.use(router);

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
