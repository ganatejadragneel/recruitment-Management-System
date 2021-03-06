const express=require('express');
const app=express();
const router=express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const db=require('./db1');
var MongoClient = require('mongodb').MongoClient;
const uuidv4 = require('uuid/v4');
var fs = require('fs');
const path = require('path');
const opn = require('opn');
const obj1=[
{"id":0,"Title":"Accountant","Description":"Analyze financial information","Location":"Bangalore","Skills":"Mathematics,Active Listening,Monitoring,Critical Thinking","fullDes":"hi"},
{"id":1,"Title":"Advertising Manager","Description":"Plans and executes advertising policies of organization","Location":"Mumbai","Skills":"Good Organisation,Time Management,Communication etc","fullDes":"bi"},
{"id":2,"Title":"Singer","Description":"Holds felt hats over flame","Location":"Bombay","Skills":"Prior Experince in the field","fullDes":"goTo"}
];

const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './uploads');
      },
      filename: (req, file, cb) => {
        const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, newFilename);
      },
});

const upload = multer({ storage });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/addjob',(req, response)=>{	
	let collection=db.get().collection('jobs')
	collection.insertMany(obj1,(err,res)=>{
			if(err) throw err;
			response.send('values inserted');
			console.log("values inserted");
		});
});  

router.get('/joblist',(req,response)=>{
	let collection=db.get().collection('jobs');
	collection.find().toArray(function(err,result){
		if(err) throw err;
		response.send({express:result});
	});
});

router.get('/resumelist',(req,response)=>{
	let collection=db.get().collection('resumes');
	collection.find().toArray(function(err,result){
		if(err) throw err;
		response.send({express:result});
	});
});

router.post('/openresume',(req,res)=>{
	res.send(req.body.resumeid);
	const felpath=path.join(__dirname,'uploads');
	const filePath = path.join(felpath,req.body.resumeid);
	opn(filePath).then(()=>{
	});
});

router.post('/jobadder', upload.single(),(req, response)=>{
	let collection=db.get().collection('jobs');
	let msg = 'Success';
	let func1 = (count)=>{
		try{
		collection.insertOne({id:count,Title:req.body.a,Description:req.body.b,Location:req.body.c,Skills:req.body.d,fullDes:req.body.e},(err,res)=>{
			if(err){ msg = 'Failed';};
			console.log("values inserted");
		});}
		catch(e){
			response.status(500).send('Something broke!')
			console.log('exception\n',e);
		}
		
		response.send(msg);
	}
	collection.count({}, function(error, numOfDocs){
		if(error) return callback(error);
		let count=0;
		count=numOfDocs;
		func1(count);
	})
});  

router.post('/uploadresume', upload.single('File'),(req, response)=>{
	let collection=db.get().collection('resumes');
	
	let func1 = (count)=>{
		try{
		collection.insertOne({id:count,Name:req.body.Name,Email:req.body.Email,Skills:req.body.Skills,File:req.file.filename},(err,res)=>{
			if(err){};
			console.log("values inserted");
			response.send(req.body.Name);
		});}
		catch(e){
			response.status(500).send('Something broke!')
			console.log('exception\n',e);
		}
	}
	
	collection.count({}, function(error, numOfDocs){
		if(error) return callback(error);
		let count=0;
		count=numOfDocs;
		func1(count);
	})
});  

module.exports=router;