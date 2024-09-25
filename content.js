// Inject a new button into the sidebar
function injectButton() {
  const sidebar = document.querySelector("#side-menu"); // Adjust this selector as needed
  if (sidebar) {
    const listItem = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.setAttribute("href", "javascript:void(0);");
    anchor.setAttribute("id", "goToWebsite");
    anchor.classList.add("waves-effect");
    anchor.innerHTML =
      '<i class="fa fa-external-link"></i> <span class="hide-menu"><b>Pergi ke SPOTifier</b></span>';

    listItem.appendChild(anchor);
    sidebar.appendChild(listItem);

    document
      .getElementById("goToWebsite")
      .addEventListener("click", handleButtonClick);
  }
}

// Handle the button click and send cookies to your website
function handleButtonClick() {
  // First, get the cookies from the current domain (assuming cookies like 'username' and 'userid' are set)
  chrome.runtime.sendMessage(
    { action: "getCookies", domain: ".spot.upi.edu" },
    function (response) {
      const cookies = response.cookies;
      const xsrf_token = cookies.find(
        (cookie) => cookie.name === "XSRF-TOKEN"
      )?.value;
      const laravel_session = cookies.find(
        (cookie) => cookie.name === "laravel_session"
      )?.value;
      const cas_auth = cookies.find(
        (cookie) => cookie.name === "CASAuth"
      )?.value;

      console.log("xsrf_token: ", xsrf_token);
      console.log("laravel_session: ", laravel_session);
      console.log("cas_auth: ", cas_auth);

      // Send the cookies to your website using a POST request
      const DEV_MODE = true;
      const baseUrl = DEV_MODE
        ? "http://localhost:3000"
        : "https://spotifier-upi.vercel.app";
      const path = "/api/sso";
      const params = `XSRF-TOKEN=${xsrf_token}&laravel_session=${laravel_session}&CASAuth=${cas_auth}`;
      const targetUrl = baseUrl + path + "?" + params;
      console.log("targetUrl: ", targetUrl);

      window.location.href = targetUrl;
    }
  );
}

// Inject the button on page load
window.addEventListener("load", injectButton);

console.log("content.js from spotifier has been loaded");
