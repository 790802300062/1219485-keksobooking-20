'use strict';

(function () {

  var MessageClass = {
    SUCCESS: 'success',
    ERROR: 'error'
  };

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adFormAddress = adForm.querySelector('#address');
  var mainElement = document.querySelector('main');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var mapPinButton = document.querySelector('.map__pin--main');
  var formInputs = adForm.querySelectorAll('input, select');

  var setInitialAddress = function () {
    adFormAddress.value = Math.round(mapPinButton.offsetLeft + (window.pins.MainSize.WIDTH / window.const.HALF_SIZE))
    + ', ' + Math.round(mapPinButton.offsetTop + (window.pins.MainSize.HEIGHT / window.const.HALF_SIZE));
  };

  setInitialAddress();

  var setAddressCoord = function (coord) {
    adFormAddress.value = Math.round(coord.x) + ', ' + Math.round(coord.y);
  };

  var removeHighlight = function (inputs) {
    inputs.forEach(function (input) {
      if (input.classList.contains('error-form')) {
        input.classList.remove('error-form');
      }
    });
  };

  var setActive = function () {
    if (!adForm.classList.contains('ad-form--disabled')) {
      return;
    }

    adForm.classList.remove('ad-form--disabled');
    window.utils.changeAccessibility(adFormFieldsets, false);
    setAddressCoord(window.pins.getCoords(true));
    window.photo.avatarChooser.addEventListener('change', window.photo.onAvatarUpload);
    window.photo.accomodationPicChooser.addEventListener('change', window.photo.onUpload);
  };

  var setInactive = function () {
    if (adForm.classList.contains('ad-form--disabled')) {
      return;
    }

    removeHighlight(formInputs);
    window.photo.resetInputs();
    adForm.classList.add('ad-form--disabled');
    window.utils.changeAccessibility(adFormFieldsets, true);
    adForm.reset();
    window.validation.setTypePrice();
  };

  setInactive();

  var createPopup = function (className) {
    var popupTemplate = document.querySelector('#' + className)
        .content
        .querySelector('.' + className);

    var popup = popupTemplate.cloneNode(true);
    mainElement.appendChild(popup);

    window.utils.addClickListener(popup, className);
    window.utils.addEscListener(popup);
  };

  var onError = function () {
    createPopup(MessageClass.ERROR);
  };

  var onSuccess = function () {
    createPopup(MessageClass.SUCCESS);
    setInactive();
    window.map.setDisabled();
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.validation.checkFormFields(formInputs);
    window.validation.checkRoomValidity();
    window.card.close();
    window.backend.upload(new FormData(adForm), onSuccess, onError);
  };

  adForm.addEventListener('submit', onFormSubmit);

  var onFormReset = function (evt) {
    evt.preventDefault();
    window.card.close();
    setInactive();
    window.map.setDisabled();
  };

  resetButton.addEventListener('mousedown', onFormReset);

  window.form = {
    setActive: setActive,
    setAddressCoord: setAddressCoord,
    setInitialAddress: setInitialAddress,
    onError: onError
  };
})();
