
function Player(playerName, playerId) {
	this.name = playerName;
	this.id = playerId;
	this.hand = new Array(10);
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


			if (players[0] == undefined){
				players[0] = new Player(name, playerId);
				sendToSocket('command', 'welcome');
				sendToSocket('status', {
					message: "Name created",
					clear: true
				});
			} else if (players[1] == undefined && players[0].id != playerId) {
				players[1] = new Player(name, playerId);
				sendToSocket('command', 'welcome');
				sendToSocket('status', {
					message: "Name created",
					clear: true
				});
				sendToClient('enemyId', {
					player1Id: players[0].id,
					player2Id: players[1].id
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
				sendToSocket('status', {
					message: 'There are already two players',
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