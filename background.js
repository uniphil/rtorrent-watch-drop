var getClickHandler = function() {
  return function(linkData) {
    var url = localStorage['url'],
        dest = localStorage['dest'];
    if (!url || !dest) {
      webkitNotifications.createNotification("",
        "Not Configured",
        "URL and Destination have not yet been set. Um, go fix that or something then come back."
      ).show();
      return;
    }
    var data = new FormData();
    data.append("torrent", linkData.linkUrl);
    data.append("destination", dest);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    try {
      xhr.send(data);
    } catch (e) {
      webkitNotifications.createNotification("",
        "Not Even Anything?!",
        "Couldn't send the torrent at all. Check the URL and make sure the server is running."
      ).show();
      return;
    }
    if (xhr.status === 404) {
      webkitNotifications.createNotification("",
      "Nobody Home",
      "rtorrent-drop or whatever it's called is not running at the url you set. fix it."
      ).show();
    } else if (xhr.status !== 200) {
      webkitNotifications.createNotification("",
        "Torrent Drop Failed",
        "The server didn't like that. Maybe check your config and verify that the link was indeed to a .torrent?" + 
        xhr.responseText
      ).show();
    } else {
      webkitNotifications.createNotification("",
        "Woo hoo!",
        "Torrent: locked, loaded, ready." +
         xhr.responseText
      ).show();
    }
  };
}


chrome.contextMenus.create({
  "title": "Send to uberserver",
  "type": "normal",
  "contexts": ["link"],
  "onclick": getClickHandler()
})
