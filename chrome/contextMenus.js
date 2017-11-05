var folderKey = "";
var isReady = false;


chrome.runtime.onMessage.addListener(function(req, sender, response) {

	console.log("contextMenu: ", req, sender, response);

})


function saveContent(s) {
	var url = s.pageUrl;
	var folder = "MyHardcodedFolderName";
	var r = new XMLHttpRequest();
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