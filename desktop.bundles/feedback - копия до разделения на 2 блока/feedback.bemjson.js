({
    block: 'page',
    title: 'feedback',
    head: [
        { elem: 'css', url: '_feedback.css' },
        { elem: 'css', url: 'http://fonts.googleapis.com/css?family=Open+Sans&subset=latin,cyrillic'}
        /*{ elem: 'css', url: 'http://fonts.googleapis.com/css?family=Open+Sans|Indie+Flower&subset=latin,cyrillic'}                */
    ],
    scripts: [{ elem: 'js', url: '_feedback.js' }],
    content: [
       {
           block: 'content',
           content: [
              {
                block:'feedback',
                //action: '',
                method: 'GET',
                content:[
                  {
                    block:'input',                    
                    mix: [{block:'feedback', elem:'input'}, {block:'feedback', elem:'feedback-username'}],
                    mods:{
                      theme:'islands',
                      size:'l',
                      // width:'available',
                      'has-clear' : true 
                    },
                    placeholder:'Введите Ваше имя',
                    name:'feedback-username'
                  },
                  {
                    block:'input',
                    mix: [{block:'feedback', elem:'input'}, {block:'feedback', elem:'feedback-phone'}],
                    mods:{
                      theme:'islands',
                      size:'l',
                      // width:'available',
                      'has-clear' : true 
                    },
                    placeholder:'Введите Ваш телефон',
                    name:'feedback-phone'
                  },                  
                  {
                    block:'input',
                    mix: [{block:'feedback', elem:'input'}, {block:'feedback', elem:'feedback-email'}],
                    mods:{
                      theme:'islands',
                      size:'l',
                      //width:'available',
                      'has-clear' : true 
                    },
                    placeholder:'Введите Вашу почту',
                    name:'feedback-email'
                  },
                  {
                    block:'textarea',
                    mix: [{block:'feedback', elem:'textarea'}, {block:'feedback', elem:'feedback-message'}],
                    mods:{
                      theme:'islands',
                      size:'l',
                      width:'available'                      
                    },
                    placeholder:'Напишите нам сообщение',
                    name:'feedback-message'
                  },
                  {
                    block:'button',
                    mix:{block:'feedback', elem:'f-button'},
                    mods:{
                      theme:'islands',
                      size:'l',
                      type : 'submit',
                      view:'action'
                    },
                    text:'Action2'
                  },' ',
                  {
                    elem:'ajax-answer',                      
                    mods:{ 'statys':'noshow'},
                    content:'Ответ временно будет тут'
                  },                                   
                  {
                    block : 'spin'
                    /*ЛОМАЕТ СЕРВЕР! И CSS*/
                    //mods : { theme : 'islands', size : 'xl', visible : true }
                    //mods : { theme : 'islands', size : 'xl' }
                  }
                ]
              }
           ]
       }
    ]
})
