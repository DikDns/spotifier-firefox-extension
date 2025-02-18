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
