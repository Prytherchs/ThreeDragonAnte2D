/*
function Player(playerName, playerId) {
    this.name = playerName;
    this.id = playerId;
    this.hand = [];
    this.handSize = 0;
    this.setName = function(name) {
        this.name = name;
    };
    //this.setHand
    //drawCards
    this.drawcards = function(num) {
        for (var i = 0; i < num; i++){
            if (deck.length == 0) {
                discardToDeck();
            }
            if (this.handSize < 10) {
                this.hand[this.hand.length] = deck[0];
                deck.splice(0, 1);
                this.handSize++;
            }
        }
    };
    this.removeCardFromHand = function(index) {
        this.hand.splice(index, 1);
    };
    this.AddCardToHand = function(card) {
        if (this.handSize < 10) {
            this.hand[this.hand.length] = card;
            this.handSize++;
        }
    };
    this.cardSelectEnum = {
        NONE : 0,
        ANTE : 1,
        FLIGHT : 2
    };
}
*/


//to be rewitten:
/**
 * Has player draw num cards
 * @param player
 * @param num
 */
/*function drawCards(player, num) {
    if (player == 1) {
        for (var i = 0; i < num; i++) {
            if (deck.length == 0) {
                discardToDeck();
            }
            if (yourHand.length < 10) {
                yourHand[yourHand.length] = deck[0];
                deck.splice(0, 1);
            }
        }
    }
    else {
        for (var i = 0; i < num; i++) {
            if (deck.length == 0) {
                discardToDeck();
            }
            if (enemyHand.length < 10) {
                enemyHand[enemyHand.length] = deck[0];
                deck.splice(0, 1);
            }
        }
    }
}
*/

/**
 * Card class: each card has the following (There are 70 unique cards in the game)
 * @param cardName
 * @param cardStrength
 * @param cardImageSrc
 * @param cardType
 * @param method
 * @constructor
 */
/*function Card(cardName, cardStrength, cardImageSrc, cardType, method) {
	this.name = cardName;
	this.strength = cardStrength;
	this.img = new Image();
	this.img.src = cardImageSrc;
	this.type = cardType;

    //(x1, y1) is upper right coordinate of card location (in pixels)
    //(x2, y2) is lower left coordinate of card location
    //(a1, b1) is where the "saved coordinates" (previous coordinates when card moves) (upper right)
    //(a2, b2) is lower left of previous location (saved coordinates)

	this.x1 = null;
	this.x2 = null;
	this.y1 = null;
	this.y2 = null;
	this.a1 = null;
	this.b1 = null;
	this.a2 = null;
	this.b2 = null;
    //all card types have unique ability:
	this.action = function(player) {method(player);};
	//getters and setters:
	this.getName = function getName() {return this.name;};
	this.getStrength = function() {return this.strength;};
	this.getImage = function() {return this.img;};
	this.getType = function() {return this.type;};
	this.setCoord = function(x1, y1, x2, y2) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	};
    this.saveCoord = function() {
        this.a1 = this.x1;
        this.b1 = this.y1;
        this.a2 = this.x2;
        this.b2 = this.y2;
    };
	this.otherFunction = function(stuff) {printMessage(stuff)}; //shouldn't be necessary anymore
	this.toString = function() {
		return this.name + " with strength " + this.strength;
	};
}
*/

/**
 * Randomizes passed in array of cards
 * @param cards
 */
/*function shuffle(cards) {

    //   for each card in array:
    //        swap card with random card in array

	for (var i = 0; i < cards.length; i++) {
		var randomIndex = Math.floor(Math.random()*cards.length),
		tempCard = cards[i];
		cards[i] = cards[randomIndex];
		cards[randomIndex] = tempCard;
	}
}
*/

/**
 * Shuffles the discard pile and copies it into the deck array
 * Used when deck is empty
 */
/*function discardToDeck() {
	shuffle(discardPile);
	deck.push.apply(deck, discardPile);
}
*/



var backCards;
var animating = false,
    clicked = false,
    clickedCard = null,
    clickedCanvas = null,
    img = new Image();

img.src = 'images/back13.jpg';
var back = new Card("back", 0, "images/back-1.png", "null", function(){});

//methods for the card types:

/*
var black = function(player) {
    alert(player);
},
blue = function(player) {
    alert(player);
},
brass = function(player) {
    alert(player);
},
bronze = function(player) {
    alert(player);
},
copper = function(player) {
    alert(player);
},
gold = function(player) {
    alert(player);
},
green = function(player) {
    alert(player);
},
red = function(player) {
    alert(player);
},
silver = function(player) {
    alert(player);
},
white = function(player) {
    alert(player);
};
*/

//var deck = new Array(70);

