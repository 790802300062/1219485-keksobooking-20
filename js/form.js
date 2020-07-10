'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adFormAddress = adForm.querySelector('#address');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var main = document.querySelector('main');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var mapPinButton = document.querySelector('.map__pin--main');

  var setInitialAddress = function () {
    adFormAddress.value = Math.round(mapPinButton.offsetLeft + (window.pins.MainSize.WIDTH / 2))
    + ', ' + Math.round(mapPinButton.offsetTop + (window.pins.MainSize.HEIGHT / 2));
  };

  setInitialAddress();

  var setAddressCoord = function (coord) {
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

  var setActive = function () {
    if (adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.remove('ad-form--disabled');
      window.utils.changeAccessibility(adFormFieldsets, false);
      setAddressCoord(window.pins.getCoords(true));
      addFormListener();
    }
  };

  var setInactive = function () {
    if (!adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.add('ad-form--disabled');
      window.utils.changeAccessibility(adFormFieldsets, true);
      removeFormListener();
      adForm.reset();
    }
  };

  setInactive();

  var createSuccessfulMessage = function () {
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

    var successMessage = successTemplate.cloneNode(true);
    main.appendChild(successMessage);

    window.utils.onClickClose(successMessage);
    window.utils.onEscClose(successMessage);
  };

  var createErrorMessage = function () {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

    var errorMessage = errorTemplate.cloneNode(true);
    main.appendChild(errorMessage);

    window.utils.onClickClose(errorMessage);
    window.utils.onEscClose(errorMessage);
  };

  var onSuccess = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), function () {
      createSuccessfulMessage();
      setInactive();
      window.map.setDisabled();
    });
  };

  adForm.addEventListener('submit', onSuccess, createErrorMessage);


  resetButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (evt.which === window.const.MOUSE_LEFT_BUTTON) {
      window.card.close();
      setInactive();
      window.map.setDisabled();
    }
  });

  window.form = {
    setActive: setActive,
    setAddressCoord: setAddressCoord,
    createErrorMessage: createErrorMessage,
    setInitialAddress: setInitialAddress
  };

})();
