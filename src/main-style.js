function main() {
  const style = document.createElement("style");
  style.textContent = `@import url('${browser.runtime.getURL(
    "src/styles/main.css"
  )}')`;

  initDarkMode();
  document.head.appendChild(style);
  console.log("Styles applied");
}

function initDarkMode() {
  function applyDarkClass(isDark) {
    document.querySelector("html").setAttribute("class", isDark ? "dark" : "");
  }

  // Watch for dark mode changes
  browser.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === "sync" && changes.darkMode) {
      const isDark = changes.darkMode.newValue;
      applyDarkClass(isDark);
    }
  });

  browser.storage.sync.get("darkMode").then((result) => {
    const isDark = result.darkMode;
    applyDarkClass(isDark);
  });
}

main();
