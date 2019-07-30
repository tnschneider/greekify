browser.browserAction.onClicked.addListener(() => {
    browser.tabs.query({ active: true, currentWindow: true }).then(x => {
        let tab = x[0];
        browser.tabs.sendMessage(tab.id, {});
    });
})

