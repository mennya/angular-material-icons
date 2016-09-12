angular-material-icons
======================

AngularJS directive to use Material Design icons with custom fill-color and size.

This project encompasses all SVG icons from [Google's official Material Design Icon repository](https://github.com/google/material-design-icons) and few hand-picked icons from community-led [MaterialDesignIcons.com](http://materialdesignicons.com/) in form of angular directive that gives option to specify custom fill-color and size.

Changes to icon will go through delightful morphing if [SVG-Morpheus](https://github.com/alexk111/SVG-Morpheus) is also included in your application.

This is fork of [angular-material-icons](https://github.com/klarsys/angular-material-icons)  
Changes:
* No need of external css, just use like this:  
`<md-icon ny-md-icon='some_icon_name'></md-icon>`
* Because of big size (~300kb) removed all preinstaled icons, exept of default.
* Some performance improvements, removed icon watcher. Now icon is watched only if observe attribute is present  
 `<md-icon ny-md-icon='some_icon_name' observe></md-icon>`

## Installation
This library is available via bower and npm
* `bower install ny-angular-material-icons`
* `npm install ny-angular-material-icons`

## Configure own icons
add many icons
```javascript
angular.module('moduleName').config(function (nyMdIconProvider) {
    nyMdIconProvider.addShapes({
        'signal_wifi_0_bar': 'M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z',
        'signal_wifi_1_bar': 'M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"/><path d="M6.67 14.86L12 21.49v.01l.01-.01 5.33-6.63C17.06 14.65 15.03 13 12 13s-5.06 1.65-5.33 1.86z',
    });
});
```

## Licenses

This package is released under [MIT license](https://raw.githubusercontent.com/mennya/angular-material-icons/master/LICENSE).