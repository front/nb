(function ($) {
  $.fn.menuToggle = function (content) {
    var self = this;
    var toggle1 = this.find('.nf-toggle a');
    if(toggle1) {
      toggle1.click(function (ev) {
        clickToggle(toggle1, ev);
      });
    }
    var toggle2 = this.find('.nf-toggle-sub a');
    if(toggle2) {
      toggle2.click(function (ev) {
        clickToggle(toggle2, ev);
      });
    }
    var clickToggle = function (toggle, ev) {
      ev.preventDefault();
      var cls = toggle.parent().attr('data-toggle');
      var menu = self.find(cls);
      if(!menu) {
        return;
      }
      if(menu.is(':visible')){
        if(content) $(content).show();
        menu.slideUp();
      }
      else {
        menu.slideDown(function () {
          if(content) $(content).hide();
        });
      }
    }
  };
})(jQuery);
