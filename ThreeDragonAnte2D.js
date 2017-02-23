var id; //interval for animations
//    playerId = "",
//    enemyId = "",
//    enemyName = "",
//    nameOfPlayer = "";

var p1, p2;

var locoEnum = {
    "HAND" : 0,
    "FLIGHT" : 1,
    "ANTE" : 2,
    "DISCARD" : 3,
    "DECK" : 4
};

var selectEnum = {
    "NONE" : 0,
    "ANTE" : 1,
    "FLIGHT" : 2
    //etc
};

var toSelect = selectEnum.NONE;

var phaseEnum = {
    "START" : 0,
    "ANTE" : 1
    //etc
};

var animating = false;

var growingCanvas = null;
var shrinkingCanvas = null;

var phase = phaseEnum.START;

var usedCanvases = {};

var backgroundImg = new Image(),
    backSrc = 'images/back.png';
backgroundImg.src = 'images/back1.jpg';

var deckCanvas, anteCanvas, discardCanvas, logoCanvas,
    enemyHandCanvases = [],
    playerHandCanvases = [],
    enemyFlightCanvases = [],
    playerFlightCanvases = [];

var cardWidth = window.innerWidth/13.75,
    cardHeight = window.innerHeight/4.15,
    bigCardWidth = cardWidth*3.8,
    bigCardHeight = cardHeight*3.8,
    bigX = 4.975, //(13.75-3.8)/2
    bigY = .175;//(4.15-3.8)/2

