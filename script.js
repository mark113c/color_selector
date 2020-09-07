"use strict";

document
  .querySelector(".color_selector")
  .addEventListener("input", changeColor);

function changeColor() {
  // Gets HEX color from the color selector
  const currentHEX = this.value;
  console.log(currentHEX);

  // Sets color of background
  document
    .querySelector(".color_preview")
    .style.setProperty("--preview_color", currentHEX);

  // Shows color value in text
  document.querySelector(".hex_value").textContent = currentHEX.toString();

  // Calls to the other functions
  setRGB(currentHEX);
}

function setRGB(hex) {
  const hexR = hex.substring(1, 3);
  const red = parseInt(hexR, 16);
  const hexG = hex.substring(3, 5);
  const green = parseInt(hexG, 16);
  const hexB = hex.substring(5, 7);
  const blue = parseInt(hexB, 16);

  document.querySelector(".rgb_value").textContent =
    red + ", " + green + ", " + blue;

  console.log({ red, green, blue });
  setHSL(red, green, blue);
}

function setHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  let hShort = h.toString().substring(0, 3);
  let sShort = s.toString().substring(0, 2);
  let lShort = l.toString().substring(0, 2);

  document.querySelector(".hsl_value").textContent =
    hShort + ", " + sShort + "%, " + lShort;
}
