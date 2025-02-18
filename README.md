# SPOTifier Firefox Extension

<div align="center">
  <h3>SPOTifier for Firefox Extension</h3>
  <p>This is the source code of the SPOTifier for Firefox Extension.</p>
</div>

## Features

- 🌓 Dark/Light mode support
- 🔄 Seamless SSO integration
- 🛠️ Developer mode for local testing
- 🎨 Modern UI with dialog interactions
- 🔒 Secure cookie handling
- ⚡ Fast and lightweight

## Installation

### From SPOTifier Extension Page

1. Visit [SPOTifier Extension Page](https://spotifier-upi.vercel.app/extension)
2. Click "Add to Firefox"
3. Follow the installation prompts

### Manual Installation (Development)

1. Clone this repository

```bash
git clone https://github.com/dikdns/spotifier-firefox-extension.git
```

2. Open Firefox and navigate to about:debugging
3. Click "This Firefox" on the left sidebar
4. Click "Load Temporary Add-on"
5. Navigate to the extension directory and select manifest.json

## Usage

After installation:

1. Visit [SPOT UPI](https://spot.upi.edu/mhs)
2. Look for the SPOTifier button in the sidebar
3. Click to access enhanced features

## Development

### Prerequisites

- Firefox Based Browser
- Basic knowledge of web extensions

### Project Structure

```
spotifier-firefox-extension/
├── src/
│   ├── background.js # Background script
│   ├── content.js # Content script for injection
│   ├── popup.js # Popup script
│   ├── popup.html # Popup HTML
│   └── icons/ # Icon files
├── manifest.json # Extension manifest
```

## Trae AI

Used 23 References

I'll help analyze and fix the Firefox extension compatibility issues. Here are the main changes needed:

1. Replace Chrome API with Firefox API The main issue is that the code still uses Chrome-specific APIs. Firefox extensions use browser instead of chrome . While Firefox provides some compatibility with Chrome APIs, it's better to use the standard Firefox APIs.
   Here are the necessary changes:

1. In `popup.js` :

```javascript
// Replace chrome.runtime with browser.runtime
const manifest = browser.runtime.getManifest();
```

````

2. In `content.js` , the main changes needed are:
```javascript
// ... existing code ...

function handleNavigation() {
  browser.runtime
    .sendMessage({ action: "getCookies", domain: COOKIE_DOMAIN })
    .then((response) => {
      if (response.error) {  // Changed from browser.runtime.lastError
        console.error("Error sending message:", response.error);
        fallbackNavigation();
        return;
      }
      browser.storage.sync.get("devMode").then((data) => {
        const baseUrl = data.devMode ? DEV_URL : PROD_URL;
        const targetUrl = buildTargetUrl(baseUrl, response.cookies);
        window.location.href = targetUrl;
      });
    })
    .catch((error) => {  // Add error handling
      console.error("Error:", error);
      fallbackNavigation();
    });
}
````

````

3. In `background.js` , ensure proper response handling:
```javascript
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Validate the message
  if (!message || !message.action || message.action !== "getCookies") {
    return Promise.resolve({ error: "Invalid message" });
  }

  // Validate the domain
  const domain = message.domain?.trim();
  if (!domain || domain.length === 0) {
    return Promise.resolve({ error: "Invalid domain" });
  }

  // Fetch cookies for the specified domain
  return browser.cookies
    .getAll({ domain })
    .then((cookies) => {
      return { cookies: cookies };
    })
    .catch((error) => {
      console.error("Error retrieving cookies:", error);
      return { error: error.message };
    });
});
````

````

Key changes made:

1. Replaced all chrome API calls with browser
2. Updated error handling to work with Firefox's Promise-based APIs
3. Modified the message listener in background.js to return Promises
4. Updated cookie handling to work with Firefox's implementation
Additional recommendations:

1. Test the extension thoroughly in Firefox Developer Edition
2. Use the Firefox debugging tools (about:debugging) to monitor extension behavior
3. Consider adding error boundaries and better error handling
4. Test the storage API implementation specifically for Firefox
These changes should make your extension fully compatible with Firefox while maintaining the same functionality. The manifest.json is already correctly configured for Firefox, so no changes are needed there.

## DikDns
Copy

Delete

generate README.md

based on the Workspace and T3 stack readme!

## Trae AI
Used 24 References

I'll help create a README.md for your Firefox extension project. Here's a comprehensive README that follows modern documentation standards:

```markdown
# SPOTifier Firefox Extension

<div align="center">
  <h3>SPOTifier Extension for Firefox</h3>
  <p>Sistem Pembelajaran Online Terpadu, but better :)</p>
</div>

## Features

- 🌓 Dark/Light mode support
- 🔄 Seamless SSO integration
- 🛠️ Developer mode for local testing
- 🎨 Modern UI with dialog interactions
- 🔒 Secure cookie handling
- ⚡ Fast and lightweight

## Installation

### From Firefox Add-ons Store (Recommended)
1. Visit [Firefox Add-ons Store](#) (Coming Soon)
2. Click "Add to Firefox"
3. Follow the installation prompts

### Manual Installation (Development)
1. Clone this repository
```bash
git clone https://github.com/yourusername/spotifier-firefox-extension.git
````

````

2. Open Firefox and navigate to about:debugging
3. Click "This Firefox" on the left sidebar
4. Click "Load Temporary Add-on"
5. Navigate to the extension directory and select manifest.json
## Usage
After installation:

1. Visit SPOT UPI
2. Look for the SPOTifier button in the sidebar
3. Click to access enhanced features
4. Configure preferences through the extension popup
## Development
### Prerequisites
- Firefox Browser
- Basic knowledge of web extensions
- Node.js (optional, for development tools)
### Project Structure
```plaintext
spotifier-firefox-extension/
├── src/
│   ├── background.js
│   ├── content.js
│   ├── popup.js
│   └── icons/
├── manifest.json
└── popup.html
````

### Configuration

The extension supports several configuration options through the popup interface:

- Developer Mode : Toggle between production and local development URLs
- Show Initial Dialog : Control the welcome dialog visibility
- Dark Mode : Switch between light and dark themes

### Building

1. Make your changes
2. Test locally using Firefox's debugging tools
3. Package the extension:

```bash
zip -r spotifier-firefox-extension.zip * -x "*.git*"
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Security

This extension:

- Only accesses specified domains (SPOT UPI and SPOTifier)
- Handles cookies securely
- Uses Firefox's built-in security features

## License

[MIT License](/LICENSE)

## Support

For support, please open an issue in the repository or contact the maintainers.

---

Made with ❤️ for UPI Students
