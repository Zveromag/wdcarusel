(function($) {

  'use strict';

// Prefix helper
  function getCss3Prop(prefixProp) {

    var element = document.documentElement;
    var prefix = ['-o-', '-webkit-', '-moz-', ''];

    function camelCase(str) {
      return str.replace(/\-([a-z])/gi, function(match, $1) {
        return $1.toUpperCase();
      });
    }

    for (var i = prefix.length - 1; i >= 0; i--) {
      var prefixProp = camelCase(prefix[i] + prefixProp);
      if(prefixProp in element.style) {
        return prefixProp;
      }
    }

    return false;
  }


  var transform = getCss3Prop('transform');
  var transitionDuration =  getCss3Prop('transition-duration');

  var PLUGINNAME = 'WDCarusel';

   $.fn[PLUGINNAME] = function(options) {

    if(!transform) {
      throw new Error('Your browser does not support transform');
    }

    var arrowLeftIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">' +
                          '<path d="M736.4 11.4c-3.4 1.3-436.6 418.2-484.2 466-14 13.8-15 15.3-15 23 0 7.3 1.2 9.2 12 20 11 11 466 450.4 480.3 463.8 13 12 33.2 4 33.2-13.4 0-9 10.3 1.4-260.8-260.4C383 596 286 501.6 285.5 500.8c-.2-.8 105-103.2 233.7-227.6C648.3 148.7 755.6 44.4 758 41.5c12.4-14.6-4.3-37.4-21.6-30z"/>' +
                        '</svg>';
    var arrowRightIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">' +
                          '<path d="M249.7 11.8c-6.5 2.6-12.3 11.3-12.3 18.7 0 8.7-13.8-5 257 256.3C615 403.4 713.7 499.4 713.7 500.4s-106.6 105-237 230.8c-130.3 126-237.5 230.4-238 232.3-2.7 7-1.4 14.4 4 20.4 4.4 4.8 7 6 13.6 6 7 0 9.4-1.2 17-8.6C333 924.4 742 529.7 751 520.7c10.7-11 12-12.8 12-20 0-7.6-1-9.3-14-22-52-52-482-465.6-485.7-467-5.6-2.2-8-2.2-13.3 0z"/>' +
                        '</svg>';
    var options = $.extend({
      itemPadding : 5,
      arrowLeft : arrowLeftIcon,
      arrowRight : arrowRightIcon,
      infinite : false,
      autoplay : false,
      autoplaySpeed : 3000,
      stopInHover : false,
      containerNav : '',
      responsive : [
        {
          breakpoint: 1170,
          items: 5
        },
        {
          breakpoint: 960,
          items: 4
        },
        {
          breakpoint: 768,
          items: 3
        },
        {
          breakpoint: 480,
          items: 2
        },
        {
          breakpoint: 320,
          items: 1
        }
      ]
    }, options);

    return this.each(function(){

      var $container = $(this);
      var $items = $container.find('.wd-carusel__item');
      var itemsCount = $items.length;
      var arrowsTemplate =  '<span class="wd-carusel__nav--icon wd-carusel__nav--left">' + options.arrowLeft + '</span>' +
                            '<span class="wd-carusel__nav--icon wd-carusel__nav--right">' + options.arrowRight + '</span>';
      var containerWidth;
      var itemsWidth;
      var wrapWidth;
      var $wrap;
      var _items;
      var position = 0;

      $items.wrapAll('<div class="wd-carusel__wrap"></div>');
      $wrap = $container.find('.wd-carusel__wrap');

      //inner arrows
      if(options.containerNav.trim() !== '' && typeof options.containerNav === 'string') {
        options.containerNav = $(options.containerNav);
      }
      else {
        options.containerNav = $container;
      }

      options.containerNav.append(arrowsTemplate);
      var $arrows = options.containerNav.find('.wd-carusel__nav--icon');

      var interval = null;

      if(options.autoplay) {

        if(options.stopInHover) {
          $container.on('mouseenter', function() {
            if(interval) clearInterval(interval);
          });
          $container.on('mouseleave', function() {
            autoplay();
          });
        }

        autoplay();
      }

      resize();
      hasNav();

      // Bind events
      $(window).on('resize.' + PLUGINNAME, resize);
      $arrows.on('click.' + PLUGINNAME, navigation);

     function resize() {

        containerWidth = $container.width();

        for(var i = 0; options.responsive.length > i; i++) {

          if(containerWidth >= options.responsive[i].breakpoint) {
            _items = options.responsive[i].items;
            dimensions();
            break;
          }

        }

      }

      function dimensions() {
        containerWidth = $container.width();
        itemsWidth = containerWidth / _items;
        wrapWidth = (itemsWidth  + (options.itemPadding * 2)) * itemsCount;

        $items
        .css({
          width: itemsWidth,
          padding: options.itemPadding
        });

        position = 0;
        $wrap.css('width', wrapWidth);
        $wrap[0].style[transitionDuration] = '0s';
        $wrap[0].style[transform] = 'translate(0, 0)';
        setTimeout(function() {
          $wrap[0].style[transitionDuration] = '';
        }, 10);
      }

      function hasNav() {

        if(itemsCount <= options.items) {
          $arrows.hide();
        }

      }

      function autoplay() {
        if(interval) clearInterval(interval);

        interval = setInterval(function() {
          slideTo('next');
        }, options.autoplaySpeed);

      }

      function slideTo(dir) {

        var end = -itemsWidth * (itemsCount - _items);

        if(dir === 'prev') {

          if(options.infinite && position === 0) {
            position = end;
          } else {
            position = Math.min(position + itemsWidth * _items, 0);
          }

        }
        else {

          if(options.infinite && position === end) {
            position = 0;
          } else {
            position = Math.max((position - itemsWidth * _items), end);
          }

        }

        $wrap[0].style[transform] = 'translate(' + position + 'px, 0)';

      }

      function navigation() {

        var $target = $(this);

        if($target.hasClass('wd-carusel__nav--left')) {
          slideTo('prev');
        } else {
          slideTo('next');
        }

      }



    });

   }

 })(jQuery);