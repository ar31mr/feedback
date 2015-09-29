// modules.define(
//     'input',
//     ['i-bem__dom','jquery'],
//     function(provide, BEMDOM, $) {

// provide(BEMDOM.decl(this.name, {
//     onSetMod : {
//             'js': {
//                 'inited': function() {                  	 
//                 	this.setMod('status', 'on');
//                 } 
//             }
//         }
//     },
//     {
//         live: function() {
//         	 this.liveBindTo('click', function(e) {
//         		e.preventDefault();
//         		alert('hover!');

//                 console.log(e.target);
//                 alert($(e.target).val());

//             });
//         }

//     }

// ));
// });

// alert('1');