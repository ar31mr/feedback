modules.define(
    'feedback__form',
    ['i-bem__dom','jquery'],
    function(provide, BEMDOM, $) {

provide(BEMDOM.decl(this.name, {
  onSetMod: {
        'js' : {
            'inited' : function() {
                alert('111');
                    console.log('1111111111');
                    // function getCookie(name) {
                    //     var matches = document.cookie.match(new RegExp(
                    //       "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                    //     ));
                    //     return matches ? decodeURIComponent(matches[1]) : undefined;
                    //  }

                    //  // alert('Т.к. используется ленивая инициализация, то в данный момент произошла первая инициализация блока feedback\n ' +
                    //  // 'Надо подумать как сделать чтобы по готовности Дерева, поля заполнялись данными из КУКИ\n'
                    //  // + document.cookie.feedbackdata );                 

                    //  var cookienow=getCookie('feedbackdata');
                    //  console.log(cookienow);
                    //  cookienow_arr = JSON.parse ( cookienow );
                    //  console.log(cookienow_arr);
                    //  console.log(cookienow_arr[0].name);
                     
                    //  //Заполняем поля формы из куки
                    //  cookienow_arr.forEach(function(item, i, arr) {
                    //    if(item.value!=''){
                    //       //если textarea
                    //       if(item.name=='feedback-message'){
                    //         $('textarea[name='+item.name+']').css('background-color', '#fbe122');
                    //         $('textarea[name='+item.name+']').css('color', '#000000');
                    //         $('textarea[name='+item.name+']').val(item.value);
                    //       }
                    //       else{
                    //         $('input[name='+item.name+']').closest(".input__box").css('background-color', '#fbe122');
                    //         $('input[name='+item.name+']').closest(".input__control").css('color', '#000000');
                    //         $('input[name='+item.name+']').val(item.value);
                    //       }                      
                    //    }
                    //  });
            }
        }
    }
}));

});