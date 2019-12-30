const to = promise => {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [err, null]);
};
const makeRequest = opts => {
  const xhr = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = () => {
      // only run if the request is complete
      if (xhr.readyState !== 4) return;
      if (xhr.status >= 200 && xhr.status < 300) {
        // If successful
        opts.responseType === "arraybuffer"
          ? resolve(new Uint8Array(xhr.response))
          : resolve(JSON.parse(xhr.responseText));
      } else {
        // If false
        reject(xhr.response);
      }
    };
    // Setup HTTP request
    xhr.open(opts.method || "GET", opts.url, true);
    if (opts.headers) {
      Object.keys(opts.headers).forEach(key =>
        xhr.setRequestHeader(key, opts.headers[key])
      );
    }
    // Send the request
    if (opts.contentType === "application/json") {
      xhr.setRequestHeader("content-type", "application/json");
      xhr.send(JSON.stringify(opts.payload));
    } else {
      xhr.send(opts.payload);
    }
  });
};
let els = {
  
};

window.onload = () => {

};
