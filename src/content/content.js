  function send(data) {
      chrome.runtime.sendMessage({ cmd: "test", data: data }, function(response) {
          if (response && response.data) {
              var resp = response.data;
              console.log("resp:" + resp)
          }
      });
  }
  send('Hello Vue');