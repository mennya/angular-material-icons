module nyMdIcons {

  export class factoryForProvider implements ng.IServiceProvider {
    $get(): any {
      var methods = {};
      _.forEach(this, function (val, prop) {
        methods[prop] = val;
      });
      return methods;
    }
  }

  export interface INyMdIconShapes {
    [index: string]: string;
  }

  export interface INyMdIconProvider {
    // add one shape
    addShape(name: string, shape: string): void;
    // add multiple shapes
    addShapes(newShapes: INyMdIconShapes): void;
    // shapes array
    shapes: INyMdIconShapes;
  }

  class NyMdIcon extends factoryForProvider implements INyMdIconProvider {
    // default icon
    shapes: INyMdIconShapes = {
      'help_circle_outline': 'M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z'
    };

    addShape(name: string, shape: string): void {
      this.shapes[name] = shape;
    }

    addShapes(newShapes: INyMdIconShapes): void {
      this.shapes = angular.extend(this.shapes, newShapes);
    }

  }

  angular
    .module('nyMdIcons')
    .provider('nyMdIcon', NyMdIcon);
}