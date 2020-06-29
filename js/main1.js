'use strict';

var map = document.querySelector('.map');
// var mapPin = document.querySelector('.map__pin');
var mapPinMain = document.querySelector('.map__pin--main');
var adsContainer = document.querySelector('.map__pins');
var pinTemplateContent = document.querySelector('#pin').content;
var filterContainer = document.querySelector('.map__filters-container');
var cardTemplateContent = document.querySelector('#card').content;
var adInfoForm = document.querySelector('.ad-form');
var filtersForm = document.querySelector('.map__filters');
var formFieldsets = adInfoForm.querySelectorAll('fieldset');
var formSelects = filtersForm.querySelectorAll('select');
var addressInput = adInfoForm.querySelector('#address');
var roomNumberInput = adInfoForm.querySelector('#room_number');
var roomCapacityInput = adInfoForm.querySelector('#capacity');
var accommTypeInput = adInfoForm.querySelector('#type');
var priceInput = adInfoForm.querySelector('#price');
var titleInput = adInfoForm.querySelector('#title');
var timeinInput = adInfoForm.querySelector('#timein');
var timeoutInput = adInfoForm.querySelector('#timeout');
var MAX_Y = 630;
var MIN_Y = 130;
var NUMBER_OF_ADS = 8;
var PIN_WIDTH = 65;
var PIN_HEIGHT = 84;
var ECS_KEY = 27;
var ENT_KEY = 13;
var MOUSE_LEFT_BUTTON = 0;

var randomAds = [];

var typesOfAccommodationRus = [
  'Дворец',
  'Квартира',
  'Дом',
  'Бунгало'
];

var typesOfAccommodation = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var featuresOfAccommodation = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

var photosOfAccommodation = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var inOutHours = [
  '12:00',
  '13:00',
  '14:00'
];

var getRandomInteger = function (integer) {

  return Math.round(Math.random() * integer);
};

var generateAds = function () {
  var ads = [];

  for (var i = 0; i < NUMBER_OF_ADS; i++) {
    var locationX = PIN_WIDTH + getRandomInteger(map.offsetWidth - PIN_WIDTH * 2);
    var locationY = MIN_Y + getRandomInteger(MAX_Y - (MIN_Y + PIN_HEIGHT));
    var adsItem = {};

    adsItem.author = {
      avatar: 'img/avatars/user0' + (i + 1) + '.png',
    };

    adsItem.offer = {
      title: 'Last chance!',
      address: locationX + ', ' + locationY,
      price: 1500,
      type: typesOfAccommodation[getRandomInteger(typesOfAccommodation.length - 1)],
      rooms: 3,
      guests: 6,
      checkin: inOutHours[getRandomInteger(inOutHours.length - 1)],
      checkout: inOutHours[getRandomInteger(inOutHours.length - 1)],
      features: featuresOfAccommodation.slice(getRandomInteger(featuresOfAccommodation.length - 1)),
      description: 'very good flat',
      photos: photosOfAccommodation.slice(getRandomInteger(photosOfAccommodation.length - 1)),
      advertId: i,
    };

    adsItem.location = {
      x: locationX,
      y: locationY,
    };

    ads.push(adsItem);
  }

  return ads;
};

var renderPin = function (ad) {
  var pinElement = pinTemplateContent.querySelector('.map__pin').cloneNode(true);

  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.alt = ad.offer.title;
  pinElement.style = 'left: ' + ad.location.x + 'px; ' + 'top: ' + ad.location.y + 'px;';
  pinElement.setAttribute('data-advert-id', ad.offer.advertId);

  return pinElement;
};

var addPinsToFragment = function (arr) {
  var fragment = document.createDocumentFragment();

  arr.forEach(function (item) {
    fragment.append(renderPin(item));
  });

  return fragment;
};

var renderPinsToDom = function (container, fragment) {
  container.append(fragment);
};

var createAdvertCard = function (advert) {
  var fragment = document.createDocumentFragment();
  var advertCard = cardTemplateContent.querySelector('.map__card').cloneNode(true);
  var features = advertCard.querySelectorAll('.popup__feature');
  var advertCardAvatar = advertCard.querySelector('.popup__avatar');
  var advertCardTitle = advertCard.querySelector('.popup__title');
  var advertCardAddress = advertCard.querySelector('.popup__text--address');
  var advertCardRate = advertCard.querySelector('.popup__text--price');
  var advertCardCapacity = advertCard.querySelector('.popup__text--capacity');
  var advertCardCheckin = advertCard.querySelector('.popup__text--time');
  var advertCardDescr = advertCard.querySelector('.popup__description');
  var advertCardType = advertCard.querySelector('.popup__type');
  var photosContainer = advertCard.querySelector('.popup__photos');
  var photoMock = advertCard.querySelector('.popup__photo');
  var advertCardClose = advertCard.querySelector('.popup__close');

  advertCardAvatar.src = advert.author.avatar;
  advertCardTitle.textContent = advert.offer.title;
  advertCardAddress.textContent = advert.offer.address;
  advertCardRate.textContent = advert.offer.price + '\u20BD' + '/ночь';
  advertCardCapacity.textContent
  = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей.';
  advertCardCheckin.textContent
  = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout + '.';
  advertCardDescr.textContent = advert.offer.description;
  advertCardType.textContent
  = typesOfAccommodationRus[typesOfAccommodation.indexOf(advert.offer.type)];

  features.forEach(function (feature, i) {
    feature.textContent = featuresOfAccommodation[i];
  });

  photosContainer.removeChild(photoMock);

  for (var i = 0; i < advert.offer.photos.length; i++) {
    var photoOfAccommodation = photoMock.cloneNode(true);
    photoOfAccommodation.src = advert.offer.photos[i];
    photosContainer.append(photoOfAccommodation);
  }

  advertCardClose.addEventListener('mousedown', advertCardCloseHandler);
  document.addEventListener('keydown', advertCardCloseHandler);

  fragment.append(advertCard);

  return fragment;
};

