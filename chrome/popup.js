
function updateFolderKey() {
	var v = document.getElementById("folderLocation").value;
	var bn = document.getElementById("tempRemoteAddr").value;
	chrome.runtime.sendMessage({folderKey: v}, function(response) {
		console.log("popup response: ", response); 
	});
	chrome.runtime.sendMessage({tempRemoteAddr: bn}, function(response) {
		console.log("popup response: ", response); 
	});

	chrome.storage.sync.set({"activeFolderKey": v}, function(obj) {
		console.log("Some kind of friggin' error");
	});
	chrome.storage.sync.set({"tempRemoteAddr": bn}, function(obj) {
		console.log("Some kind of friggin' error");
	});

}



function init() {
	var t = document.getElementById("save-settings");
	if (t) {
		t.addEventListener('click', function(e) {console.log("clicked da button"); updateFolderKey();})
		var activeFolderKey = chrome.storage.sync.get("activeFolderKey", function(obj) {
			var e = document.getElementById("folderLocation").value = obj.activeFolderKey;
		});

		var tempAddress = chrome.storage.sync.get("tempRemoteAddr", function(obj) {
			var ipfield = document.getElementById("tempRemoteAddr").value = obj.tempRemoteAddr;
		});

		console.log("init: activeFolderKey: ", activeFolderKey);
		console.log("init: : ", tempAddress);
	}
}

init();