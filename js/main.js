'use strict';

var ADS_COUNT = 8;
var MIN_Y = 130;
var MAX_Y = 630;
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ROOM_COUNT_MIN = 1;
var ROOM_COUNT_MAX = 5;
var GUESTS_COUNT_MIN = 1;
var GUESTS_COUNT_MAX = 10;
var TITLES = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало недалеко от моря',
  'Неуютное бунгало по колено в воде'];
var TYPES = ['palace',
  'flat',
  'house',
  'bungalo'];
var TYPES_IN_RUSSIAN = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'};
var CHECKINS = ['12:00',
  '13:00',
  '14:00'];
var CHECKOUTS = ['12:00',
  '13:00',
  '14:00'];
var FEATURES = ['wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'];
var FEATURES_CLASSES = {
  'wifi': 'popup__feature--wifi',
  'dishwasher': 'popup__feature--dishwasher',
  'parking': 'popup__feature--parking',
  'washer': 'popup__feature--washer',
  'elevator': 'popup__feature--elevator',
  'conditioner': 'popup__feature--conditioner'
};
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_GAP_X = 50;
var PIN_GAP_Y = 70;

var offsetWidth = document.querySelector('.map__pins').offsetWidth;

function createAdvertisement(count) {
  var locationX = getRandomNumber(0, offsetWidth);
  var locationY = getRandomNumber(MIN_Y, MAX_Y);

  var advert = {
    'author': {
      'avatar': getAvatarCount(count)
    },
    'offer': {
      'title': getRandomElement(TITLES),
      'address': locationX + ', ' + locationY,
      'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
      'type': getRandomElement(TYPES),
      'rooms': getRandomNumber(ROOM_COUNT_MIN, ROOM_COUNT_MAX),
      'guests': getRandomNumber(GUESTS_COUNT_MIN, GUESTS_COUNT_MAX),
      'checkin': getRandomElement(CHECKINS),
      'checkout': getRandomElement(CHECKOUTS),
      'features': getRandomElement(FEATURES),
      'description': 'Очень красивая квартира. Рядом много достопримечательностей',
      'photos': getRandomElement(PHOTOS),
    },
    'location': {
      'x': locationX,
      'y': locationY,
    }
  };

  return advert;
}

function getAvatarCount(count) {
  var avatarNumber = '0' + (count + 1);
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

function createAds() {
  var adverts = [];
  for (var i = 0; i < ADS_COUNT; i++) {
    adverts.push(createAdvertisement(i));
  }

  return adverts;
}

var ads = createAds();

document.querySelector('.map').classList.remove('map--faded');

var pin = document.querySelector('#pin')
          .content
          .querySelector('.map__pin');

function createPin(adv) {
  var mapPin = pin.cloneNode(true);

  mapPin.style.left = adv.location.x - PIN_GAP_X + 'px';
  mapPin.style.top = adv.location.y - PIN_GAP_Y + 'px';
  mapPin.querySelector('img').alt = adv.offer.title;
  mapPin.querySelector('img').src = adv.author.avatar;

  return mapPin;
}

function renderMapPins() {
  var fragment = document.createDocumentFragment();
  var createAdv = createAds();
  for (var i = 0; i < ADS_COUNT; i++) {
    fragment.appendChild(createPin(createAdv[i]));
  }
  document.querySelector('.map__pins').appendChild(fragment);
}

renderMapPins();

var mapCard = document.querySelector('#card')
              .content
              .querySelector('.map__card');

var createCard = function (adv) {
  var newCard = mapCard.cloneNode(true);

  newCard.querySelector('.popup__title').textContent = adv.offer.title;
  newCard.querySelector('.popup__text--address').textContent = adv.offer.address;
  newCard.querySelector('.popup__text--price').textContent = adv.offer.price + '₽/ночь';
  newCard.querySelector('.popup__type').textContent = TYPES_IN_RUSSIAN[adv.offer.type];
  newCard.querySelector('.popup__text--capacity').textContent = adv.offer.rooms + ' комнаты для ' + adv.offer.guests + ' гостей';
  newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;
  newCard.querySelector('.popup__features').innerHTML = '';
  newCard.querySelector('.popup__description').textContent = adv.offer.description;
  newCard.querySelector('.popup__photos').innerHTML = '';
  newCard.querySelector('.popup__avatar').src = adv.author.avatar;

  for (var i = 0; i < [adv.offer.features].length; i++) {
    var featureItem = document.createElement('li');
    featureItem.classList.add(FEATURES_CLASSES[adv.offer.features[i]]);
    newCard.querySelector('.popup__features').append(featureItem);
  }

  for (i = 0; i < [adv.offer.photos].length; i++) {
    var newPhoto = document.createElement('img');
    newPhoto.src = adv.offer.photos[i];
    newPhoto.width = 45;
    newPhoto.height = 40;
    newCard.querySelector('.popup__photos').append(newPhoto);
  }

  return newCard;
};

var currentAd = createCard(ads[0]);
document.querySelector('.map__filters-container').before(currentAd);
