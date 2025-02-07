browser.runtime.onMessage.addListener((request, sender) => {
  return new Promise((resolve) => {
    if (request.action === "getCookies") {
      browser.cookies.getAll({ domain: request.domain }).then((cookies) => {
        resolve({ cookies: cookies });
      });
    }
  });
});
