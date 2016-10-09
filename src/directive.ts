module nyMdIcons {
  var DEFAULT_ICON = 'help_circle_outline';
  var DEFAULT_SIZE = 24;
  var XMLNS = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ';
  declare var SVGMorpheus;
  /* @ngInject */
  function NyMdIcon(nyMdIcon: nyMdIcons.INyMdIconProvider): ng.IDirective {
    return {
      restrict: 'A',
      link: ($scope: ng.IScope, $element: ng.IAugmentedJQuery, $attr: ng.IAttributes) => {
        var shapes = nyMdIcon.shapes;
        var icon;
        var size;

        // render the first time
        render();

        // watch for any changes
        if (undefined !== $attr['observe']) $attr.$observe('nyMdIcon', replace);
        if ($attr['size']) $attr.$observe('size', resize);

        function getSvgHtml(size, path) {
          return XMLNS + 'width="' + size + '" height="' + size + '"><path d="' +
            path + '"/></svg>';
        }

        function render() {
          if (!$attr['nyMdIcon']) icon = DEFAULT_ICON;
          if ($attr['nyMdIcon']) icon = $attr['nyMdIcon'];

          if (!shapes[icon]) icon = DEFAULT_ICON;

          if (!size) size = DEFAULT_SIZE;
          if ($attr['size']) size = $attr['size'];

          // render
          $element.html(getSvgHtml(size, shapes[icon]));
        }

        function replace(newicon) {
          // validate
          if (newicon === icon) return;
          if (!shapes[newicon]) newicon = DEFAULT_ICON;

          // render new and old icons (old icon will be shown by default)
          $element.html(XMLNS + 'width="' + size + '" height="' + size + '">' +
            '<g id="' + newicon + '" style="display:none"><path d="' + shapes[newicon] + '"/></g>' +
            '<g id="' + icon + '" style="display:none"><path d="' + shapes[icon] + '"/></g></svg>');
          // morph
          var options = JSON.parse($attr['options'] || null);
          try {
            // this block will succeed if SVGMorpheus is available
            new SVGMorpheus($element.children()[0]).to(newicon, options);
          } catch (error) {
            // fallback
            $element.html(getSvgHtml(size, shapes[newicon]));
          }

          icon = newicon;
        }

        function resize(newsize) {
          if (newsize === size) return;

          $element.children()[0].setAttribute('width', newsize);
          $element.children()[0].setAttribute('height', newsize);
          size = newsize;
        }

      }
    };
  }

  angular
    .module('nyMdIcons')
    .directive('nyMdIcon', NyMdIcon);
}