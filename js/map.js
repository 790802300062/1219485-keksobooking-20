'use strict';

(function () {

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapFieldsets = adForm.querySelectorAll('fieldset');
  var mapFilter = document.querySelector('.map__filters');
  var mapSelects = mapFilter.querySelectorAll('select');
  var featureInputs = mapFilter.querySelectorAll('input[name="features"]');

  var setEnabled = function () {
    window.pins.loadAds();
    map.classList.remove('map--faded');

    window.utils.changeAccessibility(mapSelects, false);
    window.utils.changeAccessibility(mapFieldsets, false);
    window.utils.changeAccessibility(featureInputs, false);
    window.validation.checkRoomValidity();
  };


  var setDisabled = function () {
    map.classList.add('map--faded');

    window.utils.changeAccessibility(mapSelects, true);
    window.utils.changeAccessibility(mapFieldsets, true);
    window.utils.changeAccessibility(featureInputs, true);

    window.pins.remove();
    window.pins.moveToCenter();

    window.form.setInitialAddress();
  };

  setDisabled();

  window.map = {
    setEnabled: setEnabled,
    setDisabled: setDisabled,
  };
})();
