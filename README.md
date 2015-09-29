<<<<<<< HEAD
########## feedback


###### Установка
1) Для запуска на своем БЭМ проекте достаточно в своем app.js (либо иной ...) добавить маршрут api/feedback на файл api/feedback/feedback.js
В моём примере это

> var feedback = require('./api/feedback/feedback');
> app.use('/api/feedback', feedback);

2) Скопировать в desktop.blocks/ папки с блоками "feedback" и "feedback-init"
3) Вставить в свой .bemjson.js файл страницы соответствующий код из desktop.bundles/feedback/feedback.bemjson.js
###### Установка

###### ПРИМЕЧАНИЕ
- Взят project-stub
- Установлен express
- В express задан маршрут api/feedback, по которому исполняется файл api/feedback/feedback.js

bem server работает на 8080 порту

```sh
$ bem server
```

express на 3000 порту
 
```sh
$ npm start
```
###### ПРИМЕЧАНИЕ

Описание API сделаю после согласования key по маршруту GET /api/feedback,
 в данный описание можно подсмотреть в нашем файле
=======
# feedback
>>>>>>> 47c5dea57be5928c8ab98491ee1b45a7a97099e6
