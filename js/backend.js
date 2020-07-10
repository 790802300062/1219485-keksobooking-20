'use strict';

(function () {

  var TYPE_JSON = 'json';

  var ServerURL = {
    GET: 'https://javascript.pages.academy/keksobooking/data',
    POST: 'https://javascript.pages.academy/keksobooking'
  };

  var StatusCode = {
    OK: 200
  };
  var Timeout = 10000;

  var load = function (onSuccess/*  , onError*/) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = TYPE_JSON;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      }
    });


    xhr.addEventListener('error', function () {
      window.form.createErrorMessage();
    });

    xhr.addEventListener('timeout', function () {
      window.form.createErrorMessage();
    });

    xhr.timeout = Timeout;
    xhr.open('GET', ServerURL.GET);
    xhr.send();
  };

  var upload = function (form, onSuccess/*  , onError*/) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = TYPE_JSON;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      }
    });

    xhr.addEventListener('error', function () {
      window.form.createErrorMessage();
    });

    xhr.addEventListener('timeout', function () {
      window.form.createErrorMessage();
    });

    xhr.timeout = Timeout;
    xhr.open('POST', ServerURL.POST);
    xhr.send(form);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
