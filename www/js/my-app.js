var globalData;
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

var navigation = {
    goBack: function(){
        var l = document.getElementById('form-go-back');
        l.click();
    },
    toIDCTab: function(){
        var l = document.getElementById("tabToIDC");
        l.click();
    },
    fromIDCTab: function(){
        var l = document.getElementById("tabFromIDC");
        l.click();
    },
}

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
    var futureData;
    $.getJSON( "/www/futureRides", function(data) {
        rides.init(data);
    })
    .fail(function(){
        console.log('error while trying to get data from server');
    });
    newPostSubmit.init();
});

newPostSubmit = {
    init: function(){
        $('#newPostForm').on('submit', function(e){
            console.log('submitted');
            e.preventDefault();
            var form = $(this);
            var userData = form.serialize();
    
            $.ajax({
                type: 'POST',
                url: '/www/createRide',
                data: userData,
            }).done(function(dataRecieved){
                if(dataRecieved){
                    //Close new post screen
                    navigation.goBack();
                    
                    /**setTimeout(function(){
                        // switch tab
                        (dataRecieved.type == "toIDC") ? navigation.toIDCTab() : navigation.fromIDCTab();
                    }, 1000);*/    //doesnt work currently

                    rides.addOnePost(dataRecieved);
                    form.trigger('reset');    
                } else {
                    console.log("there was an error?");
                }
            })
            .fail(function(data){
                console.log("there was an error");
            });
        });
    }
}


var rides = {
    init: function(data){
        for (var i = 0; i < data.length; i++) {
            var $ride = this.createNode(data[i]);
            var $container = $(this.whereToPut(data[i]));
            $container.append($ride);
        }
    },
    emptyTheFeed: function(){
        $(".tabs-swipeable-wrap ul").empty();
    },
    addOnePost: function(obj){
        var $ride = this.createNode(obj);
        var $container = $(this.whereToPut(obj));
        $container.append($ride);
        new Highlighter($ride);
    },
    whereToPut: function(obj){
        var st = "#";
        var today = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        if(this.isSameDay(obj.date, today)){
            st+= "today";
        } else if(this.isSameDay(obj.date, tomorrow)){
            st+= "tomorrow";
        } else {
            st+= "later";
        }
        st+= (obj.type == "toIDC") ? "ToIDC" : "FromIDC";
        return st;
    },
    isSameDay: function(d1, d2){
        d1 = new Date(d1);
        d2 = new Date(d2);
        if(d1.getDate() != d2.getDate()){ return false; }
        if(d1.getFullYear() != d2.getFullYear()){ return false; }
        if(d1.getMonth() != d2.getMonth()){ return false; }
        return true;
    },
    createNode: function(obj){
        var time = obj.hour[0] + ':' + obj.hour[1];
        var $item = $('<div class="item-title">' + obj.from + " to " + obj.to + '</div>');
        var $row = $('<div class="item-title-row"></div>');
        $row.append($item);

        // TODO: leaving OR requesting!!
        var $span = $('<span class="timeSpan">Leaving ' + time + '</span>');
        var $subtitle = $('<div class="item-subtitle">' + obj.author + '</div>');
        $subtitle.append($span);
        $inner = $('<div class="item-inner"></div>').append($row).append($subtitle);
        var imgType = (obj.role == "driver") ? "driver" : "pedestrian";
        $img = $('<div class="item-media"><img src="img/' + imgType + '.png" width="44" /></div>');
        $a = $('<a href="#ride" class="item-link item-content"></a>');
        $a.append($img).append($inner);
        $li = $('<li id="ride"' + obj.id + ' class="rideComponent">');
        $li.append($a);
        return $li;
    }
}

function Highlighter($node){
    var i = 1;
    var colors = ["#ffff99", "#ffffb3", "#ffffcc", "#ffffe6", "#ffffff"];
    $node.css({"background-color": colors[0]});
    
    var tFunc = function() {
        setTimeout(function(){
            $node.css({"background-color": colors[i]});
            i++;
            if(i < colors.length){
                tFunc();
            }
        }, 250);
    }
    setTimeout(function(){
        tFunc();
    }, 500);
}

var profile = {
    init();
}


/**
                <div id="profileSec" class="card">
                  <div class="card-header">Barak Cohen<div class="item-media"><img src="img/driver.png" width="44"></div></div>
                  <div class="card-content">
                    <div class="card-content-inner">
                      <p>From Tel aviv to IDC.</p>
                      <p>Time: 20:30</p>
                    </div>
                  </div>
                  <div class="card-footer">3 spots</div>
                </div>

*/
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
$(document).ready(function(){
    $('#logoutB').on('click', logout1);
});


var logout1 = function(){
    console.log('dd');
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
};

function makeComment(){
    var message = document.getElementById('message').value;
    //change the id o in the rideID
    $.post('/www/CreateNewComment', {message: message , rideID: 0} , function(data){
        if(data){
            console.log(data);
            var name = data.author;
            comments.createCommentCard(name, message);
        }
        else{
            alert("waring while uploading the comment");
        }
    });
};