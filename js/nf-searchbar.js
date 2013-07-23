(function ($) {
  $.fn.searchBar = function (sbar) {
    var sb = $(sbar);
    this.click(function (ev) {
      ev.preventDefault();
      if(sb.is(':visible')){
        sb.slideUp();
      }
      else {
        sb.slideDown(function () {
          sb.find('input[type="text"]').focus();
        });
      }
    });
    sb.find('.nf-search-cancel').click(function (ev) {
      ev.preventDefault();
      sb.slideUp();
    })
  };
})(jQuery);
