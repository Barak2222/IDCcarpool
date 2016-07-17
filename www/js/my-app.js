// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon:true
});
// Export selectors engine
var $$ = Dom7;
// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: true,
    // Enable Dom Cache so we can use all inline pages
    domCache: true
});



var createCommentCard = function(author, message){
	var st = '<div class="card" id="aaa"><div class="card-content"><div class="card-content-inner">'
            +  '<b>' + author + ':</b> ' + message + '</div></div></div>';
    return $(st);
}
$(document).ready(function(){
	var card = createCommentCard('Sapir', "Hii!!!");
	$('#commentsSec').append(card);
});
