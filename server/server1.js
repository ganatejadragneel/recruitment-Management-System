var express=require('Express')
var app=express();
const port = process.env.PORT || 5000;
var viewresume=require('./first1.js');

app.use('/first1',viewresume);

var db=require('./db1');
db.connect('mongodb://localhost:27017/',function(err){
	if(err){
		console.log("Unable to connect to Mongo")
		process.exit(1)
	}
	else{
			app.listen(5000);
			console.log("Connection established and listening to port 5000")
	}
})