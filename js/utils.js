'use strict';

(function () {

  var DEBOUNCE_TIME = 500;

  var lastTimeout = null;

  var changeAccessibility = function (controls, state) {
    controls.forEach(function (control) {
      control.disabled = state;
    });
  };

  var isEscKey = function (key) {
    return key === window.const.Key.ESCAPE;
  };

  var isEnterKey = function (key) {
    return key === window.const.Key.ENTER;
  };

  var addClickListener = function (popup, className) {
    var onPopupClick = function (evt) {
      if ((evt.target.classList.contains(className + '__message'))) {
        return;
      }

      popup.remove();
      document.removeEventListener('click', onPopupClick);
    };

    document.addEventListener('click', onPopupClick);
  };

  var addEscListener = function (popup) {
    var onPopupEscPress = function (evt) {
      popup.tabindex = '1';
      popup.focus();

      if (isEscKey(evt.key)) {
        popup.remove();
        document.removeEventListener('keydown', onPopupEscPress);
      }
    };

    document.addEventListener('keydown', onPopupEscPress);
  };

  var debounce = function (onTimeout) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      onTimeout();
    }, DEBOUNCE_TIME);
  };

  var createPhoto = function (photo) {
    var photoElement = document.createElement('img');
    photoElement.src = photo;
    photoElement.width = window.const.CardPhotoSize.WIDTH;
    photoElement.height = window.const.CardPhotoSize.HEIGHT;

    return photoElement;
  };

  var createFeature = function (feature) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', 'popup__feature--' + feature);

    return featureElement;
  };

  window.utils = {
    changeAccessibility: changeAccessibility,
    debounce: debounce,
    isEscKey: isEscKey,
    isEnterKey: isEnterKey,
    addClickListener: addClickListener,
    addEscListener: addEscListener,
    createPhoto: createPhoto,
    createFeature: createFeature
  };
})();