/*
var archmage = new Card("Archmage", 9, "images/archmage.png", "mortal", function (player) {alert(player);});
var bahamut = new Card("Bahamut", 13, "images/bahamut.png", "good", function (player) {alert(player);});
var dracolich = new Card("Dracolich", 10, "images/dracolich.png", "evil", function (player) {alert(player);});
var dragonslayer = new Card("Dragonslayer", 8, "images/dragonslayer.png", "mortal", function (player) {alert(player);});
var druid = new Card("Druid", 6, "images/druid.png", "mortal", function (player) {alert(player);});
var fool = new Card("Fool", 3, "images/fool.png", "mortal", function (player) {alert(player);});
var priest = new Card("Priest", 5, "images/priest.png", "mortal", function (player) {alert(player);});
var princess = new Card("Princess", 4, "images/princess.png", "mortal", function (player) {alert(player);});
var thief = new Card("Thief", 7, "images/thief.png", "mortal", function (player) {alert(player);});
var tiamat = new Card("Tiamat", 13, "images/tiamat.png", "evil", function (player) {alert(player);});

var black1 = new Card("a Black Dragon", 1, "images/black1.png", "evil", function (player) {alert(player);});
var black2 = new Card("a Black Dragon", 2, "images/black2.png", "evil", function (player) {alert(player);});
var black3 = new Card("a Black Dragon", 3, "images/black3.png", "evil", function (player) {alert(player);});
var black5 = new Card("a Black Dragon", 5, "images/black5.png", "evil", function (player) {alert(player);});
var black7 = new Card("a Black Dragon", 7, "images/black7.png", "evil", function (player) {alert(player);});
var black9 = new Card("a Black Dragon", 9, "images/black9.png", "evil", function (player) {alert(player);});

var blue1 = new Card("a Blue Dragon", 1, "images/blue1.png", "evil", function (player) {alert(player);});
var blue2 = new Card("a Blue Dragon", 2, "images/blue2.png", "evil", function (player) {alert(player);});
var blue4 = new Card("a Blue Dragon", 4, "images/blue4.png", "evil", function (player) {alert(player);});
var blue7 = new Card("a Blue Dragon", 7, "images/blue7.png", "evil", function (player) {alert(player);});
var blue9 = new Card("a Blue Dragon", 9, "images/blue9.png", "evil", function (player) {alert(player);});
var blue11 = new Card("a Blue Dragon", 11, "images/blue11.png", "evil", function (player) {alert(player);});

var brass1 = new Card("a Brass Dragon", 1, "images/brass1.png", "good", function (player) {alert(player);});
var brass2 = new Card("a Brass Dragon", 2, "images/brass2.png", "good", function (player) {alert(player);});
var brass4 = new Card("a Brass Dragon", 4, "images/brass4.png", "good", function (player) {alert(player);});
var brass5 = new Card("a Brass Dragon", 5, "images/brass5.png", "good", function (player) {alert(player);});
var brass7 = new Card("a Brass Dragon", 7, "images/brass7.png", "good", function (player) {alert(player);});
var brass9 = new Card("a Brass Dragon", 9, "images/brass9.png", "good", function (player) {alert(player);});

var bronze1 = new Card("a Bronze Dragon", 1, "images/bronze1.png", "good", function (player) {alert(player);});
var bronze3 = new Card("a Bronze Dragon", 3, "images/bronze3.png", "good", function (player) {alert(player);});
var bronze6 = new Card("a Bronze Dragon", 6, "images/bronze6.png", "good", function (player) {alert(player);});
var bronze7 = new Card("a Bronze Dragon", 7, "images/bronze7.png", "good", function (player) {alert(player);});
var bronze9 = new Card("a Bronze Dragon", 9, "images/bronze9.png", "good", function (player) {alert(player);});
var bronze11 = new Card("a Bronze Dragon", 11, "images/bronze11.png", "good", function (player) {alert(player);});

var copper1 = new Card("a Copper Dragon", 1, "images/copper1.png", "good", function (player) {alert(player);});
var copper3 = new Card("a Copper Dragon", 3, "images/copper3.png", "good", function (player) {alert(player);});
var copper5 = new Card("a Copper Dragon", 5, "images/copper5.png", "good", function (player) {alert(player);});
var copper7 = new Card("a Copper Dragon", 7, "images/copper7.png", "good", function (player) {alert(player);});
var copper8 = new Card("a Copper Dragon", 8, "images/copper8.png", "good", function (player) {alert(player);});
var copper10 = new Card("a Copper Dragon", 10, "images/copper10.png", "good", function (player) {alert(player);});

var gold2 = new Card("a Gold Dragon", 2, "images/gold2.png", "good", function (player) {alert(player);});
var gold4 = new Card("a Gold Dragon", 4, "images/gold4.png", "good", function (player) {alert(player);});
var gold6 = new Card("a Gold Dragon", 6, "images/gold6.png", "good", function (player) {alert(player);});
var gold9 = new Card("a Gold Dragon", 9, "images/gold9.png", "good", function (player) {alert(player);});
var gold11 = new Card("a Gold Dragon", 11, "images/gold11.png", "good", function (player) {alert(player);});
var gold13 = new Card("a Gold Dragon", 13, "images/gold13.png", "good", function (player) {alert(player);});

var green1 = new Card("a Green Dragon", 1, "images/green1.png", "evil", function (player) {alert(player);});
var green2 = new Card("a Green Dragon", 2, "images/green2.png", "evil", function (player) {alert(player);});
var green4 = new Card("a Green Dragon", 4, "images/green4.png", "evil", function (player) {alert(player);});
var green6 = new Card("a Green Dragon", 6, "images/green6.png", "evil", function (player) {alert(player);});
var green8 = new Card("a Green Dragon", 8, "images/green8.png", "evil", function (player) {alert(player);});
var green10 = new Card("a Green Dragon", 10, "images/green10.png", "evil", function (player) {alert(player);});

var red2 = new Card("a Red Dragon", 2, "images/red2.png", "evil", function (player) {alert(player);});
var red3 = new Card("a Red Dragon", 3, "images/red3.png", "evil", function (player) {alert(player);});
var red5 = new Card("a Red Dragon", 5, "images/red5.png", "evil", function (player) {alert(player);});
var red8 = new Card("a Red Dragon", 8, "images/red8.png", "evil", function (player) {alert(player);});
var red10 = new Card("a Red Dragon", 10, "images/red10.png", "evil", function (player) {alert(player);});
var red12 = new Card("a Red Dragon", 12, "images/red12.png", "evil", function (player) {alert(player);});

var silver2 = new Card("a Silver Dragon", 2, "images/silver2.png", "good", function (player) {alert(player);});
var silver3 = new Card("a Silver Dragon", 3, "images/silver3.png", "good", function (player) {alert(player);});
var silver6 = new Card("a Silver Dragon", 6, "images/silver6.png", "good", function (player) {alert(player);});
var silver8 = new Card("a Silver Dragon", 8, "images/silver8.png", "good", function (player) {alert(player);});
var silver10 = new Card("a Silver Dragon", 10, "images/silver10.png", "good", function (player) {alert(player);});
var silver12 = new Card("a Silver Dragon", 12, "images/silver12.png", "good", function (player) {alert(player);});

var white1 = new Card("a White Dragon", 1, "images/white1.png", "evil", function (player) {alert(player);});
var white2 = new Card("a White Dragon", 2, "images/white2.png", "evil", function (player) {alert(player);});
var white3 = new Card("a White Dragon", 3, "images/white3.png", "evil", function (player) {alert(player);});
var white4 = new Card("a White Dragon", 4, "images/white4.png", "evil", function (player) {alert(player);});
var white6 = new Card("a White Dragon", 6, "images/white6.png", "evil", function (player) {alert(player);});
var white8 = new Card("a White Dragon", 8, "images/white8.png", "evil", function (player) {alert(player);});

var deck = [archmage, bahamut, dracolich, dragonslayer, druid, fool, priest, princess, thief, tiamat, black1, black2, black3, black5, black7, black9,
	blue1, blue2, blue4, blue7, blue9, blue11, brass1, brass2, brass4, brass5, brass7, brass9, bronze1, bronze3, bronze6, bronze7, bronze9, bronze11,
	copper1, copper3, copper5, copper7, copper8, copper10, gold2, gold4, gold6, gold9, gold11, gold13, green1, green2, green4, green6, green8, green10,
	red2, red3, red5, red8, red10, red12, silver2, silver3, silver6, silver8, silver10, silver12, white1, white2, white3, white4, white6, white8];
*/
/*
var enemyHand = [],
    yourHand = [],
    enemyFlight = [],
    yourFlight = [],
    ante = [],
    discardPile = [];
*/
/*
var cardSelectEnum = {
    NONE : "none",
    ANTE : "ante",
    FLIGHT : "flight"
};
*/

