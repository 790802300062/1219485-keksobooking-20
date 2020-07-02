'use strict';

(function () {

  var PinGap = {
    X: 50,
    Y: 70
  };

  var adForm = document.querySelector('.ad-form');
  var mapPinButton = document.querySelector('.map__pin--main');
  var addressInput = adForm.querySelector('#address');
  var map = document.querySelector('.map');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFiltersElement = document.querySelector('.map__filters');
  var mapFilterSelects = mapFiltersElement.querySelectorAll('select');

  var renderMapPins = function () {
    var fragment = document.createDocumentFragment();
    var createAdv = window.advert.createAds();
    for (var i = 0; i < window.data.ADS_COUNT; i++) {
      fragment.appendChild(createPin(createAdv[i]));
    }

    document.querySelector('.map__pins').appendChild(fragment);
  };

  var changeAccessibility = function (controls) {
    controls.forEach(function (item) {
      item.disabled = !item.disabled;
    });
  };

  changeAccessibility(adFormFieldsets);
  changeAccessibility(mapFilterSelects);

  var onMapPinPress = function (evt) {
    if (evt.keyCode === window.data.KeyCode.ENTER || evt.which === window.data.MOUSE_LEFT_BUTTON) {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      changeAccessibility(adFormFieldsets);
      changeAccessibility(mapFilterSelects);

      mapPinButton.removeEventListener('mousedown', onMapPinPress);
      mapPinButton.removeEventListener('keydown', onMapPinPress);
      renderMapPins();
    }
  };

  mapPinButton.addEventListener('mousedown', onMapPinPress);
  mapPinButton.addEventListener('keydown', onMapPinPress);

  addressInput.value = Math.round(mapPinButton.offsetLeft - (window.data.MainPinSize.WIDTH / 2))
                      + ', ' + Math.round(mapPinButton.offsetTop - (window.data.MainPinSize.HEIGHT / 2));
  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var createPin = function (adv) {
    var mapPin = pinTemplate.cloneNode(true);

    mapPin.style.left = adv.location.x - PinGap.X + 'px';
    mapPin.style.top = adv.location.y - PinGap.Y + 'px';
    mapPin.querySelector('img').alt = adv.offer.title;
    mapPin.querySelector('img').src = adv.author.avatar;

    return mapPin;
  };

  var pinFragment = document.createDocumentFragment();
  var filtersContainer = document.querySelector('.map__filters-container');

  var insertPins = function () {
    var pins = [];
    for (var i = 0; i < window.advert.ads.length; i++) {
      pins.push(createPin(window.advert.ads[i]));
      pinFragment.appendChild(pins[i]);
    }

    return pins;
  };

  var pins = insertPins();

  window.pin = {
    map: map,
    renderMapPins: renderMapPins,
    filtersContainer: filtersContainer,
    pins: pins
  };
})();

