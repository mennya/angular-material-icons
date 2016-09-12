/// <reference path="../typings/index.d.ts" />
angular
    .module('nyMdIcons', []);

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var nyMdIcons;
(function (nyMdIcons) {
    var factoryForProvider = (function () {
        function factoryForProvider() {
        }
        factoryForProvider.prototype.$get = function () {
            var methods = {};
            _.forEach(this, function (val, prop) {
                methods[prop] = val;
            });
            return methods;
        };
        return factoryForProvider;
    }());
    nyMdIcons.factoryForProvider = factoryForProvider;
    var NyMdIcon = (function (_super) {
        __extends(NyMdIcon, _super);
        function NyMdIcon() {
            _super.apply(this, arguments);
            // default icon
            this.shapes = {
                'help_circle_outline': 'M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z'
            };
        }
        NyMdIcon.prototype.addShape = function (name, shape) {
            this.shapes[name] = shape;
        };
        NyMdIcon.prototype.addShapes = function (newShapes) {
            this.shapes = angular.extend(this.shapes, newShapes);
        };
        return NyMdIcon;
    }(factoryForProvider));
    angular
        .module('nyMdIcons')
        .provider('nyMdIcon', NyMdIcon);
})(nyMdIcons || (nyMdIcons = {}));

var nyMdIcons;
(function (nyMdIcons) {
    var DEFAULT_ICON = 'help_circle_outline';
    var DEFAULT_SIZE = 24;
    var XMLNS = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ';
    function NyMdIcon(nyMdIcon) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attr) {
                var shapes = nyMdIcon.shapes;
                var icon;
                var size;
                // render the first time
                render();
                // watch for any changes
                if (undefined !== $attr['observe'])
                    $attr.$observe('nyMdIcon', replace);
                if ($attr['size'])
                    $attr.$observe('size', resize);
                function getSvgHtml(size, path) {
                    return XMLNS + 'width="' + size + '" height="' + size + '"><path d="' +
                        path + '"/></svg>';
                }
                function render() {
                    if (!$attr['nyMdIcon'])
                        icon = DEFAULT_ICON;
                    if ($attr['nyMdIcon'])
                        icon = $attr['nyMdIcon'];
                    if (!shapes[icon])
                        icon = DEFAULT_ICON;
                    if (!size)
                        size = DEFAULT_SIZE;
                    if ($attr['size'])
                        size = $attr['size'];
                    // render
                    $element.html(getSvgHtml(size, shapes[icon]));
                }
                function replace(newicon) {
                    // validate
                    if (newicon === icon)
                        return;
                    if (!shapes[newicon])
                        newicon = DEFAULT_ICON;
                    // render new and old icons (old icon will be shown by default)
                    $element.html(XMLNS + 'width="' + size + '" height="' + size + '">' +
                        '<g id="' + newicon + '" style="display:none"><path d="' + shapes[newicon] + '"/></g>' +
                        '<g id="' + icon + '" style="display:none"><path d="' + shapes[icon] + '"/></g></svg>');
                    // morph
                    var options = JSON.parse($attr['options'] || null);
                    try {
                        // this block will succeed if SVGMorpheus is available
                        new SVGMorpheus($element.children()[0]).to(newicon, options);
                    }
                    catch (error) {
                        // fallback
                        $element.html(getSvgHtml(size, shapes[newicon]));
                    }
                    icon = newicon;
                }
                function resize(newsize) {
                    if (newsize === size)
                        return;
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
})(nyMdIcons || (nyMdIcons = {}));