function Canvas(id) {
    this.img = new Image();
    this.img.src = "images/back.png";
    this.id = id;
    this.num = parseInt(id.replace(/^\D+/g, ''));
    this.x1 = null;
    this.y1 = null;
    this.x2 = null;
    this.y2 = null;
    this.a1 = null;
    this.b1 = null;
    this.a2 = null;
    this.b2 = null;
    this.y = null;  //*cardHeight
    this.x = null;  //*cardWidth
    this.w = cardWidth;
    this.h = cardHeight;
    this.shrink = function(){
        console.log(this.id);
        shrinkingCanvas = growingCanvas;
        growingCanvas = null;
        console.log(this.id);
        console.log("a" + this.a1 + " " + this.x1);
        this.savePrevCoord();
        this.calculateRelativeCoord();
        console.log("b" + this.a1 + " " + this.x1);
        this.calculateCoord();
        this.move(.3, function(){
            document.getElementById(shrinkingCanvas.id).className = "";
            shrinkingCanvas = null;
        });
    };
    this.grow = function(){
        growingCanvas = this;
        document.getElementById(this.id).className = "clicked";
        this.savePrevCoord();
        this.calculateRelativeCoord();
        this.calculateCoord();
        this.move(.3, function(){});
        console.log("c" + this.a1 + " " + this.x1);
    };
    this.moveToNewPlace = function(saveCoord) {
        if (saveCoord) {
            this.savePrevCoord();
        }
        this.calculateRelativeCoord();
        this.calculateCoord();
        this.move(.3, function(){});
    };
    this.specialMoveToNewPlace = function(saveCoord) {
        if (saveCoord) {
            this.savePrevCoord();
        }
        this.calculateRelativeCoord();
        this.calculateCoord();
        this.specialMove(5, .1);
    };
    this.calculateCoord = function() {
        this.x1 = cardWidth * this.x;
        this.y1 = cardHeight * this.y;
        this.x2 = this.x1 + this.w;
        this.y2 = this.y1 + this.h;
    };
    this.calculateRelativeCoord = function(){
        if (this == growingCanvas) {
            console.log(true);
            this.x = bigX;
            this.y = bigY;
            this.w = bigCardWidth;
            this.h = bigCardHeight;
        } else if (usedCanvases[this.id] != null) {
            this.w = cardWidth;
            this.h = cardHeight;
            var max;
            if (this.id == "logo") {
                this.w = 3 * 2.47 * cardWidth;
                this.h = 3 * 0.441 * cardHeight;
                this.x = 3.169; //(13.75-3*(625/253))/2
                this.y = 1.414; //(4.15-3*(200/454))/2
            } else if (this.id == "deck") {
                if (phase == phaseEnum.START) {
                    this.x = 5.375; //(13.75-3)/2
                    this.y = 0.575; //(4.15-3)/2
                    this.w = 3*cardWidth;
                    this.h = 3*cardHeight;
                } else {
                    this.x = 1.7;
                    this.y = 1.25;
                }
            } else if (this.id == "ante") {
                this.x = 3.2;
                if (phase == phaseEnum.ANTE) {
                    if (this.num == 0) {
                        this.y = 1.8
                    } else {
                        this.y = .7
                    }
                } else {
                    this.y = 1.25;
                }
            } else if (this.id == "discard") {
                this.x = .3;
                this.y = 1.25;
            } else if (this.id.includes("playerHand")) {
                this.x = ((this.num+1)*11.0041-.5)/(p1.handSize+1);
                this.y = 3;
            } else if (this.id.includes("playerFlight")) {
                max = (p2.flightSize>p1.flightSize) ? p2.flightSize : p1.flightSize;
                this.x = (max <= 3) ? 5.5+this.num*5.3/3 : 4.5+this.num*5.3/(max-1);
                this.y = 1.8;
            } else if (this.id.includes("enemyHand")) {
                this.x = ((this.num+1)*11.0041-.5)/(p2.handSize+1);
                this.y = -.5;
            } else if (this.id.includes("enemyFlight")) {
                max = (p2.flightSize>p1.flightSize) ? p2.flightSize : p1.flightSize;
                this.x = (max <= 3) ? 5.5+this.num*5.3/3 : 4.5+this.num*5.3/(max-1);
                this.y = .7;
            }
        }   //else if is big card
    };
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
    //these moves happen from events processed by server
    this.specialMove = function(speed, growFactor) {
        animating = true;
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
            if (pos == 100) {
                ctx.canvas.width = cardWidth;
                ctx.canvas.height = cardHeight;
                can.style.left = x1 + 'px';
                can.style.top = y1 +'px';
                ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
                clearInterval(id);
                can.className = "";
                //animating = false;
            } else {
                pos++;
                var frac = pos/100,
                    growthFactor = a*pos*(pos-100);
                ctx.canvas.width = cardWidth + cardWidth * growthFactor;
                ctx.canvas.height = cardHeight + cardHeight * growthFactor;
                can.style.left = cx1 + (cx2 - cx1)*frac - ctx.canvas.width/2 + 'px';
                can.style.top = cy1 + (cy2 - cy1)*frac - ctx.canvas.height/2 +'px';
                ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
            }
        }
    };
    this.fade = function(speed) {
        var canvas = this;
        var can = document.getElementById(this.id);
        var pos = 0,
            id = setInterval(frame, speed),
            ctx = can.getContext('2d'),
            image = this.img;
        function frame() {
            if (pos == 30) {
                clearInterval(id);
                canvas.hide();
            } else {
                pos++;
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.globalAlpha = 1-pos/30;
                ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
            }
        }
    };
    //these happen mostly locally, so the animating boolean will be set to false after
    this.move = function(speed, callback) {
        animating = true;
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
            id = setInterval(frame, speed); //1 is fine
        function frame() {
            if (pos == 100) {
                clearInterval(id);
                callback();
                animating = false;
            } else {
                pos++;
                var frac = pos/100;
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

    var node = document.createElement('canvas');
    node.setAttribute('id', id);
    document.getElementById('container').appendChild(node);
    this.calculateRelativeCoord();
}

function Player(playerName, playerId) {
    this.name = playerName;
    this.id = playerId;
    this.handSize = 0;
    this.flightSize = 0;
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
document.addEventListener('click', function() {
    if($('#chat-name').val() == "") {
        $("#chat-name").select();
    } else {
        $("#textArea").select();
    }
});

//things to happen when page loads
$(document).ready(function() {
    function clickSelectable(canvas) {
        if (!animating) {
            if (growingCanvas == null) {
                canvas.grow();
            } else if (growingCanvas == canvas) {
                //select card?
            } else {
                growingCanvas.shrink();
            }
        }
    }

    function clickNotSelectable(){
        if (growingCanvas != null && !animating) {
            growingCanvas.shrink();
        }
    }

    $('#chat-name').select();   //select chat name box
    document.getElementById("mainCanvas").addEventListener('click', function(){clickNotSelectable();});
    document.getElementsByClassName('box')[0].addEventListener('click', function(){clickNotSelectable();});
    //make canvases
    deckCanvas = new Canvas("deck");
    document.getElementById("deck").addEventListener('click', function(){clickNotSelectable();});
    deckCanvas.hide();
    discardCanvas = new Canvas("discard");
    document.getElementById("discard").addEventListener('click', function(){clickNotSelectable();});
    discardCanvas.hide();
    anteCanvas = new Canvas("ante");
    document.getElementById("ante").addEventListener('click', function(){clickSelectable(anteCanvas);});
    anteCanvas.hide();
    logoCanvas = new Canvas("logo");
    usedCanvases['deck'] = null;
    usedCanvases['ante'] = null;
    usedCanvases['discard'] = null;
    usedCanvases['logo'] = null;
    for (var i = 0; i < 10; i++) {
        (function (i) {
            if (i < 6) {
                playerFlightCanvases.push(new Canvas("playerFlight" + i));
                document.getElementById("playerFlight" + i).addEventListener('click', function(){clickSelectable(playerFlightCanvases[i]);});
                playerFlightCanvases[i].hide();
                enemyFlightCanvases.push(new Canvas("enemyFlight" + i));
                document.getElementById("enemyFlight" + i).addEventListener('click', function(){clickSelectable(enemyFlightCanvases[i]);});
                enemyFlightCanvases[i].hide();
                usedCanvases['playerFlight' + i] = null;
                usedCanvases['enemyFlight' + i] = null;
            }
            playerHandCanvases.push(new Canvas("playerHand" + i));
            document.getElementById("playerHand" + i.toString()).addEventListener('click', function () {clickSelectable(playerHandCanvases[i]);});
            playerHandCanvases[i].hide();
            enemyHandCanvases.push(new Canvas("enemyHand" + i));
            document.getElementById("enemyHand" + i).addEventListener('click', function(){clickNotSelectable();});
            enemyHandCanvases[i].hide();
            usedCanvases['playerHand' + i] = null;
            usedCanvases['enemyHand' + i] = null;
        })(i);
    }
    initializeCanvas(); //draw logo
});

function start() {
    phase = phaseEnum.ANTE;
    logoCanvas.fade(100);
    usedCanvases[logoCanvas.id] = null;
    deckCanvas.moveToNewPlace(true);
}

function resize() {
    if (!animating) {
        cardWidth = window.innerWidth / 13.75;
        cardHeight = window.innerHeight / 4.15;
        bigCardWidth = cardWidth * 3.8;
        bigCardHeight = cardHeight * 3.8;
        bigX = 4.975; //(13.75-3.8)/2
        bigY = .175;  //(4.15-3.8)/2
        for (var i in usedCanvases) {
            var canvas = usedCanvases[i];
            if (canvas != null) {
                canvas.calculateRelativeCoord();
                canvas.calculateCoord();
                canvas.drawCard();
            }
        }
    }
}

function initializeCanvas() {
    var mainctx = document.getElementById('mainCanvas').getContext("2d");
    mainctx.canvas.width  = window.innerWidth * .8;
    mainctx.canvas.height = window.innerHeight;
    logoCanvas.setImage('images/logo13.png');
    /*
    deckCanvas.setCurrCoord((window.innerWidth-deckCanvas.img.width)/2, (window.innerHeight-deckCanvas.img.height)/2,
        (window.innerWidth+deckCanvas.img.width)/2, (window.innerHeight+deckCanvas.img.height)/2);
    deckCanvas.drawCard();
    logoCanvas.setCurrCoord((window.innerWidth-logoCanvas.img.width)/2, (window.innerHeight-logoCanvas.img.height)/2,
        (window.innerWidth+logoCanvas.img.width)/2, (window.innerHeight+logoCanvas.img.height)/2);
    logoCanvas.drawCard();
    */
    usedCanvases[logoCanvas.id] = logoCanvas;
    usedCanvases[deckCanvas.id] = deckCanvas;
    deckCanvas.calculateRelativeCoord();
    logoCanvas.calculateRelativeCoord();
    deckCanvas.calculateCoord();
    logoCanvas.calculateCoord();
    deckCanvas.drawCard();
    logoCanvas.drawCard();

}

function moveInvisibleCard(from, to, index, changeSize) {

    var canvas;


    if (to == locoEnum.HAND) {  //enemyHand
        canvas = enemyHandCanvases[index];
        usedCanvases[canvas.id] = canvas;
        if (changeSize) {
            p2.handSize++;
        }
        canvas.calculateRelativeCoord();
        //canvas.calculateCoord();
    } else if (to == locoEnum.FLIGHT) {
        canvas = enemyFlightCanvases[index];
        usedCanvases[canvas.id] = canvas;
        if (changeSize) {
            p2.flightSize++;
        }
        canvas.calculateRelativeCoord();
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
    //canvas.setCurrCoord(canvas.x1, canvas.y1, canvas.x1+cardWidth, canvas.y1+cardHeight);
    canvas.setImage(backSrc);
    canvas.specialMoveToNewPlace(false);
}

function moveVisibleCard(cardId, from, to, index, changeSize) {
    var canvas,
        card = new Card(cardId);


    if (to == locoEnum.HAND) {  //yourHand
        canvas = playerHandCanvases[index];
        usedCanvases[canvas.id] = canvas;
        if (changeSize) {
            p1.handSize++;
        }
        canvas.calculateRelativeCoord();
    } else if (to == locoEnum.FLIGHT) { //your Flight
        canvas = playerFlightCanvases[index];
        usedCanvases[canvas.id] = canvas;
        if (changeSize) {
            p1.flightSize++;
        }
        canvas.calculateRelativeCoord();
    } else if(to == locoEnum.ANTE) {
        canvas = anteCanvas;
        usedCanvases[canvas.id] = canvas;
        canvas.calculateRelativeCoord();
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

    //canvas.setCurrCoord(canvas.x1, canvas.y1, canvas.x1+cardWidth, canvas.y1+cardHeight);

    canvas.setImage(card.getImage());
    canvas.specialMoveToNewPlace(false);
}