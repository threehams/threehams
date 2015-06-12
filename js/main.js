(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/js/main.js":[function(require,module,exports){
(function (global){
'use strict';

require('angular');
require('angular-route');
require('angular-animate');
global._ = require('lodash');

var app = angular.module('Resume', ['ngRoute', 'ngAnimate']);

// pages
app.controller('PageController', require('./pages/page/page-controller.js'));

// components (controllers exposed for testing)
app.directive('icon', require('./components/icon/icon'));
app.directive('iconHeader', require('./components/icon-header/icon-header'));
app.directive('subtitleHeader', require('./components/subtitle-header/subtitle-header'));
app.directive('listStyle', require('./components/list-style/list-style'));
app.directive('project', require('./components/project/project'));
app.controller('ProjectController', require('./components/project/project-controller.js'));

app.value('Profile', require('./services/profile'));

app.config([
  '$locationProvider',
  '$routeProvider',
  function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        template: require('./pages/page/page-template.jade'),
        controller: 'PageController',
        controllerAs: 'page'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);

// Uncomment for debugging
//angular.module('utils').filter('isDefined', function () {
//  return function (value, msg) {
//    if (value === undefined) {
//      throw new Error('isDefined filter got undefined value ' + msg);
//    }
//    return value;
//  };
//});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./components/icon-header/icon-header":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\icon-header\\icon-header.js","./components/icon/icon":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\icon\\icon.js","./components/list-style/list-style":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\list-style\\list-style.js","./components/project/project":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\project\\project.js","./components/project/project-controller.js":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\project\\project-controller.js","./components/subtitle-header/subtitle-header":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\subtitle-header\\subtitle-header.js","./pages/page/page-controller.js":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\pages\\page\\page-controller.js","./pages/page/page-template.jade":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\pages\\page\\page-template.jade","./services/profile":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\services\\profile.js","angular":"angular","angular-animate":"angular-animate","angular-route":"angular-route","lodash":"lodash"}],"C:\\Users\\threehams\\workspace\\threehams\\node_modules\\browserify\\node_modules\\browser-resolve\\empty.js":[function(require,module,exports){

},{}],"C:\\Users\\threehams\\workspace\\threehams\\node_modules\\jade\\runtime.js":[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jade = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = merge(attrs, a[i]);
    }
    return attrs;
  }
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    a['class'] = ac.concat(bc).filter(nulls);
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {
  return val != null && val !== '';
}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
exports.joinClasses = joinClasses;
function joinClasses(val) {
  return (Array.isArray(val) ? val.map(joinClasses) :
    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
    [val]).filter(nulls).join(' ');
}

/**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
exports.cls = function cls(classes, escaped) {
  var buf = [];
  for (var i = 0; i < classes.length; i++) {
    if (escaped && escaped[i]) {
      buf.push(exports.escape(joinClasses([classes[i]])));
    } else {
      buf.push(joinClasses(classes[i]));
    }
  }
  var text = joinClasses(buf);
  if (text.length) {
    return ' class="' + text + '"';
  } else {
    return '';
  }
};


exports.style = function (val) {
  if (val && typeof val === 'object') {
    return Object.keys(val).map(function (style) {
      return style + ':' + val[style];
    }).join(';');
  } else {
    return val;
  }
};
/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = function attr(key, val, escaped, terse) {
  if (key === 'style') {
    val = exports.style(val);
  }
  if ('boolean' == typeof val || null == val) {
    if (val) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    } else {
      return '';
    }
  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
    if (JSON.stringify(val).indexOf('&') !== -1) {
      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
                   'will be escaped to `&amp;`');
    };
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will eliminate the double quotes around dates in ' +
                   'ISO form after 2.0.0');
    }
    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
  } else if (escaped) {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + exports.escape(val) + '"';
  } else {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + val + '"';
  }
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
exports.attrs = function attrs(obj, terse){
  var buf = [];

  var keys = Object.keys(obj);

  if (keys.length) {
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('class' == key) {
        if (val = joinClasses(val)) {
          buf.push(' ' + key + '="' + val + '"');
        }
      } else {
        buf.push(exports.attr(key, val, false, terse));
      }
    }
  }

  return buf.join('');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  var result = String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  if (result === '' + html) return html;
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || require('fs').readFileSync(filename, 'utf8')
  } catch (ex) {
    rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

exports.DebugItem = function DebugItem(lineno, filename) {
  this.lineno = lineno;
  this.filename = filename;
}

},{"fs":2}],2:[function(require,module,exports){

},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"fs":"C:\\Users\\threehams\\workspace\\threehams\\node_modules\\browserify\\node_modules\\browser-resolve\\empty.js"}],"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\icon-header\\icon-header.js":[function(require,module,exports){
'use strict';

module.exports = function() {
  return {
    restrict: 'E',
    compile: function(element) {
      element[0].classList.add('icon-header');
      var children = element[0].children;
      children[0].classList.add('icon-header-icon');
      children[1].classList.add('icon-header-title');
    }
  };
};

},{}],"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\icon\\icon-template.jade":[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<svg class=\"icon\"><use xlink:href=\"{{ ::iconId }}\"></use></svg>");;return buf.join("");
};
},{"jade/runtime":"C:\\Users\\threehams\\workspace\\threehams\\node_modules\\jade\\runtime.js"}],"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\icon\\icon.js":[function(require,module,exports){
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

},{"./icon-template.jade":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\icon\\icon-template.jade"}],"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\list-style\\list-style.js":[function(require,module,exports){
'use strict';

module.exports = function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var style = attrs.listStyle;
      element[0].classList.add(style + '-list');
      scope.$watchCollection(function() {
        return element.children();
      }, function() {
        _.forEach(element[0].children, function(element) {
          element.classList.add(style + '-list-item');
        });
      });
    }
  };
};

},{}],"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\project\\project-controller.js":[function(require,module,exports){
'use strict';

module.exports = [function () {
  var vm = this;
}];
},{}],"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\project\\project-template.jade":[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div><subtitle-header><h2>{{ ::vm.data.title }}</h2><strong ng-if=\"::vm.data.locationName\">{{ ::vm.data.locationName }} - {{ ::vm.data.locationAddress }}</strong></subtitle-header><p><strong ng-if=\"::vm.data.startDate\">{{ ::vm.data.startDate | date: 'MMM yyyy' }} - {{ ::vm.data.endDate | date: 'MMM yyyy' }}</strong>{{ ::vm.data.summary }} &nbsp;<a href=\"{{ ::vm.data.link }}\" ng-if=\"::vm.data.link\">{{ ::vm.data.link }}</a></p><ul ng-if=\"::vm.data.accomplishments\" class=\"project-list\"><li ng-repeat=\"accomplishment in ::vm.data.accomplishments\" class=\"project-list-item\">{{ ::accomplishment }}</li></ul></div>");;return buf.join("");
};
},{"jade/runtime":"C:\\Users\\threehams\\workspace\\threehams\\node_modules\\jade\\runtime.js"}],"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\project\\project.js":[function(require,module,exports){
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

},{"./project-controller":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\project\\project-controller.js","./project-template.jade":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\project\\project-template.jade"}],"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\subtitle-header\\subtitle-header.js":[function(require,module,exports){
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

},{}],"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\pages\\page\\page-controller.js":[function(require,module,exports){
'use strict';

module.exports = ['Profile', function (Profile) {
  var page = this;

  page.user = Profile;
}];

},{}],"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\pages\\page\\page-template.jade":[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<header><section class=\"header-section\"><h1>{{ ::page.user.name }}</h1><h2>{{ ::page.user.title }}</h2></section><section class=\"header-section\"><h2>Expertise</h2><icon icon-id=\"#check\"></icon><ul list-style=\"centered\"><li ng-repeat=\"expertise in ::page.user.expertise\">{{ ::expertise }}</li></ul></section><section class=\"header-section\"><h2>Tech Skill Set</h2><icon icon-id=\"#markup\"></icon><ul list-style=\"centered\"><li ng-repeat=\"skill in ::page.user.skills\">{{ ::skill }}</li></ul></section></header><main><section class=\"main-section profile\"><icon-header><icon icon-id=\"#profile\"></icon><h2>Profile</h2></icon-header><p>{{ ::page.user.profile }}</p></section><section class=\"main-section experience\"><icon-header><icon icon-id=\"#briefcase\"></icon><h2>Experience</h2></icon-header><ul list-style=\"offset\"><li ng-repeat=\"job in ::page.user.jobs\"><project data=\"job\"></project></li></ul><icon-header><icon icon-id=\"#fork\"></icon><h2>Projects</h2></icon-header><ul list-style=\"offset\"><li ng-repeat=\"project in ::page.user.projects\"><project data=\"project\"></project></li></ul><icon-header><icon icon-id=\"#pencil\"></icon><h2>Education</h2></icon-header><ul list-style=\"offset\"><li><h2>{{ ::page.user.education.degree }}</h2><p><strong>{{ ::page.user.education.date | date: 'MMM yyyy' }}</strong><span>{{ ::page.user.education.college }}</span></p></li></ul></section><footer><icon icon-id=\"#contact\" class=\"contact-box-icon\"></icon><div class=\"contact-box\"><div class=\"contact-box-info\"><strong>{{ ::page.user.address }}, {{ ::page.user.zipcode }}</strong><a href=\"mailto:{{ ::page.user.email }}\"><strong>{{ ::page.user.email }}</strong></a></div><div class=\"contact-box-info\"><strong>{{ ::page.user.phone }}</strong><a href=\"{{ ::page.user.link }}\"><strong>{{ ::page.user.link }}</strong></a></div></div></footer></main><a href=\"https://github.com/threehams/threehams.github.io/tree/master/src\" class=\"view-source\">View Source</a>");;return buf.join("");
};
},{"jade/runtime":"C:\\Users\\threehams\\workspace\\threehams\\node_modules\\jade\\runtime.js"}],"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\services\\profile.js":[function(require,module,exports){
module.exports = {
  name: 'David Edmondson',
  title: 'Web Developer',
  address: '4607 Willis Ave Apt. 14',
  city: 'Sherman Oaks',
  state: 'CA',
  zipcode: 91403,
  email: 'davidaedmondson@gmail.com',
  phone: '818.804.7255',
  link: 'https://github.com/threehams',
  profile: 'Full-stack developer with background in systems administration, content management, and automated testing, with 4 years of experience in software development and test engineering.',
  education: {
    degree: 'Bachelor of Fine Arts - Film and Animation',
    college: 'Rochester Institute of Technology',
    date: new Date(2005, 4)
  },
  jobs: [
    {
      title: 'Software Engineer',
      startDate: new Date(2012, 6),
      endDate: new Date(2015, 2),
      locationName: 'Sweety High',
      locationAddress: 'Marina Del Rey, CA',
      summary: 'Full-stack developer for a social networking site and mobile app API, using Rails, Node.js, jQuery, and Angular. Promoted from QA Engineer to Software Engineer within first year.',
      accomplishments: [
        'Built a Ruby on Rails service that managed all website and mobile user authentication, authorization, account, relationship, and age verification.',
        'Wrote the backend API for the video creation, organization, and sharing section of the site.',
        'Built a content management system with Rails to organize all photos and videos, contests, and curated community photo/video playlists.',
        'Developed a community moderation system with Rails for approval and rejection of user posted text, photos, and videos.',
        'Wrote a full suite of load tests, identified, removed, or optimized slow queries, and increased the number of possible requests per second by 400%.',
        'Integrated a Node.js API with a third-party moderation system using a reliable message queue.',
        'Maintained 90% test coverage across all front-end and back-end code.'
      ]
    },
    {
      title: 'QA Engineer',
      startDate: new Date(2010, 7),
      endDate: new Date(2011, 11),
      locationName: 'Meteor Games',
      locationAddress: 'Beverly Hills, CA',
      summary: 'Developed pipeline and testing tools and performed automated testing on four Facebook games. Promoted from QA Tester to QA Engineer within first year.',
      accomplishments: [
        'Analyzed workflows for 20 staff to identify sources of inefficiency, prioritize tasks, and develop content management and debugging tools, saving 4K man hours and $150K annually.',
        'Created a set of scripts to simplify and validate database entry with Python and Selenium, which reduced related bugs by over 90%, and quadrupled department production.',
        'Automated ticket validation and population with Python, reducing weekly process time by 14 hours.',
        'Built art verification tools to eliminate technical art issues, including a UI used by eight artists and six testers that allowed the QA Department to test art weeks in advance of in-game appearance.',
        'Taught weekly classes to seven testers on JSON, specific game data formats, keyboard shortcuts, and efficiency.'
      ]
    }
  ],
  projects: [
    {
      title: 'Koangulpitestify',
      summary: 'Full-stack JS boilerplate project, used as a base for other projects. Includes Koa backend and Angular component-based frontend, and is entirely built on promises. Saving a file selectively triggers asset compilation, frontend/backend test runners, server restart, and browser reload as needed.',
      link: 'https://github.com/threehams/koangulpitestify'
    },
    {
      title: 'Death Whimsy Roadmap',
      summary: 'Public site to show development progress of a game developed by Squid Blink Games. Written in Angular and Koa, with Flexbox and HTML5 Canvas. Pulls information from the Jira API and receives realtime updates using Jira webhooks.',
      link: 'https://github.com/threehams/death-whimsy-roadmap'
    },
    {
      title: 'Game Prototypes',
      summary: 'Four game prototypes using the Phaser game engine. Done to explore the design complexity of games, and performance difficulties in maintaining 60 frames per second.',
      link: 'https://github.com/threehams/phaser-game-prototypes'
    }
  ],
  expertise: [
    'AngularJS',
    'Node.js / Hapi',
    'Ruby on Rails',
    'Test-Driven Development'
  ],
  skills: [
    'AngularJS',
    'HTML/CSS',
    'Photoshop/Illustrator',
    'PosgreSQL',
    'Cassandra',
    'Ruby on Rails'
  ]
};

},{}]},{},["./src/js/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXJlc29sdmUvZW1wdHkuanMiLCJub2RlX21vZHVsZXMvamFkZS9ydW50aW1lLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvaWNvbi1oZWFkZXIvaWNvbi1oZWFkZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9pY29uL2ljb24tdGVtcGxhdGUuamFkZSIsInNyYy9qcy9jb21wb25lbnRzL2ljb24vaWNvbi5qcyIsInNyYy9qcy9jb21wb25lbnRzL2xpc3Qtc3R5bGUvbGlzdC1zdHlsZS5qcyIsInNyYy9qcy9jb21wb25lbnRzL3Byb2plY3QvcHJvamVjdC1jb250cm9sbGVyLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvcHJvamVjdC9wcm9qZWN0LXRlbXBsYXRlLmphZGUiLCJzcmMvanMvY29tcG9uZW50cy9wcm9qZWN0L3Byb2plY3QuanMiLCJzcmMvanMvY29tcG9uZW50cy9zdWJ0aXRsZS1oZWFkZXIvc3VidGl0bGUtaGVhZGVyLmpzIiwic3JjL2pzL3BhZ2VzL3BhZ2UvcGFnZS1jb250cm9sbGVyLmpzIiwic3JjL2pzL3BhZ2VzL3BhZ2UvcGFnZS10ZW1wbGF0ZS5qYWRlIiwic3JjL2pzL3NlcnZpY2VzL3Byb2ZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2pEQTs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnJlcXVpcmUoJ2FuZ3VsYXInKTtcclxucmVxdWlyZSgnYW5ndWxhci1yb3V0ZScpO1xyXG5yZXF1aXJlKCdhbmd1bGFyLWFuaW1hdGUnKTtcclxuZ2xvYmFsLl8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxuXHJcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnUmVzdW1lJywgWyduZ1JvdXRlJywgJ25nQW5pbWF0ZSddKTtcclxuXHJcbi8vIHBhZ2VzXHJcbmFwcC5jb250cm9sbGVyKCdQYWdlQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vcGFnZXMvcGFnZS9wYWdlLWNvbnRyb2xsZXIuanMnKSk7XHJcblxyXG4vLyBjb21wb25lbnRzIChjb250cm9sbGVycyBleHBvc2VkIGZvciB0ZXN0aW5nKVxyXG5hcHAuZGlyZWN0aXZlKCdpY29uJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL2ljb24vaWNvbicpKTtcclxuYXBwLmRpcmVjdGl2ZSgnaWNvbkhlYWRlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9pY29uLWhlYWRlci9pY29uLWhlYWRlcicpKTtcclxuYXBwLmRpcmVjdGl2ZSgnc3VidGl0bGVIZWFkZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvc3VidGl0bGUtaGVhZGVyL3N1YnRpdGxlLWhlYWRlcicpKTtcclxuYXBwLmRpcmVjdGl2ZSgnbGlzdFN0eWxlJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL2xpc3Qtc3R5bGUvbGlzdC1zdHlsZScpKTtcclxuYXBwLmRpcmVjdGl2ZSgncHJvamVjdCcsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9wcm9qZWN0L3Byb2plY3QnKSk7XHJcbmFwcC5jb250cm9sbGVyKCdQcm9qZWN0Q29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9wcm9qZWN0L3Byb2plY3QtY29udHJvbGxlci5qcycpKTtcclxuXHJcbmFwcC52YWx1ZSgnUHJvZmlsZScsIHJlcXVpcmUoJy4vc2VydmljZXMvcHJvZmlsZScpKTtcclxuXHJcbmFwcC5jb25maWcoW1xyXG4gICckbG9jYXRpb25Qcm92aWRlcicsXHJcbiAgJyRyb3V0ZVByb3ZpZGVyJyxcclxuICBmdW5jdGlvbiAoJGxvY2F0aW9uUHJvdmlkZXIsICRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XHJcblxyXG4gICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgLndoZW4oJy8nLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vcGFnZXMvcGFnZS9wYWdlLXRlbXBsYXRlLmphZGUnKSxcclxuICAgICAgICBjb250cm9sbGVyOiAnUGFnZUNvbnRyb2xsZXInLFxyXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3BhZ2UnXHJcbiAgICAgIH0pXHJcbiAgICAgIC5vdGhlcndpc2Uoe1xyXG4gICAgICAgIHJlZGlyZWN0VG86ICcvJ1xyXG4gICAgICB9KTtcclxuICB9XHJcbl0pO1xyXG5cclxuLy8gVW5jb21tZW50IGZvciBkZWJ1Z2dpbmdcclxuLy9hbmd1bGFyLm1vZHVsZSgndXRpbHMnKS5maWx0ZXIoJ2lzRGVmaW5lZCcsIGZ1bmN0aW9uICgpIHtcclxuLy8gIHJldHVybiBmdW5jdGlvbiAodmFsdWUsIG1zZykge1xyXG4vLyAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4vLyAgICAgIHRocm93IG5ldyBFcnJvcignaXNEZWZpbmVkIGZpbHRlciBnb3QgdW5kZWZpbmVkIHZhbHVlICcgKyBtc2cpO1xyXG4vLyAgICB9XHJcbi8vICAgIHJldHVybiB2YWx1ZTtcclxuLy8gIH07XHJcbi8vfSk7XHJcbiIsbnVsbCwiKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuamFkZSA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNZXJnZSB0d28gYXR0cmlidXRlIG9iamVjdHMgZ2l2aW5nIHByZWNlZGVuY2VcbiAqIHRvIHZhbHVlcyBpbiBvYmplY3QgYGJgLiBDbGFzc2VzIGFyZSBzcGVjaWFsLWNhc2VkXG4gKiBhbGxvd2luZyBmb3IgYXJyYXlzIGFuZCBtZXJnaW5nL2pvaW5pbmcgYXBwcm9wcmlhdGVseVxuICogcmVzdWx0aW5nIGluIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gKiBAcGFyYW0ge09iamVjdH0gYlxuICogQHJldHVybiB7T2JqZWN0fSBhXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLm1lcmdlID0gZnVuY3Rpb24gbWVyZ2UoYSwgYikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBhdHRycyA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRycyA9IG1lcmdlKGF0dHJzLCBhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJzO1xuICB9XG4gIHZhciBhYyA9IGFbJ2NsYXNzJ107XG4gIHZhciBiYyA9IGJbJ2NsYXNzJ107XG5cbiAgaWYgKGFjIHx8IGJjKSB7XG4gICAgYWMgPSBhYyB8fCBbXTtcbiAgICBiYyA9IGJjIHx8IFtdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhYykpIGFjID0gW2FjXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYmMpKSBiYyA9IFtiY107XG4gICAgYVsnY2xhc3MnXSA9IGFjLmNvbmNhdChiYykuZmlsdGVyKG51bGxzKTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGtleSAhPSAnY2xhc3MnKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIEZpbHRlciBudWxsIGB2YWxgcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG51bGxzKHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsICE9PSAnJztcbn1cblxuLyoqXG4gKiBqb2luIGFycmF5IGFzIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5qb2luQ2xhc3NlcyA9IGpvaW5DbGFzc2VzO1xuZnVuY3Rpb24gam9pbkNsYXNzZXModmFsKSB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheSh2YWwpID8gdmFsLm1hcChqb2luQ2xhc3NlcykgOlxuICAgICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpID8gT2JqZWN0LmtleXModmFsKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdmFsW2tleV07IH0pIDpcbiAgICBbdmFsXSkuZmlsdGVyKG51bGxzKS5qb2luKCcgJyk7XG59XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGNsYXNzZXNcbiAqIEBwYXJhbSB7QXJyYXkuPEJvb2xlYW4+fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuY2xzID0gZnVuY3Rpb24gY2xzKGNsYXNzZXMsIGVzY2FwZWQpIHtcbiAgdmFyIGJ1ZiA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZXNjYXBlZCAmJiBlc2NhcGVkW2ldKSB7XG4gICAgICBidWYucHVzaChleHBvcnRzLmVzY2FwZShqb2luQ2xhc3NlcyhbY2xhc3Nlc1tpXV0pKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1Zi5wdXNoKGpvaW5DbGFzc2VzKGNsYXNzZXNbaV0pKTtcbiAgICB9XG4gIH1cbiAgdmFyIHRleHQgPSBqb2luQ2xhc3NlcyhidWYpO1xuICBpZiAodGV4dC5sZW5ndGgpIHtcbiAgICByZXR1cm4gJyBjbGFzcz1cIicgKyB0ZXh0ICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cblxuZXhwb3J0cy5zdHlsZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWwpLm1hcChmdW5jdGlvbiAoc3R5bGUpIHtcbiAgICAgIHJldHVybiBzdHlsZSArICc6JyArIHZhbFtzdHlsZV07XG4gICAgfSkuam9pbignOycpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWw7XG4gIH1cbn07XG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXNjYXBlZFxuICogQHBhcmFtIHtCb29sZWFufSB0ZXJzZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHIgPSBmdW5jdGlvbiBhdHRyKGtleSwgdmFsLCBlc2NhcGVkLCB0ZXJzZSkge1xuICBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgdmFsID0gZXhwb3J0cy5zdHlsZSh2YWwpO1xuICB9XG4gIGlmICgnYm9vbGVhbicgPT0gdHlwZW9mIHZhbCB8fCBudWxsID09IHZhbCkge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHJldHVybiAnICcgKyAodGVyc2UgPyBrZXkgOiBrZXkgKyAnPVwiJyArIGtleSArICdcIicpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9IGVsc2UgaWYgKDAgPT0ga2V5LmluZGV4T2YoJ2RhdGEnKSAmJiAnc3RyaW5nJyAhPSB0eXBlb2YgdmFsKSB7XG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KHZhbCkuaW5kZXhPZignJicpICE9PSAtMSkge1xuICAgICAgY29uc29sZS53YXJuKCdTaW5jZSBKYWRlIDIuMC4wLCBhbXBlcnNhbmRzIChgJmApIGluIGRhdGEgYXR0cmlidXRlcyAnICtcbiAgICAgICAgICAgICAgICAgICAnd2lsbCBiZSBlc2NhcGVkIHRvIGAmYW1wO2AnKTtcbiAgICB9O1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgZWxpbWluYXRlIHRoZSBkb3VibGUgcXVvdGVzIGFyb3VuZCBkYXRlcyBpbiAnICtcbiAgICAgICAgICAgICAgICAgICAnSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArIFwiPSdcIiArIEpTT04uc3RyaW5naWZ5KHZhbCkucmVwbGFjZSgvJy9nLCAnJmFwb3M7JykgKyBcIidcIjtcbiAgfSBlbHNlIGlmIChlc2NhcGVkKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgZXhwb3J0cy5lc2NhcGUodmFsKSArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJztcbiAgfVxufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZXMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0cnMgPSBmdW5jdGlvbiBhdHRycyhvYmosIHRlcnNlKXtcbiAgdmFyIGJ1ZiA9IFtdO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcblxuICBpZiAoa2V5cy5sZW5ndGgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldXG4gICAgICAgICwgdmFsID0gb2JqW2tleV07XG5cbiAgICAgIGlmICgnY2xhc3MnID09IGtleSkge1xuICAgICAgICBpZiAodmFsID0gam9pbkNsYXNzZXModmFsKSkge1xuICAgICAgICAgIGJ1Zi5wdXNoKCcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuYXR0cihrZXksIHZhbCwgZmFsc2UsIHRlcnNlKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1Zi5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBnaXZlbiBzdHJpbmcgb2YgYGh0bWxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmVzY2FwZSA9IGZ1bmN0aW9uIGVzY2FwZShodG1sKXtcbiAgdmFyIHJlc3VsdCA9IFN0cmluZyhodG1sKVxuICAgIC5yZXBsYWNlKC8mL2csICcmYW1wOycpXG4gICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpO1xuICBpZiAocmVzdWx0ID09PSAnJyArIGh0bWwpIHJldHVybiBodG1sO1xuICBlbHNlIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFJlLXRocm93IHRoZSBnaXZlbiBgZXJyYCBpbiBjb250ZXh0IHRvIHRoZVxuICogdGhlIGphZGUgaW4gYGZpbGVuYW1lYCBhdCB0aGUgZ2l2ZW4gYGxpbmVub2AuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZW5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBsaW5lbm9cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucmV0aHJvdyA9IGZ1bmN0aW9uIHJldGhyb3coZXJyLCBmaWxlbmFtZSwgbGluZW5vLCBzdHIpe1xuICBpZiAoIShlcnIgaW5zdGFuY2VvZiBFcnJvcikpIHRocm93IGVycjtcbiAgaWYgKCh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnIHx8ICFmaWxlbmFtZSkgJiYgIXN0cikge1xuICAgIGVyci5tZXNzYWdlICs9ICcgb24gbGluZSAnICsgbGluZW5vO1xuICAgIHRocm93IGVycjtcbiAgfVxuICB0cnkge1xuICAgIHN0ciA9IHN0ciB8fCByZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgJ3V0ZjgnKVxuICB9IGNhdGNoIChleCkge1xuICAgIHJldGhyb3coZXJyLCBudWxsLCBsaW5lbm8pXG4gIH1cbiAgdmFyIGNvbnRleHQgPSAzXG4gICAgLCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJylcbiAgICAsIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gY29udGV4dCwgMClcbiAgICAsIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgY29udGV4dCk7XG5cbiAgLy8gRXJyb3IgY29udGV4dFxuICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/ICcgID4gJyA6ICcgICAgJylcbiAgICAgICsgY3VyclxuICAgICAgKyAnfCAnXG4gICAgICArIGxpbmU7XG4gIH0pLmpvaW4oJ1xcbicpO1xuXG4gIC8vIEFsdGVyIGV4Y2VwdGlvbiBtZXNzYWdlXG4gIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8ICdKYWRlJykgKyAnOicgKyBsaW5lbm9cbiAgICArICdcXG4nICsgY29udGV4dCArICdcXG5cXG4nICsgZXJyLm1lc3NhZ2U7XG4gIHRocm93IGVycjtcbn07XG5cbmV4cG9ydHMuRGVidWdJdGVtID0gZnVuY3Rpb24gRGVidWdJdGVtKGxpbmVubywgZmlsZW5hbWUpIHtcbiAgdGhpcy5saW5lbm8gPSBsaW5lbm87XG4gIHRoaXMuZmlsZW5hbWUgPSBmaWxlbmFtZTtcbn1cblxufSx7XCJmc1wiOjJ9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxufSx7fV19LHt9LFsxXSkoMSlcbn0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgIGVsZW1lbnRbMF0uY2xhc3NMaXN0LmFkZCgnaWNvbi1oZWFkZXInKTtcclxuICAgICAgdmFyIGNoaWxkcmVuID0gZWxlbWVudFswXS5jaGlsZHJlbjtcclxuICAgICAgY2hpbGRyZW5bMF0uY2xhc3NMaXN0LmFkZCgnaWNvbi1oZWFkZXItaWNvbicpO1xyXG4gICAgICBjaGlsZHJlblsxXS5jbGFzc0xpc3QuYWRkKCdpY29uLWhlYWRlci10aXRsZScpO1xyXG4gICAgfVxyXG4gIH07XHJcbn07XHJcbiIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxzdmcgY2xhc3M9XFxcImljb25cXFwiPjx1c2UgeGxpbms6aHJlZj1cXFwie3sgOjppY29uSWQgfX1cXFwiPjwvdXNlPjwvc3ZnPlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgcmVwbGFjZTogdHJ1ZSxcclxuICAgIHNjb3BlOiB7XHJcbiAgICAgIGljb25JZDogJ0AnXHJcbiAgICB9LFxyXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaWNvbi10ZW1wbGF0ZS5qYWRlJyksXHJcbiAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgc2NvcGUuaWNvbklkID0gYXR0cnMuaWNvbklkO1xyXG4gICAgfVxyXG4gIH07XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgdmFyIHN0eWxlID0gYXR0cnMubGlzdFN0eWxlO1xyXG4gICAgICBlbGVtZW50WzBdLmNsYXNzTGlzdC5hZGQoc3R5bGUgKyAnLWxpc3QnKTtcclxuICAgICAgc2NvcGUuJHdhdGNoQ29sbGVjdGlvbihmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gZWxlbWVudC5jaGlsZHJlbigpO1xyXG4gICAgICB9LCBmdW5jdGlvbigpIHtcclxuICAgICAgICBfLmZvckVhY2goZWxlbWVudFswXS5jaGlsZHJlbiwgZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHN0eWxlICsgJy1saXN0LWl0ZW0nKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBbZnVuY3Rpb24gKCkge1xyXG4gIHZhciB2bSA9IHRoaXM7XHJcbn1dOyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxkaXY+PHN1YnRpdGxlLWhlYWRlcj48aDI+e3sgOjp2bS5kYXRhLnRpdGxlIH19PC9oMj48c3Ryb25nIG5nLWlmPVxcXCI6OnZtLmRhdGEubG9jYXRpb25OYW1lXFxcIj57eyA6OnZtLmRhdGEubG9jYXRpb25OYW1lIH19IC0ge3sgOjp2bS5kYXRhLmxvY2F0aW9uQWRkcmVzcyB9fTwvc3Ryb25nPjwvc3VidGl0bGUtaGVhZGVyPjxwPjxzdHJvbmcgbmctaWY9XFxcIjo6dm0uZGF0YS5zdGFydERhdGVcXFwiPnt7IDo6dm0uZGF0YS5zdGFydERhdGUgfCBkYXRlOiAnTU1NIHl5eXknIH19IC0ge3sgOjp2bS5kYXRhLmVuZERhdGUgfCBkYXRlOiAnTU1NIHl5eXknIH19PC9zdHJvbmc+e3sgOjp2bS5kYXRhLnN1bW1hcnkgfX0gJm5ic3A7PGEgaHJlZj1cXFwie3sgOjp2bS5kYXRhLmxpbmsgfX1cXFwiIG5nLWlmPVxcXCI6OnZtLmRhdGEubGlua1xcXCI+e3sgOjp2bS5kYXRhLmxpbmsgfX08L2E+PC9wPjx1bCBuZy1pZj1cXFwiOjp2bS5kYXRhLmFjY29tcGxpc2htZW50c1xcXCIgY2xhc3M9XFxcInByb2plY3QtbGlzdFxcXCI+PGxpIG5nLXJlcGVhdD1cXFwiYWNjb21wbGlzaG1lbnQgaW4gOjp2bS5kYXRhLmFjY29tcGxpc2htZW50c1xcXCIgY2xhc3M9XFxcInByb2plY3QtbGlzdC1pdGVtXFxcIj57eyA6OmFjY29tcGxpc2htZW50IH19PC9saT48L3VsPjwvZGl2PlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgc2NvcGU6IHtcclxuICAgICAgZGF0YTogJz0nXHJcbiAgICB9LFxyXG4gICAgcmVwbGFjZTogdHJ1ZSxcclxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3Byb2plY3QtdGVtcGxhdGUuamFkZScpLFxyXG4gICAgY29udHJvbGxlcjogcmVxdWlyZSgnLi9wcm9qZWN0LWNvbnRyb2xsZXInKSxcclxuICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWVcclxuICB9O1xyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICBlbGVtZW50WzBdLmNsYXNzTGlzdC5hZGQoJ3N1YnRpdGxlLWhlYWRlcicpO1xyXG4gICAgICB2YXIgY2hpbGRyZW4gPSBlbGVtZW50WzBdLmNoaWxkcmVuO1xyXG4gICAgICBjaGlsZHJlblswXS5jbGFzc0xpc3QuYWRkKCdzdWJ0aXRsZS1oZWFkZXItdGl0bGUnKTtcclxuICAgIH1cclxuICB9O1xyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFsnUHJvZmlsZScsIGZ1bmN0aW9uIChQcm9maWxlKSB7XHJcbiAgdmFyIHBhZ2UgPSB0aGlzO1xyXG5cclxuICBwYWdlLnVzZXIgPSBQcm9maWxlO1xyXG59XTtcclxuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGhlYWRlcj48c2VjdGlvbiBjbGFzcz1cXFwiaGVhZGVyLXNlY3Rpb25cXFwiPjxoMT57eyA6OnBhZ2UudXNlci5uYW1lIH19PC9oMT48aDI+e3sgOjpwYWdlLnVzZXIudGl0bGUgfX08L2gyPjwvc2VjdGlvbj48c2VjdGlvbiBjbGFzcz1cXFwiaGVhZGVyLXNlY3Rpb25cXFwiPjxoMj5FeHBlcnRpc2U8L2gyPjxpY29uIGljb24taWQ9XFxcIiNjaGVja1xcXCI+PC9pY29uPjx1bCBsaXN0LXN0eWxlPVxcXCJjZW50ZXJlZFxcXCI+PGxpIG5nLXJlcGVhdD1cXFwiZXhwZXJ0aXNlIGluIDo6cGFnZS51c2VyLmV4cGVydGlzZVxcXCI+e3sgOjpleHBlcnRpc2UgfX08L2xpPjwvdWw+PC9zZWN0aW9uPjxzZWN0aW9uIGNsYXNzPVxcXCJoZWFkZXItc2VjdGlvblxcXCI+PGgyPlRlY2ggU2tpbGwgU2V0PC9oMj48aWNvbiBpY29uLWlkPVxcXCIjbWFya3VwXFxcIj48L2ljb24+PHVsIGxpc3Qtc3R5bGU9XFxcImNlbnRlcmVkXFxcIj48bGkgbmctcmVwZWF0PVxcXCJza2lsbCBpbiA6OnBhZ2UudXNlci5za2lsbHNcXFwiPnt7IDo6c2tpbGwgfX08L2xpPjwvdWw+PC9zZWN0aW9uPjwvaGVhZGVyPjxtYWluPjxzZWN0aW9uIGNsYXNzPVxcXCJtYWluLXNlY3Rpb24gcHJvZmlsZVxcXCI+PGljb24taGVhZGVyPjxpY29uIGljb24taWQ9XFxcIiNwcm9maWxlXFxcIj48L2ljb24+PGgyPlByb2ZpbGU8L2gyPjwvaWNvbi1oZWFkZXI+PHA+e3sgOjpwYWdlLnVzZXIucHJvZmlsZSB9fTwvcD48L3NlY3Rpb24+PHNlY3Rpb24gY2xhc3M9XFxcIm1haW4tc2VjdGlvbiBleHBlcmllbmNlXFxcIj48aWNvbi1oZWFkZXI+PGljb24gaWNvbi1pZD1cXFwiI2JyaWVmY2FzZVxcXCI+PC9pY29uPjxoMj5FeHBlcmllbmNlPC9oMj48L2ljb24taGVhZGVyPjx1bCBsaXN0LXN0eWxlPVxcXCJvZmZzZXRcXFwiPjxsaSBuZy1yZXBlYXQ9XFxcImpvYiBpbiA6OnBhZ2UudXNlci5qb2JzXFxcIj48cHJvamVjdCBkYXRhPVxcXCJqb2JcXFwiPjwvcHJvamVjdD48L2xpPjwvdWw+PGljb24taGVhZGVyPjxpY29uIGljb24taWQ9XFxcIiNmb3JrXFxcIj48L2ljb24+PGgyPlByb2plY3RzPC9oMj48L2ljb24taGVhZGVyPjx1bCBsaXN0LXN0eWxlPVxcXCJvZmZzZXRcXFwiPjxsaSBuZy1yZXBlYXQ9XFxcInByb2plY3QgaW4gOjpwYWdlLnVzZXIucHJvamVjdHNcXFwiPjxwcm9qZWN0IGRhdGE9XFxcInByb2plY3RcXFwiPjwvcHJvamVjdD48L2xpPjwvdWw+PGljb24taGVhZGVyPjxpY29uIGljb24taWQ9XFxcIiNwZW5jaWxcXFwiPjwvaWNvbj48aDI+RWR1Y2F0aW9uPC9oMj48L2ljb24taGVhZGVyPjx1bCBsaXN0LXN0eWxlPVxcXCJvZmZzZXRcXFwiPjxsaT48aDI+e3sgOjpwYWdlLnVzZXIuZWR1Y2F0aW9uLmRlZ3JlZSB9fTwvaDI+PHA+PHN0cm9uZz57eyA6OnBhZ2UudXNlci5lZHVjYXRpb24uZGF0ZSB8IGRhdGU6ICdNTU0geXl5eScgfX08L3N0cm9uZz48c3Bhbj57eyA6OnBhZ2UudXNlci5lZHVjYXRpb24uY29sbGVnZSB9fTwvc3Bhbj48L3A+PC9saT48L3VsPjwvc2VjdGlvbj48Zm9vdGVyPjxpY29uIGljb24taWQ9XFxcIiNjb250YWN0XFxcIiBjbGFzcz1cXFwiY29udGFjdC1ib3gtaWNvblxcXCI+PC9pY29uPjxkaXYgY2xhc3M9XFxcImNvbnRhY3QtYm94XFxcIj48ZGl2IGNsYXNzPVxcXCJjb250YWN0LWJveC1pbmZvXFxcIj48c3Ryb25nPnt7IDo6cGFnZS51c2VyLmFkZHJlc3MgfX0sIHt7IDo6cGFnZS51c2VyLnppcGNvZGUgfX08L3N0cm9uZz48YSBocmVmPVxcXCJtYWlsdG86e3sgOjpwYWdlLnVzZXIuZW1haWwgfX1cXFwiPjxzdHJvbmc+e3sgOjpwYWdlLnVzZXIuZW1haWwgfX08L3N0cm9uZz48L2E+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29udGFjdC1ib3gtaW5mb1xcXCI+PHN0cm9uZz57eyA6OnBhZ2UudXNlci5waG9uZSB9fTwvc3Ryb25nPjxhIGhyZWY9XFxcInt7IDo6cGFnZS51c2VyLmxpbmsgfX1cXFwiPjxzdHJvbmc+e3sgOjpwYWdlLnVzZXIubGluayB9fTwvc3Ryb25nPjwvYT48L2Rpdj48L2Rpdj48L2Zvb3Rlcj48L21haW4+PGEgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlaGFtcy90aHJlZWhhbXMuZ2l0aHViLmlvL3RyZWUvbWFzdGVyL3NyY1xcXCIgY2xhc3M9XFxcInZpZXctc291cmNlXFxcIj5WaWV3IFNvdXJjZTwvYT5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgbmFtZTogJ0RhdmlkIEVkbW9uZHNvbicsXHJcbiAgdGl0bGU6ICdXZWIgRGV2ZWxvcGVyJyxcclxuICBhZGRyZXNzOiAnNDYwNyBXaWxsaXMgQXZlIEFwdC4gMTQnLFxyXG4gIGNpdHk6ICdTaGVybWFuIE9ha3MnLFxyXG4gIHN0YXRlOiAnQ0EnLFxyXG4gIHppcGNvZGU6IDkxNDAzLFxyXG4gIGVtYWlsOiAnZGF2aWRhZWRtb25kc29uQGdtYWlsLmNvbScsXHJcbiAgcGhvbmU6ICc4MTguODA0LjcyNTUnLFxyXG4gIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vdGhyZWVoYW1zJyxcclxuICBwcm9maWxlOiAnRnVsbC1zdGFjayBkZXZlbG9wZXIgd2l0aCBiYWNrZ3JvdW5kIGluIHN5c3RlbXMgYWRtaW5pc3RyYXRpb24sIGNvbnRlbnQgbWFuYWdlbWVudCwgYW5kIGF1dG9tYXRlZCB0ZXN0aW5nLCB3aXRoIDQgeWVhcnMgb2YgZXhwZXJpZW5jZSBpbiBzb2Z0d2FyZSBkZXZlbG9wbWVudCBhbmQgdGVzdCBlbmdpbmVlcmluZy4nLFxyXG4gIGVkdWNhdGlvbjoge1xyXG4gICAgZGVncmVlOiAnQmFjaGVsb3Igb2YgRmluZSBBcnRzIC0gRmlsbSBhbmQgQW5pbWF0aW9uJyxcclxuICAgIGNvbGxlZ2U6ICdSb2NoZXN0ZXIgSW5zdGl0dXRlIG9mIFRlY2hub2xvZ3knLFxyXG4gICAgZGF0ZTogbmV3IERhdGUoMjAwNSwgNClcclxuICB9LFxyXG4gIGpvYnM6IFtcclxuICAgIHtcclxuICAgICAgdGl0bGU6ICdTb2Z0d2FyZSBFbmdpbmVlcicsXHJcbiAgICAgIHN0YXJ0RGF0ZTogbmV3IERhdGUoMjAxMiwgNiksXHJcbiAgICAgIGVuZERhdGU6IG5ldyBEYXRlKDIwMTUsIDIpLFxyXG4gICAgICBsb2NhdGlvbk5hbWU6ICdTd2VldHkgSGlnaCcsXHJcbiAgICAgIGxvY2F0aW9uQWRkcmVzczogJ01hcmluYSBEZWwgUmV5LCBDQScsXHJcbiAgICAgIHN1bW1hcnk6ICdGdWxsLXN0YWNrIGRldmVsb3BlciBmb3IgYSBzb2NpYWwgbmV0d29ya2luZyBzaXRlIGFuZCBtb2JpbGUgYXBwIEFQSSwgdXNpbmcgUmFpbHMsIE5vZGUuanMsIGpRdWVyeSwgYW5kIEFuZ3VsYXIuIFByb21vdGVkIGZyb20gUUEgRW5naW5lZXIgdG8gU29mdHdhcmUgRW5naW5lZXIgd2l0aGluIGZpcnN0IHllYXIuJyxcclxuICAgICAgYWNjb21wbGlzaG1lbnRzOiBbXHJcbiAgICAgICAgJ0J1aWx0IGEgUnVieSBvbiBSYWlscyBzZXJ2aWNlIHRoYXQgbWFuYWdlZCBhbGwgd2Vic2l0ZSBhbmQgbW9iaWxlIHVzZXIgYXV0aGVudGljYXRpb24sIGF1dGhvcml6YXRpb24sIGFjY291bnQsIHJlbGF0aW9uc2hpcCwgYW5kIGFnZSB2ZXJpZmljYXRpb24uJyxcclxuICAgICAgICAnV3JvdGUgdGhlIGJhY2tlbmQgQVBJIGZvciB0aGUgdmlkZW8gY3JlYXRpb24sIG9yZ2FuaXphdGlvbiwgYW5kIHNoYXJpbmcgc2VjdGlvbiBvZiB0aGUgc2l0ZS4nLFxyXG4gICAgICAgICdCdWlsdCBhIGNvbnRlbnQgbWFuYWdlbWVudCBzeXN0ZW0gd2l0aCBSYWlscyB0byBvcmdhbml6ZSBhbGwgcGhvdG9zIGFuZCB2aWRlb3MsIGNvbnRlc3RzLCBhbmQgY3VyYXRlZCBjb21tdW5pdHkgcGhvdG8vdmlkZW8gcGxheWxpc3RzLicsXHJcbiAgICAgICAgJ0RldmVsb3BlZCBhIGNvbW11bml0eSBtb2RlcmF0aW9uIHN5c3RlbSB3aXRoIFJhaWxzIGZvciBhcHByb3ZhbCBhbmQgcmVqZWN0aW9uIG9mIHVzZXIgcG9zdGVkIHRleHQsIHBob3RvcywgYW5kIHZpZGVvcy4nLFxyXG4gICAgICAgICdXcm90ZSBhIGZ1bGwgc3VpdGUgb2YgbG9hZCB0ZXN0cywgaWRlbnRpZmllZCwgcmVtb3ZlZCwgb3Igb3B0aW1pemVkIHNsb3cgcXVlcmllcywgYW5kIGluY3JlYXNlZCB0aGUgbnVtYmVyIG9mIHBvc3NpYmxlIHJlcXVlc3RzIHBlciBzZWNvbmQgYnkgNDAwJS4nLFxyXG4gICAgICAgICdJbnRlZ3JhdGVkIGEgTm9kZS5qcyBBUEkgd2l0aCBhIHRoaXJkLXBhcnR5IG1vZGVyYXRpb24gc3lzdGVtIHVzaW5nIGEgcmVsaWFibGUgbWVzc2FnZSBxdWV1ZS4nLFxyXG4gICAgICAgICdNYWludGFpbmVkIDkwJSB0ZXN0IGNvdmVyYWdlIGFjcm9zcyBhbGwgZnJvbnQtZW5kIGFuZCBiYWNrLWVuZCBjb2RlLidcclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGl0bGU6ICdRQSBFbmdpbmVlcicsXHJcbiAgICAgIHN0YXJ0RGF0ZTogbmV3IERhdGUoMjAxMCwgNyksXHJcbiAgICAgIGVuZERhdGU6IG5ldyBEYXRlKDIwMTEsIDExKSxcclxuICAgICAgbG9jYXRpb25OYW1lOiAnTWV0ZW9yIEdhbWVzJyxcclxuICAgICAgbG9jYXRpb25BZGRyZXNzOiAnQmV2ZXJseSBIaWxscywgQ0EnLFxyXG4gICAgICBzdW1tYXJ5OiAnRGV2ZWxvcGVkIHBpcGVsaW5lIGFuZCB0ZXN0aW5nIHRvb2xzIGFuZCBwZXJmb3JtZWQgYXV0b21hdGVkIHRlc3Rpbmcgb24gZm91ciBGYWNlYm9vayBnYW1lcy4gUHJvbW90ZWQgZnJvbSBRQSBUZXN0ZXIgdG8gUUEgRW5naW5lZXIgd2l0aGluIGZpcnN0IHllYXIuJyxcclxuICAgICAgYWNjb21wbGlzaG1lbnRzOiBbXHJcbiAgICAgICAgJ0FuYWx5emVkIHdvcmtmbG93cyBmb3IgMjAgc3RhZmYgdG8gaWRlbnRpZnkgc291cmNlcyBvZiBpbmVmZmljaWVuY3ksIHByaW9yaXRpemUgdGFza3MsIGFuZCBkZXZlbG9wIGNvbnRlbnQgbWFuYWdlbWVudCBhbmQgZGVidWdnaW5nIHRvb2xzLCBzYXZpbmcgNEsgbWFuIGhvdXJzIGFuZCAkMTUwSyBhbm51YWxseS4nLFxyXG4gICAgICAgICdDcmVhdGVkIGEgc2V0IG9mIHNjcmlwdHMgdG8gc2ltcGxpZnkgYW5kIHZhbGlkYXRlIGRhdGFiYXNlIGVudHJ5IHdpdGggUHl0aG9uIGFuZCBTZWxlbml1bSwgd2hpY2ggcmVkdWNlZCByZWxhdGVkIGJ1Z3MgYnkgb3ZlciA5MCUsIGFuZCBxdWFkcnVwbGVkIGRlcGFydG1lbnQgcHJvZHVjdGlvbi4nLFxyXG4gICAgICAgICdBdXRvbWF0ZWQgdGlja2V0IHZhbGlkYXRpb24gYW5kIHBvcHVsYXRpb24gd2l0aCBQeXRob24sIHJlZHVjaW5nIHdlZWtseSBwcm9jZXNzIHRpbWUgYnkgMTQgaG91cnMuJyxcclxuICAgICAgICAnQnVpbHQgYXJ0IHZlcmlmaWNhdGlvbiB0b29scyB0byBlbGltaW5hdGUgdGVjaG5pY2FsIGFydCBpc3N1ZXMsIGluY2x1ZGluZyBhIFVJIHVzZWQgYnkgZWlnaHQgYXJ0aXN0cyBhbmQgc2l4IHRlc3RlcnMgdGhhdCBhbGxvd2VkIHRoZSBRQSBEZXBhcnRtZW50IHRvIHRlc3QgYXJ0IHdlZWtzIGluIGFkdmFuY2Ugb2YgaW4tZ2FtZSBhcHBlYXJhbmNlLicsXHJcbiAgICAgICAgJ1RhdWdodCB3ZWVrbHkgY2xhc3NlcyB0byBzZXZlbiB0ZXN0ZXJzIG9uIEpTT04sIHNwZWNpZmljIGdhbWUgZGF0YSBmb3JtYXRzLCBrZXlib2FyZCBzaG9ydGN1dHMsIGFuZCBlZmZpY2llbmN5LidcclxuICAgICAgXVxyXG4gICAgfVxyXG4gIF0sXHJcbiAgcHJvamVjdHM6IFtcclxuICAgIHtcclxuICAgICAgdGl0bGU6ICdLb2FuZ3VscGl0ZXN0aWZ5JyxcclxuICAgICAgc3VtbWFyeTogJ0Z1bGwtc3RhY2sgSlMgYm9pbGVycGxhdGUgcHJvamVjdCwgdXNlZCBhcyBhIGJhc2UgZm9yIG90aGVyIHByb2plY3RzLiBJbmNsdWRlcyBLb2EgYmFja2VuZCBhbmQgQW5ndWxhciBjb21wb25lbnQtYmFzZWQgZnJvbnRlbmQsIGFuZCBpcyBlbnRpcmVseSBidWlsdCBvbiBwcm9taXNlcy4gU2F2aW5nIGEgZmlsZSBzZWxlY3RpdmVseSB0cmlnZ2VycyBhc3NldCBjb21waWxhdGlvbiwgZnJvbnRlbmQvYmFja2VuZCB0ZXN0IHJ1bm5lcnMsIHNlcnZlciByZXN0YXJ0LCBhbmQgYnJvd3NlciByZWxvYWQgYXMgbmVlZGVkLicsXHJcbiAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vdGhyZWVoYW1zL2tvYW5ndWxwaXRlc3RpZnknXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0aXRsZTogJ0RlYXRoIFdoaW1zeSBSb2FkbWFwJyxcclxuICAgICAgc3VtbWFyeTogJ1B1YmxpYyBzaXRlIHRvIHNob3cgZGV2ZWxvcG1lbnQgcHJvZ3Jlc3Mgb2YgYSBnYW1lIGRldmVsb3BlZCBieSBTcXVpZCBCbGluayBHYW1lcy4gV3JpdHRlbiBpbiBBbmd1bGFyIGFuZCBLb2EsIHdpdGggRmxleGJveCBhbmQgSFRNTDUgQ2FudmFzLiBQdWxscyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBKaXJhIEFQSSBhbmQgcmVjZWl2ZXMgcmVhbHRpbWUgdXBkYXRlcyB1c2luZyBKaXJhIHdlYmhvb2tzLicsXHJcbiAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vdGhyZWVoYW1zL2RlYXRoLXdoaW1zeS1yb2FkbWFwJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGl0bGU6ICdHYW1lIFByb3RvdHlwZXMnLFxyXG4gICAgICBzdW1tYXJ5OiAnRm91ciBnYW1lIHByb3RvdHlwZXMgdXNpbmcgdGhlIFBoYXNlciBnYW1lIGVuZ2luZS4gRG9uZSB0byBleHBsb3JlIHRoZSBkZXNpZ24gY29tcGxleGl0eSBvZiBnYW1lcywgYW5kIHBlcmZvcm1hbmNlIGRpZmZpY3VsdGllcyBpbiBtYWludGFpbmluZyA2MCBmcmFtZXMgcGVyIHNlY29uZC4nLFxyXG4gICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3RocmVlaGFtcy9waGFzZXItZ2FtZS1wcm90b3R5cGVzJ1xyXG4gICAgfVxyXG4gIF0sXHJcbiAgZXhwZXJ0aXNlOiBbXHJcbiAgICAnQW5ndWxhckpTJyxcclxuICAgICdOb2RlLmpzIC8gSGFwaScsXHJcbiAgICAnUnVieSBvbiBSYWlscycsXHJcbiAgICAnVGVzdC1Ecml2ZW4gRGV2ZWxvcG1lbnQnXHJcbiAgXSxcclxuICBza2lsbHM6IFtcclxuICAgICdBbmd1bGFySlMnLFxyXG4gICAgJ0hUTUwvQ1NTJyxcclxuICAgICdQaG90b3Nob3AvSWxsdXN0cmF0b3InLFxyXG4gICAgJ1Bvc2dyZVNRTCcsXHJcbiAgICAnQ2Fzc2FuZHJhJyxcclxuICAgICdSdWJ5IG9uIFJhaWxzJ1xyXG4gIF1cclxufTtcclxuIl19
