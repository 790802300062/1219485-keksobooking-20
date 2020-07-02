'use strict';

(function () {

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
           + window.const.MainPinSize.HEIGHT),
      };

      if (pinCoords.y >= window.advert.CoordsY.MIN &&
          pinCoords.y <= window.advert.CoordsY.MAX &&
          pinCoords.x >= 0 &&
          pinCoords.x <= window.advert.offsetWidth) {
        window.pin.mapPinButton.style.top = (window.pin.mapPinButton.offsetTop - shift.y) + 'px';
        window.pin.mapPinButton.style.left = (window.pin.mapPinButton.offsetLeft - shift.x) + 'px';
      }

      if (pinCoords.x > window.advert.offsetWidth) {
        pinCoords.x = window.advert.offsetWidth;
      } else if (pinCoords.x < 0) {
        pinCoords.x = 0;
      }

      if (pinCoords.y > window.advert.CoordsY.MAX) {
        pinCoords.y = window.advert.CoordsY.MAX;
      } else if (pinCoords.y < window.advert.CoordsY.MIN) {
        pinCoords.y = window.advert.CoordsY.MIN;
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