/*
function resetGame() {
    deck = [
        new Card("Archmage", 9, "images/archmage.png", "mortal", function(player) {
            alert(player);
        }),
        new Card("Bahamut", 13, "images/bahamut.png", "good", function(player) {
            alert(player);
        }),
        new Card("Dracolich", 10, "images/dracolich.png", "evil", function(player) {
            alert(player);
        }),
        new Card("Dragonslayer", 8, "images/dragonslayer.png", "mortal", function(player) {
            alert(player);
        }),
        new Card("Druid", 6, "images/druid.png", "mortal", function(player) {
            alert(player);
        }),
        new Card("Fool", 3, "images/fool.png", "mortal", function(player) {
            alert(player);
        }),
        new Card("Priest", 5, "images/priest.png", "mortal", function(player) {
            alert(player);
        }),
        new Card("Princess", 4, "images/princess.png", "mortal", function(player) {
            alert(player);
        }),
        new Card("Thief", 7, "images/thief.png", "mortal", function(player) {
            alert(player);
        }),
        new Card("Tiamat", 13, "images/tiamat.png", "evil", function(player) {
            alert(player);
        }),
        new Card("a Black Dragon", 1, "images/black1.png", "evil", black),
        new Card("a Black Dragon", 2, "images/black2.png", "evil", black),
        new Card("a Black Dragon", 3, "images/black3.png", "evil", black),
        new Card("a Black Dragon", 5, "images/black5.png", "evil", black),
        new Card("a Black Dragon", 7, "images/black7.png", "evil", black),
        new Card("a Black Dragon", 9, "images/black9.png", "evil", black),
        new Card("a Blue Dragon", 1, "images/blue1.png", "evil", blue),
        new Card("a Blue Dragon", 2, "images/blue2.png", "evil", blue),
        new Card("a Blue Dragon", 4, "images/blue4.png", "evil", blue),
        new Card("a Blue Dragon", 7, "images/blue7.png", "evil", blue),
        new Card("a Blue Dragon", 9, "images/blue9.png", "evil", blue),
        new Card("a Blue Dragon", 11, "images/blue11.png", "evil", blue),
        new Card("a Brass Dragon", 1, "images/brass1.png", "good", brass),
        new Card("a Brass Dragon", 2, "images/brass2.png", "good", brass),
        new Card("a Brass Dragon", 4, "images/brass4.png", "good", brass),
        new Card("a Brass Dragon", 5, "images/brass5.png", "good", brass),
        new Card("a Brass Dragon", 7, "images/brass7.png", "good", brass),
        new Card("a Brass Dragon", 9, "images/brass9.png", "good", brass),
        new Card("a Bronze Dragon", 1, "images/bronze1.png", "good", bronze),
        new Card("a Bronze Dragon", 3, "images/bronze3.png", "good", bronze),
        new Card("a Bronze Dragon", 6, "images/bronze6.png", "good", bronze),
        new Card("a Bronze Dragon", 7, "images/bronze7.png", "good", bronze),
        new Card("a Bronze Dragon", 9, "images/bronze9.png", "good", bronze),
        new Card("a Bronze Dragon", 11, "images/bronze11.png", "good", bronze),
        new Card("a Copper Dragon", 1, "images/copper1.png", "good", copper),
        new Card("a Copper Dragon", 3, "images/copper3.png", "good", copper),
        new Card("a Copper Dragon", 5, "images/copper5.png", "good", copper),
        new Card("a Copper Dragon", 7, "images/copper7.png", "good", copper),
        new Card("a Copper Dragon", 8, "images/copper8.png", "good", copper),
        new Card("a Copper Dragon", 10, "images/copper10.png", "good", copper),
        new Card("a Gold Dragon", 2, "images/gold2.png", "good", gold),
        new Card("a Gold Dragon", 4, "images/gold4.png", "good", gold),
        new Card("a Gold Dragon", 6, "images/gold6.png", "good", gold),
        new Card("a Gold Dragon", 9, "images/gold9.png", "good", gold),
        new Card("a Gold Dragon", 11, "images/gold11.png", "good", gold),
        new Card("a Gold Dragon", 13, "images/gold13.png", "good", gold),
        new Card("a Green Dragon", 1, "images/green1.png", "evil", green),
        new Card("a Green Dragon", 2, "images/green2.png", "evil", green),
        new Card("a Green Dragon", 4, "images/green4.png", "evil", green),
        new Card("a Green Dragon", 6, "images/green6.png", "evil", green),
        new Card("a Green Dragon", 8, "images/green8.png", "evil", green),
        new Card("a Green Dragon", 10, "images/green10.png", "evil", green),
        new Card("a Red Dragon", 2, "images/red2.png", "evil", red),
        new Card("a Red Dragon", 3, "images/red3.png", "evil", red),
        new Card("a Red Dragon", 5, "images/red5.png", "evil", red),
        new Card("a Red Dragon", 8, "images/red8.png", "evil", red),
        new Card("a Red Dragon", 10, "images/red10.png", "evil", red),
        new Card("a Red Dragon", 12, "images/red12.png", "evil", red),
        new Card("a Silver Dragon", 2, "images/silver2.png", "good", silver),
        new Card("a Silver Dragon", 3, "images/silver3.png", "good", silver),
        new Card("a Silver Dragon", 6, "images/silver6.png", "good", silver),
        new Card("a Silver Dragon", 8, "images/silver8.png", "good", silver),
        new Card("a Silver Dragon", 10, "images/silver10.png", "good", silver),
        new Card("a Silver Dragon", 12, "images/silver12.png", "good", silver),
        new Card("a White Dragon", 1, "images/white1.png", "evil", white),
        new Card("a White Dragon", 2, "images/white2.png", "evil", white),
        new Card("a White Dragon", 3, "images/white3.png", "evil", white),
        new Card("a White Dragon", 4, "images/white4.png", "evil", white),
        new Card("a White Dragon", 6, "images/white6.png", "evil", white),
        new Card("a White Dragon", 8, "images/white8.png", "evil", white)
    ];
    enemyHand = [];
    yourHand = [];
    enemyFlight = [];
    yourFlight = [];
    ante = [];
    discardPile = [];
}
*/