// position of mapPinMain in inactive mode
addressInput.value = Math.round(mapPinMain.offsetLeft - (PIN_WIDTH / 2))
                    + ', ' + Math.round(mapPinMain.offsetTop - (PIN_WIDTH / 2));

// page activation
var setActiveMode = function () {
  randomAds = generateAds();
  var pinsFragment = addPinsToFragment(randomAds);
  map.classList.remove('map--faded');
  adInfoForm.classList.remove('ad-form--disabled');
  changeStateOfControls(formFieldsets, false);
  changeStateOfControls(formSelects, false);
  renderPinsToDom(adsContainer, pinsFragment);
  setTitleInputValidity(true, '30', '100');
  setPriceInputValidity(true, '1000000', 'number');
  adsContainer.addEventListener('click', mapPinClickHandler);
  roomCapacityInput.addEventListener('input', compareRoomsGuestsHandler);
  timeinInput.addEventListener('input', compareInOutHandler);
  timeoutInput.addEventListener('input', compareInOutHandler);
  priceInput.addEventListener('change', compareTypePriceHandler);
};

// change fieldsets and selects state from disabled to active and back
var changeStateOfControls = function (controls, state) {
  controls.forEach(function (set) {
    set.disabled = state;
  });
};

// page deactivation
var setNotActiveMode = function () {
  changeStateOfControls(formFieldsets, true);
  changeStateOfControls(formSelects, true);

  mapPinMain.addEventListener('keydown', mapActivationHandler);
  mapPinMain.addEventListener('mousedown', mapActivationHandler);
};

// handler function rendering card by click or Enter on mapPin
var mapPinClickHandler = function (evt) {
  var currentPin = evt.target.closest('.map__pin:not(.map__pin--main)');

  if (currentPin !== null || evt.keyCode === ENT_KEY) {
    var currentPinAdvertId = currentPin.dataset.advertId;
    var cardFragment = createAdvertCard(randomAds[currentPinAdvertId]);
    if (map.children.length >= 3) {
      advertCardCloseHandler(evt);
    }
    map.insertBefore(cardFragment, filterContainer);
  }
};

// handler function removing card from map by click or ESC
var advertCardCloseHandler = function (evt) {
  if (evt.keyCode === ECS_KEY || evt.button === MOUSE_LEFT_BUTTON || evt.keyCode === ENT_KEY) {
    map.querySelector('.map__card').remove();
  }
};

// handler function activating page by click or Enter on main pin
var mapActivationHandler = function (evt) {
  if (evt.keyCode === ENT_KEY || evt.button === MOUSE_LEFT_BUTTON) {
    setActiveMode();
  }
  mapPinMain.removeEventListener('keydown', mapActivationHandler);
  mapPinMain.removeEventListener('mousedown', mapActivationHandler);
};

// validation of rooms and guest capacity inputs
var compareRoomsGuestsHandler = function () {
  var errorMessage = '';

  if (+roomNumberInput.value < +roomCapacityInput.value) {
    errorMessage = 'too many people for this apartment';
  }

  if (+roomNumberInput.value === 100 && +roomCapacityInput.value !== 0) {
    errorMessage = 'for so many rooms choose not for guests option';
  }

  if (+roomNumberInput.value !== 100 && +roomCapacityInput.value === 0) {
    errorMessage = 'if not for guests, choose 100 rooms option';
  }

  roomCapacityInput.setCustomValidity(errorMessage);
};

// validation of title input
var setTitleInputValidity = function (isRequired, minLength, maxLength) {
  titleInput.required = isRequired;
  titleInput.setAttribute('minlength', minLength);
  titleInput.setAttribute('maxlength', maxLength);
};

// validation of price input
var setPriceInputValidity = function (isRequired, maxValue, inputType) {
  priceInput.required = isRequired;
  priceInput.max = maxValue;
  priceInput.type = inputType;
};

// handler function for comparison of type and price inputs
var compareTypePriceHandler = function () {
  switch (accommTypeInput.value) {
    case 'bungalo': priceInput.min = '0';
      break;
    case 'flat': priceInput.min = '1000';
      break;
    case 'house': priceInput.min = '5000';
      break;
    case 'palace': priceInput.min = '10000';
      break;
  }
};

// handler function for comparison of timein and timeout inputs
var compareInOutHandler = function (evt) {
  timeinInput.value = evt.target.value;
  timeoutInput.value = evt.target.value;
};

setNotActiveMode();
