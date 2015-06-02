'use strict';

module.exports = function() {
  return {
    restrict: 'E',
    compile: function(element) {
      element[0].classList.add('subtitle-header');
      var children = element[0].children;
      children[0].classList.add('subtitle-header-title');
    }
  };
};
