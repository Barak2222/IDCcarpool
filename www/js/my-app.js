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


var comments = {
    createCommentCard: function(author, message){
        var st = '<div class="card" id="aaa"><div class="card-content"><div class="card-content-inner">'
            +  '<b>' + author + ':</b> ' + message + '</div></div></div>';
        return $(st);
    }
};

$(document).ready(function(){
	var card = comments.createCommentCard('Sapir', "Hii!!!");
	$('#commentsSec').append(card);
});





/** EXAMPLES:

    logout: function(){
        $.getJSON( "/www/logout", function( data ) {
            console.log(data);
            if(data == true || data == "true"){
                window.location.href = "/public/login.html";
            } else {
                console.log('error disconnecting');
                console.log(data);
            }
        })
        .fail(function(){
            console.log('error while trying to get data from server');
        })
    }

GETQUOTE:

var randomQuote = {
    init: function(){
        $.getJSON( "/www/getQuote", function( data ) {
            $('#randomQuote').text(data);
        })
        .fail(function(){
            console.log('error while trying to get data from server');
        })
    }
}

    setValToServer: function(val){
        $.post("/www/setCalc/" + val)
        .fail(function(data){
            console.log('failed to post to server! ' + data);
        });
    },


SUBMIT FORM:

$('form').on('submit', function(e){
    e.preventDefault();
    var form = $(this);
    var userData = form.serialize();

    $.ajax({
        type: 'POST',
        url: '/login',
        data: userData,
    }).done(function(dataRecieved){
        if(dataRecieved){
            window.location.href = "/www/index.html";
        } else {
            window.location.href = "/public/accessDenied.html";
        }
        form.trigger('reset');
    })
    .fail(function(data){
        window.location.href = "/public/accessDenied.html";
    });
});
    */