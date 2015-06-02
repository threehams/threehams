'use strict';

module.exports = ['$timeout', function($timeout) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: require('./offset-list-template.jade'),
    link: function(scope, element, attrs, ctrl, transclude) {
      transclude(function(clone, scope) {
        element.append(clone);

        scope.$watchCollection(function() {
          return element.children();
        }, function() {
          _.forEach(element[0].children, function(element) {
            element.classList.add('offset-list-item');
          });
        });
      });
    }
  };
}];