//var cardSelect = cardSelectEnum.NONE;

//var selectedCard = null;
//var selectedCanvas = null;


function Card(cardName, cardStrength, uniqueBool) {
    this.name = cardName;
    this.strength = cardStrength;
    this.img = new Image();
    this.img.src = (uniqueBool) ? ("images/" + this.name.toLowerCase() + ".png") : ("images/" + this.name.toLowerCase() + cardStrength + ".png");
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
    this.setCoord = function(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    };
    this.saveCoord = function() {
        this.a1 = this.x1;
        this.b1 = this.y1;
        this.a2 = this.x2;
        this.b2 = this.y2;
    };
    this.toString = function() {
        if (this.type == "mortal" || this.name == "Bahamut" || this.name == "Dracolich" ||this.name == "Tiamat") {
            return "the" + this.name + " with strength " + this.strength;
        } else {
            return "a " + this.name + "Dragon with strength " + this.strength;
        }
    };
}


/**
 * Starts the game
 */


function start() {
/*
	//$('textarea').hide();
	//var canvas = $('#mainCanvas');


    //resetGame();
    //shuffle(deck);
    //drawCards(1, 7);
    //drawCards(2, 7);


	var ctx = document.getElementById('mainCanvas').getContext('2d'),
	    cardWidth = window.innerWidth * .0727,
        cardHeight = window.innerHeight / 4.15;

	ctx.canvas.width  = window.innerWidth * .8;
    ctx.canvas.height = window.innerHeight;
	ctx.fillStyle = ctx.createPattern(img,"repeat");
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.drawImage(back.getImage(), 1.7*cardWidth, 1.25*cardHeight, cardWidth, cardHeight);

	var y = 3*cardHeight;
	for (var i=0; i<7; i++) {
		var x = ((i+1)*ctx.canvas.width)/8-cardWidth/2;
		yourHand[i].setCoord(1.7*cardWidth, 1.25*cardHeight, 1.7*cardWidth+cardWidth, 1.25*cardHeight+cardHeight);
		yourHand[i].saveCoord();
		yourHand[i].setCoord(x, y, x+cardWidth, y+cardHeight);
	}

	backCards = [-.5*cardHeight, 1.7*cardWidth, 1.25*cardHeight, 1.7*cardWidth+cardWidth, 1.25*cardHeight+cardHeight, cardWidth, cardHeight, ctx];

	y = -.5* cardHeight;
	for (var i=0; i<7; i++) {

		backCards.push(((i+1)*ctx.canvas.width)/8-cardWidth/2); //x

		back.setCoord(1.7*cardWidth, 1.25*cardHeight, 1.7*cardWidth+cardWidth, 1.25*cardHeight+cardHeight);
		back.saveCoord();
		back.setCoord(x, y, x+cardWidth, y+cardHeight);
	}

	// 7 cards being dealt animation:
	moveCard(yourHand[0], "yourHand0", 4, .5, function(){
		back.setCoord(backCards[1], backCards[2], backCards[3], backCards[4]);
		back.saveCoord();
		back.setCoord(backCards[8], backCards[0], backCards[8] + backCards[5], backCards[0] + backCards[6]);
		moveCard(back, "backCanvas", 4, .5, function() {
			document.getElementById("mainCanvas").getContext('2d').drawImage(back.getImage(), backCards[8], backCards[0], backCards[5], backCards[6]);
			moveCard(yourHand[1], "yourHand1", 4, .5, function(){
				back.setCoord(backCards[1], backCards[2], backCards[3], backCards[4]);
				back.saveCoord();
				back.setCoord(backCards[9], backCards[0], backCards[9] + backCards[5], backCards[0] + backCards[6]);
				moveCard(back, "backCanvas", 4, .5, function() {
					backCards[7].drawImage(back.getImage(), backCards[9], backCards[0], backCards[5], backCards[6]);
					moveCard(yourHand[2], "yourHand2", 4, .5, function(){
						back.setCoord(backCards[1], backCards[2], backCards[3], backCards[4]);
						back.saveCoord();
						back.setCoord(backCards[10], backCards[0], backCards[10] + backCards[5], backCards[0] + backCards[6]);
						moveCard(back, "backCanvas", 4, .5, function() {
							backCards[7].drawImage(back.getImage(), backCards[10], backCards[0], backCards[5], backCards[6]);
							moveCard(yourHand[3], "yourHand3", 4, .5, function(){
								back.setCoord(backCards[1], backCards[2], backCards[3], backCards[4]);
								back.saveCoord();
								back.setCoord(backCards[11], backCards[0], backCards[11] + backCards[5], backCards[0] + backCards[6]);
								moveCard(back, "backCanvas", 4, .5, function() {
									backCards[7].drawImage(back.getImage(), backCards[11], backCards[0], backCards[5], backCards[6]);
									moveCard(yourHand[4], "yourHand4", 4, .5, function(){
										back.setCoord(backCards[1], backCards[2], backCards[3], backCards[4]);
										back.saveCoord();
										back.setCoord(backCards[12], backCards[0], backCards[12] + backCards[5], backCards[0] + backCards[6]);
										moveCard(back, "backCanvas", 4, .5, function() {
											backCards[7].drawImage(back.getImage(), backCards[12], backCards[0], backCards[5], backCards[6]);
											moveCard(yourHand[5], "yourHand5", 4, .5, function(){
												back.setCoord(backCards[1], backCards[2], backCards[3], backCards[4]);
												back.saveCoord();
												back.setCoord(backCards[13], backCards[0], backCards[13] + backCards[5], backCards[0] + backCards[6]);
												moveCard(back, "backCanvas", 4, .5, function() {
													backCards[7].drawImage(back.getImage(), backCards[13], backCards[0], backCards[5],backCards[6]);
													moveCard(yourHand[6], "yourHand6", 4, .5, function(){
														back.setCoord(backCards[1], backCards[2], backCards[3], backCards[4]);
														back.saveCoord();
														back.setCoord(backCards[14], backCards[0], backCards[14] + backCards[5], backCards[0] + backCards[6]);
														moveCard(back, "backCanvas", 4, .5, function() {
															backCards[7].drawImage(back.getImage(), backCards[14], backCards[0], backCards[5], backCards[6]);
															removeCanvas("backCanvas");
															draw();
															startRound();
														});
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});
*/
}

