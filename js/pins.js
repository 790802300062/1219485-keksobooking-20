'use strict';

(function () {

  var PinSize = {
    HEIGHT: 70,
    WIDTH: 50
  };

  var MainPinSize = {
    WIDTH: 62,
    HEIGHT: 62,
    NEEDLE: 22,
    START_TOP: 375,
    START_LEFT: 570
  };

  var PIN_MAX_AMOUNT = 5;

  var fragment = document.createDocumentFragment();
  var mainPin = document.querySelector('.map__pin--main');
  var pinsContainer = document.querySelector('.map__pins');
  var offers = [];

  var pin = document.querySelector('#pin')
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


  var createPin = function (adv) {
    var mapPin = pin.cloneNode(true);
    var pinImg = mapPin.querySelector('img');

    mapPin.style.left = adv.location.x - PinSize.WIDTH + 'px';
    mapPin.style.top = adv.location.y - PinSize.HEIGHT + 'px';

    pinImg.alt = adv.offer.title;
    pinImg.src = adv.author.avatar;

    fragment.appendChild(mapPin);
  };

  var loadAds = function () {
    window.backend.load(function (ads) {
      for (var i = 0; i < ads.length; i++) {
        if (ads[i].offer) {
          offers.push(ads[i]);

          if (i < PIN_MAX_AMOUNT) {
            createPin(ads[i]);
          }
        }

        pinsContainer.appendChild(fragment);
      }
    });
  };

  var renderPins = function (advs) {
    advs.forEach(function (item) {
      createPin(item);
    });

    pinsContainer.appendChild(fragment);
  };

  pinsContainer.addEventListener('click', onMapPinsContainerClick);

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    console.log(pins);
    pins.forEach(function (item) {
      item.remove();
    });
  };

  var moveMainPinToCenter = function () {
    mainPin.style.top = MainPinSize.START_TOP + 'px';
    mainPin.style.left = MainPinSize.START_LEFT + 'px';
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === window.const.MOUSE_LEFT_BUTTON) {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      window.form.setActive();
      window.map.setEnabled();

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var mainPinPosition = {
          x: mainPin.offsetLeft - shift.x,
          y: mainPin.offsetTop - shift.y
        };

        var mapBorder = {
          TOP: window.const.MapSize.MIN_Y - (MainPinSize.HEIGHT + MainPinSize.NEEDLE),
          BOTTOM: window.const.MapSize.MAX_Y - (MainPinSize.HEIGHT + MainPinSize.NEEDLE),
          LEFT: window.const.MapSize.MIN_X - MainPinSize.WIDTH / 2,
          RIGHT: window.const.MapSize.MAX_X - MainPinSize.WIDTH / 2
        };

        if (mainPinPosition.x >= mapBorder.LEFT && mainPinPosition.x <= mapBorder.RIGHT) {
          mainPin.style.left = mainPinPosition.x + 'px';
        }

        if (mainPinPosition.y >= mapBorder.TOP && mainPinPosition.y <= mapBorder.BOTTOM) {
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
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (window.util.isEnterKey(evt)) {
      window.form.setActive();
      window.map.setEnabled();
    }
  });

  var getMainPinCoord = function (state) {
    var needleCoord = state ? MainPinSize.HEIGHT / 2 + MainPinSize.NEEDLE : 0;
    var coordX = mainPin.offsetLeft + MainPinSize.WIDTH / 2;
    var coordY = mainPin.offsetTop + MainPinSize.HEIGHT / 2 + needleCoord;

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
    offers: offers,
    MainSize: MainPinSize,
    render: renderPins
  };
})();
