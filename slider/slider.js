const slider = document.getElementsByClassName('points')[0];


function setPoints(pts) {
  slider.innerText = pts;
}

setPoints(1);

function getTouchCoordinates(event) {
  let touch = event.changedTouches[0];
  return {
    x: touch.clientX,
    y: touch.clientY
  };
}

let initialPosition;

function setInitialPosition(event) {
  initialPosition = getTouchCoordinates(event);
  console.log(initialPosition);
}

function onSliderDrag(event) {
  const current = getTouchCoordinates(event);
  const diff = initialPosition.x - current.x;
  let points = Math.pow(10, Math.round(diff * 0.015));
  points = Math.max(1, points);
  points = Math.min(1000000, points);
  setPoints(points);
}

function resetInitialPosition(event) {
  initialPosition = {
    x: null,
    y: null
  };
}

resetInitialPosition(null);

slider.addEventListener('touchstart', setInitialPosition);
slider.addEventListener('touchmove', onSliderDrag);
slider.addEventListener('touchend', resetInitialPosition);
slider.addEventListener('touchcancel', resetInitialPosition);
