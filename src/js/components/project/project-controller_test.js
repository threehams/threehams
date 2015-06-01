'use strict';

describe('ProjectController', function() {
  var that = this;

  beforeEach(angular.mock.module('Resume'));
  beforeEach(inject(function($rootScope, _$controller_) {
    that.scope = $rootScope;
    that.controller = _$controller_;
    that.controller('ProjectController as vm', {'$scope': that.scope});
  }));

  it('creates a scope', function() {
    expect(that.scope.vm).to.exist;
  });
});
