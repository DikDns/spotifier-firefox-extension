chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getCookies") {
    chrome.cookies.getAll({ domain: request.domain }, function (cookies) {
      sendResponse({ cookies: cookies });
    });
    return true; // Keeps the message channel open for asynchronous response
  }
});
