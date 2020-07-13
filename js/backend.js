'use strict';

(function () {

  var RESPONSE_TYPE = 'json';

  var ServerURL = {
    GET: 'https://javascript.pages.academy/keksobooking/data',
    POST: 'https://javascript.pages.academy/keksobooking'
  };

  var StatusCode = {
    OK: 200
  };
  var TIMEOUT = 10000;

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      }
    });


    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = TIMEOUT;
    xhr.open('GET', ServerURL.GET);
    xhr.send();
  };


  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = TIMEOUT;
    xhr.open('POST', ServerURL.POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
