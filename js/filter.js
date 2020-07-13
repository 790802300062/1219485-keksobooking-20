'use strict';
(function () {
  var DEFAULT_FILTER_VALUE = 'any';
  var PINS_MAX_AMOUNT = 5;

  var filterForm = document.querySelector('.map__filters');
  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRooms = filterForm.querySelector('#housing-rooms');
  var housingGuests = filterForm.querySelector('#housing-guests');

  var AccomodationPrice = {
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high'
  };
  var Price = {
    MIDDLE: 10000,
    HIGH: 50000
  };

  var filterByAccomodationType = function (item) {
    return item.offer.type === housingType.value || housingType.value === DEFAULT_FILTER_VALUE;
  };

  var filterByAccomodationPrice = function (item) {
    if (housingPrice.value === AccomodationPrice.LOW) {
      return +item.offer.price < Price.MIDDLE;
    }
    if (housingPrice.value === AccomodationPrice.MIDDLE) {
      return +item.offer.price >= Price.MIDDLE && +item.offer.price < Price.HIGH;
    }
    if (housingPrice.value === AccomodationPrice.HIGH) {
      return +item.offer.price >= Price.HIGH;
    }

    return true;
  };

  var filterByRoomsAmount = function (item) {
    return +housingRooms.value === item.offer.rooms || housingRooms.value === DEFAULT_FILTER_VALUE;
  };

  var filterByGuestsAmount = function (item) {
    return +housingGuests.value === item.offer.guests || housingGuests.value === DEFAULT_FILTER_VALUE;
  };

  var filterByFeatures = function (item) {
    var chosenFeatures = filterForm.querySelectorAll('input:checked');

    return Array.from(chosenFeatures).every(function (feature) {
      return item.offer.features.includes(feature.value);
    });
  };

  var filterOffers = function (adverts) {
    var filteredAdvs = [];
    for (var i = 0; i < adverts.length; i++) {
      var advert = adverts[i];
      if (filterByAccomodationType(advert) &&
          filterByAccomodationPrice(advert) &&
          filterByRoomsAmount(advert) &&
          filterByGuestsAmount(advert) &&
          filterByFeatures(advert)
      ) {
        filteredAdvs.push(advert);
      }

      if (filteredAdvs.length === PINS_MAX_AMOUNT) {
        break;
      }
    }

    return filteredAdvs;
  };

  var updatePins = function () {
    var filteredAdvs = filterOffers(window.pins.advertisements);
    window.pins.render(filteredAdvs);
  };

  var onFiltersChange = function () {
    window.pins.remove();
    window.card.close();

    window.utils.debounce(updatePins);

  };

  filterForm.addEventListener('change', onFiltersChange);


  window.filter = {
    updatePins: updatePins
  };
})();
