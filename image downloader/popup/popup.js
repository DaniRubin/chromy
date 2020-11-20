let images = [];

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { action: "get_images" }, (response) => {
    images = response.data
    console.log(response.data);
    $('.gallery').html('');
    response.data.map((img, i) => {
      if (i > 5)
        $('.gallery').append(`<img src="${img.src}" class="image" id="imageNumber${i}"/>`);
    });
  });
});

$(document).on('click', '.image', (e) => {
  console.log(e.target.id);
  imageSrc = document.getElementById(e.target.id).src;
  chrome.runtime.sendMessage({ action: "download_image", data: { src: imageSrc } }, res => {
    console.log("Complete!");
    console.log(res);
  })
});

$(document).on('click', '#downloadAll', (e) => {
  console.log("Downloading...");
  chrome.runtime.sendMessage({ action: "download", data: images }, res => {
    console.log("Complete!");
    console.log(res);
  })
});
