'use strict';

(function () {

  var HALF_SIZE_DIVIDER = 2;
  var MOUSE_LEFT_BUTTON = 1;

  var MapSize = {
    MIN_X: 0,
    MAX_X: 1200,
    MIN_Y: 130,
    MAX_Y: 630
  };

  var Key = {
    ENTER: 'Enter',
    ESCAPE: 'Escape'
  };

  var CardPhotoSize = {
    WIDTH: 45,
    HEIGHT: 40
  };

  var AvatarPhotoSize = {
    WIDTH: 70,
    HEIGHT: 70
  };

  window.const = {
    MapSize: MapSize,
    MOUSE_LEFT_BUTTON: MOUSE_LEFT_BUTTON,
    Key: Key,
    CardPhotoSize: CardPhotoSize,
    HALF_SIZE: HALF_SIZE_DIVIDER,
    AvatarPhotoSize: AvatarPhotoSize
  };
})();
