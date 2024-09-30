const CURRENT_VERSION = chrome.runtime.getManifest().version;
const VERSION_KEY = "lastVersionChecked";

// Function to check for updates
function checkForUpdates() {
  chrome.storage.local.get([VERSION_KEY], (result) => {
    const lastVersionChecked = result[VERSION_KEY];

    if (lastVersionChecked !== CURRENT_VERSION) {
      // Update the stored version
      chrome.storage.local.set({ [VERSION_KEY]: CURRENT_VERSION });

      // Open a new tab to the update URL
      chrome.tabs.create({
        url: "https://spotifier-upi.vercel.app/extension?update=true",
      });
    }
  });
}

// Check for updates when the extension is installed, updated, or started
chrome.runtime.onInstalled.addListener(checkForUpdates);
chrome.runtime.onStartup.addListener(checkForUpdates); // Added this line

// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getCookies") {
    chrome.cookies.getAll({ domain: request.domain }, (cookies) => {
      sendResponse({ cookies: cookies });
    });
    return true; // Indicates that the response is asynchronous
  }
});
