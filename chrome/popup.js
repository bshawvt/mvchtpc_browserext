function init() {
	console.log("stuff is happening maybe");
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {test:"Hello World"}, function(response) {
			//alert("popup response: " + response);
		});
	});
}

function updateFolderKey() {
	var v = document.getElementById("folderLocation").value;
	chrome.runtime.sendMessage({folderKey: v}, function(response) {
		console.log("popup response: ", response); 
	});
}

function init() {
	var t = document.getElementById("save-settings");
	if (t) {
		t.addEventListener('click', function(e) {console.log("clicked da button"); updateFolderKey();})
	}
}

init();