'use strict';

describe('icon', function() {
  var that = this;

  beforeEach(angular.mock.module('Resume'));
  beforeEach(inject(function ($rootScope, _$compile_) {
    that.$compile = _$compile_;
    that.scope = $rootScope.$new();

    that.element = angular.element('<icon icon-id="#pork"></icon>');
    that.element = that.$compile(that.element)(that.scope);
    that.scope.$digest();
  }));

  it('changes the svg id', function() {
    expect(that.element[0].querySelector('use').getAttribute('xlink:href')).to.eql('#pork');
  });
});
