const express = require("express");
const mysql = require("mysql2");
const readXlsxFile = require("read-excel-file/node");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydb",
});

connection.connect();

connection.query("select * from users", (err, rows, fields) => {
  if (err) throw err;
  console.log(rows);
});

readXlsxFile("Database.xlsx").then((rows) => {
  console.log(rows);

  rows.forEach((r) => {
    let row = r;
    row = { 1: row };
    row = JSON.stringify(row);
    row = row.split("");
    row.splice(0, 6);
    row.reverse();
    row.splice(0, 2);
    row.reverse();
    row = row.join("");
    console.log(row);
    connection.query(
      `insert into airportdetails values (${row})`,
      (err, rows, fields) => {
        if (err) throw err;
        console.log(rows);
      }
    );
  });
});

app.get("/:id", (req, res) => {
  const iata_code = req.params.id;
  connection.query(
    `select * from airportdetails where iata_code = ${iata_code}`,
    (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => console.log("server started"));
