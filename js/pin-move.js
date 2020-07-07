'use strict';

(function () {

  var CoordY = {
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

      var pinCoord = {
        x: (window.map.mapPinButton.offsetLeft - shift.x)
           + Math.round(window.const.MainPinSize.WIDTH / 2),

        y: ((window.map.mapPinButton.offsetTop - shift.y)
           + window.const.MainPinSize.HEIGHT + window.const.MainPinSize.NEEDLE),
      };

      if (pinCoord.y >= CoordY.MIN &&
          pinCoord.y <= CoordY.MAX &&
          pinCoord.x >= 0 &&
          pinCoord.x <= offsetWidth) {
        window.map.mapPinButton.style.top = (window.map.mapPinButton.offsetTop - shift.y) + 'px';
        window.map.mapPinButton.style.left = (window.map.mapPinButton.offsetLeft - shift.x) + 'px';
      }

      if (pinCoord.x > offsetWidth) {
        pinCoord.x = offsetWidth;
      } else if (pinCoord.x < 0) {
        pinCoord.x = 0;
      }

      if (pinCoord.y > CoordY.MAX) {
        pinCoord.y = CoordY.MAX;
      } else if (pinCoord.y < CoordY.MIN) {
        pinCoord.y = CoordY.MIN;
      }

      window.map.addressInput.value = pinCoord.x + ', ' + pinCoord.y;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.map.mapPinButton.addEventListener('mousedown', onMainPinMove);
})();
