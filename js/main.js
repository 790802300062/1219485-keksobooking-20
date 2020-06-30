'use strict';

var ADS_COUNT = 8;
var MOUSE_LEFT_BUTTON = 1;
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
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
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
var Key = {
  ENTER: 'Enter',
  ESCAPE: 27
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
  'bungalo': 'Бунгало'
};

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
  controls.forEach(function (item) {
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

  adv.offer.features.forEach(function (item) {
    var featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature', 'popup__feature--' + item);
    newCard.querySelector('.popup__features').append(featureItem);
  });

  adv.offer.photos.forEach(function (item) {
    var newPhoto = document.createElement('img');
    newPhoto.src = item;
    newPhoto.width = 45;
    newPhoto.height = 40;
    newCard.querySelector('.popup__photos').append(newPhoto);
  });

  return newCard;
};

var pinFragment = document.createDocumentFragment();
var filtersContainer = document.querySelector('.map__filters-container');

var insertPins = function () {
  var pins = [];
  for (var i = 0; i < ads.length; i++) {
    pins.push(createPin(ads[i]));
    pinFragment.appendChild(pins[i]);
  }

  return pins;
};

var onCardEscapePress = function (evt) {
  if (evt.keyCode === Key.ESCAPE) {
    closeCard();
  }
};

var closePopup = function (popup) {
  map.removeChild(popup);
};

var pins = insertPins();

var closeCard = function (popup) {
  popup = document.querySelector('.popup');
  if (popup) {
    closePopup(popup);
    document.removeEventListener('keydown', onCardEscapePress);
  }
};

var showAd = function (pinNode) {
  closeCard();
  var index = pins.findIndex(function (pin) {
    return pinNode.querySelector('img').src === pin.querySelector('img').src;
  });
  var ad = ads[index];

  var card = createCard(ad);
  filtersContainer.before(card);

  var closePopupButton = card.querySelector('.popup__close');
  closePopupButton.addEventListener('click', function () {
    closeCard();
  });

  document.addEventListener('keydown', onCardEscapePress);
};

var onMapPinsContainerClick = function (evt) {
  var currentTarget = evt.target;
  var isMainPin = currentTarget.classList.contains('map__pin--main') ||
  currentTarget.parentNode.classList.contains('map__pin--main');

  if (isMainPin) {
    return;
  }

  if (currentTarget.classList.contains('map__pin')) {
    showAd(currentTarget);
    return;
  }

  if (currentTarget.parentNode.classList.contains('map__pin')) {
    showAd(currentTarget.parentNode);
  }
};

var mapPinsContainer = document.querySelector('.map__pins');
mapPinsContainer.addEventListener('click', onMapPinsContainerClick);

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

var accomodationTypeInput = document.querySelector('#type');
var accomodationMinPrice = document.querySelector('#price');

var minTypePrice = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalo': 0
};

var setTypePrice = function () {
  var typeValue = minTypePrice[accomodationTypeInput.value];
  accomodationMinPrice.min = typeValue;
  accomodationMinPrice.placeholder = typeValue;
};

setTypePrice();

accomodationTypeInput.addEventListener('change', function () {
  setTypePrice();
});

var checkinInput = document.querySelector('#timein');
var checkoutInput = document.querySelector('#timeout');

checkinInput.addEventListener('change', function () {
  checkoutInput.value = checkinInput.value;
});
checkoutInput.addEventListener('change', function () {
  checkinInput.value = checkoutInput.value;
});
