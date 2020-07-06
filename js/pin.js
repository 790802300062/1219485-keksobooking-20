'use strict';

(function () {

  var PinGap = {
    X: 64,
    Y: 64
  };

  var adForm = document.querySelector('.ad-form');
  var mapPinButton = document.querySelector('.map__pin--main');
  var addressInput = adForm.querySelector('#address');
  var map = document.querySelector('.map');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFiltersElement = document.querySelector('.map__filters');
  var mapFilterSelects = mapFiltersElement.querySelectorAll('select');

  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var createPin = function (serverAds) {
    var mapPin = pinTemplate.cloneNode(true);

    mapPin.style.left = serverAds.location.x - PinGap.X + 'px';
    mapPin.style.top = serverAds.location.y - PinGap.Y + 'px';
    mapPin.querySelector('img').alt = serverAds.offer.title;
    mapPin.querySelector('img').src = serverAds.author.avatar;

    return mapPin;
  };

  var renderMapPins = function (serverAds) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < serverAds.length; i++) {
      fragment.appendChild(createPin(serverAds[i]));
    }

    document.querySelector('.map__pins').appendChild(fragment);
  };

  var adsContainer = [];

  addressInput.value = Math.round(mapPinButton.offsetLeft + (window.const.MainPinSize.WIDTH / 2))
                      + ', ' + Math.round(mapPinButton.offsetTop + (window.const.MainPinSize.HEIGHT / 2));

  var changeAccessibility = function (controls) {
    controls.forEach(function (item) {
      item.disabled = !item.disabled;
    });
  };

  var pinFragment = document.createDocumentFragment();

  var insertPins = function (serverAds) {
    var pins = [];
    for (var i = 0; i < serverAds.length; i++) {
      pins.push(createPin(serverAds[i]));
      pinFragment.appendChild(pins[i]);
    }

    return pins;
  };

  var pins = insertPins(adsContainer);

  changeAccessibility(adFormFieldsets);
  changeAccessibility(mapFilterSelects);

  var onMapPinPress = function (evt) {
    if (evt.keyCode === window.const.KeyCode.ENTER || evt.which === window.const.MOUSE_LEFT_BUTTON) {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      changeAccessibility(adFormFieldsets);
      changeAccessibility(mapFilterSelects);

      mapPinButton.removeEventListener('mousedown', onMapPinPress);
      mapPinButton.removeEventListener('keydown', onMapPinPress);

    }

    addressInput.value = Math.round(mapPinButton.offsetLeft + (window.const.MainPinSize.WIDTH / 2))
                         + ', ' + Math.round(mapPinButton.offsetTop + window.const.MainPinSize.HEIGHT
                         + window.const.MainPinSize.NEEDLE);
  };

  mapPinButton.addEventListener('mousedown', onMapPinPress);
  mapPinButton.addEventListener('keydown', onMapPinPress);

  var filtersContainer = document.querySelector('.map__filters-container');

  window.pin = {
    map: map,
    mapPinButton: mapPinButton,
    renderMapPins: renderMapPins,
    filtersContainer: filtersContainer,
    pins: pins,
    addressInput: addressInput,
    adsContainer: adsContainer
  };
})();

