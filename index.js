var gifContainer = document.getElementById("gifContainer");
var animation = bodymovin.loadAnimation({
  wrapper: gifContainer,
  animType: "svg",
  loop: true,
  path: "./assets/shop-animated.json",
});
