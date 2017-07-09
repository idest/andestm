var $ = require('jquery');

$(function () {
  function loading() {
    $('.content').hide();
    $('.spinner').show();
    console.log('Loading...');
  }
  $('#submit').click(loading);
});
