'use strict';

(function () {

  var PINS_MAX_AMOUNT = 5;
  var NO_NEEDLE_HEIGHT = 0;

  var PinSize = {
    HEIGHT: 70,
    WIDTH: 50
  };

  var MainPinSize = {
    WIDTH: 62,
    HEIGHT: 62,
    NEEDLE: 22,
  };

  var MainPinInitialCoord = {
    TOP: 375,
    LEFT: 570
  };

  var mainPin = document.querySelector('.map__pin--main');
  var pinsContainer = document.querySelector('.map__pins');
  var advertisements = [];

  var pinTemplate = document.querySelector('#pin')
                    .content
                    .querySelector('.map__pin');

  var onMapPinsContainerClick = function (evt) {
    var currentTarget = evt.target;
    var isMainPin = currentTarget.classList.contains('map__pin--main') ||
                    currentTarget.parentNode.classList.contains('map__pin--main');

    if (isMainPin) {
      return;
    }

    if (currentTarget.classList.contains('map__pin')) {
      window.card.show(currentTarget);
      return;
    }

    if (currentTarget.parentNode.classList.contains('map__pin')) {
      window.card.show(currentTarget.parentNode);
    }
  };

  var fragment = document.createDocumentFragment();

  var createPin = function (adv) {
    var mapPin = pinTemplate.cloneNode(true);
    var pinImg = mapPin.querySelector('img');

    mapPin.style.left = adv.location.x - PinSize.WIDTH + 'px';
    mapPin.style.top = adv.location.y - PinSize.HEIGHT + 'px';

    pinImg.alt = adv.offer.title;
    pinImg.src = adv.author.avatar;

    fragment.appendChild(mapPin);
  };

  var loadAds = function () {
    window.backend.load(function (advs) {
      advs.forEach(function (adv) {
        if (adv.offer) {
          advertisements.push(adv);
        }
      });

      var shortAdvs = advertisements.slice(0, PINS_MAX_AMOUNT);
      renderPins(shortAdvs);
    });
  };

  var renderPins = function (advs) {
    advs.forEach(function (adv) {
      createPin(adv);
    });

    pinsContainer.appendChild(fragment);
  };

  pinsContainer.addEventListener('click', onMapPinsContainerClick);

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var moveMainPinToCenter = function () {
    mainPin.style.top = MainPinInitialCoord.TOP + 'px';
    mainPin.style.left = MainPinInitialCoord.LEFT + 'px';
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (!evt.which === window.const.MOUSE_LEFT_BUTTON) {
      return;
    }

    var startCoord = {
      x: evt.clientX,
      y: evt.clientY
    };

    window.form.setActive();
    window.map.setEnabled();

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoord.x - moveEvt.clientX,
        y: startCoord.y - moveEvt.clientY
      };

      startCoord = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mainPinPosition = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      var MapBorder = {
        TOP: window.const.MapSize.MIN_Y - (MainPinSize.HEIGHT + MainPinSize.NEEDLE),
        BOTTOM: window.const.MapSize.MAX_Y - (MainPinSize.HEIGHT + MainPinSize.NEEDLE),
        LEFT: window.const.MapSize.MIN_X - MainPinSize.WIDTH / window.const.HALF_SIZE,
        RIGHT: window.const.MapSize.MAX_X - MainPinSize.WIDTH / window.const.HALF_SIZE
      };

      if (mainPinPosition.x >= MapBorder.LEFT && mainPinPosition.x <= MapBorder.RIGHT) {
        mainPin.style.left = mainPinPosition.x + 'px';
      }

      if (mainPinPosition.y >= MapBorder.TOP && mainPinPosition.y <= MapBorder.BOTTOM) {
        mainPin.style.top = mainPinPosition.y + 'px';
      }

      window.form.setAddressCoord(getMainPinCoord(true));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (!window.utils.isEnterKey(evt.key)) {
      return;
    }

    window.form.setActive();
    window.map.setEnabled();
  });

  var getMainPinCoord = function (isNeedleActive) {
    var needleCoord = isNeedleActive ? MainPinSize.HEIGHT / window.const.HALF_SIZE + MainPinSize.NEEDLE : NO_NEEDLE_HEIGHT;
    var coordX = mainPin.offsetLeft + MainPinSize.WIDTH / window.const.HALF_SIZE;
    var coordY = mainPin.offsetTop + MainPinSize.HEIGHT / window.const.HALF_SIZE + needleCoord;

    return {
      x: coordX,
      y: coordY
    };
  };

  window.pins = {
    loadAds: loadAds,
    remove: removePins,
    moveToCenter: moveMainPinToCenter,
    getCoords: getMainPinCoord,
    advertisements: advertisements,
    MainSize: MainPinSize,
    render: renderPins
  };
})();
