'use strict';

var ADS_AMOUNT = 8;
var AVATARS = [];
var MIN_X = 150;
var MAX_X = 1150;
var MIN_Y = 130;
var MAX_Y = 630;

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// Наполняем массив для аватарок
for (var i = 1; i <= ADS_AMOUNT; i++) {
  var id = '0' + i;
  AVATARS.push(id);
}

// Функция "перемешивания" массива
function shuffleArray(array) {
  var j;
  var temp;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array [i];
    array [i] = temp;
  }
  return array;
}

// Функция получения случайного значения из диапазона
function getRandomNumber(start, end) {
  var randomNumber = Math.floor(Math.random() * (end - start) + start);
  return randomNumber;
}

// Функция получения случайного номера элемента массива
function getRandomElement(array) {
  var randomElement = array[Math.floor(Math.random() * array.length)];
  return randomElement;
}

// Функция получения неповторяющегося массива случайной длины
function getRandomArray(array) {
  var randomNumberOfElements = Math.ceil(Math.random() * array.length);
  var newArray = array;
  var randomArray = [];

  for (i = 0; i < randomNumberOfElements; i++) {
    randomNumberOfElements = Math.floor(Math.random() * newArray.length);
    randomArray[i] = newArray[randomNumberOfElements];
    newArray.splice(randomNumberOfElements, 1);
  }
  return randomArray;
}

shuffleArray(AVATARS);

function createAdv() {
  var locationX = getRandomNumber(MIN_X, MAX_X);
  var locationY = getRandomNumber(MIN_Y, MAX_Y);
  var adv = {
    'author': {
      'avatar': 'img/avatars/user' + AVATARS[i] + '.png'
    },

    'offer': {
      'title': '',
      'address': locationX + ', ' + locationY,
      'price': '',
      'type': getRandomElement(TYPES),
      'rooms': '',
      'guests': '',
      'checkin': getRandomElement(CHECKINS),
      'checkout': getRandomElement(CHECKOUTS),
      'features': getRandomArray(FEATURES),
      'description': '',
      'photos': getRandomArray(PHOTOS)
    },

    'location': {
      'x': locationX,
      'y': locationY
    }
  };
  return adv;
}

var advertisements = [];
for (i = 0; i < ADS_AMOUNT; i++) {
  var ad = createAdv();
  advertisements.push(ad);
}

document.querySelector('.map').classList.remove('map--faded');

var pin = document.querySelector('#pin')
          .content
          .querySelector('.map__pin');

// Функция создания метки
function createPin(advArray) {
  var newPin = pin.cloneNode(true);
  newPin.querySelector('img').src = advArray.author.avatar;
  newPin.querySelector('img').alt = advArray.offer.title;
  newPin.style.left = advArray.location.x + 'px';
  newPin.style.top = advArray.location.y + 'px';
  return newPin;
}

var pinsCollection = document.createDocumentFragment();
for (i = 0; i < advertisements.length; i++) {
  pinsCollection.appendChild(createPin(advertisements[i]));
}

document.querySelector('.map__pins').appendChild(pinsCollection);

