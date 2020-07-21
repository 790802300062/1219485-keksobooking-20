'use strict';

(function () {

  var DEFAULT_FILTER_VALUE = 'any';
  var PINS_MAX_AMOUNT = 5;

  var filterForm = document.querySelector('.map__filters');
  var accommodationType = filterForm.querySelector('#housing-type');
  var accommodationPrice = filterForm.querySelector('#housing-price');
  var accommodationRooms = filterForm.querySelector('#housing-rooms');
  var accommodationGuests = filterForm.querySelector('#housing-guests');

  var AccommodationPrice = {
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high'
  };

  var Price = {
    MIDDLE: 10000,
    HIGH: 50000
  };

  var filterByAccommodationType = function (adv) {
    return adv.offer.type === accommodationType.value || accommodationType.value === DEFAULT_FILTER_VALUE;
  };

  var filterByAccommodationPrice = function (adv) {
    if (accommodationPrice.value === AccommodationPrice.LOW) {
      return +adv.offer.price < Price.MIDDLE;
    }
    if (accommodationPrice.value === AccommodationPrice.MIDDLE) {
      return +adv.offer.price >= Price.MIDDLE && +adv.offer.price < Price.HIGH;
    }
    if (accommodationPrice.value === AccommodationPrice.HIGH) {
      return +adv.offer.price >= Price.HIGH;
    }

    return true;
  };

  var filterByRoomsAmount = function (adv) {
    return +accommodationRooms.value === adv.offer.rooms || accommodationRooms.value === DEFAULT_FILTER_VALUE;
  };

  var filterByGuestsAmount = function (adv) {
    return +accommodationGuests.value === adv.offer.guests || accommodationGuests.value === DEFAULT_FILTER_VALUE;
  };

  var filterByFeatures = function (adv) {
    var chosenFeatures = filterForm.querySelectorAll('input:checked');

    return Array.from(chosenFeatures).every(function (feature) {
      return adv.offer.features.includes(feature.value);
    });
  };

  var filterOffers = function (adverts) {
    var filteredAdvs = [];
    for (var i = 0; i < adverts.length; i++) {
      var advert = adverts[i];
      if (filterByAccommodationType(advert) &&
          filterByAccommodationPrice(advert) &&
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
