'use strict';

module.exports = function() {
  return {
    restrict: 'E',
    scope: {
      iconId: '='
    },
    replace: true,
    template: require('./icon-template.jade'),
    controller: require('./icon-controller'),
    controllerAs: 'vm',
    bindToController: true
  };
};
