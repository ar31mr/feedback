({
    block: 'page',
    title: 'feedback',
    head: [
        { elem: 'css', url: '_feedback.css' },
        { elem: 'css', url: 'http://fonts.googleapis.com/css?family=Open+Sans&subset=latin,cyrillic'}        
    ],
    scripts: [{ elem: 'js', url: '_feedback.js' }],
    content: [
       {
           block: 'feedback',
           content: [
              {
                elem:'form',
                //action: '',
                //method: 'GET',                                 
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
                  ' ',
                  {
                    block: 'input',
                    mix: [{block:'feedback', elem:'input_hidden'}, {block:'feedback', elem:'feedback-id'}],                    
                    mods:{
                      theme:'islands',
                      size:'l'
                    },
                    name: 'feedback-id',
                    val: ''
                  }
                  ,' ',
                  {
                    block: 'input',
                    mix: [{block:'feedback', elem:'input_hidden'}, {block:'feedback', elem:'feedback-token'}],
                    mods:{
                      theme:'islands',
                      size:'l'
                    },
                    name: 'feedback-token',
                    val: ''
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
                    text:'Action'
                  },                             
                  {
                    block : 'spin',
                    /*ЛОМАЕТ СЕРВЕР! И CSS*/
                    //mods : { theme : 'islands', size : 'xl', visible : true }
                    //mods : { theme : 'islands', size : 'xl' }
                  }
                ]
              },
             {
              elem: 'answer',
              content: [
                {
                  elem: 'text',
                  content: 'Ajax - ответ будет тут'
                },' ',
                {
                  block : 'button',
                  mix:{block:'feedback', elem:'close-button'},
                  mods:{
                      theme:'islands',
                      size:'l',
                      type : 'submit',
                      view:'action'
                    },
                  text : 'ок'
                }
              ]
             },
             {
               block : 'feedback-init'
             }
           ]
       }
    ]
})
