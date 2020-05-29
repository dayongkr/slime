const mainWrapper = document.getElementById("main-wrapper");
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

const setUpWrapper = (wrapper, mainImage) => {
  wrapper.style.width = `${mainImage.width}px`;
  wrapper.style.height = `${mainImage.height}px`;
  makeDot(6, mainImage.width, wrapper);
};

img.addEventListener("load", () => {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);
  setUpWrapper(mainWrapper, img, canvas);
});
