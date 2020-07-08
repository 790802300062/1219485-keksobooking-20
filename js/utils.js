'use strict';

(function () {

  var changeAccessibility = function (controls, state) {
    controls.forEach(function (item) {
      item.disabled = state;
    });
  };

  var isEscKey = function (evt) {
    return evt.key === window.const.KeyCode.ESCAPE;
  };

  var isEnterKey = function (evt) {
    return evt.key === window.const.KeyCode.ENTER;
  };

  var onClickClose = function (element) {
    document.addEventListener('click', function () {
      element.remove();
    });
  };

  var onEscPressClose = function (element) {
    document.addEventListener('keydown', function (evt) {
      if (isEscKey(evt)) {
        element.remove();
      }
    });
  };

  window.utils = {
    changeAccessibility: changeAccessibility,
    isEscKey: isEscKey,
    isEnterKey: isEnterKey,
    onClickClose: onClickClose,
    onEscPressClose: onEscPressClose
  };
})();

