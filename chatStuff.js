(function() {
	var getNode = function(s) {
		return document.querySelector(s);
	},

	//Get required nodes
	status = getNode('.chat-status span'),
	textarea = getNode('.chat textarea'),
	chatName = getNode('.chat-name'),
	statusDefault = status.textContent,

	//console.log(statusDefault);

	setStatus = function(s) {
		//console.log(s);
		status.textContent = s;

		if(s !== statusDefault) {
			var delay = setTimeout(function() {
				setStatus(statusDefault);
				clearInterval(delay);
			}, 3000);
		}
	},

	setCommand = function(s) {
		if (s == 'welcome') {
			printMessage("Welcome to Three Dragon Ante!");
		}
	},

	setEnemyId = function(s) {
		enemyId = s;
	};

	try {
		var socket = io.connect('http://127.0.0.1:8080');
		//console.log("hello");
	} catch(e) {
		//set status to warn user
	}

	if(socket !== undefined) {
		//listen for output
		socket.on('output', function(data) {
			if(data.length) {
				//loop through results
				for(var i = 0; i < data.length; i=i+1) {
					//var message = document.createElement('div');
					//message.setAttribute('class', 'chat-message');
					//message.textContent = data[i].name + ': ' + data[i].message;
					var msg = data[i].name + ': ' + data[i].message;

					//Append
					if (data[i].playerId == playerId){
						printUserMessage(msg, "#b0321c", "#000");
					} else if (data[i].playerId == enemyId ) {
						printUserMessage(msg, "#8d6e1e", "#000");
					}
					///messages.appendChild(message);
					//messages.insertBefore(message, messages.firstChild);

				}
			}
		});

		//listen for a status
		socket.on('status', function(data){
			setStatus((typeof data === 'object') ? data.message : data);

			if(data.clear === true) {
				textarea.value = '';
			}
		});

		socket.on('command', function(s) {
			setCommand(s);
		});

		socket.on('enemyId', function(data) {
			if (playerId == data.player1Id) {
				setEnemyId(data.player2Id);
			}
			else {
				setEnemyId(data.player1Id);
			}
		});


		chatName.addEventListener('keydown', function(event) {
			if (event.which === 13) {
				$('input').hide();
				$('textarea').height(46);
				$('textarea').css('visibility', 'visible');

				nameOfPlayer = chatName.value;
				playerId = nameOfPlayer + Math.floor(1000*Math.random());

				socket.emit('input', {
					"playerId" : playerId,
					"name" : nameOfPlayer, 
					"message" : ""
				});
				$("#textArea").select();
			}

		});

		//listen for keydown
		textarea.addEventListener('keydown', function(event) {
			if (event.which === 13 && event.shiftKey === false){

				/*
				player = 2;
				if (name.toLowerCase().charCodeAt(0)%5 < 2)
					player = 1;
				*/

				socket.emit('input', {
					"playerId" : playerId,
					"name" : nameOfPlayer, 
					"message" : this.value
				});

				event.preventDefault();
			}
		});
	}

})();