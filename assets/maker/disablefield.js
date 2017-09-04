var $ = require('jquery');

$(function () {
  //EF disabled behavior
  var initialsize = $('.numberinput').css('font-size');
  function toggle_disabled( event ) {
    $(event.data.elem).prop('readonly', this.checked);
    if (this.checked) {
      $(event.data.elem).css('font-size', '0px');
    } else {
      $(event.data.elem).css('font-size', initialsize);
    }
    //console.log('toggled');
  }
  $('#id_t_lat').click({ elem: '#id_t' }, toggle_disabled);
  $('#id_delta_icd').click({ elem: '#id_delta' }, toggle_disabled);
  $('#id_t_lat').triggerHandler('click');
  $('#id_delta_icd').triggerHandler('click');
});
