'use strict';

describe('list', function() {
  var that = this;

  beforeEach(angular.mock.module('Resume'));
  beforeEach(inject(function ($rootScope, _$compile_) {
    that.$compile = _$compile_;
    that.scope = $rootScope.$new();
  }));

  describe('without ng-repeat', function() {
    beforeEach(function() {
      that.element = angular.element('<list><li>Item 1</li><li>Item 2</li></list>');
      that.element = that.$compile(that.element)(that.scope);
      that.scope.$digest();
    });
    it('creates a ul with correct class', function() {
      expect(that.element[0].classList.contains('offset-list')).to.be.true;
    });

    it('adds correct class to transcluded li elements', function() {
      expect(that.element[0].children[0].classList.contains('offset-list-item')).to.be.true;
      expect(that.element[0].children[1].classList.contains('offset-list-item')).to.be.true;
    });
  });

  describe('with ng-repeat', function() {
    beforeEach(function() {
      that.scope.items = ['Item 1', 'Item 2'];

      that.element = angular.element('<list><li ng-repeat="item in items"></li></list>');
      that.element = that.$compile(that.element)(that.scope);
      that.scope.$digest();
    });

    it('adds correct class to transcluded li elements', function() {
      expect(that.element[0].children[0].classList.contains('offset-list-item')).to.be.true;
      expect(that.element[0].children[1].classList.contains('offset-list-item')).to.be.true;
    });
  });
});
