(function($) {
  $.fn.nfSearchBox = function() {
    var self = this,
      open = self.hasClass('nf-sbopen'),
      leaving = false,
      txt = this.children('input[type="text"]'),
      sub = this.children('input[type="submit"]'),
      span = this.children('span');
    span.click(function (ev) {
      if(open){
        if(txt.val().length > 0){
          leaving = true;
          self.submit();
        }
      }
      else {
        self.addClass('nf-sbopen');
        txt.focus();
        setTimeout(function () { open = true; }, 300);
      }
    });
    txt.focusout(function () {
      setTimeout(function () {
        if(open && !leaving) {
          self.removeClass('nf-sbopen');
          setTimeout(function () { open = false; }, 300);
        }
      },100);
    });
    span.show();
    sub.hide();
    self.addClass('nf-sbform nf-sbclose');
  };
}(jQuery));
