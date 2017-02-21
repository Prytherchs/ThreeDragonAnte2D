var id, //interval for animations
    playerId = "",
    enemyId = "",
    enemyName = "",
    nameOfPlayer = "";

var locoEnum = {
    "HAND" : 0,
    "FLIGHT" : 1,
    "ANTE" : 2,
    "DISCARD" : 3,
    "DECK" : 4
};

var backgroundImg = new Image(),
    backSrc = 'images/back.png';
backgroundImg.src = 'images/back1.jpg';

var deckCanvas, anteCanvas, discardCanvas, logoCanvas,
    enemyHandCanvases = [],
    playerHandCanvases = [],
    enemyFlightCanvases = [],
    playerFlightCanvases = [];

var cardWidth = window.innerWidth*.0727,
    cardHeight = window.innerHeight/4.15,
    bigCardWidth = window.innerWidth*.3,
    bigCardHeight = window.innerHeight/1.1,
    bigX = (window.innerWidth*.8-bigCardWidth)/2,
    bigY = (window.innerHeight-bigCardHeight)/2;

function Canvas(id) {
    this.img = new Image();
    this.img.src = "images/back.png";
    this.id = id;
    this.x1 = null;
    this.x2 = null;
    this.y1 = null;
    this.y2 = null;
    this.a1 = null;
    this.b1 = null;
    this.a2 = null;
    this.b2 = null;
    var node = document.createElement('canvas');
    node.setAttribute('id', id);
    document.getElementById('container').appendChild(node);
    this.setCurrCoord = function(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    };
    this.savePrevCoord = function() {
        this.a1 = this.x1;
        this.b1 = this.y1;
        this.a2 = this.x2;
        this.b2 = this.y2;
    };
    this.setImage = function(imageSource) {
        this.img.src = imageSource;
    };
    this.setCoordToBig = function() {
        this.savePrevCoord();
        this.setCurrCoord(bigX, bigY, bigX+bigCardWidth, bigY+bigCardHeight);
    };
    this.restoreCoord = function() {
        this.setCurrCoord(this.a1, this.b1, this.a2, this.b2);
    };
    this.specialMove = function(speed, growFactor) {
        var can = document.getElementById(this.id);
        can.className = "clicked";
        var pos = 0,
            cx1 = (this.a1 + this.a2) / 2,
            cy1 = (this.b1 + this.b2) / 2,
            cx2 = (this.x1 + this.x2) / 2,
            cy2 = (this.y1 + this.y2) / 2,
            id = setInterval(frame, speed),
            a = growFactor / (15*(-15)),
            ctx = can.getContext('2d'),
            image = this.img,
            x1 = this.x1,
            y1 = this.y1;
        function frame() {
            if (pos == 60) {
                ctx.canvas.width = cardWidth;
                ctx.canvas.height = cardHeight;
                can.style.left = x1 + 'px';
                can.style.top = y1 +'px';
                ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
                clearInterval(id);
                animating = false;
                can.className = "";
            } else {
                pos++;
                var frac = pos/60,
                    growthFactor = a*pos*(pos-60);
                ctx.canvas.width = cardWidth + cardWidth * growthFactor;
                ctx.canvas.height = cardHeight + cardHeight * growthFactor;
                can.style.left = cx1 + (cx2 - cx1)*frac - ctx.canvas.width/2 + 'px';
                can.style.top = cy1 + (cy2 - cy1)*frac - ctx.canvas.height/2 +'px';
                ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
            }
        }
    };
    this.fade = function(speed) {
        var can = document.getElementById(this.id);
        var pos = 0,
            id = setInterval(frame, speed),
            ctx = can.getContext('2d'),
            image = this.img;
        function frame() {
            if (pos == 30) {
                clearInterval(id);
            } else {
                pos++;
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.globalAlpha = 1-pos/30;
                ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
            }
        }
    };
    this.move = function(speed) {
        var can = document.getElementById(this.id),
            ctx = can.getContext('2d'),
            pos = 0,
            x1 = this.x1,
            y1 = this.y1,
            x2 = this.x2,
            y2 = this.y2,
            a1 = this.a1,
            b1 = this.b1,
            a2 = this.a2,
            b2 = this.b2,
            img = this.img,
        //animating = true;
            id = setInterval(frame, speed); //1 is fine
        function frame() {
            if (pos == 75) {
                clearInterval(id);
                //animating = false;
                //can.className = "";
                //clicked = false;
                //clickedCard = null;
                //clickedCanvas = null;
                //callback();
            } else {
                pos++;
                var frac = pos/75;
                can.style.top = b1 + (y1 - b1)*frac + 'px';
                can.style.left = a1 + (x1 - a1)*frac + 'px';
                ctx.canvas.width = (a2-a1) + ((x2-x1) - (a2-a1)) * frac;
                ctx.canvas.height = (b2-b1) + ((y2-y1) - (b2-b1)) * frac;
                ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
            }
        }
    };
    this.drawCard = function() {
        var can = document.getElementById(this.id);
        can.getContext('2d').canvas.width = this.x2-this.x1;
        can.getContext('2d').canvas.height = this.y2-this.y1;
        can.style.left = this.x1 + 'px';
        can.style.top = this.y1 +'px';
        can.getContext('2d').drawImage(this.img, 0, 0, can.getContext('2d').canvas.width, can.getContext('2d').canvas.height);
    };
    this.clear = function() {
        var can = document.getElementById(this.id);
        can.getContext('2d').clearRect(0, 0, can.getContext('2d').canvas.width, can.getContext('2d').canvas.height);
    };
    this.hide = function() {
        this.clear();
        var can = document.getElementById(this.id);
        can.getContext('2d').canvas.width = 0;
        this.x1 = null;
        this.x2 = null;
        this.y1 = null;
        this.y2 = null;
        this.a1 = null;
        this.b1 = null;
        this.a2 = null;
        this.b2 = null;
    };


}



