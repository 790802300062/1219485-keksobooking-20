'use strict';
(function () {

  var DEFAULT_ERROR_MESSAGE = 'Неверно заполнено поле';

  var minTypePrice = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var roomsToGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var roomsAmountErrorMessage = {
    '1': 'Можно выбрать только 1-го гостя',
    '2': 'Можно выбрать 1-го или 2-х гостей',
    '3': 'Можно выбрать 1-го, 2-х или 3-х гостей',
    '100': 'Не для гостей'
  };

  var adForm = document.querySelector('.ad-form');
  var roomNumberInput = adForm.querySelector('#room_number');
  var capacityInput = adForm.querySelector('#capacity');
  var accomodationTypeInput = document.querySelector('#type');
  var accomodationMinPrice = document.querySelector('#price');
  var checkinInput = adForm.querySelector('#timein');
  var checkoutInput = adForm.querySelector('#timeout');

  var checkRoomValidity = function () {
    var validGuestsAmount = roomsToGuests[roomNumberInput.value];
    var errorMessage = '';

    if (validGuestsAmount.indexOf(capacityInput.value) === -1) {
      errorMessage = roomsAmountErrorMessage[roomNumberInput.value] || DEFAULT_ERROR_MESSAGE;
    }

    capacityInput.setCustomValidity(errorMessage);
  };

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
    checkRoomValidity: checkRoomValidity
  };
})();
