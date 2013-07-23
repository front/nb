(function ($) {
  $.fn.menuToggle = function (content) {
    var self = this;
    var toggle1 = this.find('.nf-toggle-main a');
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
      var section = toggle.parent();
      var cls = section.attr('data-toggle');
      var menu = self.find(cls);
      if(!menu) {
        return;
      }
      if(menu.is(':visible')){
        if(content) $(content).show();
        menu.slideUp(function () {
          section.removeClass('nf-open');
        });
      }
      else {
        section.addClass('nf-open');
        menu.slideDown(function () {
          if(content) $(content).hide();
        });
      }
    }
  };
})(jQuery);
