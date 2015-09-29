var express = require('express');
//var params = require('express-params');
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

router.get('/:action', function(req, res, next) {
  var urlParsed = url.parse (req.url, true);  
  var apiAnswer = {};
  var feedback_msg = '';	




	//ВЫВОД ОТВЕТА API
	if(!apiAnswer['status']){
		apiAnswer['status']='Успешно...';
	}
	//res.send(req.method);
	//console.log(req.method);
	var apiAnswerjson = JSON.stringify(apiAnswer);
	console.log(apiAnswerjson);
	res.send(
		'1123 123'
		+ apiAnswerjson 
		+ '<br>' 
		+ req.params.action 
	);
	
});

module.exports = router;