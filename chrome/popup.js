function init() {
	console.log("stuff is happening maybe");
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {test:"Hello World"}, function(response) {
			//alert("popup response: " + response);
		});
	});
}

function onPopupActive() {
	chrome.runtime.sendMessage({test: "hello world"}, function(response) {
		console.log("popup response: ", response); 
	});
}

function doThing() {
	var t = document.getElementById("activate");
	if (t) {
		t.addEventListener('click', function(e) {console.log("clicked da button"); onPopupActive();})
	}
}

doThing();