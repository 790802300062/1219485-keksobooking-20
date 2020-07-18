'use strict';

(function () {

  var RESPONSE_TYPE = 'json';
  var TIMEOUT = 10000;

  var ServerURL = {
    GET: 'https://javascript.pages.academy/keksobooking/data',
    POST: 'https://javascript.pages.academy/keksobooking'
  };
  var StatusCode = {
    OK: 200
  };

  var createXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var load = function (onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError);

    xhr.open('GET', ServerURL.GET);
    xhr.send();
  };


  var upload = function (data, onSuccess, onError) {
    var xhr = createXHR(onSuccess, onError);

    xhr.open('POST', ServerURL.POST);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();
