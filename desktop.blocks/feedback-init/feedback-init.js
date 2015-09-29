modules.define(
    'feedback-init',
    ['i-bem__dom','jquery'],
    function(provide, BEMDOM, $) {

provide(BEMDOM.decl(this.name, {
    onSetMod : {
        'js': {
            'inited': function() {                       
              /*
              ИНИЦИАЛИЗАЦИЯ ФОРМЫ .... 
              повесил на инициализацию блока feedback-init т.к. "лекарства с БЭМ сайта" не помогают!
              Источник:
              https://ru.bem.info/technology/i-bem/v2/i-bem-js-init/#%D0%90%D0%B2%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F-%D0%B8%D0%BD%D0%B8%D1%86%D0%B8%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F
             */

              var cookienow=this._getCookie('feedbackdata');
              cookienow_arr = JSON.parse ( cookienow );              
                 
              //Заполняем поля формы из куки
              cookienow_arr.forEach(function(item, i, arr) {
                if(item.value!=''){
                  //если textarea
                  if(item.name=='feedback-message'){                
                    $('textarea[name='+item.name+']').closest(".feedback__textarea").addClass("feedback__textarea_valid");  
                    $('textarea[name='+item.name+']').val(item.value);
                  }
                  else if ( (item.name!='feedback-token') && (item.name!='feedback-id') ) {
                    $('input[name='+item.name+']').closest(".feedback__input").addClass("feedback__input_valid");                
                    $('input[name='+item.name+']').val(item.value);
                  }                      
                }
              });
            } 
        }
      },
      //Ф-ция для извлечения КУКИ 
      _getCookie: function(cookie_name) {
          var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
          if ( results )
            return ( unescape ( results[2] ) );
          else
            return null;
      }
    }

));
});