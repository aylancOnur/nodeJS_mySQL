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

const createManyToManyTable = () => {
  const query = `
        CREATE TABLE IF NOT EXISTS post
        (
          post_id INT AUTO_INCREMENT PRIMARY KEY,
          post_name VARCHAR(100)
        )
        `;
  connection.query(query, (err, result) => {
    if (!err) {
      connection.query(
        `
                CREATE TABLE IF NOT EXISTS tag
                (
                  tag_id INT AUTO_INCREMENT PRIMARY KEY,
                  tag_name VARCHAR(100)
                )
                `,
        (err,
        (result) => {
          if (err) {
            console.log("ERR =>", err);
          }
          connection.query(
            `
                    CREATE TABLE IF NOT EXISTS post_tag
                    (
                      post_tag_id INT AUTO_INCREMENT PRIMARY KEY,
                      post_id INT NOT NULL,
                      tag_id INT NOT NULL,
                      FOREIGN KEY (post_id) REFERENCES post(post_id) ON DELETE CASCADE,
                      FOREIGN KEY (tag_id) REFERENCES tag(tag_id) ON DELETE CASCADE
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
        })
      );
    } else {
      console.log("ERR =>", err);
    }
  });
};

const createPost = (data) => {
  const query = "INSERT INTO post (post_name) VALUES (?)";
  connection.query(query, [data.post_name], (err, result) => {
    if (err) {
      console.log("err", err);
    }

    const post_id = result.insertId;

    for (let index = 0; index < data.tag.length; index++) {
      const query = "INSERT INTO tag (tag_name) VALUES (?)";
      connection.query(query, [data.tag[index]], (err, result) => {
        console.log("Tag =>", result);
        const query = "INSERT INTO post_tag (post_id,tag_id) VALUES (?,?)";
        connection.query(query, [post_id, result.insertId], (err, result) => {
          console.log("Post tag =>", result);
          console.log("Post tag err =>", err);
        });
      });
    }
  });
};

const createOtherPost = (data) => {
  const query = "INSERT INTO post (post_name) VALUES (?)";
  connection.query(query, [data.post_name], (err, result) => {
    if (err) {
      console.log("err", err);
    }

    const post_id = result.insertId;

    for (let index = 0; index < data.tag.length; index++) {
      console.log("Tag =>", result);
      const query = "INSERT INTO post_tag (post_id,tag_id) VALUES (?,?)";
      connection.query(query, [post_id, data.tag[index]], (err, result) => {
        console.log("Post tag =>", result);
        console.log("Post tag err =>", err);
      });
    }
  });
};

connection.connect((err) => {
  if (err) {
    console.log("Error", err);
  }
  console.log("Connected");
  // createManyToManyTable();
  // createPost({
  //   post_name: "post_2",
  //   tag: ["#trip", "#funny", "#food"],
  // });
  createOtherPost({
    post_name: "post_2",
    tag: [7, 8],
  });
});

app.use(router);

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
