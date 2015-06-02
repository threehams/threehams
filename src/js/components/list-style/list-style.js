'use strict';

module.exports = function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var style = attrs.listStyle;
      element[0].classList.add(style + '-list');
      scope.$watchCollection(function() {
        return element.children();
      }, function() {
        _.forEach(element[0].children, function(element) {
          element.classList.add(style + '-list-item');
        });
      });
    }
  };
};
