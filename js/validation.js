'use strict';
(function () {

  var minTypePrice = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var adForm = document.querySelector('.ad-form');
  var roomNumberInput = adForm.querySelector('#room_number');
  var capacityInput = adForm.querySelector('#capacity');
  var accomodationTypeInput = document.querySelector('#type');
  var accomodationMinPrice = document.querySelector('#price');
  var checkinInput = adForm.querySelector('#timein');
  var checkoutInput = adForm.querySelector('#timeout');

  var checkRoomValidity = function () {
    if (roomNumberInput.value === 100 && capacityInput.valueguestsValue !== 0) {
      capacityInput.setCustomValidity('Только вариант размещения "Не для гостей"');
      return;
    }

    if (+capacityInput.value > +roomNumberInput.value) {
      capacityInput.setCustomValidity('Слишком много гостей для этого количества комнат!');
      return;
    }

    if (capacityInput.value === '0' && roomNumberInput !== '100') {
      capacityInput.setCustomValidity('Укажите количество гостей!');
      return;
    }

    capacityInput.setCustomValidity('');
  };

  var setTypePrice = function () {
    var typeValue = minTypePrice[accomodationTypeInput.value];
    accomodationMinPrice.min = typeValue;
    accomodationMinPrice.placeholder = typeValue;
  };

  setTypePrice();

  accomodationTypeInput.addEventListener('change', function () {
    setTypePrice();
  });

  checkinInput.addEventListener('change', function () {
    checkoutInput.value = checkinInput.value;
  });

  checkoutInput.addEventListener('change', function () {
    checkinInput.value = checkoutInput.value;
  });

  window.validation = {
    checkRoomValidity: checkRoomValidity
  };
})();
