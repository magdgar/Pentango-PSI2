var express = require('express');
var app = express();
var fs = require("fs");
var trans = {'tag':'li','html':'${firstname} ${lastname} ${email} ${password}'};
app.use(express.static('public'));

var mysql      = require('mysql');
 var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : 'root',
   database : 'pentango',
   port     : 3311
 });
 
 connection.query('SELECT * from users', function(err, rows, fields) {
   if (!err){
     console.log('The solution is: ', rows);
   }else
     console.log('Error while performing Query.');
 });


app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "login.html" );
})

app.get('/listUsers', function (req, res) {
		connection.query('select * from users', function(err, result) {
		if (!err){
			console.log(result);
			res.end(JSON.stringify(result));
		}else
			console.log(err);  
		});
	   //var str = json2html.transform(rowes,trans);
	   //res.json(str)
	   //var str = rowes.toString() 
       //res.end();
	   
	   //document.getElementById("F536870916").value=str;
})

app.get('/process_add_user', function (req, res) {

   // Prepare output in JSON format
   response = {
       firstname:req.query.first_name,
       lastname:req.query.last_name,
	   email:req.query.email,
       password:req.query.password
   };

    connection.query('INSERT INTO users SET ?', response, function(err, result) {
		if (!err){
			console.log('inserted ');
		}else
			console.log(err);  
    });
   res.sendFile( __dirname + "/" + "public/index.html" );
   //res.end(JSON.stringify(response));
   //res.end();
})

app.get('/process_login_user', function (req, res) {

    var query = connection.query("select 1, is_admin from users  WHERE firstname='"+req.query.first_name+"' and  password = '"+req.query.password+"'", function(err, result) {
		if (!err){
			if(result.length>0){
				if(result[0]['is_admin'] == 0){
					res.sendFile( __dirname + "/" + "public/index.html" );
				}else {
					res.sendFile( __dirname + "/" + "public/indexAdmin.html" );
				}
			}
			else{
				res.end("user not in db");
			}
		}else
			console.log(err);  
    });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})