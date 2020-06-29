'use strict';

var ADS_COUNT = 8;
var MOUSE_LEFT_BUTTON = 1;
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
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var Key = {
  ENTER: 'Enter'
};
var MainPinSize = {
  WIDTH: 40,
  HEIGHT: 44
};
var RandomNumber = {
  MIN: 130,
  MAX: 630
};
var RoomPrice = {
  MIN: 1000,
  MAX: 1000000
};
var RoomCount = {
  MIN: 1,
  MAX: 5
};
var GuestsCount = {
  MIN: 1,
  MAX: 10
};
var PinGap = {
  X: 50,
  Y: 70
};
var mapTypesToRussian = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'};

var map = document.querySelector('.map');
var mapPinButton = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var addressInput = adForm.querySelector('#address');
var mapFiltersElement = document.querySelector('.map__filters');
var mapFilterSelects = mapFiltersElement.querySelectorAll('select');
var offsetWidth = document.querySelector('.map__pins').offsetWidth;

function getRandomArray(items) {
  var itemsCount = getRandomNumber(1, items.length);
  var randomNumbers = [];
  for (var i = 0; i < itemsCount; i++) {
    randomNumbers.push(items[i]);
  }

  return randomNumbers;
}

function getAvatarCount(avatarNumber) {
  avatarNumber = '0' + (avatarNumber + 1);
  return 'img/avatars/user' + avatarNumber + '.png';
}

