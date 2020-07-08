'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var adFormAddress = adForm.querySelector('#address');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var main = document.querySelector('main');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var mapPinButton = document.querySelector('.map__pin--main');

  adFormAddress.value = Math.round(mapPinButton.offsetLeft + (window.pin.MainPinSize.WIDTH / 2))
  + ', ' + Math.round(mapPinButton.offsetTop + (window.pin.MainPinSize.HEIGHT / 2));


  var getAddressCoord = function (coord) {
    adFormAddress.value = Math.round(coord.x) + ', ' + Math.round(coord.y);
  };

  var onFormSubmitClick = function () {
    window.validation.checkRoomValidity();
  };

  var addFormListener = function () {
    adFormSubmit.addEventListener('click', onFormSubmitClick);
  };

  var removeFormListener = function () {
    adFormSubmit.removeEventListener('click', onFormSubmitClick);
  };

  var enableForm = function () {
    if (adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.remove('ad-form--disabled');
      window.utils.changeAccessibility(adFormFieldset, false);
      getAddressCoord(window.pin.getMainPinCoords(true));
      addFormListener();
    }
  };

  var disableForm = function () {
    if (!adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.add('ad-form--disabled');
      window.utils.changeAccessibility(adFormFieldset, true);
      removeFormListener();
      adForm.reset();
    }
  };

  disableForm();

  var createSuccessfulMessage = function () {
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

    var successMessage = successTemplate.cloneNode(true);
    main.appendChild(successMessage);

    window.utils.onClickClose(successMessage);
    window.utils.onEscPressClose(successMessage);
  };

  var createErrorMessage = function () {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

    var errorMessage = errorTemplate.cloneNode(true);
    main.appendChild(errorMessage);

    window.utils.onClickClose(errorMessage);
    window.utils.onEscPressClose(errorMessage);
  };

  var onSuccess = function (evt) {
    window.backend.upload(new FormData(adForm), function () {
      evt.preventDefault();
      createSuccessfulMessage();
      disableForm();
      window.map.disableMap();
    });
  };

  adForm.addEventListener('submit', onSuccess, createErrorMessage);


  resetButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (evt.which === window.const.MOUSE_LEFT_BUTTON) {
      window.card.closeCard();
      disableForm();
      window.map.disableMap();
    }
  });

  window.form = {
    enableForm: enableForm,
    disableForm: disableForm,
    getAddressCoord: getAddressCoord
  };

})();
