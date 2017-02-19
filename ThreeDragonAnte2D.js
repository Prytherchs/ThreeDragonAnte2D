var id, //interval for animations
    playerId = "",
    enemyId = "",
    enemyName = "",
    nameOfPlayer = "",
    backgroundImg = new Image();
backgroundImg.src = 'images/back1.jpg';

/**
 * Card class
 * @param cardName
 * @param cardStrength
 * @param isADragon - boolean if the card is a color dragon (not including special dragons)
 * @constructor
 */
function Card(cardName, cardStrength, isADragon) {
    this.name = cardName;
    this.strength = cardStrength;
    this.img = new Image();
    this.img.src = (isADragon) ? ("images/" + this.name.toLowerCase() + ".png") : ("images/" + this.name.toLowerCase() + cardStrength + ".png");
    /*
     (x1, y1) is upper right coordinate of card location (in pixels)
     (x2, y2) is lower left coordinate of card location
     (a1, b1) is where the "saved coordinates" (previous coordinates when card moves) (upper right)
     (a2, b2) is lower left of previous location (saved coordinates)
     */
    this.x1 = null;
    this.x2 = null;
    this.y1 = null;
    this.y2 = null;
    this.a1 = null;
    this.b1 = null;
    this.a2 = null;
    this.b2 = null;
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
    this.toString = function() {
        if (this.type == "mortal" || this.name == "Bahamut" || this.name == "Dracolich" ||this.name == "Tiamat") {
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

//animations for game start
function start() {draw();}

//things to happen when page loads
$(document).ready(function() {
    $('#chat-name').select();
    draw();
    //var logoImg = new Image();
    //logoImg.src = 'images/logo.png';
    //mainctx.drawImage(logoImg, 0, 0, 200, 200);
});

function draw() {
    var mainCanvas = document.getElementById("mainCanvas"),
        mainctx = mainCanvas.getContext("2d");
    mainctx.canvas.width  = window.innerWidth * .8;
    mainctx.canvas.height = window.innerHeight;
    var backCardImg = new Image(),
        logoImg = new Image();
    backCardImg.src = 'images/back.png';
    logoImg.src = 'images/logo.png';
    mainctx.drawImage(backCardImg, (window.innerWidth-backCardImg.width)/2, (window.innerHeight-backCardImg.height)/2);
    mainctx.drawImage(logoImg, (window.innerWidth-2*logoImg.width)/2, (window.innerHeight-2*logoImg.height)/2, 2*logoImg.width, 2*logoImg.height);
}