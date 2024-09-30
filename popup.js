document.addEventListener("DOMContentLoaded", function () {
  const devModeSwitch = document.getElementById("devModeSwitch");
  const showDialogSwitch = document.getElementById("showDialogSwitch");
  const darkModeSwitch = document.getElementById("darkModeSwitch");

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
  chrome.storage.sync.get(
    ["devMode", "showDialog", "darkMode"],
    function (data) {
      devModeSwitch.checked = data.devMode || false;
      showDialogSwitch.checked = data.showDialog !== false; // Default to true if not set

      // Set initial theme
      const savedDarkMode = data.darkMode;
      if (savedDarkMode === undefined) {
        setTheme(prefersDark);
      } else {
        setTheme(savedDarkMode);
      }
    }
  );

  // Save the devMode state when the switch is toggled
  devModeSwitch.addEventListener("change", function () {
    chrome.storage.sync.set({ devMode: this.checked });
  });

  // Save the showDialog state when the switch is toggled
  showDialogSwitch.addEventListener("change", function () {
    chrome.storage.sync.set({ showDialog: this.checked });
  });

  // Handle dark mode toggle
  darkModeSwitch.addEventListener("change", function () {
    setTheme(this.checked);
    chrome.storage.sync.set({ darkMode: this.checked });
  });

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      chrome.storage.sync.get("darkMode", function (data) {
        if (data.darkMode === undefined) {
          setTheme(e.matches);
        }
      });
    });
});
