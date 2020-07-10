'use strict';

(function () {

  var mapTypesToRussian = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var map = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');

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
        var featureItem = document.createElement('li');
        featureItem.classList.add('popup__feature', 'popup__feature--' + feature);
        newCard.querySelector('.popup__features').append(featureItem);
      });
    } else {
      newCard.querySelector('.popup__features').remove();
    }

    if (adv.offer.photos.length) {
      newCard.querySelector('.popup__photos').innerHTML = '';
      adv.offer.photos.forEach(function (photo) {
        var newPhoto = document.createElement('img');
        newPhoto.src = photo;
        newPhoto.width = 45;
        newPhoto.height = 40;
        newCard.querySelector('.popup__photos').append(newPhoto);
      });
    } else {
      newCard.querySelector('.popup__photos').remove();
    }

    var newCardElements = newCard.querySelectorAll(':scope > *');
    newCardElements.forEach(function (element) {
      if (element.textContent === 'no value') {
        element.remove();
      }
    });

    return newCard;
  };

  var onCardEscapePress = function (evt) {
    if (evt.key === window.const.KeyCode.ESCAPE) {
      closeCard();
    }
  };

  var closePopup = function (popup) {
    map.removeChild(popup);
  };

  var closeCard = function (popup) {
    popup = document.querySelector('.popup');
    if (popup) {
      closePopup(popup);
      document.removeEventListener('keydown', onCardEscapePress);
    }
  };

  var showCard = function (pinNode) {
    closeCard();
    var index = window.pins.offers.findIndex(function (pin) {
      return pinNode.querySelector('img').alt === pin.offer.title;
    });
    var ad = window.pins.offers[index];

    var card = createCard(ad);
    filtersContainer.before(card);

    var closePopupButton = card.querySelector('.popup__close');
    closePopupButton.addEventListener('click', function () {
      closeCard();
    });

    document.addEventListener('keydown', onCardEscapePress);
  };

  window.card = {
    show: showCard,
    close: closeCard
  };
})();