//happens on document resize
function draw() {
	clickedCard = null;
	clickedCanvas = null;
	clicked = false;
	animating = false;
	var canvas = document.getElementById("mainCanvas"),
	    ctx = canvas.getContext("2d");
	//var canvasWidth = window.innerWidth * .8;
	//var canvasHeight = window.innerHeight;
	var cardWidth = window.innerWidth * .0727,
        cardHeight = window.innerHeight / 4.15;
    //var outsideX = Math.round(-cardWidth-10);

	ctx.canvas.width  = window.innerWidth * .8;
    ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, window.innerWidth * .8, window.innerHeight);
	ctx.fillStyle = ctx.createPattern(img,"repeat");
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	if (discardPile.length > 0) {
        ctx.drawImage(discardPile[discardPile.length - 1].getImage(), .3 * cardWidth, 1.25 * cardHeight, cardWidth, cardHeight);
    }

	ctx.drawImage(back.getImage(), 1.7*cardWidth, 1.25*cardHeight, cardWidth, cardHeight);
	if (ante.length > 0) {
        ctx.drawImage(ante[ante.length - 1].getImage(), 3.2 * cardWidth, 1.25 * cardHeight, cardWidth, cardHeight);
    }

    //turn the following 4 methods into methods in the player class

	//5.5*cardWidth-10.5*cardWidth
	drawEnemyHand();
	drawYourHand();
	drawYourFlight();
	drawEnemyFlight();

	function drawEnemyHand() {
		var y = -.5* cardHeight;
		for (var i=0; i<enemyHand.length; i++) {
			var x = ((i+1)*window.innerWidth * .8)/(enemyHand.length+1)-cardWidth/2;
			ctx.drawImage(back.getImage(), x, y, cardWidth, cardHeight);
		}
	}
	//-.5-.5, .7-1.7, 1.8-2.8, 3-4
	function drawYourHand() {
		var y = 3*cardHeight;
		for (var i=0; i<yourHand.length; i++) {
			var x = ((i+1)*window.innerWidth*.8)/(yourHand.length+1)-cardWidth/2;
			var cardCanvas = document.getElementById("yourHand" + i.toString());
			cardCanvas.className = "";
			ctx = cardCanvas.getContext('2d');
			ctx.canvas.width = cardWidth;
			ctx.canvas.height = cardHeight;
			cardCanvas.style.left = x+"px";
			cardCanvas.style.top = y+"px";
			ctx.drawImage(yourHand[i].getImage(), 0, 0, ctx.canvas.width, ctx.canvas.height);
			yourHand[i].setCoord(x, y, x+cardWidth, y+cardHeight);
		}
	}

	function drawEnemyFlight() {
		var y = .7*cardHeight;
		var num = (enemyFlight.length>yourFlight.length) ? enemyFlight.length : yourFlight.length;
		for (var i=0; i<enemyFlight.length; i++) {
		    var x = (num < 4) ? cardWidth*(5.5+i*6.3/(3)-i/(3)) : cardWidth*(4.5+i*6.3/(num-1)-i/(num-1));
			var cardCanvas = document.getElementById("enemyFlight" + i.toString());
			cardCanvas.className = "";
			ctx = cardCanvas.getContext('2d');
			ctx.canvas.width = cardWidth;
			ctx.canvas.height = cardHeight;
			cardCanvas.style.left = x.toString()+"px";
			cardCanvas.style.top = y.toString()+"px";
			ctx.drawImage(enemyFlight[i].getImage(), 0, 0, ctx.canvas.width, ctx.canvas.height);
			enemyFlight[i].setCoord(x, y, x+cardWidth, y+cardHeight);
		}
	}

	function drawYourFlight() {
		var y = 1.8*cardHeight;
		var num = (enemyFlight.length>yourFlight.length) ? enemyFlight.length : yourFlight.length;
		for (var i=0; i<yourFlight.length; i++) {
		    var x = (num < 4) ? cardWidth*(5.5+i*6.3/(3)-i/(3)) : cardWidth*(4.5+i*6.3/(num-1)-i/(num-1));
			var cardCanvas = document.getElementById("yourFlight" + i.toString());
			cardCanvas.className = "";
			ctx = cardCanvas.getContext('2d');
			ctx.canvas.width = cardWidth;
			ctx.canvas.height = cardHeight;
			cardCanvas.style.left = x.toString()+"px";
			cardCanvas.style.top = y.toString()+"px";
			ctx.drawImage(yourFlight[i].getImage(), 0, 0, ctx.canvas.width, ctx.canvas.height);
			yourFlight[i].setCoord(x, y, x+cardWidth, y+cardHeight);
		}
	}
}

