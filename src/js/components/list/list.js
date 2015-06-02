'use strict';

module.exports = function() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: require('./list-template.jade'),
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
};
