var globalData;
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

utils = {
    dateFormatter(d){
        return d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
    },
    isSameDay: function(d1, d2){
        d1 = new Date(d1);
        d2 = new Date(d2);
        if(d1.getDate() != d2.getDate()){ return false; }
        if(d1.getFullYear() != d2.getFullYear()){ return false; }
        if(d1.getMonth() != d2.getMonth()){ return false; }
        return true;
    },
}


var navigation = {
    goBack: function(){
        var l = document.getElementById('form-go-back');
        for(var i = 0; i < 50; i++){
            l.click();            
        }
    },
    toIDCTab: function(){
        myApp.showTab('#tab1');
    },
    fromIDCTab: function(){
        myApp.showTab('#tab2');
    },
}



$(document).ready(function(){
    $('#logoutB').on('click', logout);
    $("#commentForm").on('submit', comments.createCommentHandler);
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
                    navigation.goBack();
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
        if(utils.isSameDay(obj.date, today)){
            st+= "today";
        } else if(utils.isSameDay(obj.date, tomorrow)){
            st+= "tomorrow";
        } else {
            st+= "later";
        }
        st+= (obj.type == "toIDC") ? "ToIDC" : "FromIDC";
        return st;
    },
    createNode: function(obj){
        var time = obj.hour[0] + ':' + obj.hour[1];
        var $item = $('<div class="item-title">' + obj.from + " to " + obj.to + '</div>');
        var $row = $('<div class="item-title-row"></div>');
        $row.append($item);
        var leavingOrRequesting = (obj.role == "driver") ? "Leaving " : "Requesting ";
        var $span = $('<span class="timeSpan">' + leavingOrRequesting + time + '</span>');
        var $subtitle = $('<div class="item-subtitle">' + obj.author + '</div>');
        $subtitle.append($span);
        $inner = $('<div class="item-inner"></div>').append($row).append($subtitle);
        var imgType = (obj.role == "driver") ? "driver" : "pedestrian";
        $img = $('<div class="item-media"><img src="img/' + imgType + '.png" width="44" /></div>');
        $a = $('<a href="#ride" class="item-link item-content"></a>');
        $a.append($img).append($inner);
        $li = $('<li class="rideComponent" onClick="ridePage.handler(' + obj.id + ')"></li>');
        $li.append($a);
        return $li;
    },
}



var ridePage = {
    current: 0,
    handler: function(rideID){
        ridePage.current = rideID;
        var data = this.getData(rideID);
    },
    getData: function(rideID){
        $.getJSON( "/www/getRide/" + rideID, function( data ) {
            ridePage.createPage(data);
        })
        .fail(function(){
            console.log('error while trying to get data from server');
        })
    },
    createPage: function(data){
        $("#ridePageAuthor").text(data.author);
        var role = (data.role == "driver") ? "driver" : "pedestrian";
        document.getElementById('ridePageImg').src = "img/" + role + ".png";
        $("#ridePageFromTo").text("From " + data.from + " to " + data.to);
        var time = data.hour[0] + ":" + data.hour[1] + " - " + utils.dateFormatter(new Date(data.date));
        $("#ridePageTime").text("Time: " + time);
        $("#ridePageNotes").text(data.notes);
        comments.init(data.comments);
    },
}


var comments = {
    createCommentHandler: function(e){
        e.preventDefault();
        comments.addOneComment();
    },
    highlightCallback: function($node){
        new Highlighter($node);
    },
    addOneComment: function(){
        var message = document.getElementById('message').value;
        $.post('/www/CreateNewComment', {message: message , rideID: ridePage.current} , function(data){
            if(data){
                comments.createCommentComponent(data, comments.highlightCallback);
                document.getElementById('message').value = "";
            }
            else{
                alert("error uploading the comment");
            }
        });
    },
    createCommentCard: function(author, message){
        var st = '<div class="card" id="aaa"><div class="card-content"><div class="card-content-inner">'
            +  '<b>' + author + ':</b> ' + message + '</div></div></div>';
        return $(st);
    },
    createCommentComponent: function(data, callback){
        var name = data.author;
        var $node = comments.createCommentCard(name, data.message);
        $("#commentsSec").append($node);
        
        if(callback){
            callback($node);
        }
    },
    empty: function(){
        $("#commentsSec").empty();
    },
    init: function(arr){
        comments.empty();
        for (var i = 0; i < arr.length; i++) {
            this.createCommentComponent(arr[i]);
        }
    },
}


var logout = function(){
    console.log('dd');
    $.getJSON( "/www/logout", function( data ) {
        if(data == true || data == "true"){
            window.location.href = "/public/login.html";
        } else {
            console.log('error disconnecting');
        }
    })
    .fail(function(){
        console.log('error while trying to get data from server');
    })
};

function Highlighter($node){
    var i = 1;
    var colors = ["#ffff99", "#ffffa3", "#ffffad", "#ffffb8", "#ffffc2", "#ffffcc", "#ffffd6", "#ffffe0", "#ffffeb", "#fffff5", "#ffffff"];
    $node.css({"background-color": colors[0]});
    
    var tFunc = function() {
        setTimeout(function(){
            $node.css({"background-color": colors[i]});
            i++;
            if(i < colors.length){
                tFunc();
            }
        }, 150);
    }
    setTimeout(function(){
        tFunc();
    }, 500);
}