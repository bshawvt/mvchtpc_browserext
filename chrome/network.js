//var server = chrome.sockets.tcpServer.listen();
var bnip = "";
var bnport = "";
var bnsocket = null;

var bnTempRemoteAddr = "localhost:12555";

var TYPE_ERROR = 0;
var TYPE_REMOTE = 1;
var TYPE_EXTENSION = 2;

var EVENT_ERROR = 0;
var EVENT_TRANSCRIBE = 1;
var EVENT_REGISTER = 2;

var CONTENT_EVENT_ERROR = 0;
var CONTENT_EVENT_TRANSCRIPTION = 1;

var bnClient = null;

function extClient() {

	this.hasConnected = false;
	this.ReconnectInterval = null;

	this.startClient();
	
}

extClient.prototype.startClient = function() {
	
	var self = this;
	this.bnsocket = new WebSocket("ws://" + bnTempRemoteAddr);
	this.bnsocket.onopen = function(e) {
		console.log("opened: ", e);
		self.registerExtension();
		self.hasConnected = true;
	}

	this.bnsocket.onerror = function(e) {
		console.log("error: ", e);
		//await();

	}

	this.bnsocket.onclose = function(e) {
		console.log("onclose: ", e);
		await();
	}

	this.bnsocket.onmessage = function(e) {
		
		try {
			console.log(e);
			var json = JSON.parse(e.data);
			console.log(json);
			if (json.type == TYPE_EXTENSION) {//EVENT_TRANSCRIBE) {
				if (json.event == EVENT_TRANSCRIBE) {
					console.log("transcription received: " + json.data);
					var _trans = json.data;
					
					SendTranscript(_trans);
				}
			}

		}
		catch(e) {
			console.error("onmessage is not json: " + e);
		}
	}
}

extClient.prototype.registerExtension = function() {
	this.bnsocket.send(JSON.stringify({type: TYPE_EXTENSION, event: EVENT_REGISTER, data: null}));
}

function SendTranscript(msg) {

	var json = {event: CONTENT_EVENT_TRANSCRIPTION, transcript: msg};

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, json, function(response) {
			console.log("response");
		})
	});
}

chrome.runtime.onMessage.addListener(function(req, sender, response) {

	console.log(req, sender, response);
	if (req.tempRemoteAddr !== undefined) {
		if (req.tempRemoteAddr !== null) {
			bnTempRemoteAddr = req.tempRemoteAddr;
			console.log("tempRemoteAddr is now: ", bnTempRemoteAddr);
			//startClient();
		}
	}

});


function await() {
	if (bnClient !== null) {
		clearInterval(bnClient.ReconnectInterval);
		bnClient = null;
		bnClient = new extClient();
		bnClient.ReconnectInterval = setInterval(checkConnectionStatus, 1000);
	} else {
		bnClient = new extClient();
		bnClient.ReconnectInterval = setInterval(checkConnectionStatus, 1000);
	}
	
}

function checkConnectionStatus() {
	console.log("Awaiting connection...");
	//bnClient.startClient();
	console.log(bnClient);
	if (bnClient.hasConnected == true) {
		console.log("Connected!");
		clearInterval(bnClient.ReconnectInterval);
	}
}
await();