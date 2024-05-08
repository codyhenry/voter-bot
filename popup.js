document.addEventListener("DOMContentLoaded", function () {
  var startButton = document.getElementById("startButton");
  var stopButton = document.getElementById("stopButton");

  startButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "start" });
    });
  });

  stopButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "stop" });
    });
  });
});
