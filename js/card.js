'use strict';

(function () {

  var mapTypesToRussian = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var map = document.querySelector('.map');
  var filterContainer = document.querySelector('.map__filters-container');

  var mapCardTemplate = document.querySelector('#card')
                       .content
                       .querySelector('.map__card');

  var createCard = function (adv) {
    var newCard = mapCardTemplate.cloneNode(true);

    newCard.querySelector('.popup__avatar').src = adv.author.avatar;

    newCard.querySelector('.popup__title').textContent = adv.offer.title || 'no value';
    newCard.querySelector('.popup__text--address').textContent = adv.offer.address || 'no value';
    newCard.querySelector('.popup__text--price').textContent = adv.offer.price + '₽/ночь' || 'no value';
    newCard.querySelector('.popup__type').textContent = mapTypesToRussian[adv.offer.type] || 'no value';
    newCard.querySelector('.popup__text--capacity').textContent = adv.offer.rooms + ' комнаты для '
                                                                  + adv.offer.guests + ' гостей' || 'no value';
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до '
                                                              + adv.offer.checkout || 'no value';
    newCard.querySelector('.popup__description').textContent = adv.offer.description || 'no value';

    if (adv.offer.features.length) {
      newCard.querySelector('.popup__features').innerHTML = '';
      adv.offer.features.forEach(function (feature) {
        var featureElement = window.utils.createFeature(feature);
        newCard.querySelector('.popup__features').append(featureElement);
      });
    } else {
      newCard.querySelector('.popup__features').remove();
    }

    if (adv.offer.photos.length) {
      newCard.querySelector('.popup__photos').innerHTML = '';
      adv.offer.photos.forEach(function (photo) {
        var photoElement = window.utils.createPhoto(photo);
        newCard.querySelector('.popup__photos').append(photoElement);
      });
    } else {
      newCard.querySelector('.popup__photos').remove();
    }

    var newCardElements = newCard.querySelectorAll('.map__card > *');
    newCardElements.forEach(function (element) {
      if (element.textContent === 'no value') {
        element.remove();
      }
    });

    return newCard;
  };

  var onCardEscapePress = function (evt) {
    if (evt.key === window.const.Key.ESCAPE) {
      closeCard();
      var mapPinActive = document.querySelector('.map__pin--active');
      mapPinActive.classList.remove('map__pin--active');
    }
  };

  var closeCard = function () {
    var popup = document.querySelector('.popup');
    if (!popup) {
      return;
    }

    map.removeChild(popup);
    document.removeEventListener('keydown', onCardEscapePress);
  };

  var showCard = function (pinNode) {
    closeCard();
    var ad = window.pins.advertisements.find(function (pin) {
      return pinNode.querySelector('img').alt === pin.offer.title;
    });

    var card = createCard(ad);
    filterContainer.before(card);

    var closePopupButton = card.querySelector('.popup__close');
    closePopupButton.addEventListener('click', function () {
      closeCard();
      var mapPinActive = document.querySelector('.map__pin--active');
      mapPinActive.classList.remove('map__pin--active');
    });

    document.addEventListener('keydown', onCardEscapePress);
  };

  window.card = {
    show: showCard,
    close: closeCard
  };
})();
