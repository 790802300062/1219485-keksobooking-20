'use strict';

(function () {

  var PinGap = {
    X: 64,
    Y: 64
  };


  var pinTemplate = document.querySelector('#pin')
                    .content
                    .querySelector('.map__pin');

  var createPin = function (serverAd) {
    var mapPin = pinTemplate.cloneNode(true);

    mapPin.style.left = serverAd.location.x - PinGap.X + 'px';
    mapPin.style.top = serverAd.location.y - PinGap.Y + 'px';
    mapPin.querySelector('img').alt = serverAd.offer.title;
    mapPin.querySelector('img').src = serverAd.author.avatar;

    return mapPin;
  };

  var renderMapPins = function (serverAds) {
    var fragment = document.createDocumentFragment();

    serverAds.forEach(function (advert) {
      fragment.appendChild(createPin(advert));
    });

    document.querySelector('.map__pins').appendChild(fragment);
  };

  window.pin = {
    renderMapPins: renderMapPins
  };
})();

