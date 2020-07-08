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

    if (!adv.offer.title || adv.offer.title === '') {
      newCard.querySelector('.popup__title').remove();
    } else {
      newCard.querySelector('.popup__title').textContent = adv.offer.title;
    }

    if (!adv.offer.address || adv.offer.address === '') {
      newCard.querySelector('.popup__text--address').remove();
    } else {
      newCard.querySelector('.popup__text--address').textContent = adv.offer.address;
    }

    if (!adv.offer.price || adv.offer.price === '0') {
      newCard.querySelector('.popup__text--price').remove();
    } else {
      newCard.querySelector('.popup__text--price').textContent = adv.offer.price + '₽/ночь';
    }

    if (!adv.offer.type || adv.offer.type === '') {
      newCard.querySelector('.popup__type').remove();
    } else {
      newCard.querySelector('.popup__type').textContent = mapTypesToRussian[adv.offer.type];
    }

    if ((!adv.offer.rooms || adv.offer.rooms === '0') || (!adv.offer.guests || adv.offer.guests === '0')) {
      newCard.querySelector('.popup__text--capacity').remove();
    } else {
      newCard.querySelector('.popup__text--capacity').textContent = adv.offer.rooms + ' комнаты для ' + adv.offer.guests + ' гостей';
    }

    if (!adv.offer.checkin || !adv.offer.checkout) {
      newCard.querySelector('.popup__text--time').remove();
    } else {
      newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;
    }

    if (adv.offer.features.length === 0) {
      newCard.querySelector('.popup__features').remove();
    } else {
      newCard.querySelector('.popup__features').innerHTML = '';
      adv.offer.features.forEach(function (feature) {
        var featureItem = document.createElement('li');
        featureItem.classList.add('popup__feature', 'popup__feature--' + feature);
        newCard.querySelector('.popup__features').append(featureItem);
      });
    }

    if (!adv.offer.description || adv.offer.description === '') {
      newCard.querySelector('.popup__description').remove();
    } else {
      newCard.querySelector('.popup__description').textContent = adv.offer.description;
    }

    if (adv.offer.photos.length === 0) {
      newCard.querySelector('.popup__photos').remove();
    } else {
      newCard.querySelector('.popup__photos').innerHTML = '';
      adv.offer.photos.forEach(function (photo) {
        var newPhoto = document.createElement('img');
        newPhoto.src = photo;
        newPhoto.width = 45;
        newPhoto.height = 40;
        newCard.querySelector('.popup__photos').append(newPhoto);
      });
    }

    return newCard;
  };

  var onCardEscapePress = function (evt) {
    if (evt.keyCode === window.const.KeyCode.ESCAPE) {
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
    var index = window.pin.offers.findIndex(function (pin) {
      return pinNode.querySelector('img').alt === pin.offer.title;
    });
    var ad = window.pin.offers[index];

    var card = createCard(ad);
    filtersContainer.before(card);

    var closePopupButton = card.querySelector('.popup__close');
    closePopupButton.addEventListener('click', function () {
      closeCard();
    });

    document.addEventListener('keydown', onCardEscapePress);
  };

  window.card = {
    showCard: showCard,
    closeCard: closeCard
  };
})();
