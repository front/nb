(function($) {
  /* Loads a chunk of html based on media-query */
  $.fn.nfLoadAware = function(options) {
    var self = this;
    for (var i = 0; i < options.length; i++) {
      enquire.register(options[i].query, {
        target: options[i].target,
        match: function() {
          self.load(this.target);
        },
        unmatch: function() {
          self.html('');
        }
      });
    }
  };
  /* Loads an image based on a media-query */
  $.fn.nfImageAware = function(options) {
    var self = this;
    for (var i = 0; i < options.length; i++) {
      enquire.register(options[i].query, {
        target: options[i].target,
        match: function() {
          self.attr('src', this.target);
        },
        unmatch: function() {
          self.attr('');
        }
      });
    }
  };
  /* Lazily loads a chunk of html */
  $.fn.nfLazyLoad = function(options) {
    var self = this;
    this.waypoint({
      handler: function() {
        // alert('getting to lazy...');
        self.load(options.target);
      },
      triggerOnce: true,
      offset: $.waypoints('viewportHeight') + options.offset
    });
  };
  /* Lazily loads a image (requires a img-src field on the target element) */
  $.fn.nfLazyImage = function(options) {
    var self = this;
    this.waypoint({
      handler: function() {
        // alert('getting to image...');
        self.after($('<img src="' + self.attr('img-src') + '">'));
      },
      triggerOnce: true,
      offset: $.waypoints('viewportHeight') + options.offset
    });
  };
  /* Lazily loads a chunk of html based on media-query */
  $.fn.nfLazyLoadAware = function(options, wp) {
    var self = this;
    this.waypoint({
      handler: function() {
        // alert('you won a car...');
        for (var i = 0; i < options.length; i++) {
          enquire.register(options[i].query, {
            target: options[i].target,
            match: function() {
              self.load(this.target);
            },
            unmatch: function() {
              self.html('');
            }
          });
        }
      },
      triggerOnce: true,
      offset: $.waypoints('viewportHeight') + wp.offset
    });
  };

})(jQuery);
