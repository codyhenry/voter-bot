// Function to click the button with the label containing the text "Christina"
console.log("Loaded");
function sleep(ms) {
  console.log("Sleeping");
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
  console.log("Awake");
}

// !chrome extensions cannot click anchor tags
function clickBackBtn() {
  console.log("Going back");
  const box = document.querySelector(".pds-box");
  var backBtn = box.getElementsByTagName("a");
  console.log(backBtn);
  backBtn[0].click();
}

function scrollToPoll() {
  window.scrollTo(0, document.body.scrollHeight / 3);
}

function refreshPage() {
  console.log("Refreshing");
  location.reload();
  window.scrollTo(0, 0);
}

function clickSubmitBtn() {
  const subBtn = document.getElementById("pd-vote-button13733579");
  subBtn.click();
  console.log("Submitted");
}

function clickButtonWithLabelContainingText() {
  // Find all buttons on the page
  const options = document.querySelectorAll('input[type="radio"]');

  // console.log(options);
  for (let option of options) {
    if (
      option.parentNode.parentNode.textContent ==
      "Christina D’Agostino, St. Thomas Aquinas"
    ) {
      // console.log(option.parentNode.parentNode.textContent);
      option.click();
      console.log("Voted");
      return;
    }
  }
}

const startProcess = async () => {
  for (var i = 0; i < 4; i++) {
    setTimeout(
      (function (i) {
        return function () {
          if (i == 0) {
            scrollToPoll();
          } else if (i == 1) {
            clickButtonWithLabelContainingText();
          } else if (i == 2) {
            clickSubmitBtn();
          } else {
            refreshPage();
          }
        };
      })(i),
      i * 1500
    );
  }
};

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.action === "start") {
//     itr = 0;
//     while (itr < 2) {
//       console.log("This is iteration " + itr);
//       startProcess();
//       sendResponse({ message: "Start Clicking." });
//       itr++;
//     }
//   } else if (request.action === "stop") {
//     document.documentElement.style.filter = "none";
//     sendResponse({ message: "Stop Clicking." });
//   }
// });

window.onload = function () {
  startProcess();
};

// chrome://extensions/