function unselectCard(callback) {
	var canvas = document.getElementById(clickedCanvas);
	var ctx = canvas.getContext('2d');
	//clickedCard.otherFunction(e.clientX + " - " + e.clientY);
	//clickedCard.saveCoord();
	var pos = 0;
	var cardWidth = window.innerWidth*.0727;
	var cardHeight = window.innerHeight/4.15;
	var bigCardWidth = window.innerWidth*.3;
	var bigCardHeight = window.innerHeight/1.1;
	var bigX = (window.innerWidth*.8-bigCardWidth)/2;
	var bigY = (window.innerHeight-bigCardHeight)/2;
	animating = true;
	var id = setInterval(frame, 1);
	function frame() {
		if (pos == 75) {
			clearInterval(id);
			animating = false;
			canvas.className = "";
			clicked = false;
			clickedCard = null;
			clickedCanvas = null;
			callback();
		} else {
			pos++;
			var frac = pos/75;
			canvas.style.top = bigY + (clickedCard.y1 - bigY)*frac + 'px';
			canvas.style.left = bigX + (clickedCard.x1 - bigX)*frac + 'px';
			ctx.canvas.width = bigCardWidth + (cardWidth - bigCardWidth) * frac;
			ctx.canvas.height = bigCardHeight + (cardHeight - bigCardHeight) * frac;
			ctx.drawImage(clickedCard.getImage(), 0, 0, ctx.canvas.width, ctx.canvas.height);
		}
	}
}

