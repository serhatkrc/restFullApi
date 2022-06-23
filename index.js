var express = require("express");
const mysql = require("mysql2");
const enumPage = require("./enum")();
var app = express();
var fs = require("fs");

const UserTransactions = {
  createUser: "createUser",
  userDelete: "userDelete",
  updateUser: "updateUser"
};

function mysqlInit() {
  const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "test"
  });
}

app.get("/", function (req, res) {
  if (res.statusCode === 200) {
    fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
      res.end(data);
    });
  }
});

var user = {
  user4: {
    name: "mohit",
    password: "password4",
    profession: "teacher",
    id: 4
  }
};

app.get("/addUser", function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    data["user4"] = user["user4"];
    console.log(data);
    res.end(JSON.stringify(data));
  });
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
