var express = require('express');
var router = express.Router();
var url = require('url');
var MongoClient = require('mongodb').MongoClient
	, assert = require('assert');	
	var mongourl = 'mongodb://localhost:27017/myproject';

//POST api/feedback
router.post('/', function(req, res, next) {
	var apiAnswer = {};
	apiAnswer['status']='';    

	//ПРОВЕРКА ВСЕХ ПОЛЕЙ
	apiAnswer['feedback-msg'] = 'валидация всех полей<br>';	
	apiAnswer['status']+=valid_fields('feedback-username', req.body['feedback-username']);
	apiAnswer['status']+=valid_fields('feedback-email', req.body['feedback-email']);
	apiAnswer['status']+=valid_fields('feedback-phone', req.body['feedback-phone']);
	apiAnswer['status']+=valid_fields('feedback-message', req.body['feedback-message']);

	//Если нет ошибок в полях формы
	if(apiAnswer['status']==''){
		apiAnswer['debug']=' - Поля формы не содержат ошибок<br>';	
		//Если еще не присвоен token и id
		if( (req.body['feedback-id']=='') || (req.body['feedback-token']=='') ){
			apiAnswer['debug'] +=' - id и token не присвоены, возможно робот<br>';	
			apiAnswer['status'] = 'empty token or id';
		}
		//Если token и id указаны
		else{			
			apiAnswer['debug'] +=' - token и id указан (непроверенные)<br>';
			var token_date=req.body['feedback-id'].substr(0,6)*1;
			var token_id=req.body['feedback-id'].substr(6)*1;
			console.log('token_date: '+ token_date + ' token_id: '+token_id);
			//проверяем токен и ID и статус = no send
				//подключаемся к БД
				MongoClient.connect(mongourl, function(err, db) {			   
					assert.equal(null, err);
					console.log("Connected to server");					
					
					findDocuments(db, function() {				
					//	insertDocuments(db, function() {					
							db.close();							
				     //   });					
					});									 
				});

				//Проверка целостности token id
				 var findDocuments = function(db, callback) {
				  var collection = db.collection('key');				  
				  collection.find({id:token_id, date:token_date, token:req.body['feedback-token']*1}).sort({id:-1}).limit(1).toArray(function(err, docs) {
				    assert.equal(err, null);
				    if(docs[0] != null){
				    	console.log("Переданные Token и Id ВЕРНЫЕ");				    	
				    					    	
				    	
				    }else{				    	
				    	console.log("Переданные Token и Id НЕВЕРНЫЕ");				    	
				    	apiAnswer['status']='Переданные Token и Id НЕВЕРНЫЕ';
						apiAnswer['feedback-msg'] = apiAnswer['status'];
				    }
				    
				    callback(docs);
					
					//  var apiAnswerjson = JSON.stringify(apiAnswer);
					// // 	//console.log(apiAnswerjson);
					//  res.send(apiAnswerjson);		    					
				  });
				}
		}
	}
	//Если есть ошибки полей формы
	else{		
		apiAnswer['feedback-msg'] = apiAnswer['status'];
		apiAnswer['debug']='ошибки в полях: <br>' + apiAnswer['status'];
		apiAnswer['status']='error';
	}


	//Если нет ошибок формы и нет ошибки token и id
	if(apiAnswer['status'] == '' ){
		//console.log(collection);
		//	ОТПРАВКА ПИСЬМА				
		var nodemailer = require('nodemailer');
		//	nodemailer порт 25
		var transporter = nodemailer.createTransport();	
		// SMTP
		// var transporter = nodemailer.createTransport({
		//     service: 'mail.ru',
		//     auth: {
		//         user: '***',
		//         pass: '***'
		//     }
		// });
		transporter.sendMail({
			from: 'feedback@api.ru',			    
			to: req.body['feedback-email'],
			subject: 'Ваше обращение № ' + req.body['feedback-id'] + ' зарегестрировано.',
			text: 'Наши менеджеры свяжутся с Вами в ближайшее время.\n' 
				+ req.body['feedback-message']
		}, function(error, response){
			if(error){
				console.log(error);
				apiAnswer['status']='error nodemailer';
				apiAnswer['feedback-msg'] = error;
			} else{
				console.log("'Message sent': " + response.messageId);			   	   
			}
		});
			
		//ЗАПИСЬ В БАЗУ					 
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
					username : req.body['feedback-username'],
					userphone : req.body['feedback-phone'],
					useremail : req.body['feedback-email'],
					usermessage : req.body['feedback-message'],
					id : req.body['feedback-id']
				}
			    ], function(err, result) {
					//console.log(err);
					assert.equal(err, null);
					assert.equal(1, result.result.n);
					assert.equal(1, result.ops.length);
					console.log("Inserted 1 documents into the document collection");
					callback(result);
				});
		}
		
		//ЕСЛИ НАДО БУДЕТ ТО ОБНОВЛЯЕМ СТАТУС в db.key  на например SEND
		if(apiAnswer['status'] == '' ){
			apiAnswer['status'] = 'ok';
			apiAnswer['feedback-msg']='Ваше обращение № '+ req.body['feedback-id'] +' зарегестрировано. Наши менеджеры свяжутся с Вами в ближайшее время.';
		}
		else{
			apiAnswer['feedback-msg']='Ошибка, повторите попытку позже.';	
		}	
	}

	


	console.log(apiAnswer['status']);

	var apiAnswerjson = JSON.stringify(apiAnswer);
	//console.log(apiAnswerjson);
	res.send(apiAnswerjson);
});


