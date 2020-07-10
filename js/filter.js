'use strict';
(function () {
  var DEFAULT_FILTER_VALUE = 'any';
  var PIN_MAX_AMOUNT = 5;
  var DEBOUNCE_TIME = 500;

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
      return parseInt(item.offer.price, 10) < Price.MIDDLE;
    }
    if (housingPrice.value === AccomodationPrice.MIDDLE) {
      return parseInt(item.offer.price, 10) >= Price.MIDDLE && parseInt(item.offer.price, 10) < Price.HIGH;
    }
    if (housingPrice.value === AccomodationPrice.HIGH) {
      return parseInt(item.offer.price, 10) >= Price.HIGH;
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

  var findOffers = function (adverts) {
    var filteredAdvs = [];
    for (var i = 0; i < adverts.length; i++) {
      var item = adverts[i];
      if (filterByAccomodationType(item) &&
          filterByAccomodationPrice(item) &&
          filterByRoomsAmount(item) &&
          filterByGuestsAmount(item) &&
          filterByFeatures(item)
      ) {
        filteredAdvs.push(item);
      }

      if (filteredAdvs.length === PIN_MAX_AMOUNT) {
        break;
      }
    }

    return filteredAdvs;
  };

  var updatePins = function () {
    var filteredAdvs = findOffers(window.pins.offers);
    window.pins.render(filteredAdvs);
  };

  var lastTimeout = null;

  var onFiltersChange = function () {
    window.pins.remove();
    window.card.close();

    var filteredAdvs = findOffers(window.pins.offers);

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updatePins(filteredAdvs);
    }, DEBOUNCE_TIME);
  };

  var setActive = function () {
    filterForm.addEventListener('change', onFiltersChange);
  };


  window.filter = {
    updatePins: updatePins,
    setActive: setActive
  };
})();
