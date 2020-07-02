'use strict';

(function () {

  var getRandomArray = function (items) {
    var itemsCount = getRandomNumber(1, items.length);
    var randomNumbers = [];
    for (var i = 0; i < itemsCount; i++) {
      randomNumbers.push(items[i]);
    }

    return randomNumbers;
  };

  var getAvatarCount = function (avatarNumber) {
    avatarNumber = '0' + (avatarNumber + 1);
    return 'img/avatars/user' + avatarNumber + '.png';
  };

  var getRandomNumber = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var getRandomElement = function (items) {
    var randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  };

  window.utils = {
    getRandomArray: getRandomArray,
    getAvatarCount: getAvatarCount,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement
  };
})();
