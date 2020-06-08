'use strict';

var adAttributes = {
  ADS_AMOUNT: 8,
  MIN_Y: 130,
  MAX_Y: 630,
  PRICE_MIN: 1000,
  PRICE_MAX: 1000000,
  ROOM_QTY_MIN: 1,
  ROOM_QTY_MAX: 5,
  GUESTS_QTY_MIN: 1,
  GUESTS_QTY_MAX: 10,
  TITLES: ['Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало недалеко от моря',
    'Неуютное бунгало по колено в воде'],
  TYPES: ['palace',
    'flat',
    'house',
    'bungalo'],
  CHECKINS: ['12:00',
    '13:00',
    '14:00'],
  CHECKOUTS: ['12:00',
    '13:00',
    '14:00'],
  FEATURES: ['wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'],
  PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  PIN_GAP_X: 50,
  PIN_GAP_Y: 70
};

var offsetWidth = document.querySelector('.map__pins').offsetWidth;

function createAd(i) {
  var locationX = getRandomNumber(0, offsetWidth);
  var locationY = getRandomNumber(adAttributes.MIN_Y, adAttributes.MAX_Y);
  var addressCoordinates = locationX + ', ' + locationY;
  var advert = {
    'author': {
      'avatar': getAvatarUrl(i)
    },
    'offer': {
      'title': 'Заголовок объявления',
      'address': addressCoordinates,
      'price': getRandomNumber(adAttributes.PRICE_MIN, adAttributes.PRICE_MAX),
      'type': getRandomElement(adAttributes.TYPES),
      'rooms': getRandomNumber(adAttributes.ROOM_QTY_MIN, adAttributes.ROOM_QTY_MAX),
      'guests': getRandomNumber(adAttributes.GUESTS_QTY_MIN, adAttributes.GUESTS_QTY_MAX),
      'checkin': getRandomElement(adAttributes.CHECKINS),
      'checkout': getRandomElement(adAttributes.CHECKOUTS),
      'features': getRandomElement(adAttributes.FEATURES),
      'description': 'Очень красивая квартира. Рядом много достопримечательностей',
      'photos': getRandomElement(adAttributes.PHOTOS),
    },
    'location': {
      'x': locationX,
      'y': locationY,
    }
  };

  return advert;
}

function getAvatarUrl(i) {
  var avatarNumber = '0' + (i + 1);
  return 'img/avatars/user' + avatarNumber + '.png';
}

function getRandomNumber(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getRandomElement(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function createAdsCollection() {
  var adverts = [];
  for (var i = 0; i < adAttributes.ADS_AMOUNT; i++) {
    adverts.push(createAd(i));
  }

  return adverts;
}
createAdsCollection();

document.querySelector('.map').classList.remove('map--faded');

var pin = document.querySelector('#pin')
          .content
          .querySelector('.map__pin');

function createPin(adv) {
  var mapPin = pin.cloneNode(true);
  mapPin.style.left = adv.location.x - adAttributes.PIN_GAP_X + 'px';
  mapPin.style.top = adv.location.y - adAttributes.PIN_GAP_Y + 'px';
  mapPin.querySelector('img').alt = adv.offer.title;
  mapPin.querySelector('img').src = adv.author.avatar;

  return mapPin;
}

function renderMapPin() {
  var fragment = document.createDocumentFragment();
  var createAdv = createAdsCollection();
  for (var i = 0; i < adAttributes.ADS_AMOUNT; i++) {
    fragment.appendChild(createPin(createAdv[i]));
  }
  document.querySelector('.map__pins').appendChild(fragment);
}

renderMapPin();
