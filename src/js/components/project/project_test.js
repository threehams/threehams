'use strict';

describe('project', function() {
  var that = this;

  beforeEach(angular.mock.module('Resume'));
  beforeEach(inject(function ($rootScope, _$compile_) {
    that.$compile = _$compile_;
    that.scope = $rootScope.$new();

    that.element = angular.element('<project></project>');
    that.element = that.$compile(that.element)(that.scope);
    that.scope.$digest();
    that.isolate = that.element.isolateScope();
  }));

  describe('optional data', function() {
    it('shows the title without location', function() {
      that.isolate.vm.data = {
        title: 'ProjectName'
      };
      that.isolate.$digest();
      var title = that.element[0].querySelector('.subtitle-header');
      expect(title.children.length).to.equal(1);
      expect(title.querySelector('.subtitle-header-title').innerHTML).to.eql('ProjectName');
    });

    it('shows the title with location', function() {
      that.isolate.vm.data = {
        title: 'ProjectName',
        locationName: 'Something',
        locationAddress: 'Somewhere'
      };
      that.isolate.$digest();
      var title = that.element[0].querySelector('.subtitle-header');
      expect(title.querySelector('.subtitle-header-title').innerHTML).to.eql('ProjectName');
      expect(title.querySelector('strong').innerHTML).to.eql('Something - Somewhere');
    });

    it('shows and formats dates', function() {
      var startDate = moment('201101', 'YYYYMM');
      var endDate = moment('201204', 'YYYYMM');
      that.isolate.vm.data = {
        startDate: startDate.toDate(),
        endDate: endDate.toDate()
      };
      that.isolate.$digest();
      var dates = that.element[0].querySelector('p strong');
      expect(dates.innerHTML).to.eql('Jan 2011 - Apr 2012');
    });

    it('hides nonexistent dates', function() {
      that.isolate.vm.data = {};
      that.isolate.$digest();
      var dates = that.element[0].querySelector('p strong');
      expect(dates).to.not.exist;
    });

    it('shows accomplishments', function() {
      that.isolate.vm.data = {
        accomplishments: [
          'did a thing'
        ]
      };
      that.isolate.$digest();
      expect(that.element[0].querySelector('ul li').innerHTML).to.eql('did a thing')
    });

    it('hides accomplishments list if there are none', function() {
      that.isolate.vm.data = {};
      that.isolate.$digest();
      expect(that.element[0].querySelector('ul')).to.not.exist;
    });

    it('shows a link if it exists', function() {
      that.isolate.vm.data = {
        link: 'http://www.example.com'
      };
      that.isolate.$digest();
      expect(that.element[0].querySelector('p a').innerHTML).to.eql('http://www.example.com');
    });

    it('hides a link if it does not exist', function() {
      that.isolate.vm.data = {};
      that.isolate.$digest();
      expect(that.element[0].querySelector('p a')).to.not.exist;
    });
  });
});
