// Copyright (c) 2014
//
// Matt Levine
// Created: 12/9/14
//

// Create selection context
var title = "Search YouTube for 'selection'";
var id = chrome.contextMenus.create({"title": title, "contexts":["selection"], "onclick": genericOnClick});

// A generic onclick callback function.
function genericOnClick(info, tab) {
	var selection = info.selectionText;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://gdata.youtube.com/feeds/api/videos?q="+selection+"&max-results=20&v=2&alt=jsonc", true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var videoId = JSON.parse(xhr.response).data.items[0].id;
			console.log(videoId);
			var newURL = "https://www.youtube.com/watch?v=" + videoId;
			// Open the new tab with the search query
			chrome.tabs.create({ url: newURL, index: tab.index+1, selected: true });
		}
	}
	xhr.send();
}

// Update the contextMenus title
function updateContextMenu(id) {
	// Update contextMenus with highlighted selection
	chrome.contextMenus.update(id, {"title": "Search YouTube for '%s'"});
}

// Updates the contextMenus title each time the menu is opened.
updateContextMenu(id);