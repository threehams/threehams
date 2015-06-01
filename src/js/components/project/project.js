'use strict';

module.exports = function() {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    replace: true,
    template: require('./project-template.jade'),
    controller: require('./project-controller'),
    controllerAs: 'vm',
    bindToController: true
  };
};
