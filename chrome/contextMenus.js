var folderKey = "";
var isReady = false;


chrome.runtime.onMessage.addListener(function(req, sender, response) {

	console.log(req, sender, response);
	if (req.folderKey !== undefined) {
		if (req.folderKey !== null) {
			folderKey = req.folderKey;
			console.log("folderKey is now: ", folderKey);
		}
	}

})


function saveContent(s) {
	if (folderKey == "") {
		return;
	}
	var url = s.pageUrl;
	var folder = folderKey;
	var r = new XMLHttpRequest();
	console.log("request: url: %s\nfolder: %s", url, folder);
	r.onreadystatechange = function(x) {
		
		if (r.readyState === XMLHttpRequest.DONE) {
			if (r.status === 200) {
				alert(r.responseText);
			}
		}
	}
	r.open("GET", "http://localhost:8181/Api/SaveUrlToFolder/?folder=" + folder + "&url=" + url);
	r.send();

}

var cm = chrome.contextMenus.create({title: "Save to HTPC", onclick: saveContent}, function(e){
	console.log("ready");
});