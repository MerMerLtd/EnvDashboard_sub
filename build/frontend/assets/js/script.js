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
  container: document.querySelector(".container"),
  containerToggle: document.querySelector("#container-toggle")
};

const handleIframe = evt => {
  console.log(evt.target);
  let i = 1;
  Array.from(document.querySelectorAll(".iframe")).map(el => {
    console.log(el === evt.target);
    if (el === evt.target) {
      els.containerToggle.checked = true;
      el.className = "iframe hero";
    } else {
      el.className = `iframe foot${i}`;
      i++;
    }
  });
};

els.container.addEventListener("click", handleIframe, false);

// window.onload = () => {};
const urls = [
  `https://wot.epa.gov.tw/`,
  `https://wot.epa.gov.tw/`,
  `https://wot.epa.gov.tw/`,
  `https://wot.epa.gov.tw/`,
  `https://wot.epa.gov.tw/`,
  `https://wot.epa.gov.tw/`
];
const appendIframe = urls => {
  urls.forEach((url, idx) => {
    const markup = `<div class="iframe" data-number="iframe--${idx}"></div>`;
    // const markup =
    //  `<div class="iframe__container" data-number="iframe--1">
    //     <iframe
    //      src="https://wot.epa.gov.tw/"
    //      frameborder="0"
    //       class="iframe">
    //     </iframe>
    //     <div class="iframe__cover"></div>
    //   </div>`;
    els.container.insertAdjacentHTML("beforeend", markup);
  });
};

appendIframe(urls);
