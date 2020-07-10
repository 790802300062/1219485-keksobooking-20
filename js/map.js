'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapSelects = document.querySelectorAll('select');
  var adForm = document.querySelector('.ad-form');
  var mapFieldsets = adForm.querySelectorAll('fieldset');

  var setEnabled = function () {
    if (!map.classList.contains('map--faded')) {
      return;
    }
    window.pins.loadAds();
    map.classList.remove('map--faded');

    window.utils.changeAccessibility(mapSelects, false);
    window.utils.changeAccessibility(mapFieldsets, false);

    window.filter.setActive();
  };


  var setDisabled = function () {
    if (map.classList.contains('map--faded')) {
      return;
    }
    map.classList.add('map--faded');

    window.utils.changeAccessibility(mapSelects, true);
    window.utils.changeAccessibility(mapFieldsets, true);

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
