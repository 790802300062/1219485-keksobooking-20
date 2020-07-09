'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapSelects = document.querySelectorAll('select');
  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('#address');
  var mapFieldsets = adForm.querySelectorAll('fieldset');
  var mapPinButton = document.querySelector('.map__pin--main');

  var enableMap = function () {
    if (map.classList.contains('map--faded')) {
      window.pin.loadAds();
      map.classList.remove('map--faded');

      window.utils.changeAccessibility(mapSelects, false);
      window.utils.changeAccessibility(mapFieldsets, false);

      window.filter.activateFilters();
    }
  };

  var disableMap = function () {
    if (!map.classList.contains('map--faded')) {
      map.classList.add('map--faded');

      window.utils.changeAccessibility(mapSelects, true);
      window.utils.changeAccessibility(mapFieldsets, true);

      window.pin.removePins();
      window.pin.moveMainPinToCenter();

      adFormAddress.value = Math.round(mapPinButton.offsetLeft + (window.pin.MainPinSize.WIDTH / 2))
                            + ', ' + Math.round(mapPinButton.offsetTop + (window.pin.MainPinSize.HEIGHT / 2));
    }
  };

  disableMap();

  window.map = {
    enableMap: enableMap,
    disableMap: disableMap,
  };
})();
