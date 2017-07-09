var $ = require('jquery');

$(function () {
  //EF disabled behavior
  var initialsize = $('#id_EF').css('font-size');
  function toggle_disabled( event ) {
    $(event.data.elem).prop('readonly', this.checked);
    if (this.checked) {
      $(event.data.elem).css('font-size', '0px');
    } else {
      $(event.data.elem).css('font-size', initialsize);
    }
    //console.log('toggled');
  }
  $('#id_EF_lat').click({ elem: '#id_EF' }, toggle_disabled);
  $('#id_EF_lat').triggerHandler('click');
});