function startRound() {
    printMessage("Select a card to put in the Ante.");
    cardSelect = cardSelectEnum.ANTE;
}

$(document).ready(function() {
	$('#chat-name').select();
	document.getElementById("mainCanvas").addEventListener('click', function(e) {
		if (!animating && clickedCard != null) {
			//card not selected
			unselectCard(function(){});
		}
	});

	for (var i = 0; i < 10; i++) {
		if (i < 6){
			(function(i){
				document.getElementById("enemyFlight" + i.toString()).addEventListener('click', function(e) {
					if (animating == false && enemyFlight.length > i) {
                        if (!clicked){
                            clicked = true;
                            clickedCard = enemyFlight[i];
                            clickedCanvas = "enemyFlight" + i.toString();
                            var canvas = document.getElementById(clickedCanvas);
                            var ctx = canvas.getContext('2d');
                            canvas.className = "clicked";
                            enemyFlight[i].otherFunction(e.clientX + " - " + e.clientY);
                            enemyFlight[i].saveCoord();
                            var pos = 0;
                            var cardWidth = window.innerWidth*.0727;
                            var cardHeight = window.innerHeight/4.15;
                            var bigCardWidth = window.innerWidth*.3;
                            var bigCardHeight = window.innerHeight/1.1;
                            var bigX = (window.innerWidth*.8-bigCardWidth)/2;
                            var bigY = (window.innerHeight-bigCardHeight)/2;
                            animating = true;
                            var id = setInterval(frame, 1);
                            function frame() {
                                if (pos == 75) {
                                    clearInterval(id);
                                    animating = false;
                                } else {
                                    pos++;
                                    var frac = pos/75;
                                    canvas.style.top = enemyFlight[i].y1 + (bigY - enemyFlight[i].y1)*frac + 'px';
                                    canvas.style.left = enemyFlight[i].x1 + (bigX - enemyFlight[i].x1)*frac + 'px';
                                    ctx.canvas.width = cardWidth + (bigCardWidth - cardWidth) * frac;
                                    ctx.canvas.height = cardHeight + (bigCardHeight - cardHeight) * frac;
                                    ctx.drawImage(enemyFlight[i].getImage(), 0, 0, ctx.canvas.width, ctx.canvas.height);
                                }
                            }
                        }
                        else {
                            //selected
                            unselectCard(function(){});
                        }
					}
				});
			})(i);
			(function(i){
				document.getElementById("yourFlight" + i.toString()).addEventListener('click', function(e) {
					if (animating == false) {
						if (yourFlight.length > i) {
							if (!clicked){
								clicked = true;
								clickedCard = yourFlight[i];
								clickedCanvas = "yourFlight" + i.toString();
								var canvas = document.getElementById(clickedCanvas);
								var ctx = canvas.getContext('2d');
								canvas.className = "clicked";
								yourFlight[i].otherFunction(e.clientX + " - " + e.clientY);
								yourFlight[i].saveCoord();
								var pos = 0;
								var cardWidth = window.innerWidth*.0727;
								var cardHeight = window.innerHeight/4.15;
								var bigCardWidth = window.innerWidth*.3;
								var bigCardHeight = window.innerHeight/1.1;
								var bigX = (window.innerWidth*.8-bigCardWidth)/2;
								var bigY = (window.innerHeight-bigCardHeight)/2;
								animating = true;
								var id = setInterval(frame, 1);
								function frame() {
									if (pos == 75) {
										clearInterval(id);
										animating = false;
									} else {
										pos++;
										var frac = pos/75;
										canvas.style.top = yourFlight[i].y1 + (bigY - yourFlight[i].y1)*frac + 'px';
										canvas.style.left = yourFlight[i].x1 + (bigX - yourFlight[i].x1)*frac + 'px';
										ctx.canvas.width = cardWidth + (bigCardWidth - cardWidth) * frac;
										ctx.canvas.height = cardHeight + (bigCardHeight - cardHeight) * frac;
										ctx.drawImage(yourFlight[i].getImage(), 0, 0, ctx.canvas.width, ctx.canvas.height);
									}
								}
							}
							else {
								//selected
								unselectCard(function(){});
							}
						}
					}
				});
			})(i);
		}
		(function(i){
			document.getElementById("yourHand" + i.toString()).addEventListener('click', function(e) {
				if (animating == false) {
					if (yourHand.length > i) {
						if (!clicked){
							clicked = true;
							clickedCard = yourHand[i];
							clickedCanvas = "yourHand" + i.toString();
							var canvas = document.getElementById(clickedCanvas);
							var ctx = canvas.getContext('2d');
							canvas.className = "clicked";
							//yourHand[i].otherFunction(e.clientX + " - " + e.clientY);
							yourHand[i].saveCoord();
							var pos = 0;
							var cardWidth = window.innerWidth*.0727;
							var cardHeight = window.innerHeight/4.15;
							var bigCardWidth = window.innerWidth*.3;
							var bigCardHeight = window.innerHeight/1.1;
							var bigX = (window.innerWidth*.8-bigCardWidth)/2;
							var bigY = (window.innerHeight-bigCardHeight)/2;
							animating = true;
							var id = setInterval(frame, 1);
							function frame() {
								if (pos == 75) {
									clearInterval(id);
									animating = false;
								} else {
									pos++;
									var frac = pos/75;
									canvas.style.top = yourHand[i].y1 + (bigY - yourHand[i].y1)*frac + 'px';
									canvas.style.left = yourHand[i].x1 + (bigX - yourHand[i].x1)*frac + 'px';
									ctx.canvas.width = cardWidth + (bigCardWidth - cardWidth) * frac;
									ctx.canvas.height = cardHeight + (bigCardHeight - cardHeight) * frac;
									ctx.drawImage(yourHand[i].getImage(), 0, 0, ctx.canvas.width, ctx.canvas.height);
								}
							}
						}
						else {
							if (cardSelect == cardSelectEnum.NONE){
								unselectCard(function(){});
							}
							else if (cardSelect == cardSelectEnum.FLIGHT) {
								unselectCard(function(){});
							}
							else if (cardSelect == cardSelectEnum.ANTE) {
								//printMessage("You selected " + clickedCard.getName() + " with strength " + clickedCard.getStrength());
								var message = "You selected " + clickedCard.getName() + " with strength " + clickedCard.getStrength();
								cardSelect = cardSelectEnum.NONE;
								clickedCard.saveCoord();
								var endX = 3.2*window.innerWidth*.0727;
								var endY = 1.8*window.innerHeight/4.15;
								clickedCard.setCoord(endX, endY, endX+window.innerWidth*.0727, endY+window.innerHeight/4.15);
								var cardIndex = enemyPickCard();
								var card = enemyHand[cardIndex];
								endY = .7*window.innerHeight/4.15;
								card.setCoord((cardIndex+1)*(window.innerWidth * .8)/(enemyHand.length+1)-cardWidth/2,-.5*cardHeight,
									(cardIndex+1)*(window.innerWidth * .8)/(enemyHand.length+1)-cardWidth/2+window.innerWidth*.0727,
									-.5*cardHeight+window.innerHeight/4.15);
								card.saveCoord();
								card.setCoord(endX, endY, endX+window.innerWidth*.0727, endY+window.innerHeight/4.15);
								//alert(card.a1+""+card.b1+""+card.x1+""+card.y1+"");
								//moveCard(card, "enemyHand"+cardIndex, 4, .5, callbackfunction(){});
								unselectCard(function(){
									printMessage(message);
								});
							}
						}
					}
				}
			});
		})(i);
	}
});

