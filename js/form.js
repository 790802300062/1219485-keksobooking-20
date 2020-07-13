'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adFormAddress = adForm.querySelector('#address');
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

  var setActive = function () {
    if (!adForm.classList.contains('ad-form--disabled')) {
      return;
    }

    adForm.classList.remove('ad-form--disabled');
    window.utils.changeAccessibility(adFormFieldsets, false);
    setAddressCoord(window.pins.getCoords(true));
    window.photo.avatarChooser.addEventListener('change', window.photo.onAvatarUpload);
    window.photo.accomodationPhotoChooser.addEventListener('change', window.photo.onPhotoUpload);
  };

  var setInactive = function () {
    if (adForm.classList.contains('ad-form--disabled')) {
      return;
    }

    window.photo.resetPhotoInputs();
    adForm.classList.add('ad-form--disabled');
    window.utils.changeAccessibility(adFormFieldsets, true);
    adForm.reset();
  };

  setInactive();

  var createPopup = function (className) {
    var messageTemplate = document.querySelector('#' + className)
      .content
      .querySelector('.' + className);

    var message = messageTemplate.cloneNode(true);
    main.appendChild(message);

    window.utils.onClickClose(message);
    window.utils.onEscClose(message);
  };

  var onError = function () {
    createPopup('error');
  };

  var onSuccess = function () {
    createPopup('success');
    setInactive();
    window.map.setDisabled();
  };

  var onFormSubmit = function (evt) {
    window.validation.checkRoomValidity();
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), onSuccess, onError);
  };

  adForm.addEventListener('submit', onFormSubmit);

  var onFormReset = function (evt) {
    evt.preventDefault();
    if (evt.which === window.const.MOUSE_LEFT_BUTTON) {
      window.card.close();
      setInactive();
      window.map.setDisabled();
    }
  };

  resetButton.addEventListener('mousedown', onFormReset);

  window.form = {
    setActive: setActive,
    setAddressCoord: setAddressCoord,
    setInitialAddress: setInitialAddress,
    onError: onError
  };

})();
