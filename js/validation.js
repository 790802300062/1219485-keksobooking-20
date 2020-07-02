'use strict';
(function () {

  var roomNumberInput = document.querySelector('#room_number');
  var capacityInput = document.querySelector('#capacity');

  var onInputChange = function () {
    if (roomNumberInput.value === '100' && capacityInput.value !== '0') {
      capacityInput.setCustomValidity('Не для гостей!');
      return;
    }

    if (capacityInput.value === '0' && roomNumberInput.value !== '100') {
      capacityInput.setCustomValidity('Укажите количество гостей!');
      return;
    }

    if (+capacityInput.value > +roomNumberInput.value) {
      capacityInput.setCustomValidity('Слишком много гостей для этого количества комнат!');
      return;
    }

    capacityInput.setCustomValidity('');
  };

  capacityInput.addEventListener('change', onInputChange);
  roomNumberInput.addEventListener('change', onInputChange);

  var accomodationTypeInput = document.querySelector('#type');
  var accomodationMinPrice = document.querySelector('#price');

  var minTypePrice = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
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

  var checkinInput = document.querySelector('#timein');
  var checkoutInput = document.querySelector('#timeout');

  checkinInput.addEventListener('change', function () {
    checkoutInput.value = checkinInput.value;
  });
  checkoutInput.addEventListener('change', function () {
    checkinInput.value = checkoutInput.value;
  });
})();
