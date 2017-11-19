
var HTPCScriptRef = null;


function HTPCScript() {

}
HTPCScript.prototype.transcribe = function(msg) {
	document.activeElement.value = msg;
}

chrome.runtime.onMessage.addListener(function(req, sender, response) {

	//var HTPCScript = new HTPCScript();
	var CONTENT_EVENT_ERROR = 0;
	var CONTENT_EVENT_TRANSCRIPTION = 1;

	console.log(req, sender, response);
	if (req.event !== undefined) {
		if (req.event == CONTENT_EVENT_TRANSCRIPTION) {
			//document.activeElement.value = req.transcript;
			HTPCScriptRef.transcribe(req.transcript);
		}
	}

});

HTPCScriptRef = new HTPCScript();


console.log("HTPCSuite_Extension:content:test.js: injected successfully");
//document.activeElement.value = JSON.stringify(json.transcript);