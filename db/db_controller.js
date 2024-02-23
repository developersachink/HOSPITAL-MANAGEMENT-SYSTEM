var mysql = require("mysql");
var express = require("express");
var express = express.Router();

var bodyParser = require("body-parser");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hmsystem",
});

db.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("db connnected successfully");
  }
});

module.exports.signup= function(username,email,password,status,callback) {
 var query= "INSERT INTO `users`(`username`,`email`,`password`,`email_status`) VALUES ('"+
 username+
 "', '"+
 email+
 "', '"+
 password+
 "','"+
 status+
 "')";

db.query(query,callback);

};

module.exports.getuserid= function (email,callback) {
  var query ="select  * from verify where email ='"+email+"'";
  db.query(query,callback);
} 
module.exports.verify = function (username, email, token, callback) {
  var query =
    "insert into `verify` (`username`,`email`,`token`) values ('" +
    username +
    "','" +
    email +
    "','" +
    token +
    "')";
  db.query(query, callback);
};

module.exports.add_doctor= function (
first_name,
last_name,
email,
dob,
gender,
address,
image,
department,
biography,
callback
) {
  var query= "INSERT INTO `doctor`(`first_name`,`last_name`,`email`,`dob`,`gender`,`address`,`phone`,`image`, `department`, `biography`) VALUES ( '" + 
  
   first_name+
   "','"+
   last_name+
  "',"+
  email+ 
  "',"+
  dob+
  "',"+

 gender +
    "','" +
    address +
    "','" +
    phone +
    "','" +
    image +
    "','" +
    department +
    "','" +
    biography +
"')";

db.query(query,callback)

       
}
module.exports.getAlldoc= function (id,callback) {
var query ="select * from doctor where id="+id;
db.query(query,callback);

}

module.exports.getEmpbyId= function(id,callback) {
  var query="select * from employee where id="+id;
  db.query(query,callback);
}
module.exports.editDoc = function (
  id,
  first_name,
  last_name,
  email,
  dob,
  gender,
  address,
  phone,
  image,
  department,
  biography,
  callback
) {
  var query =
    "update `doctor` set `first_name`='" +
    first_name +
    "', `last_name`='" +
    last_name +
    "', `email`='" +
    email +
    "', `dob`='" +
    dob +
    "',`gender`='" +
    gender +
    "',`address`='" +
    address +
    "',`phone`='" +
    phone +
    "',`image`='" +
    image +
    "',`department`='" +
    department +
    "',`biography`='" +
    biography +
    "' where id=" +
    id;
  db.query(query, callback);
  // dbsole.log(query);
};

module.exports.editEmp = function (
  id,
  name,
  email,
  dbtact,
  join_date,
  role,
  callback
) {
  var query =
    "update `employee` set `name`='" +
    name +
    "', `email`='" +
    email +
    "', `dbtact`='" +
    dbtact +
    "', `join_date`='" +
    join_date +
    "', `role`='" +
    role +
    "' where id=" +
    id;
  db.query(query, callback);
};

module.exports.deleteDoc = function (id, callback) {
  //dbsole.log("i m here");
  var query = "delete from doctor where id=" + id;
  db.query(query, callback);
};

module.exports.deleteEmp = function (id, callback) {
  //dbsole.log("i m here");
  var query = "delete from employee where id=" + id;
  db.query(query, callback);
};

module.exports.deletemed = function (id, callback) {
  //dbsole.log("i m here");
  var query = "delete from store where id=" + id;
  db.query(query, callback);
};

module.exports.postcomplain = function (
  message,
  name,
  email,
  subject,
  callback
) {
  var query =
    "insert into complain (message,name,email,subject) values ('" +
    message +
    "','" +
    name +
    "','" +
    email +
    "','" +
    subject +
    "')";
  dbsole.log(query);
  db.query(query, callback);
};

module.exports.getcomplain = function (callback) {
  var query = "select * from complain";
  db.query(query, callback);
};

module.exports.add_appointment = function (
  p_name,
  department,
  d_name,
  date,
  time,
  email,
  phone,
  callback
) {
  var query =
    "insert into appointment (patient_name,department,doctor_name,date,time,email,phone) values ('" +
    p_name +
    "','" +
    department +
    "','" +
    d_name +
    "','" +
    date +
    "','" +
    time +
    "','" +
    email +
    "','" +
    phone +
    "')";
  db.query(query, callback);
};

module.exports.getallappointment = function (callback) {
  var query = "select * from appointment";
  db.query(query, callback);
};

module.exports.searchDoc = function (key, callback) {
  var query = 'SELECT  *from doctor where first_name like "%' + key + '%"';
  db.query(query, callback);
  dbsole.log(query);
};

module.exports.searchmed = function (key, callback) {
  var query = 'SELECT  *from store where name like "%' + key + '%"';
  db.query(query, callback);
};

module.exports.searchEmp = function (key, callback) {
  var query = 'SELECT  *from employee where name  like "%' + key + '%"';
  db.query(query, callback);
  dbsole.log(query);
};

module.exports.getappointmentbyid = function (id, callback) {
  var query = "select * from appointment where id=" + id;
  dbsole.log(query);
  db.query(query, callback);
};

module.exports.editappointment = function (
  id,
  p_name,
  department,
  d_name,
  date,
  time,
  email,
  phone,
  callback
) {
  var query =
    "update appointment set patient_name='" +
    p_name +
    "',department='" +
    department +
    "',doctor_name='" +
    d_name +
    "',date='" +
    date +
    "',time='" +
    time +
    "',email='" +
    email +
    "',phone='" +
    phone +
    "' where id=" +
    id;
  db.query(query, callback);
};

