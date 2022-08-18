const createDb = () => {
  connection.query("CREATE DATABASE educationdb", (err, result) => {
    if (err) {
      console.log("err", err);
    }
    console.log("result", result);
  });
};

const createTable = () => {
  connection.query(
    "CREATE TABLE IF NOT EXISTS students (student_id int AUTO_INCREMENT,student_name VARCHAR(100),student_surname VARCHAR(100),PRIMARY KEY(student_id))",
    (err, result) => {
      if (err) {
        console.log("err", err);
      }
      console.log("result =>", result);
    }
  );
};

const createRecord = () => {
  const query =
    "INSERT INTO students (student_name,student_surname) VALUES ('Onur','Aylanc')";
  connection.query(query, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    console.log("result", result);
  });
};

const createMultipleRecord = () => {
  const studentsArr = [
    ["student_name", "student_surname"],
    ["student_name2", "student_surname2"],
    ["student_name3", "student_surname3"],
  ];
  const query2 = "INSERT INTO students (student_name,student_surname) VALUES ?";
  connection.query(query2, [studentsArr], (err, result) => {
    if (err) {
      console.log("err", err);
    }
    console.log("result", result);
  });
};

const createDynamicRecord = () => {
  const query =
    "INSERT INTO students (student_name,student_surname) VALUES (?,?)";

  const name = process.argv[2];
  const surname = process.argv[3];
  console.log("name =>", name);

  connection.query(query, [name, surname], (err, result) => {
    if (err) {
      console.log("err", err);
    }
    console.log("result", result);
  });
};

const selectMyData = () => {
  const query = "SELECT * FROM students";

  connection.query(query, (err, result) => {
    if (err) {
      console.log("err", err);
    }
    console.log("result", result);
  });
};

const findById = (id) => {
  const query = "SELECT * FROM students WHERE student_id = ?";

  connection.query(query, [id], (err, result) => {
    if (err) {
      console.log("err", err);
    }
    console.log("result", result);
  });
};

const findByNameWithId = (name, id) => {
  const query =
    "SELECT * FROM students WHERE student_id = ? AND student_name = ?";

  connection.query(query, [id, name], (err, result) => {
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

  //   createDb();

  console.log("Connected!");

  createTable();

  // createRecord()

  //   createMultipleRecord()

  //   createDynamicRecord();

  //   selectMyData();

  //   findById(3);

  findByNameWithId("student_name2", 3);
});
