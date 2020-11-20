chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "get_images") {
    const allImages = []

    images = $('img').map((i, img) => {
      if ($(img).data('src')) {
        allImages.push({ src: $(img).data('src') });
      } else if ($(img).src) {
        allImages.push({ src: $(img).src });
      }
    });
    console.log(allImages);
    sendResponse({ data: allImages });
  }
})