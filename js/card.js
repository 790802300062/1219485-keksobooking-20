'use strict';

(function () {

  var mapTypesToRussian = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var mapCardTemplate = document.querySelector('#card')
              .content
              .querySelector('.map__card');

  var createCard = function (serverAds) {
    var newCard = mapCardTemplate.cloneNode(true);

    newCard.querySelector('.popup__title').textContent = serverAds.offer.title;
    newCard.querySelector('.popup__text--address').textContent = serverAds.offer.address;
    newCard.querySelector('.popup__text--price').textContent = serverAds.offer.price + '₽/ночь';
    newCard.querySelector('.popup__type').textContent = mapTypesToRussian[serverAds.offer.type];
    newCard.querySelector('.popup__text--capacity').textContent = serverAds.offer.rooms + ' комнаты для ' + serverAds.offer.guests + ' гостей';
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + serverAds.offer.checkin + ', выезд до ' + serverAds.offer.checkout;
    newCard.querySelector('.popup__features').innerHTML = '';
    newCard.querySelector('.popup__description').textContent = serverAds.offer.description;
    newCard.querySelector('.popup__photos').innerHTML = '';
    newCard.querySelector('.popup__avatar').src = serverAds.author.avatar;

    serverAds.offer.features.forEach(function (item) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature', 'popup__feature--' + item);
      newCard.querySelector('.popup__features').append(featureItem);
    });

    serverAds.offer.photos.forEach(function (item) {
      var newPhoto = document.createElement('img');
      newPhoto.src = item;
      newPhoto.width = 45;
      newPhoto.height = 40;
      newCard.querySelector('.popup__photos').append(newPhoto);
    });

    return newCard;
  };

  var onCardEscapePress = function (evt) {
    if (evt.keyCode === window.const.KeyCode.ESCAPE) {
      closeCard();
    }
  };

  var closePopup = function (popup) {
    window.pin.map.removeChild(popup);
  };

  var closeCard = function (popup) {
    popup = document.querySelector('.popup');
    if (popup) {
      closePopup(popup);
      document.removeEventListener('keydown', onCardEscapePress);
    }
  };

  var showAd = function (pinNode) {
    closeCard();
    var index = window.pin.adsContainer.findIndex(function (pin) {
      return pinNode.querySelector('img').alt === pin.offer.title;
    });
    var ad = window.pin.adsContainer[index];

    var card = createCard(ad);
    window.pin.filtersContainer.before(card);

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
  mapPinsContainer.addEventListener('click', function (evt) {
    window.backend.createXhr(function (data) {
      var mapData = data.map(function (item, index) {
        item.advertId = index;

        return item;
      });

      window.pin.adsContainer = mapData;
      window.pin.renderMapPins(window.pin.adsContainer);

    }, window.backend.onErrorAlert);

    onMapPinsContainerClick(evt);
  });


  window.card = {
    createCard: createCard,
    onMapPinsContainerClick: onMapPinsContainerClick
  };

})();