/**
 * Card class
 * @param cardID - where to derive name and strength from
 * @param isADragon - boolean if the card is a color dragon (not including special dragons)
 * @constructor
 */
function Card(cardID) {
    this.name = cardID.replace(/[0-9]/g, '');
    this.strength = cardID.replace(/\D/g,'');
    this.isADragon = !(this.name == "Archmage" || this.name == "Dragonslayer" || this.name == "Druid"
        || this.name == "Fool" || this.name == "Priest" || this.name == "Princess" || this.name == "Thief");
    this.isSpecial = (!this.isADragon || this.name == "Bahamut" || this.name == "Dracolich" ||this.name == "Tiamat");
    this.img = new Image();
    this.img.src = (this.isSpecial) ? ("images/" + this.name + ".png") : ("images/" + this.name + this.strength + ".png");
    this.getImage = function () {
        return this.img.src;
    };
    this.toString = function() {
        if (this.isSpecial) {
            return this.name + " of strength " + this.strength;
        } else {
            return "a " + this.name + " Dragon of strength " + this.strength;
        }
    };
    this.getId = function() {
        return this.name + this.strength; //instructions come from server regarding cards via unique card ID
    };
}

/**
 * prints a message related to game flow
 * @param message - message to be printed
 */
function printMessage(message) {
    var highlights = document.getElementsByClassName("highlight");  //highlight is the class for new messages
    if (highlights.length!=0) {
        highlights[0].style.backgroundColor = "rgba(93, 109, 126, 0)";
        highlights[0].className = "";
    }
    document.getElementById('events').innerHTML = document.getElementById('events').innerHTML + '<p class="highlight">' + message + '</p>';
    var eventDiv = document.getElementById("events");
    eventDiv.scrollTop = eventDiv.scrollHeight;
    var pos = 0;
    clearInterval(id);
    id = setInterval(frame, 25);
    var msg = document.getElementsByClassName("highlight")[0];
    function frame() {
        if (pos == 60){
            clearInterval(id);
            msg.className = "";
        }
        else {
            pos++;
            var frac = 1-pos/60;
            msg.style.backgroundColor = "rgba(93, 109, 126, " + frac + ")";
        }
    }
}

/**
 * prints a message from a user
 * @param message - message to be printed
 * @param color - color of message
 * @param borderColor - borderColor of message
 */
function printUserMessage(message, color, borderColor) {
    var highlights = document.getElementsByClassName("highlight");
    if (highlights.length!=0){
        highlights[0].style.backgroundColor = "rgba(93, 109, 126, 0)";
        highlights[0].className = "";
    }
    document.getElementById('events').innerHTML = document.getElementById('events').innerHTML + '<p class="highlight" style="color:'
        + color + '; text-shadow: -1.5px 0 '+borderColor+', 0 1.5px '+borderColor+', 1.5px 0 '+borderColor+', 0 -1.5px '+borderColor+
        '; letter-spacing: 1px;">' + message + '</p>';
    var eventDiv = document.getElementById("events");
    eventDiv.scrollTop = eventDiv.scrollHeight;
    var pos = 0;
    clearInterval(id);
    id = setInterval(frame, 25);
    var msg = document.getElementsByClassName("highlight")[0];

    function frame() {
        if (pos == 60){
            clearInterval(id);
            msg.className = "";
        }
        else {
            pos++;
            var frac = 1-pos/60;
            msg.style.backgroundColor = "rgba(93, 109, 126, " + frac + ")";
        }
    }
}

//this makes the relevant textarea able to be typed in
document.addEventListener('click', function(e) {
    if($('#chat-name').val() == "") {
        $("#chat-name").select();
    } else {
        $("#textArea").select();
    }
});

/**
 * makes inputted canvas essentially disappear (not clickable)
 * @param canvas
 */
function removeCanvas(canvas) {
    document.getElementById(canvas).getContext('2d').canvas.width = 0;
}

