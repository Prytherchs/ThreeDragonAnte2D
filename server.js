/**
 * Two players per game. This is the class for the player:
 * @param playerName
 * @param playerId
 * @constructor
 */
function Player(playerName, playerId) {
	this.name = playerName;
	this.id = playerId;
	this.hand = [];
	//this.handSize = 0;
    this.flight = [];
    //this.flightSize = 0;
	this.setName = function(name) {
		this.name = name;
	};
	this.drawCards = function(num) {
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
	    var card = this.hand[index];
		this.hand.splice(index, 1);
        return card;
	};
    this.removeCardFromFlight = function(index) {
        var card = this.flight[index];
        this.flight.splice(index, 1);
        return card;
    };
	this.addCardToHand = function(card) {
		if (this.handSize < 10) {
			this.hand[this.hand.length] = card;
			//this.handSize++;
		}
	};
	this.addCardToFlight = function(card) {
	    this.flight[this.flight.length] = card;
        //this.flightSize++;
    };
	this.cardSelectEnum = {
		NONE : 0,
		ANTE : 1,
		FLIGHT : 2
	};
}

/**
 * Card class: each card has the following (There are 70 unique cards in the game)
 * @param cardName
 * @param cardStrength
 * @param cardImageSrc
 * @param cardType
 * @param method
 * @constructor
 */
function Card(cardName, cardStrength, cardType, method) {
	this.name = cardName;
	this.strength = cardStrength;
	this.type = cardType;
	/*
	 (x1, y1) is upper right coordinate of card location (in pixels)
	 (x2, y2) is lower left coordinate of card location
	 (a1, b1) is where the "saved coordinates" (previous coordinates when card moves) (upper right)
	 (a2, b2) is lower left of previous location (saved coordinates)

	this.x1 = null;
	this.x2 = null;
	this.y1 = null;
	this.y2 = null;
	this.a1 = null;
	this.b1 = null;
	this.a2 = null;
	this.b2 = null;
	*/
	//all card types have unique ability:
	this.action = function(player) {method(player);};
	//getters and setters:
	this.getName = function getName() {return this.name;};
	this.getStrength = function() {return this.strength;};
	this.getImage = function() {return this.img;};
	this.getType = function() {return this.type;};
	/*
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

	//this.otherFunction = function(stuff) {printMessage(stuff)}; //shouldn't be necessary anymore
	this.toString = function() {
	    if (this.type == "mortal" || this.name == "Bahamut" || this.name == "Dracolich" ||this.name == "Tiamat") {
            return "the" + this.name + " with strength " + this.strength;
        } else {
            return "a " + this.name + "Dragon with strength " + this.strength;
        }
	};
	*/
}

/**
 * Randomizes passed in array of cards
 * @param cards
 */
function shuffle(cards) {
    /*
     for each card in array:
     swap card with random card in array
     */
    for (var i = 0; i < cards.length; i++) {
        var randomIndex = Math.floor(Math.random()*cards.length),
            tempCard = cards[i];
        cards[i] = cards[randomIndex];
        cards[randomIndex] = tempCard;
    }
}

/**
 * Shuffles the discard pile and copies it into the deck array
 * Used when deck is empty
 */
function discardToDeck() {
    shuffle(discardPile);
    deck.push.apply(deck, discardPile);
}

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

var deck = [],
    ante = [],
    discardPile = [];



