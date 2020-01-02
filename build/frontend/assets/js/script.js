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
  containerToggle: document.querySelector("#container-toggle"),
  iframeMain: document.querySelector(".iframe__main"),
  iframeMenu: document.querySelector(".iframe__menu"),
};

const handleIframe = evt => {
  if (!evt.target.matches(".iframe__cover")) return;
  console.log(
    evt.target,
    evt.target.parentNode,
    evt.target.parentNode.dataset.url
  );
  els.containerToggle.checked = true;
  els.iframeMain.innerHTML = "";
  const url = evt.target.parentNode.dataset.url;
  const number = evt.target.parentNode.dataset.number;
  const markup = `<iframe src="${url}" frameborder="0" width="100%" height="100%" data-number=${number}></iframe>`;
  els.iframeMain.insertAdjacentHTML("afterbegin", markup);
  // Array.from(document.querySelectorAll(".iframe__container")).map(el => {
  //   console.log(el === evt.target.parentNode);
  //   if (el === evt.target.parentNode) {
  //     els.containerToggle.checked = true;
  //     el.className = "iframe__container hero";
  //   } else {
  //     el.className = `iframe__container foot${i}`;
  //     i++;
  //   }
  // });
};

els.iframeMenu.addEventListener("click", handleIframe, false);

// window.onload = () => {};
const urls = [
  `https://wot.epa.gov.tw/`,
  `https://opendata.epa.gov.tw/Data/Contents/AQI/`,
  `https://cems.epa.gov.tw/`,
  `http://atis.ntpc.gov.tw/`,
  `https://cems.epa.gov.tw/`,
  `http://atis.ntpc.gov.tw/`,
  `https://www.mrpv.org.tw/index.aspx`,
  `https://www.mrpv.org.tw/index.aspx`
];
const appendIframe = urls => {
  urls.forEach((url, idx) => {
    const markup = `
    <div class="iframe__img-box" data-url="${url}" data-number="${idx + 1}">
      <img src="./assets/img/iframe__cover--${idx +
        1}.png" alt="iframe__cover--${idx + 1}" class="iframe__img">
      <div class="iframe__cover"></div>
    </div>`;
    // const markup =
    //  `<div class="iframe__container" data-number="iframe--${idx}" data-url="${url}">
    //     <iframe
    //      src=""
    //      frameborder="0"
    //       class="iframe">
    //     </iframe>
    //     <div class="iframe__cover"></div>
    //   </div>`;
    els.iframeMenu.insertAdjacentHTML("beforeend", markup);
  });
};

appendIframe(urls);
