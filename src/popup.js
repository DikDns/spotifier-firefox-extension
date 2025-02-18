document.addEventListener("DOMContentLoaded", function () {
  const devModeSwitch = document.getElementById("devModeSwitch");
  const showDialogSwitch = document.getElementById("showDialogSwitch");
  const darkModeSwitch = document.getElementById("darkModeSwitch");
  const versionSpan = document.getElementById("version");

  // Display current version
  // Replace chrome.runtime with browser.runtime
  const manifest = browser.runtime.getManifest();
  versionSpan.textContent = manifest.version;

  // Helper function to get extension page URL
  function getExtensionPageUrl(callback) {
    browser.storage.sync.get("devMode").then((data) => {
      const baseUrl = data.devMode
        ? "http://localhost:3000"
        : "https://spotifier-upi.vercel.app";
      callback(`${baseUrl}/extension?current=${manifest.version}`);
    });
  }

  function setTheme(isDark) {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
    darkModeSwitch.checked = isDark;
  }

  // Check system preference
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Load the current states
  browser.storage.sync
    .get(["devMode", "showDialog", "darkMode"])
    .then((data) => {
      devModeSwitch.checked = data.devMode || false;
      showDialogSwitch.checked = data.showDialog !== false; // Default to true if not set

      // Set initial theme
      const savedDarkMode = data.darkMode;
      if (savedDarkMode === undefined) {
        setTheme(prefersDark);
      } else {
        setTheme(savedDarkMode);
      }
    });

  // Save the devMode state when the switch is toggled
  devModeSwitch.addEventListener("change", function () {
    browser.storage.sync.set({ devMode: this.checked });
    // Update version display to show current mode
    getExtensionPageUrl((url) => {
      const modeText = this.checked ? "DEV" : "PROD";
      versionSpan.textContent = `${manifest.version} (${modeText})`;
    });
  });

  // Save the showDialog state when the switch is toggled
  showDialogSwitch.addEventListener("change", function () {
    browser.storage.sync.set({ showDialog: this.checked });
  });

  // Handle dark mode toggle
  darkModeSwitch.addEventListener("change", function () {
    setTheme(this.checked);
    browser.storage.sync.set({ darkMode: this.checked });
  });

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      browser.storage.sync.get("darkMode").then((data) => {
        if (data.darkMode === undefined) {
          setTheme(e.matches);
        }
      });
    });
});
