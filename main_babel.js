var mainWrapper = document.getElementById("main-wrapper");
var body = document.getElementsByTagName("body")[0];
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var image = document.getElementById("source");
var img = new Image();
img.crossOrigin = "Anonymous";
img.src = "image2.jpg";

var makeDot = function makeDot(count, width, wrapper) {
  if (width >= 10) {
    var dotArr = [];
    wrapper.classList.remove("dot");
    wrapper.classList.add("wrapper");

    var _loop = function _loop(i) {
      var dot = document.createElement("div");
      wrapper.appendChild(dot);
      dot.classList.add("dot");
      dot.style.width = "".concat(width / 2, "px");
      dot.style.height = "".concat(width / 2, "px");
      dot.dataset.width = "".concat(width);
      dot.addEventListener(
        "mouseenter",
        function () {
          makeDot(4, width / 2, dot);
        },
        {
          once: true,
        }
      );
      dotArr.push(dot);
    };

    for (var i = 0; i < count; i++) {
      _loop(i);
    }

    dotArr.map(function (item) {
      var x = item.offsetLeft + item.offsetWidth / 2,
        y = item.offsetTop + item.offsetHeight / 2;
      var colorData = ctx.getImageData(x, y, 1, 1).data;
      item.style.backgroundColor = "rgb("
        .concat(colorData[0], ",")
        .concat(colorData[1], ",")
        .concat(colorData[2], ")");
    });
  }
};

var setUpWrapper = function setUpWrapper(wrapper, width, height) {
  wrapper.style.width = "".concat(width, "px");
  wrapper.style.height = "".concat(height, "px");
  window.addEventListener("touchmove", function (e) {
    var dot = document.elementFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    );

    if (dot && dot.classList.contains("dot")) {
      makeDot(4, dot.dataset.width / 2, dot);
    }
  });
  makeDot(6, width, wrapper);
};

img.addEventListener("load", function () {
  var width, height;

  if (img.width > body.offsetWidth) {
    var scale = img.width / body.offsetWidth;
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
