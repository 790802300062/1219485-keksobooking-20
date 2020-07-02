'use strict';

(function () {

  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало недалеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var CHECKINS = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var CHECKOUTS = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var RoomCount = {
    MIN: 1,
    MAX: 5
  };
  var GuestsCount = {
    MIN: 1,
    MAX: 10
  };
  var CoordsY = {
    MIN: 130,
    MAX: 630
  };
  var RoomPrice = {
    MIN: 1000,
    MAX: 1000000
  };

  var offsetWidth = document.querySelector('.map__pins').offsetWidth;


  var createAdvertisement = function (avatarNumber) {
    var locationX = window.utils.getRandomNumber(0, offsetWidth);
    var locationY = window.utils.getRandomNumber(CoordsY.MIN, CoordsY.MAX);

    var advert = {
      'author': {
        'avatar': window.utils.getAvatarCount(avatarNumber)
      },
      'offer': {
        'title': window.utils.getRandomElement(TITLES),
        'address': locationX + ', ' + locationY,
        'price': window.utils.getRandomNumber(RoomPrice.MIN, RoomPrice.MAX),
        'type': window.utils.getRandomElement(TYPES),
        'rooms': window.utils.getRandomNumber(RoomCount.MIN, RoomCount.MAXOOM_COUNT_MAX),
        'guests': window.utils.getRandomNumber(GuestsCount.MIN, GuestsCount.MAX),
        'checkin': window.utils.getRandomElement(CHECKINS),
        'checkout': window.utils.getRandomElement(CHECKOUTS),
        'features': window.utils.getRandomArray(FEATURES),
        'description': 'Очень красивая квартира. Рядом много достопримечательностей',
        'photos': window.utils.getRandomArray(PHOTOS),
      },
      'location': {
        'x': locationX,
        'y': locationY,
      }
    };

    return advert;
  };

  function createAds() {
    var adverts = [];
    for (var i = 0; i < window.const.ADS_COUNT; i++) {
      adverts.push(createAdvertisement(i));
    }

    return adverts;
  }

  var ads = createAds();

  window.advert = {
    ads: ads,
    createAds: createAds,
    CoordsY: CoordsY,
    offsetWidth: offsetWidth
  };
})();