function getRandomNumber(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getRandomElement(items) {
  var randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

function changeAccessibility(controls) {
  controls.forEach(function(item) {
    item.disabled = !item.disabled;
  });
}

changeAccessibility(adFormFieldsets);
changeAccessibility(mapFilterSelects);

var onMapPinPress = function (evt) {
  if (evt.keyCode === Key.ENTER || evt.which === MOUSE_LEFT_BUTTON) {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    changeAccessibility(adFormFieldsets);
    changeAccessibility(mapFilterSelects);

    mapPinButton.removeEventListener('mousedown', onMapPinPress);
    mapPinButton.removeEventListener('keydown', onMapPinPress);
    renderMapPins();
  }
};

mapPinButton.addEventListener('mousedown', onMapPinPress);
mapPinButton.addEventListener('keydown', onMapPinPress);

addressInput.value = Math.round(mapPinButton.offsetLeft - (MainPinSize.WIDTH / 2))
                    + ', ' + Math.round(mapPinButton.offsetTop - (MainPinSize.HEIGHT / 2));

function createAdvertisement(avatarNumber) {
  var locationX = getRandomNumber(0, offsetWidth);
  var locationY = getRandomNumber(RandomNumber.MIN, RandomNumber.MAX);

  var advert = {
    'author': {
      'avatar': getAvatarCount(avatarNumber)
    },
    'offer': {
      'title': getRandomElement(TITLES),
      'address': locationX + ', ' + locationY,
      'price': getRandomNumber(RoomPrice.MIN, RoomPrice.MAX),
      'type': getRandomElement(TYPES),
      'rooms': getRandomNumber(RoomCount.MIN, RoomCount.MAXOOM_COUNT_MAX),
      'guests': getRandomNumber(GuestsCount.MIN, GuestsCount.MAX),
      'checkin': getRandomElement(CHECKINS),
      'checkout': getRandomElement(CHECKOUTS),
      'features': getRandomArray(FEATURES),
      'description': 'Очень красивая квартира. Рядом много достопримечательностей',
      'photos': getRandomArray(PHOTOS),
    },
    'location': {
      'x': locationX,
      'y': locationY,
    }
  };

  return advert;
}

function createAds() {
  var adverts = [];
  for (var i = 0; i < ADS_COUNT; i++) {
    adverts.push(createAdvertisement(i));
  }

  return adverts;
}

var ads = createAds();

var pinTemplate = document.querySelector('#pin')
          .content
          .querySelector('.map__pin');

function createPin(adv) {
  var mapPin = pinTemplate.cloneNode(true);

  mapPin.style.left = adv.location.x - PinGap.X + 'px';
  mapPin.style.top = adv.location.y - PinGap.Y + 'px';
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

var mapCardTemplate = document.querySelector('#card')
              .content
              .querySelector('.map__card');

var createCard = function (adv) {
  var newCard = mapCardTemplate.cloneNode(true);

  newCard.querySelector('.popup__title').textContent = adv.offer.title;
  newCard.querySelector('.popup__text--address').textContent = adv.offer.address;
  newCard.querySelector('.popup__text--price').textContent = adv.offer.price + '₽/ночь';
  newCard.querySelector('.popup__type').textContent = mapTypesToRussian[adv.offer.type];
  newCard.querySelector('.popup__text--capacity').textContent = adv.offer.rooms + ' комнаты для ' + adv.offer.guests + ' гостей';
  newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;
  newCard.querySelector('.popup__features').innerHTML = '';
  newCard.querySelector('.popup__description').textContent = adv.offer.description;
  newCard.querySelector('.popup__photos').innerHTML = '';
  newCard.querySelector('.popup__avatar').src = adv.author.avatar;

  adv.offer.features.forEach(function(item) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature', 'popup__feature--' + item);
    newCard.querySelector('.popup__features').append(featureItem);
  });

  adv.offer.photos.forEach(function(item) {
    var newPhoto = document.createElement('img');
    newPhoto.src = item;
    newPhoto.width = 45;
    newPhoto.height = 40;
    newCard.querySelector('.popup__photos').append(newPhoto);
  })

  return newCard;
};

//  var currentAd = createCard(ads[1]);
//  document.querySelector('.map__filters-container').before(currentAd);

var pinFragment = document.createDocumentFragment();
var filtersContainer = document.querySelector('.map__filters-container');

var createPinsList = function () {
  var pins = [];
  for (var i=0; i < ads.length; i++) {
    pins.push(createPin(ads[i]));
    pinFragment.appendChild(pins[i]);
  }
};

var closePopup = function (popup) {
  map.removeChild(popup);
};

var showAd = function (pinNode) {
  var index = pins.indexOf(pinNode);
  var popup = document.querySelector('.popup');
  if (popup) {
    closePopup(popup);
  }
  filtersContainer.before(createCard(ads[index]));
  popup = document.querySelector('.popup');
  var closePopupButton = document.querySelector('.popup__close');
  closePopupButton.addEventListener('click', function () {
    closePopup(popup);
  });
};

var pins = createPinsList();

var onMapPinClick = function (evt) {
  var currentPin = evt.target; //.closest('.map__pin:not(.map__pin--main)');
  if (target.classList.contains('map__pin--main') ||
      target.parentNode.classList.contains('map__pin--main')) {

    return;
  };

  if (target.className === 'map__pin') {
    showAd(target);

    return;
  }

  if (target.parentNode.className === 'map__pin') {
    showAd(target.parentNode);

    return;
  }
};

  /*if (currentPin !== null || evt.keyCode === Key.ENTER) {
    var pinId = document.querySelectorAll('.map__pin');

    for (var i=0; i < pinId.length; i++) {

    }
    var pinIdIndex = pinId.indexOf(currentPin);
    var currentAd = createCard(ads[pinIdIndex]);
  }
  document.querySelector('.map__filters-container').before(currentAd);
};

var advMapPins = document.querySelector('.map__pins');
advMapPins.addEventListener('click', onMapPinClick);*/

/*for (var i=0; i < advMapPins.length; i++) {
  pinElements.push(advMapPins[i]);
  advMapPins[i].addEventListener('click', function(evt) {
     var advMapPinIndex = pinElements.indexOf(evt.target);
     console.log(advMapPinIndex);

    return advMapPinIndex;
  })
}*/
//advMapPins.addEventListener('click', onMapPinClick);*/


/*for (var i=0; i < adsContainer.length; i++) {
  adsContainer[i].addEventListener('click', function(evt) {
  document.querySelector('.map__filters-container').before(adsCards[i]);
  })
};*/

//adsContainer.addEventListener('click', onMapPinClick);

var roomNumberInput = document.querySelector('#room_number');
var capacityInput = document.querySelector('#capacity');

var onInputChange = function () {
  if (roomNumberInput.value === '100' && capacityInput.value !== '0') {
    capacityInput.setCustomValidity('Не для гостей!');
    return;
  }

  if (capacityInput.value === '0' && roomNumberInput.value !== '100') {
    capacityInput.setCustomValidity('Укажите количество гостей!');
    return;
  }

  if (+capacityInput.value > +roomNumberInput.value) {
    capacityInput.setCustomValidity('Слишком много гостей для этого количества комнат!');
    return;
  }

  capacityInput.setCustomValidity('');
};

capacityInput.addEventListener('change', onInputChange);

roomNumberInput.addEventListener('change', onInputChange);
