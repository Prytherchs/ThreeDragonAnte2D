(function() {
	var getNode = function(s) {
		return document.querySelector(s);
	},

    id,
	//Get required nodes
	status = getNode('.chat-status span'),
	textarea = getNode('.chat textarea'),
	chatName = getNode('.chat-name'),
    body = getNode('body'),
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
	    //length = 0 because otherwise, animation and message repeated
		if (s == 'welcome' || (s=="already2" && document.getElementsByTagName("p").length == 0)) {   //user successfully logged in if they got here -some animations
            clearInterval(id);
            id = setInterval(frame, 25);
            var pos = 0;
            function frame() {
                if (pos == 60){
                    clearInterval(id);
                    $('.zeroToOne').css("opacity", "1");
                    $('.background').css("opacity", ".4");
                    $('#mainCanvas').css("border-right", "8px");
                }
                else {
                    pos++;
                    var frac1 = Math.pow(pos/60, 1.5),
                        frac2 = Math.pow(pos/110.5, 1.5);
                    $('.zeroToOne').css("opacity", frac1);
                    $('.background').css("opacity", frac2);
                }
            }
            if (s == "welcome") {
                printMessage("Welcome to Three Dragon Ante!");
            } else {
                printMessage("There are already two players");
            }
		}
	},

	setEnemyInfo = function(id, name) {
		enemyId = id;
        enemyName = name;
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

		socket.on('onLogin', function(data) {   //when both players are logged in
			if (playerId == data.player1Id) {
				setEnemyInfo(data.player2Id, data.player2Name);
                printMessage(data.player2Name + " joined.");
			}
			else {
				setEnemyInfo(data.player1Id, data.player1Name);
                printMessage(data.player1Name + " joined.");
			}
		});


		chatName.addEventListener('keydown', function(event) {
			if (event.which === 13 && chatName.value != "") {
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