//POST api/feedback/key  либо  POST api/feedback/name
router.post('/:action', function(req, res, next) {
	//var urlParsed = url.parse (req.url, true);  	
  	var apiAnswer = {};

  	// POST api/feedback/key
	if(req.params.action=='key'){
		//генерируем token
        var token=Math.round(100000 + Math.random() * (999999 - 100000))            

        //генерируем YY/MM/DD       
        var today = new Date();            
        var data, id, tmp;  
        tmp = today.getFullYear() + ' ';
        date = tmp.substr(2,2);
        tmp = today.getMonth()+1;
        if(tmp<10){tmp='0' + tmp;}
        date = date + '' + tmp + today.getDate();

        //получаем NNN = id
        
        //подключаемся к БД
		MongoClient.connect(mongourl, function(err, db) {			   
			assert.equal(null, err);
			console.log("Connected to server");		
			
			findDocuments(db, function() {				
				insertDocuments(db, function() {					
					db.close();
		        });
			});	
			 
		});


		//console.log(findDocuments);
		

		//поиск свободного ID
		var findDocuments = function(db, callback) {
		  var collection = db.collection('key');		  
		  collection.find({date:date*1}).sort({id:-1}).limit(1).toArray(function(err, docs) {
		    assert.equal(err, null);		    
		    //assert.equal(4, docs.length);
		    if(docs[0] != null){
		    	id=docs[0].id+1;
		    	console.log("Найден и свободный NNN = " + id);
		    	
		    	//console.dir(docs);
		    	//console.dir(docs[0].id);		    
		    	//console.dir(id);
		    	
		    }else{
		    	console.log("Ключ в БД не найден = 1");
		    	id=1;
		    }
		    callback(docs);

		    apiAnswer['status']='token и id получены';
			apiAnswer['id']=date + '' + id;			
			apiAnswer['token']=token;			
			
			var apiAnswerjson = JSON.stringify(apiAnswer);
			//console.log(apiAnswerjson);
			res.send(apiAnswerjson);		    
		  });  		
		}

		//запись сгенерированных ID DATE TOKEN
		var insertDocuments = function(db, callback) {
			//documents collection
			var collection = db.collection('key');
				//Insert some documents
				collection.insert([
				{
					id : id,
					date: date*1,
					token : token,
					status : 'no send'
				}
			    ], function(err, result) {
					console.log(err);
					assert.equal(err, null);
					assert.equal(1, result.result.n);
					assert.equal(1, result.ops.length);
					console.log("Token and Id inserted into the key collection");
					callback(result);
				});
		}


	}

	// POST api/feedback/name ..
	else{
		//console.log(req.body['field'] + req.body['value']);
		apiAnswer['feedback-msg'] = '<br>валидация поля ' + req.params.action;	
		apiAnswer['status']=valid_fields(req.params.action, req.body['value']);	

		var apiAnswerjson = JSON.stringify(apiAnswer);
		//console.log(apiAnswerjson);
		res.send(apiAnswerjson);
	}	


//	var apiAnswerjson = JSON.stringify(apiAnswer);
	//console.log(apiAnswerjson);
//	res.send(apiAnswerjson);
});

//GET api/feedback
router.get('/', function(req, res, next) {
	res.send(
		'Возвращает список всех доступных полей, описание API <br>' + 
		'POST /api/feedback - валидация всех полей, проверка token и id, отправка всех полей, запись в БД и отправка письма <br>' + 
		'POST /api/feedback/name - валидация поля имя <br>' + 
		'POST /api/feedback/key - получения id, token<br>' +     	
		'GET /api/feedback - возвращает список всех доступных полей, описание API<br><br>'			
	);	
});


function valid_fields (field, value) {
	var valid_fields_error='';
	//console.log('field: ' + field);
	switch (field) {
		case 'feedback-username':
	  		if(value==''){
	  			valid_fields_error='feedback-username empty!<br>';	  			
	  		}
	    break;

	    case 'feedback-phone':
	  		if(value==''){
	  			valid_fields_error='feedback-phone empty!<br>';	  			
	  		}
	    break;

	    case 'feedback-email':
	  		if(value==''){
	  			valid_fields_error='feedback-email empty!<br>';	  			
	  		}
	    break;

	    case 'feedback-message':
	  		if(value==''){
	  			valid_fields_error='feedback-message empty!<br>';	  			
	  		}
	    break;
	  	
	  	default: valid_fields_error='action не известен';
	}

	return valid_fields_error;
}

module.exports = router;