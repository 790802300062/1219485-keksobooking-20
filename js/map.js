'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFiltersElement = document.querySelector('.map__filters');
  var mapFilterSelects = mapFiltersElement.querySelectorAll('select');
  var addressInput = adForm.querySelector('#address');
  var map = document.querySelector('.map');
  var mapPinButton = document.querySelector('.map__pin--main');


  var changeAccessibility = function (controls) {
    controls.forEach(function (item) {
      item.disabled = !item.disabled;
    });
  };

  changeAccessibility(adFormFieldsets);
  changeAccessibility(mapFilterSelects);

  addressInput.value = Math.round(mapPinButton.offsetLeft + (window.const.MainPinSize.WIDTH / 2))
  + ', ' + Math.round(mapPinButton.offsetTop + (window.const.MainPinSize.HEIGHT / 2));

  var onMapPinPress = function (evt) {
    if (evt.keyCode === window.const.KeyCode.ENTER || evt.which === window.const.MOUSE_LEFT_BUTTON) {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      window.map.changeAccessibility(adFormFieldsets);
      window.map.changeAccessibility(mapFilterSelects);

      mapPinButton.removeEventListener('mousedown', onMapPinPress);
      mapPinButton.removeEventListener('keydown', onMapPinPress);
    }

    addressInput.value = Math.round(mapPinButton.offsetLeft + (window.const.MainPinSize.WIDTH / 2))
                         + ', ' + Math.round(mapPinButton.offsetTop + window.const.MainPinSize.HEIGHT
                         + window.const.MainPinSize.NEEDLE);
  };

  mapPinButton.addEventListener('mousedown', onMapPinPress);
  mapPinButton.addEventListener('keydown', onMapPinPress);

  var adverts = [];


  window.map = {
    changeAccessibility: changeAccessibility,
    addressInput: addressInput,
    mapPinButton: mapPinButton,
    adverts: adverts
  };
})();