function resetGame() {
    deck = [
        new Card("Archmage", 9, "mortal", function(player) {
            alert(player);
        }),
        new Card("Bahamut", 13, "good", function(player) {
            alert(player);
        }),
        new Card("Dracolich", 10, "evil", function(player) {
            alert(player);
        }),
        new Card("Dragonslayer", 8, "mortal", function(player) {
            alert(player);
        }),
        new Card("Druid", 6, "mortal", function(player) {
            alert(player);
        }),
        new Card("Fool", 3, "mortal", function(player) {
            alert(player);
        }),
        new Card("Priest", 5, "mortal", function(player) {
            alert(player);
        }),
        new Card("Princess", 4, "mortal", function(player) {
            alert(player);
        }),
        new Card("Thief", 7, "mortal", function(player) {
            alert(player);
        }),
        new Card("Tiamat", 13, "evil", function(player) {
            alert(player);
        }),
        new Card("Black", 1, "evil", black),
        new Card("Black", 2, "evil", black),
        new Card("Black", 3, "evil", black),
        new Card("Black", 5, "evil", black),
        new Card("Black", 7, "evil", black),
        new Card("Black", 9, "evil", black),
        new Card("Blue", 1, "evil", blue),
        new Card("Blue", 2, "evil", blue),
        new Card("Blue", 4, "evil", blue),
        new Card("Blue", 7, "evil", blue),
        new Card("Blue", 9, "evil", blue),
        new Card("Blue", 11, "evil", blue),
        new Card("Brass", 1, "good", brass),
        new Card("Brass", 2, "good", brass),
        new Card("Brass", 4, "good", brass),
        new Card("Brass", 5, "good", brass),
        new Card("Brass", 7, "good", brass),
        new Card("Brass", 9, "good", brass),
        new Card("Bronze", 1, "good", bronze),
        new Card("Bronze", 3, "good", bronze),
        new Card("Bronze", 6, "good", bronze),
        new Card("Bronze", 7, "good", bronze),
        new Card("Bronze", 9, "good", bronze),
        new Card("Bronze", 11, "good", bronze),
        new Card("Copper", 1, "good", copper),
        new Card("Copper", 3, "good", copper),
        new Card("Copper", 5, "good", copper),
        new Card("Copper", 7, "good", copper),
        new Card("Copper", 8, "good", copper),
        new Card("Copper", 10, "good", copper),
        new Card("Gold", 2, "good", gold),
        new Card("Gold", 4, "good", gold),
        new Card("Gold", 6, "good", gold),
        new Card("Gold", 9, "good", gold),
        new Card("Gold", 11, "good", gold),
        new Card("Gold", 13, "good", gold),
        new Card("Green", 1, "evil", green),
        new Card("Green", 2, "evil", green),
        new Card("Green", 4, "evil", green),
        new Card("Green", 6, "evil", green),
        new Card("Green", 8, "evil", green),
        new Card("Green", 10, "evil", green),
        new Card("Red", 2, "evil", red),
        new Card("Red", 3, "evil", red),
        new Card("Red", 5, "evil", red),
        new Card("Red", 8, "evil", red),
        new Card("Red", 10, "evil", red),
        new Card("Red", 12, "evil", red),
        new Card("Silver", 2, "good", silver),
        new Card("Silver", 3, "good", silver),
        new Card("Silver", 6, "good", silver),
        new Card("Silver", 8, "good", silver),
        new Card("Silver", 10, "good", silver),
        new Card("Silver", 12, "good", silver),
        new Card("White", 1, "evil", white),
        new Card("White", 2, "evil", white),
        new Card("White", 3, "evil", white),
        new Card("White", 4, "evil", white),
        new Card("White", 6, "evil", white),
        new Card("White", 8, "evil", white)
    ];
    enemyHand = [];
    yourHand = [];
    enemyFlight = [];
    yourFlight = [];
    ante = [];
    discardPile = [];
}

function startGame() {
    resetGame();
    shuffle(deck);
    players[0].drawCards(7);
    players[1].drawCards(7);

    //call each clients' start() function

}



















var players = new Array(2);


var mongo = require('mongodb').MongoClient,
	client = require('socket.io').listen(8080).sockets,
	playerIds = new Array(2);


mongo.connect('mongodb://127.0.0.1/chat', function(err, db){
	if (err) throw err;

	client.on('connection', function(socket) {

		var col = db.collection('messages'),
		sendToSocket = function(stream, s) {
			socket.emit(stream, s);
		},
		sendToClient = function(stream, s) {
			client.emit(stream, s);
		}


		//wait for input
		socket.on('input', function(data) {
			var playerId = data.playerId,
				name = data.name,
				message = data.message,
				whitespacePattern =  /^\s*$/;


			if (players[0] == undefined){   //if someone logs in and there's no players[0], make them that
				players[0] = new Player(name, playerId);
				sendToSocket('command', 'welcome');
				sendToSocket('status', {
					message: "Name created",
					clear: true
				});
			} else if (players[1] == undefined && players[0].id != playerId) {  //otherwise, there already is a players[0], so make players[1]
				players[1] = new Player(name, playerId);
				sendToSocket('command', 'welcome');
				sendToSocket('status', {
					message: "Name created",
					clear: true
				});
				sendToClient('onLogin', {   //when player 2 is created, send player IDs to both players/clients
					player1Id: players[0].id,
					player2Id: players[1].id,
                    player1Name: players[0].name,
                    player2Name: players[1].name
				});
				//Emit all messages
				if (players[0] != undefined){
					col.find({"playerId" : players[0].id}).limit(100).toArray(function(err, res){
						if (err) throw err;
						socket.emit('output', res);
						//}
					});
				}
			} else if (players[0].id != playerId && players[1].id != playerId) {
                sendToSocket('command', 'already2');
				sendToSocket('status', {
					message: 'Not connected',
					clear: true
				});
			} else if (whitespacePattern.test(name) || whitespacePattern.test(message)) {
				sendToSocket('status', 'Name and message is required');
			} else {
				col.insert({playerId: playerId, name: name, message: message}, function(){
					
					//emit latest message to all clients
					sendToClient('output', [data]);

					sendToSocket('status', {
						message: "Message sent",
						clear: true
					});

				});
			}
		});

	});

});