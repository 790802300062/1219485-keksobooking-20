'use strict';

(function () {

  var MAX_ROOMS_AMOUNT = 100;
  var MIN_GUESTS_AMOUNT = 0;

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
  var formInputs = adForm.querySelectorAll('input, select');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');

  var checkRoomValidity = function () {
    if (roomNumberInput.value === MAX_ROOMS_AMOUNT && capacityInput.valueguestsValue !== MIN_GUESTS_AMOUNT) {
      capacityInput.setCustomValidity('Только вариант размещения "Не для гостей"');
      return;
    }

    if (+capacityInput.value > +roomNumberInput.value) {
      capacityInput.setCustomValidity('Слишком много гостей для этого количества комнат!');
      return;
    }

    if (+capacityInput.value === MIN_GUESTS_AMOUNT && +roomNumberInput !== MAX_ROOMS_AMOUNT) {
      capacityInput.setCustomValidity('Укажите количество гостей!');
      return;
    }

    capacityInput.setCustomValidity('');
  };

  var checkFormFields = function (inputs) {
    inputs.forEach(function (input) {
      if (!input.validity.valid) {
        input.classList.add('error-form');
        return;
      }

      input.classList.remove('error-form');
    });
  };

  adFormSubmit.addEventListener('click', function () {
    checkFormFields(formInputs);
  });

  var onRoomsAmountChange = function () {
    checkRoomValidity();
  };

  var onGuestsAmountChange = function () {
    checkRoomValidity();
  };

  capacityInput.addEventListener('change', onGuestsAmountChange);
  roomNumberInput.addEventListener('change', onRoomsAmountChange);

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
    checkRoomValidity: checkRoomValidity,
    setTypePrice: setTypePrice,
    checkFormFields: checkFormFields
  };
})();
