'use strict';

describe('subtitle-header', function() {
  var that = this;

  beforeEach(angular.mock.module('Resume'));
  beforeEach(inject(function ($rootScope, _$compile_) {
    that.$compile = _$compile_;
    that.scope = $rootScope.$new();
  }));

  beforeEach(function() {
    that.element = angular.element('<subtitle-header><div></div><h2></h2></subtitle-header>');
    that.element = that.$compile(that.element)(that.scope);
    that.scope.$digest();
  });

  it('adds the correct classes', function() {
    expect(that.element[0].classList.contains('subtitle-header')).to.be.true;
    var left = that.element[0].querySelector('div');
    expect(left.classList.contains('subtitle-header-title')).to.be.true;
  });
});
