<div align="center">
  <br/>
  <br/>
  <img src="https://cdn.jsdelivr.net/gh/DikDns/spotifier-firefox-extension@main/src/icons/icon-256.png" alt="SPOTifier Logo" width="128" height="128"/>
  <h3>SPOTifier for Firefox Extension</h3>
  <p>This is the source code of the SPOTifier for Firefox Extension.</p>
  <br/>
  <br/>
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

1. Visit [SPOTifier Extension Page](https://spotifier-upi.vercel.app/extension) or [Github Releases Page](https://github.com/DikDns/spotifier-firefox-extension/releases)
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
