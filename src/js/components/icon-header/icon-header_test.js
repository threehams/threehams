'use strict';

describe('icon-header', function() {
  var that = this;

  beforeEach(angular.mock.module('Resume'));
  beforeEach(inject(function ($rootScope, _$compile_) {
    that.$compile = _$compile_;
    that.scope = $rootScope.$new();
  }));

  beforeEach(function() {
    that.element = angular.element('<icon-header><div></div><h2></h2></icon-header>');
    that.element = that.$compile(that.element)(that.scope);
    that.scope.$digest();
  });

  it('adds the correct classes', function() {
    expect(that.element[0].classList.contains('icon-header')).to.be.true;
    var left = that.element[0].querySelector('div');
    expect(left.classList.contains('icon-header-icon')).to.be.true;
    var right = that.element[0].querySelector('h2');
    expect(right.classList.contains('icon-header-title')).to.be.true;
  });
});
