'use strict';

(function () {

  var SERVER_CODE_OK = 200;

  var ServerUrl = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    UPLOAD: 'https://javascript.pages.academy/keksobooking'
  };

  var ErrorStatus = {
    400: 'Неверный запрос',
    401: 'Пользователь не авторизован',
    404: 'Ничего на найдено',
    500: 'Ошибка сервера'
  };

  var onErrorAlert = function (error) {
    return error;
  };

  var createXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SERVER_CODE_OK) {
        onSuccess(xhr.response);
        return;
      }
      onError(ErrorStatus[xhr.status]);
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Сервер не отвечает');
    });

    xhr.open('GET', ServerUrl.LOAD);
    xhr.send();
  };

  window.backend = {
    createXhr: createXhr,
    onErrorAlert: onErrorAlert
  };

})();
