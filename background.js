let counter = 1;
let windowId = null;
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
    counter = 1;
  } else if (request.permission === "increment") {
    console.log("incrementing");
    counter += 1;
    sendResponse("incremented by 1, counter is currently: " + counter);
  } else if (request.permission === "get") {
    console.log("getting");
    sendResponse(counter);
  } else if (request.permission === "instantiate") {
    chrome.windows.create(
      {
        focused: false,
        url: "https://highschool.athlonsports.com/florida/2024/05/07/vote-now-who-is-the-2024-softball-player-of-the-year-in-south-florida",
      },
      function (window) {
        windowId = window.id;
      }
    );
  } else if (request.permission === "terminate") {
    chrome.windows.getLastFocused(function (window) {
      chrome.windows.remove(window.id);
      chrome.windows.update(windowId, { state: "maximized", focused: true });
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //'tabs' will be an array with only one element: an Object describing the active tab
        //  in the current window. To remove the tab, pass the ID: to chrome.tabs.remove().
        chrome.tabs.update(tabs[0].id, { selected: true });
      });
    });
  }
  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //   //'tabs' will be an array with only one element: an Object describing the active tab
  //   //  in the current window. To remove the tab, pass the ID: to chrome.tabs.remove().

  //   chrome.tabs.remove(tabs[0].id);
  // })
  return true; //to tell the content script to look out for sendResponse
});
