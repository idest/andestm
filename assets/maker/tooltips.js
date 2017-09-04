var $ = require('jquery');
require('bootstrap');

$(function () {
  //Unique id assignation to each help_text
  $('.help-block').each(function ( index ) {
    $(this).attr('id', "helptext" + index);
  });
  //Initialize the tooltips for each info icon (data-toggle="tooltip")
  //with the corresponding help_text as their title
  $('[data-toggle="tooltip"]').each(function( index ) {
    $(this).tooltip({title: $('#helptext' + index).text(), container:'body'});
  });
});
