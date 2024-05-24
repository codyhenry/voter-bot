console.log("Loaded");
let count = 1;
let active = true;
//! prevents client JS from executing
/*
function sleep(ms) {
  console.log("Sleeping");
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
  console.log("Awake");
}
*/
// !chrome extensions cannot click anchor tags
/*
function clickBackBtn() {
  console.log("Going back");
  const box = document.querySelector(".pds-box");
  var backBtn = box.getElementsByTagName("a");
  console.log(backBtn);
  backBtn[0].click();
}
*/

// chrome.storage.local.set({ localCounter: 0 }, function () {}); // save it in local.
function getCurrentCount(callback) {
  chrome.runtime.sendMessage({ permission: "get" }, function (response) {
    callback(response);
  });
}

function getCounter() {
  getCurrentCount(function (counter) {
    count = counter;
  });
}

function incrementCounter() {
  console.log("called increment");
  chrome.runtime.sendMessage({ permission: "increment" }, function (response) {
    console.log(response);
  });
}

function resetCounter() {
  chrome.runtime.sendMessage({ permission: "reset" });
}

function restartProcess() {
  chrome.runtime.sendMessage({ permission: "restart" });
}

function closeOldTab() {
  chrome.runtime.sendMessage({ permission: "close" });
}

function closeOldWindow() {
  chrome.runtime.sendMessage({ permission: "terminate" });
}

function createNewWindow() {
  chrome.runtime.sendMessage({ permission: "instantiate" });
}

function createNewTab() {
  console.log("Creating new tab");
  chrome.runtime.sendMessage({ permission: "create" });
}

function scrollToPoll() {
  window.scrollTo(0, document.body.scrollHeight / 3);
}

function refreshPage() {
  console.log("Refreshing");
  location.reload();
  window.scrollTo(0, 0);
}

function clickSubmitButton() {
  const subBtn = document.getElementById("pd-vote-button13733579");
  subBtn.click();
  console.log("Submitted");
}

function clickButtonWithLabelContainingText() {
  // Find all buttons on the page
  const options = document.querySelectorAll('input[type="radio"]');

  for (let option of options) {
    if (
      option.parentNode.parentNode.textContent ==
      "Christina D’Agostino, St. Thomas Aquinas"
    ) {
      option.click();
      console.log("Voted");
      return;
    }
  }
}

const startProcess = async () => {
  for (var i = 0; i < 8; i++) {
    setTimeout(
      (function (i) {
        return function () {
          if (count > 29 && count < 78) {
            console.log("Count out of bounds at " + count);
            active = false;
          } else {
            active = true;
          }
          console.log("Active = " + active);
          if (i == 0) {
            active && scrollToPoll();
          } else if (i == 1) {
            active && clickButtonWithLabelContainingText();
          } else if (i == 2) {
            console.log("submitting");
            active && clickSubmitButton();
          } else if (i == 4) {
            getCounter();
            console.log(count);
            if (count % 10 == 0) {
              active && createNewTab();
            } else if (count == 29) {
              createNewWindow();
            } else if (count == 79) {
              resetCounter();
              restartProcess();
            }
          } else if (i == 6) {
            if (count % 10 == 0) {
              active && closeOldTab();
            } else if (count == 29) {
              closeOldWindow();
            }
            console.log("refreshing");
            active && refreshPage();
          } else {
            console.log("waiting extra time");
          }
        };
      })(i),
      i * 1500
    );
  }
};

window.onload = function () {
  incrementCounter();
  getCounter();
  startProcess();
};

// chrome://extensions/
// https://highschool.athlonsports.com/florida/2024/05/07/vote-now-who-is-the-2024-softball-player-of-the-year-in-south-florida
