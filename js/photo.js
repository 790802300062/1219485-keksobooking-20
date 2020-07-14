'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreviewBlock = document.querySelector('.ad-form-header__preview img');
  var avatarPreviewDefaultSrc = avatarPreviewBlock.src;
  var accomodationPhotoChooser = document.querySelector('#images');
  var accomodationPhotoPreviewBlock = document.querySelector('.ad-form__photo');

  var loader = function (fileChooser, filePreview, cb) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (cb) {
          filePreview = cb();
        }
        filePreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var createImgElement = function () {
    var photoItem = document.createElement('img');
    photoItem.width = 70;
    photoItem.height = 70;
    accomodationPhotoPreviewBlock.appendChild(photoItem);
    return photoItem;
  };

  var resetPhotoInputs = function () {
    avatarPreviewBlock.src = avatarPreviewDefaultSrc;
    accomodationPhotoPreviewBlock.innerHTML = '';
  };

  var onAvatarUpload = function () {
    loader(avatarChooser, avatarPreviewBlock);
  };

  var onPhotoUpload = function () {
    loader(accomodationPhotoChooser, accomodationPhotoChooser, createImgElement);
  };

  window.photo = {
    onAvatarUpload: onAvatarUpload,
    onPhotoUpload: onPhotoUpload,
    avatarChooser: avatarChooser,
    accomodationPhotoChooser: accomodationPhotoChooser,
    resetPhotoInputs: resetPhotoInputs
  };
})();
