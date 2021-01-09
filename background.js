chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.create({ url: "https://dailycheck.cornell.edu/daily-checkin" });
  chrome.tabs.executeScript({
    code: `
    document.getElementById("continue").click();
    document.getElementById("positivetestever-no").checked = true;
    document.getElementById("covidsymptoms-no").checked = true;
    document.getElementById("contactdiagnosed-no").checked = true;
    document.getElementById("contactsymptoms-no").checked = true;
    document.getElementById("submit").click();
    `,
  }, function callback() {
    chrome.tabs.sendMessage(tab.id, 'hello');
  });
});
chrome.runtime.onMessage.addListener(function callback(message, sender, response) {
  chrome.tabs.query({ "active": true }, function callback2(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: `document.getElementById("submit").click();`
    });
  })
});

