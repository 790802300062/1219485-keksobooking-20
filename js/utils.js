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


  var onClickClose = function (element) {
    document.addEventListener('click', function () {
      element.remove();
    });
  };

  var onEscClose = function (element) {
    document.addEventListener('keydown', function (evt) {
      if (isEscKey(evt.key)) {
        element.remove();
      }
    });
  };

  var debounce = function (onTimeout) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      onTimeout();
    }, DEBOUNCE_TIME);
  };

  window.utils = {
    changeAccessibility: changeAccessibility,
    debounce: debounce,
    isEscKey: isEscKey,
    isEnterKey: isEnterKey,
    onClickClose: onClickClose,
    onEscClose: onEscClose
  };
})();

