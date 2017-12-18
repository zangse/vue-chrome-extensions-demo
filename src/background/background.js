    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.cmd == 'test') {
            console.log('request:'+JSON.stringify(request))
            sendResponse({ data: 'hello chrome' });
        }
    });