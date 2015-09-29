var express = require('express');
var router = express.Router();
var url = require('url');


router.post('/', function(req, res, next) {
	var apiAnswer = {};
	apiAnswer['status']='OK';
	apiAnswer['feedback-msg'] = 'Оо POST';
	var apiAnswerjson = JSON.stringify(apiAnswer);
	console.log(apiAnswerjson);
	res.send(apiAnswerjson);
});

router.get('/', function(req, res, next) {
  var urlParsed = url.parse (req.url, true);  
  var apiAnswer = {};
  var feedback_msg = '';	

	//	ПРОВЕРКА ПОЛЕЙ ФОРМЫ
	  if(urlParsed.query['feedback-username'] == ''){	  	
	  	apiAnswer['status'] = 'error';
	  	feedback_msg += 'username empty<br>';
	  }	  
	  if (urlParsed.query['feedback-phone'] == '') {	  
	  	apiAnswer['status']='error';
	  	feedback_msg += 'phone empty<br>';
	  }
	  if(urlParsed.query['feedback-email'] == ''){	  	
	  	apiAnswer['status']='error';
	  	feedback_msg += 'email empty<br>';
	  }
	  if(urlParsed.query['feedback-message'] == ''){	  	
	  	apiAnswer['status']='error';
	  	feedback_msg += 'message empty';
	  }
	  apiAnswer['feedback-msg']=feedback_msg;

	  //Если нет ошибок формы
	  if(apiAnswer['status'] != 'error' ){
	  	
	  	//	ОТПРАВКА ПИСЬМА
		//	nodemailer порт 25
			var nodemailer = require('nodemailer');
			var transporter = nodemailer.createTransport();
			transporter.sendMail({
			    from: 'feedback@api.ru',			    
			    to: urlParsed.query['feedback-email'],
			    subject: 'hello, ' + urlParsed.query['feedback-username'],
			    text: urlParsed.query['feedback-message']
			}, function(error, response){
			   if(error){
			       console.log(error);
			       apiAnswer['status']='error nodemailer';
			       apiAnswer['feedback-msg'] = error;
			   } else{
			   	   console.log("'Message sent': " + response.messageId);			   	   
			   }
			});
		
		/*
		// SMTP - отправка письма
			var nodemailer = require('nodemailer');
			var transporter = nodemailer.createTransport({
			    service: 'mail.ru',
			    auth: {
			        user: '*****',
			        pass: '*****'
			    }
			});
			transporter.sendMail({
			    from: 'feedback@api.ru',
			    to: urlParsed.query['feedback-email'],
			    subject: 'hello, ' + urlParsed.query['feedback-username'],
			    text: urlParsed.query['feedback-message']
			}, function(error, response){
			   if(error){
			       console.log(error);
			       apiAnswer['status-msg']=error;
			   }else{
			   	   apiAnswer['status-msg']=response.messageId;
			       console.log("Message sent: " + response.messageId);
			   }
			});	  	
		*/
	
		//ЗАПИСЬ В БАЗУ
			 var MongoClient = require('mongodb').MongoClient
	 	 	 , assert = require('assert');

			 // Connection URL
			 var mongourl = 'mongodb://localhost:27017/myproject';		 
			 MongoClient.connect(mongourl, function(err, db) {			   
			   assert.equal(null, err);
			   console.log("Connected to server");			   

			  insertDocuments(db, function() {
			    db.close();
			  });
			 });

			var insertDocuments = function(db, callback) {
			  //documents collection
			  var collection = db.collection('documents');
			  //Insert some documents
			  collection.insert([
			    {
			     username : urlParsed.query['feedback-username'],
			     userphone : urlParsed.query['feedback-phone'],
			     useremail : urlParsed.query['feedback-email'],
			     usermessage : urlParsed.query['feedback-message']
			 	}
			  ], function(err, result) {
			  	console.log(err);
			    assert.equal(err, null);
			    assert.equal(1, result.result.n);
			    assert.equal(1, result.ops.length);
			    console.log("Inserted 1 documents into the document collection");
			    callback(result);
			  });
			}
	  }
	

	//ВЫВОД ОТВЕТА API
	if(!apiAnswer['status']){
		apiAnswer['status']='Ваше обращение № YYMMDDNNN зарегестрировано. Наши менеджеры свяжутся с Вами в ближайшее время.';
	}
	//res.send(req.method);
	//console.log(req.method);
	var apiAnswerjson = JSON.stringify(apiAnswer);
	console.log(apiAnswerjson);
	res.send(apiAnswerjson);
	
});

module.exports = router;