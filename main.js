const mainWrapper = document.getElementById("main-wrapper");
const body = document.getElementsByTagName("body")[0];
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const image = document.getElementById("source");
const img = new Image();
img.crossOrigin = "Anonymous";
img.src = "image2.jpg";

const makeDot = (count, width, wrapper) => {
  if (width >= 10) {
    const dotArr = [];
    wrapper.classList.remove("dot");
    wrapper.classList.add("wrapper");
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("div");
      wrapper.appendChild(dot);
      dot.classList.add("dot");
      dot.style.width = `${width / 2}px`;
      dot.style.height = `${width / 2}px`;
      dot.dataset.width = `${width}`;
      dot.addEventListener(
        "mouseenter",
        () => {
          makeDot(4, width / 2, dot);
        },
        { once: true }
      );
      dotArr.push(dot);
    }
    dotArr.map((item) => {
      const x = item.offsetLeft + item.offsetWidth / 2,
        y = item.offsetTop + item.offsetHeight / 2;
      const colorData = ctx.getImageData(x, y, 1, 1).data;
      item.style.backgroundColor = `rgb(${colorData[0]},${colorData[1]},${colorData[2]})`;
    });
  }
};

const setUpWrapper = (wrapper, width, height) => {
  wrapper.style.width = `${width}px`;
  wrapper.style.height = `${height}px`;
  window.addEventListener("touchmove", (e) => {
    const dot = document.elementFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    );
    if (dot && dot.classList.contains("dot")) {
      makeDot(4, dot.dataset.width / 2, dot);
    }
  });
  makeDot(6, width, wrapper);
};

img.addEventListener("load", () => {
  let width, height;
  if (img.width > body.offsetWidth) {
    const scale = img.width / body.offsetWidth;
    width = img.width / scale;
    height = img.height / scale;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
  } else {
    width = img.width;
    height = img.height;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
  }
  setUpWrapper(mainWrapper, width, height);
});
