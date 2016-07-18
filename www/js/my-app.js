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
    var futureData;
    $.getJSON( "/www/futureRides", function(data) {
        rides.init(data);
    })
    .fail(function(){
        console.log('error while trying to get data from server');
    });
});


/** example
    {
        author: "Sapir", // user ID
        type: "toIDC",
        role: "driver", // driver or passenger
        date: today,
        hour: [12,30],
        from: "Raanana",
        to: "IDC",
        notes: "best music",
        timeStamp: new Date(), //When this was created
        comments: [],
    }

<li id="ride484" class="rideComponent">
  <a href="#ride" class="item-link item-content">
                <div class="item-media"><img src="img/driver.png" width="44"></div>
                <div class="item-inner">
                    <div class="item-title-row">
                      <div class="item-title">AAAA</div>
                    </div>
                    <div class="item-subtitle">Sivan Harel<span class="timeSpan">Leaving 09:00</span></div>
                </div>
  </a>
</li>

*/
var rides = {
    init: function(data){
        for (var i = 0; i < data.length; i++) {
            var ride = this.createNode(data[i]);
            $("#todayToIDC").append(ride);
        }
        var ride = this.createNode(data[0]);
        $("#laterToIDC").append(ride);
        var ride = this.createNode(data[1]);
        $("#todayFromIDC").append(ride);
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
        console.log("maybe img:");console.log($img);
        $a = $('<a href="#ride" class="item-link item-content"></a>');
        $a.append($img).append($inner);
        $li = $('<li id="ride"' + obj.id + ' class="rideComponent">');
        $li.append($a);
        return $li;
    }
}






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