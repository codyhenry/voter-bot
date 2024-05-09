let counter = 0;
// creating and closing tabs
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.permission === "create") {
    chrome.tabs.create({
      url: "https://highschool.athlonsports.com/florida/2024/05/07/vote-now-who-is-the-2024-softball-player-of-the-year-in-south-florida",
      active: false,
      index: 1,
    });
  } else if (request.permission === "close") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      //'tabs' will be an array with only one element: an Object describing the active tab
      //  in the current window. To remove the tab, pass the ID: to chrome.tabs.remove().
      chrome.tabs.remove(tabs[0].id);
    });
  } else if (request.permission === "reset") {
    counter = 0;
  } else if (request.permission === "increment") {
    console.log("incrementing");
    counter += 1;
    sendResponse("incremented by 1, counter is currently: " + counter);
  } else if (request.permission === "get") {
    console.log("getting");
    sendResponse(counter);
  }
  return true; //to tell the content script to look out for sendResponse
});