//things to happen when page loads
$(document).ready(function() {
    $('#chat-name').select();   //select chat name box
    //make canvases
    deckCanvas = new Canvas("deck");
    discardCanvas = new Canvas("discard");
    anteCanvas = new Canvas("ante");
    logoCanvas = new Canvas("logo");
    for (var i = 0; i < 10; i++) {
        if (i < 6) {
            playerFlightCanvases.push(new Canvas("playerFlight" + i));
            enemyFlightCanvases.push(new Canvas("enemyFlight" + i));
        }
        playerHandCanvases.push(new Canvas("playerFlight" + i));
        enemyHandCanvases.push(new Canvas("enemyFlight" + i));
    }
    initializeCanvas(); //draw logo


});

function start() {
    logoCanvas.fade(100);

    deckCanvas.savePrevCoord();
    var x1 = (window.innerWidth*.8-cardWidth)/2,
        y1 = (window.innerHeight-cardHeight)/2;
    deckCanvas.setCurrCoord(x1, y1, x1+cardWidth, y1+cardHeight);
    deckCanvas.move(5);
}

function resize() {
    cardWidth = window.innerWidth*.0727;
    cardHeight = window.innerHeight/4.15;
    bigCardWidth = window.innerWidth*.3;
    bigCardHeight = window.innerHeight/1.1;
    bigX = (window.innerWidth*.8-bigCardWidth)/2;
    bigY = (window.innerHeight-bigCardHeight)/2;
}

function initializeCanvas() {
    var mainctx = document.getElementById('mainCanvas').getContext("2d");
    mainctx.canvas.width  = window.innerWidth * .8;
    mainctx.canvas.height = window.innerHeight;
    logoCanvas.setImage('images/logo13.png');
    deckCanvas.setCurrCoord((window.innerWidth-deckCanvas.img.width)/2, (window.innerHeight-deckCanvas.img.height)/2,
        (window.innerWidth+deckCanvas.img.width)/2, (window.innerHeight+deckCanvas.img.height)/2);
    deckCanvas.drawCard();
    logoCanvas.setCurrCoord((window.innerWidth-logoCanvas.img.width)/2, (window.innerHeight-logoCanvas.img.height)/2,
        (window.innerWidth+logoCanvas.img.width)/2, (window.innerHeight+logoCanvas.img.height)/2);
    logoCanvas.drawCard();
}

function moveInvisibleCard(from, to, index) {
    var canvas, x, y;

    if (to == locoEnum.HAND) {  //enemyHand
        canvas = enemyHandCanvases[index];
        x = ((index+1)*window.innerWidth * .8)/(8)-cardWidth/2;
        y = -.5* cardHeight;
    } else if (to == locoEnum.FLIGHT) {

    } else if(to == locoEnum.ANTE) {

    } else if(to == locoEnum.DISCARD) {

    } else {    //deck

    }
    if (from == locoEnum.HAND) {

    } else if (from == locoEnum.FLIGHT) {

    } else if(from == locoEnum.ANTE) {

    } else if(from == locoEnum.DISCARD) {

    } else {    //deck
        canvas.setCurrCoord(deckCanvas.x1, deckCanvas.y1, deckCanvas.x2, deckCanvas.y2);
        canvas.savePrevCoord();

        //var x = ((index+1)*window.innerWidth * .8)/(enemyHand.length+1)-cardWidth/2;

        //ctx.drawImage(back.getImage(), x, y, cardWidth, cardHeight);
    }
    canvas.setCurrCoord(x, y, x+cardWidth, y+cardHeight);
    canvas.setImage(backSrc);
    canvas.move(5);
}

function moveVisibleCard(cardId, from, to, index) {



    var canvas, x, y,
        card = new Card(cardId);


    if (to == locoEnum.HAND) {  //yourHand
        canvas = playerHandCanvases[index];
        x = ((index+1)*window.innerWidth * .8)/(8)-cardWidth/2;
        y = 3*cardHeight;
    } else if (to == locoEnum.FLIGHT) {

    } else if(to == locoEnum.ANTE) {

    } else if(to == locoEnum.DISCARD) {

    } else {    //deck

    }
    if (from == locoEnum.HAND) {

    } else if (from == locoEnum.FLIGHT) {

    } else if(from == locoEnum.ANTE) {

    } else if(from == locoEnum.DISCARD) {

    } else {    //deck
        canvas.setCurrCoord(deckCanvas.x1, deckCanvas.y1, deckCanvas.x2, deckCanvas.y2);
        canvas.savePrevCoord();

        //var x = ((index+1)*window.innerWidth * .8)/(enemyHand.length+1)-cardWidth/2;

        //ctx.drawImage(back.getImage(), x, y, cardWidth, cardHeight);
    }
    canvas.setCurrCoord(x, y, x+cardWidth, y+cardHeight);
    canvas.setImage(card.getImage());
    canvas.move(5);

}