//won't be necessary for long
function enemyPickCard() {
	if (enemyHand.length == 0)
		return null;
	return Math.floor(Math.random()*enemyHand.length);
}

var id;

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

function printMessage(message) {
	var highlights = document.getElementsByClassName("highlight");
	if (highlights.length!=0){
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

document.addEventListener('click', function(e) {
	if($('#chat-name').val() == "") {
		$("#chat-name").select();
	} else {
		$("#textArea").select();
	}
});

var playerId = "";
var enemyId = "";
var enemyName = "";
var nameOfPlayer = "";

function moveCard(card, cardCanvas, speed, growFactor, callback) {
    var canvas = document.getElementById(cardCanvas);
    var ctx = canvas.getContext('2d');
    var pos = 0;
    //center = c
    cx1 = (card.a1 + card.a2) / 2;
    cy1 = (card.b1 + card.b2) / 2;
    cx2 = (card.x1 + card.x2) / 2;
    cy2 = (card.y1 + card.y2) / 2;
    var cardWidth = window.innerWidth*.0727;
    var cardHeight = window.innerHeight/4.15;
    canvas.className = "clicked";
    animating = true;

    var id = setInterval(frame, speed);
    var a = growFactor / (15*(-15));
    function frame() {
        if (pos == 30) {
            ctx.canvas.width = cardWidth;
            ctx.canvas.height = cardHeight;
            canvas.style.left = card.x1 + 'px';
            canvas.style.top = card.y1 +'px';
            ctx.drawImage(card.getImage(), 0, 0, ctx.canvas.width, ctx.canvas.height);

            clearInterval(id);
            animating = false;
            canvas.className = "";
            callback();
        } else {
            pos++;
            var frac = pos/30;
            var growthFactor = a*pos*(pos-30);
            ctx.canvas.width = cardWidth + cardWidth * growthFactor;
            ctx.canvas.height = cardHeight + cardHeight * growthFactor;
            canvas.style.left = cx1 + (cx2 - cx1)*frac - ctx.canvas.width/2 + 'px';
            canvas.style.top = cy1 + (cy2 - cy1)*frac - ctx.canvas.height/2 +'px';
            ctx.drawImage(card.getImage(), 0, 0, ctx.canvas.width, ctx.canvas.height);
        }
    }
}

function removeCanvas(canvas) {
    document.getElementById(canvas).getContext('2d').canvas.width = 0;
}