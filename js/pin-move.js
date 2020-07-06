'use strict';

(function () {

  var CoordsY = {
    MIN: 130,
    MAX: 630
  };

  var offsetWidth = document.querySelector('.map__pins').offsetWidth;

  var onMainPinMove = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      var pinCoords = {
        x: (window.pin.mapPinButton.offsetLeft - shift.x)
           + Math.round(window.const.MainPinSize.WIDTH / 2),

        y: ((window.pin.mapPinButton.offsetTop - shift.y)
           + window.const.MainPinSize.HEIGHT + window.const.MainPinSize.NEEDLE),
      };

      if (pinCoords.y >= CoordsY.MIN &&
          pinCoords.y <= CoordsY.MAX &&
          pinCoords.x >= 0 &&
          pinCoords.x <= window.advert.offsetWidth) {
        window.pin.mapPinButton.style.top = (window.pin.mapPinButton.offsetTop - shift.y) + 'px';
        window.pin.mapPinButton.style.left = (window.pin.mapPinButton.offsetLeft - shift.x) + 'px';
      }

      if (pinCoords.x > offsetWidth) {
        pinCoords.x = offsetWidth;
      } else if (pinCoords.x < 0) {
        pinCoords.x = 0;
      }

      if (pinCoords.y > CoordsY.MAX) {
        pinCoords.y = CoordsY.MAX;
      } else if (pinCoords.y < CoordsY.MIN) {
        pinCoords.y = CoordsY.MIN;
      }

      window.pin.addressInput.value = pinCoords.x + ', ' + pinCoords.y;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.pin.mapPinButton.addEventListener('mousedown', onMainPinMove);
})();