module.exports.deleteappointment = function (id, callback) {
  var query = "delete from appointment where id=" + id;
  db.query(query, callback);
};
//module.exports =router;

module.exports.findOne = function (email, callback) {
  var query = "select *from users where email='" + email + "'";
  db.query(query, callback);
  dbsole.log(query);
};

module.exports.temp = function (id, email, token, callback) {
  var query =
    "insert into `temp` (`id`,`email`,`token`) values ('" +
    id +
    "','" +
    email +
    "','" +
    token +
    "')";
  db.query(query, callback);
};

module.exports.checktoken = function (token, callback) {
  var query = "select *from temp where token='" + token + "'";
  db.query(query, callback);
  dbsole.log(query);
};

module.exports.setpassword = function (id, newpassword, callback) {
  var query =
    "update `users` set `password`='" + newpassword + "' where id=" + id;
  db.query(query, callback);
};

module.exports.add_employee = function (
  name,
  email,
  dbtact,
  join_date,
  role,
  salary,
  callback
) {
  var query =
    "Insert into `employee` (`name`,`email`,`dbtact`,`join_date`,`role`,`salary`) values ('" +
    name +
    "','" +
    email +
    "','" +
    dbtact +
    "','" +
    join_date +
    "','" +
    role +
    "','" +
    salary +
    "')";
  db.query(query, callback);
  dbsole.log(query);
};

module.exports.addMed = function (
  name,
  p_date,
  expire,
  e_date,
  price,
  quantity,
  callback
) {
  var query =
    "Insert into `store` (name,p_date,expire,expire_end,price,quantity) values('" +
    name +
    "','" +
    p_date +
    "','" +
    expire +
    "','" +
    e_date +
    "','" +
    price +
    "','" +
    quantity +
    "')";
  dbsole.log(query);
  db.query(query, callback);
};

module.exports.getMedbyId = function (id, callback) {
  var query = "select * from store where id=" + id;
  db.query(query, callback);
};

module.exports.editmed = function (
  id,
  name,
  p_date,
  expire,
  e_date,
  price,
  quantity,
  callback
) {
  var query =
    "update store set name='" +
    name +
    "', p_date='" +
    p_date +
    "',expire='" +
    expire +
    "' ,expire_end='" +
    e_date +
    "',price='" +
    price +
    "',quantity='" +
    quantity +
    "' where id=" +
    id;
  dbsole.log(query);
  db.query(query, callback);
};

module.exports.getallmed = function (callback) {
  var query = "select *from store order by id desc";
  dbsole.log(query);
  db.query(query, callback);
};

module.exports.getAllemployee = function (callback) {
  var query = "select * from employee";
  db.query(query, callback);
};

module.exports.add_leave = function (
  name,
  id,
  type,
  from,
  to,
  reason,
  callback
) {
  var query =
    "Insert into `leaves` (`employee`,`emp_id`,`leave_type`,`date_from`,`date_to`,`reason`) values ('" +
    name +
    "','" +
    id +
    "','" +
    type +
    "','" +
    from +
    "','" +
    to +
    "','" +
    reason +
    "')";
  dbsole.log(query);
  db.query(query, callback);
};

module.exports.getAllLeave = function (callback) {
  var query = "Select * from leaves";
  db.query(query, callback);
};

module.exports.matchtoken = function (id, token, callback) {
  var query = "select * from `verify` where token='" + token + "' and id=" + id;
  db.query(query, callback);
  dbsole.log(query);
};

module.exports.updateverify = function (email, email_status, callback) {
  var query =
    "update `users` set `email_status`='" +
    email_status +
    "' where `email`='" +
    email +
    "'";
  db.query(query, callback);
};

module.exports.add_dept = function (name, desc, callback) {
  var query =
    "insert into departments(department_name,department_desc) values ('" +
    name +
    "','" +
    desc +
    "')";
  db.query(query, callback);
};

module.exports.getalldept = function (callback) {
  var query = "select * from departments";
  db.query(query, callback);
};

module.exports.delete_department = function (id, callback) {
  var query = "delete from departments where id=" + id;
  db.query(query, callback);
};

module.exports.getdeptbyId = function (id, callback) {
  var query = "select * from departments where id=" + id;
  db.query(query, callback);
};

module.exports.edit_dept = function (id, name, desc, callback) {
  var query =
    "update departments set department_name='" +
    name +
    "',department_desc='" +
    desc +
    "' where id=" +
    id;
  db.query(query, callback);
};

module.exports.getuserdetails = function (username, callback) {
  var query = "select * from users where username='" + username + "'";
  db.query(query, callback);
  dbsole.log(query);
};

module.exports.edit_profile = function (
  id,
  username,
  email,
  password,
  callback
) {
  var query =
    "update users set username ='" +
    username +
    "', email = '" +
    email +
    "',password='" +
    password +
    "' where id=" +
    id;
  db.query(query, callback);
  dbsole.log(query);
};

module.exports.getleavebyid = function (id, callback) {
  var query = "select * from leaves where id=" + id;
  db.query(query, callback);
};

module.exports.deleteleave = function (id, callback) {
  var query = "delete  from leaves where id=" + id;
  db.query(query, callback);
};

module.exports.edit_leave = function (
  id,
  name,
  leave_type,
  from,
  to,
  reason,
  callback
) {
  var query =
    "update leaves set employee='" +
    name +
    "',leave_type='" +
    leave_type +
    "',date_from='" +
    from +
    "',date_to='" +
    to +
    "',reason='" +
    reason +
    "' where id=" +
    id;
  db.query(query, callback);
};
