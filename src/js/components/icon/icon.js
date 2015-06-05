'use strict';

module.exports = function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      iconId: '@'
    },
    template: require('./icon-template.jade'),
    link: function(scope, element, attrs) {
      scope.iconId = attrs.iconId;
    }
  };
};
