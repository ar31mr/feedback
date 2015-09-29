modules.define(
    'feedback',
    ['i-bem__dom','jquery'],
    function(provide, BEMDOM, $) {

provide(BEMDOM.decl(this.name, {
    onSetMod : {
        'js': {
            'inited': function() {                       
              this._feedback_username = this.findBlockInside('feedback-username', 'input');
              this._feedback_phone = this.findBlockInside('feedback-phone', 'input');
              this._feedback_email = this.findBlockInside('feedback-email', 'input');
              this._feedback_message = this.findBlockInside('feedback-message', 'textarea');
            } 
        }
      }
    },
    {
      live: function() {
        /*
          НАЖАТИЕ НА "Action"
         */ 
        this.liveBindTo('f-button','click', function(e) {
          e.preventDefault();          
          
          //ЕСЛИ token и id не присвоен
          if( ($('input[name=feedback-id]').val()=='') || ($('input[name=feedback-token]').val()=='') ){
            $.ajax({
              url: '/api/feedback/key',
              type: "POST",                        
              dataType : "json",                  
              async: false,
              success: function(answer){
                //console.log('POST /api/feedback/key ' + answer);
                $('input[name=feedback-id]').val(answer.id);
                $('input[name=feedback-token]').val(answer.token);
              }
            });               
          }

          var formData = $('.feedback__form').serializeArray();          
          
          $.ajax({
            url: '/api/feedback',
            type: "POST",                 
            dataType : "json",
            data : formData,
            async: false,
            beforeSend : function(){                    
              $('.feedback__f-button')
                .addClass('button_disabled')
                .attr('disabled', 'disabled');
              $('.feedback__f-button .button__text').text('Отправка...');
              $('.feedback__form').animate({opacity: 0},500);
            },
            success: function(answer){              
              $('.feedback__answer .feedback__text').html(
              //  answer['status'] + '<br>' + 
                answer['feedback-msg']
              //  + '<br><small>Для отладки:<br>' + answer['debug'] + '</small>'
              );            
              $('.feedback__answer').fadeIn('fast');  
              console.log(answer);                           
            },
            complete: function(answer){             
              if(answer.responseJSON['status']=='ok'){
                $('input[name=feedback-id]').val('');
                $('input[name=feedback-token]').val('');
                //очищаем textarea и куки
                $('textarea[name=feedback-message]').val('');
                $('textarea[name=feedback-message]').closest(".feedback__textarea").removeClass("feedback__textarea_valid");
              }
              console.log(answer.responseJSON);  
            }
          });
        });
        
        //НАЖАТИЕ НА "ОК", после получения ответа при отправке формы
        this.liveBindTo('close-button','click', function(e) {
          e.preventDefault();                                
          $('.feedback__f-button')
            .removeClass('button_disabled')
            .removeAttr('disabled');
          $('.feedback__f-button .button__text').text('Action');
          $('.feedback__form').animate({opacity: 1},1000);
          $('.feedback__answer').fadeOut('fast');
        });     

        /*
        ПОТЕРЯ ФОКУСА input'ами или textarea
        проверка поля
         */
        this.liveBindTo('input textarea','focusout', function(e) {                          
          //console.log(e.target.name);          

          $.ajax({
            url: '/api/feedback/' + e.target.name,
            type: "POST",                        
            dataType : "json",
            data : 'field='+e.target.name + '&value='+$(e.target).val(),
            //data : e.target.name + '='+$(e.target).val(),
            success: function(answer){
              //console.log(answer);
              if(answer['status']==''){
                if(e.target.className=='textarea__control')  {
                  $(e.target).closest(".feedback__textarea").addClass("feedback__textarea_valid");  
                }
                //если input
                else if(e.target.className=='input__control')  {
                  $(e.target).closest(".feedback__input").addClass("feedback__input_valid");  
                }  
              }
              else{
                //если textarea
                if(e.target.className=='textarea__control')  {
                  $(e.target).closest(".feedback__textarea").removeClass("feedback__textarea_valid");

                }
                //если input
                else if(e.target.className=='input__control')  {
                  $(e.target).closest(".feedback__input").removeClass("feedback__input_valid");
                }    
              }
            }
          });
          
        });
        
        /*
          ИЗМЕНЕНИЕ ПОЛЕЙ ФОРМЫ И ЗАПИСЬ В КУКИ "НАЛЕТУ"
         */
        this.liveBindTo('change focusout', function(e) {              
          var formData = $('.feedback__form').serializeArray();              
              formData = JSON.stringify( formData ); //В строку
              //JSON.parse ( formDatastr );          //В объект
              //console.log(formData);
          
          var cookie_date = new Date ( );
              cookie_date.setDate ( cookie_date.getDate() + 1 );
              document.cookie="feedbackdata=" + escape (formData) +"; path=/; expires=" + cookie_date.toGMTString();
        }); 

      }
    }
));
});