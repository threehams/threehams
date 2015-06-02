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
        'Built a content management system with Rails to organize all photos and videos, contests, and curated community photo/video playlists.',
        'Developed a community moderation system with Rails for approval and rejection of user posted text, photos, and videos.',
        'Built a Ruby on Rails service that managed all website and mobile user authentication, authorization, account, relationship, and age verification.',
        'Wrote a full suite of load tests, identified, removed, or optimized slow queries, and increased the number of possible requests per second by 400%.',
        'Wrote the backend API for the video creation, organization, and sharing section of the site.',
        'Integrated a Node.js API with a third-party moderation system using a reliable message queue.'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXJlc29sdmUvZW1wdHkuanMiLCJub2RlX21vZHVsZXMvamFkZS9ydW50aW1lLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvaWNvbi1oZWFkZXIvaWNvbi1oZWFkZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9pY29uL2ljb24tdGVtcGxhdGUuamFkZSIsInNyYy9qcy9jb21wb25lbnRzL2ljb24vaWNvbi5qcyIsInNyYy9qcy9jb21wb25lbnRzL2xpc3Qtc3R5bGUvbGlzdC1zdHlsZS5qcyIsInNyYy9qcy9jb21wb25lbnRzL3Byb2plY3QvcHJvamVjdC1jb250cm9sbGVyLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvcHJvamVjdC9wcm9qZWN0LXRlbXBsYXRlLmphZGUiLCJzcmMvanMvY29tcG9uZW50cy9wcm9qZWN0L3Byb2plY3QuanMiLCJzcmMvanMvY29tcG9uZW50cy9zdWJ0aXRsZS1oZWFkZXIvc3VidGl0bGUtaGVhZGVyLmpzIiwic3JjL2pzL3BhZ2VzL3BhZ2UvcGFnZS1jb250cm9sbGVyLmpzIiwic3JjL2pzL3BhZ2VzL3BhZ2UvcGFnZS10ZW1wbGF0ZS5qYWRlIiwic3JjL2pzL3NlcnZpY2VzL3Byb2ZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2pEQTs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG5yZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnJlcXVpcmUoJ2FuZ3VsYXItcm91dGUnKTtcclxucmVxdWlyZSgnYW5ndWxhci1hbmltYXRlJyk7XHJcbmdsb2JhbC5fID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcblxyXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ1Jlc3VtZScsIFsnbmdSb3V0ZScsICduZ0FuaW1hdGUnXSk7XHJcblxyXG4vLyBwYWdlc1xyXG5hcHAuY29udHJvbGxlcignUGFnZUNvbnRyb2xsZXInLCByZXF1aXJlKCcuL3BhZ2VzL3BhZ2UvcGFnZS1jb250cm9sbGVyLmpzJykpO1xyXG5cclxuLy8gY29tcG9uZW50cyAoY29udHJvbGxlcnMgZXhwb3NlZCBmb3IgdGVzdGluZylcclxuYXBwLmRpcmVjdGl2ZSgnaWNvbicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9pY29uL2ljb24nKSk7XHJcbmFwcC5kaXJlY3RpdmUoJ2ljb25IZWFkZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvaWNvbi1oZWFkZXIvaWNvbi1oZWFkZXInKSk7XHJcbmFwcC5kaXJlY3RpdmUoJ3N1YnRpdGxlSGVhZGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL3N1YnRpdGxlLWhlYWRlci9zdWJ0aXRsZS1oZWFkZXInKSk7XHJcbmFwcC5kaXJlY3RpdmUoJ2xpc3RTdHlsZScsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9saXN0LXN0eWxlL2xpc3Qtc3R5bGUnKSk7XHJcbmFwcC5kaXJlY3RpdmUoJ3Byb2plY3QnLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvcHJvamVjdC9wcm9qZWN0JykpO1xyXG5hcHAuY29udHJvbGxlcignUHJvamVjdENvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvcHJvamVjdC9wcm9qZWN0LWNvbnRyb2xsZXIuanMnKSk7XHJcblxyXG5hcHAudmFsdWUoJ1Byb2ZpbGUnLCByZXF1aXJlKCcuL3NlcnZpY2VzL3Byb2ZpbGUnKSk7XHJcblxyXG5hcHAuY29uZmlnKFtcclxuICAnJGxvY2F0aW9uUHJvdmlkZXInLFxyXG4gICckcm91dGVQcm92aWRlcicsXHJcbiAgZnVuY3Rpb24gKCRsb2NhdGlvblByb3ZpZGVyLCAkcm91dGVQcm92aWRlcikge1xyXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xyXG5cclxuICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgIC53aGVuKCcvJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3BhZ2VzL3BhZ2UvcGFnZS10ZW1wbGF0ZS5qYWRlJyksXHJcbiAgICAgICAgY29udHJvbGxlcjogJ1BhZ2VDb250cm9sbGVyJyxcclxuICAgICAgICBjb250cm9sbGVyQXM6ICdwYWdlJ1xyXG4gICAgICB9KVxyXG4gICAgICAub3RoZXJ3aXNlKHtcclxuICAgICAgICByZWRpcmVjdFRvOiAnLydcclxuICAgICAgfSk7XHJcbiAgfVxyXG5dKTtcclxuXHJcbi8vIFVuY29tbWVudCBmb3IgZGVidWdnaW5nXHJcbi8vYW5ndWxhci5tb2R1bGUoJ3V0aWxzJykuZmlsdGVyKCdpc0RlZmluZWQnLCBmdW5jdGlvbiAoKSB7XHJcbi8vICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlLCBtc2cpIHtcclxuLy8gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuLy8gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lzRGVmaW5lZCBmaWx0ZXIgZ290IHVuZGVmaW5lZCB2YWx1ZSAnICsgbXNnKTtcclxuLy8gICAgfVxyXG4vLyAgICByZXR1cm4gdmFsdWU7XHJcbi8vICB9O1xyXG4vL30pO1xyXG4iLG51bGwsIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLmphZGUgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTWVyZ2UgdHdvIGF0dHJpYnV0ZSBvYmplY3RzIGdpdmluZyBwcmVjZWRlbmNlXG4gKiB0byB2YWx1ZXMgaW4gb2JqZWN0IGBiYC4gQ2xhc3NlcyBhcmUgc3BlY2lhbC1jYXNlZFxuICogYWxsb3dpbmcgZm9yIGFycmF5cyBhbmQgbWVyZ2luZy9qb2luaW5nIGFwcHJvcHJpYXRlbHlcbiAqIHJlc3VsdGluZyBpbiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKGEsIGIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgYXR0cnMgPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0cnMgPSBtZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuICB2YXIgYWMgPSBhWydjbGFzcyddO1xuICB2YXIgYmMgPSBiWydjbGFzcyddO1xuXG4gIGlmIChhYyB8fCBiYykge1xuICAgIGFjID0gYWMgfHwgW107XG4gICAgYmMgPSBiYyB8fCBbXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWMpKSBhYyA9IFthY107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGJjKSkgYmMgPSBbYmNdO1xuICAgIGFbJ2NsYXNzJ10gPSBhYy5jb25jYXQoYmMpLmZpbHRlcihudWxscyk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChrZXkgIT0gJ2NsYXNzJykge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBGaWx0ZXIgbnVsbCBgdmFsYHMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBudWxscyh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbCAhPT0gJyc7XG59XG5cbi8qKlxuICogam9pbiBhcnJheSBhcyBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuam9pbkNsYXNzZXMgPSBqb2luQ2xhc3NlcztcbmZ1bmN0aW9uIGpvaW5DbGFzc2VzKHZhbCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbC5tYXAoam9pbkNsYXNzZXMpIDpcbiAgICAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSA/IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHZhbFtrZXldOyB9KSA6XG4gICAgW3ZhbF0pLmZpbHRlcihudWxscykuam9pbignICcpO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBjbGFzc2VzXG4gKiBAcGFyYW0ge0FycmF5LjxCb29sZWFuPn0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNscyA9IGZ1bmN0aW9uIGNscyhjbGFzc2VzLCBlc2NhcGVkKSB7XG4gIHZhciBidWYgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVzY2FwZWQgJiYgZXNjYXBlZFtpXSkge1xuICAgICAgYnVmLnB1c2goZXhwb3J0cy5lc2NhcGUoam9pbkNsYXNzZXMoW2NsYXNzZXNbaV1dKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWYucHVzaChqb2luQ2xhc3NlcyhjbGFzc2VzW2ldKSk7XG4gICAgfVxuICB9XG4gIHZhciB0ZXh0ID0gam9pbkNsYXNzZXMoYnVmKTtcbiAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcgY2xhc3M9XCInICsgdGV4dCArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5cbmV4cG9ydHMuc3R5bGUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsKS5tYXAoZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgICByZXR1cm4gc3R5bGUgKyAnOicgKyB2YWxbc3R5bGVdO1xuICAgIH0pLmpvaW4oJzsnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG59O1xuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gZnVuY3Rpb24gYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgIHZhbCA9IGV4cG9ydHMuc3R5bGUodmFsKTtcbiAgfVxuICBpZiAoJ2Jvb2xlYW4nID09IHR5cGVvZiB2YWwgfHwgbnVsbCA9PSB2YWwpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSBlbHNlIGlmICgwID09IGtleS5pbmRleE9mKCdkYXRhJykgJiYgJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkge1xuICAgIGlmIChKU09OLnN0cmluZ2lmeSh2YWwpLmluZGV4T2YoJyYnKSAhPT0gLTEpIHtcbiAgICAgIGNvbnNvbGUud2FybignU2luY2UgSmFkZSAyLjAuMCwgYW1wZXJzYW5kcyAoYCZgKSBpbiBkYXRhIGF0dHJpYnV0ZXMgJyArXG4gICAgICAgICAgICAgICAgICAgJ3dpbGwgYmUgZXNjYXBlZCB0byBgJmFtcDtgJyk7XG4gICAgfTtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIGVsaW1pbmF0ZSB0aGUgZG91YmxlIHF1b3RlcyBhcm91bmQgZGF0ZXMgaW4gJyArXG4gICAgICAgICAgICAgICAgICAgJ0lTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyBcIj0nXCIgKyBKU09OLnN0cmluZ2lmeSh2YWwpLnJlcGxhY2UoLycvZywgJyZhcG9zOycpICsgXCInXCI7XG4gIH0gZWxzZSBpZiAoZXNjYXBlZCkge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIGV4cG9ydHMuZXNjYXBlKHZhbCkgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gZnVuY3Rpb24gYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBidWYgPSBbXTtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICAsIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PSBrZXkpIHtcbiAgICAgICAgaWYgKHZhbCA9IGpvaW5DbGFzc2VzKHZhbCkpIHtcbiAgICAgICAgICBidWYucHVzaCgnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWYucHVzaChleHBvcnRzLmF0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYuam9pbignJyk7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lc2NhcGUgPSBmdW5jdGlvbiBlc2NhcGUoaHRtbCl7XG4gIHZhciByZXN1bHQgPSBTdHJpbmcoaHRtbClcbiAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxuICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKTtcbiAgaWYgKHJlc3VsdCA9PT0gJycgKyBodG1sKSByZXR1cm4gaHRtbDtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBqYWRlIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBmdW5jdGlvbiByZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnSmFkZScpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuXG5leHBvcnRzLkRlYnVnSXRlbSA9IGZ1bmN0aW9uIERlYnVnSXRlbShsaW5lbm8sIGZpbGVuYW1lKSB7XG4gIHRoaXMubGluZW5vID0gbGluZW5vO1xuICB0aGlzLmZpbGVuYW1lID0gZmlsZW5hbWU7XG59XG5cbn0se1wiZnNcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbn0se31dfSx7fSxbMV0pKDEpXG59KTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICBlbGVtZW50WzBdLmNsYXNzTGlzdC5hZGQoJ2ljb24taGVhZGVyJyk7XHJcbiAgICAgIHZhciBjaGlsZHJlbiA9IGVsZW1lbnRbMF0uY2hpbGRyZW47XHJcbiAgICAgIGNoaWxkcmVuWzBdLmNsYXNzTGlzdC5hZGQoJ2ljb24taGVhZGVyLWljb24nKTtcclxuICAgICAgY2hpbGRyZW5bMV0uY2xhc3NMaXN0LmFkZCgnaWNvbi1oZWFkZXItdGl0bGUnKTtcclxuICAgIH1cclxuICB9O1xyXG59O1xyXG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8c3ZnIGNsYXNzPVxcXCJpY29uXFxcIj48dXNlIHhsaW5rOmhyZWY9XFxcInt7IDo6aWNvbklkIH19XFxcIj48L3VzZT48L3N2Zz5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICByZXR1cm4ge1xyXG4gICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgIHJlcGxhY2U6IHRydWUsXHJcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9pY29uLXRlbXBsYXRlLmphZGUnKSxcclxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG4gICAgICBzY29wZS5pY29uSWQgPSBhdHRycy5pY29uSWQ7XHJcbiAgICB9XHJcbiAgfTtcclxufTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICByZXR1cm4ge1xyXG4gICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG4gICAgICB2YXIgc3R5bGUgPSBhdHRycy5saXN0U3R5bGU7XHJcbiAgICAgIGVsZW1lbnRbMF0uY2xhc3NMaXN0LmFkZChzdHlsZSArICctbGlzdCcpO1xyXG4gICAgICBzY29wZS4kd2F0Y2hDb2xsZWN0aW9uKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50LmNoaWxkcmVuKCk7XHJcbiAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIF8uZm9yRWFjaChlbGVtZW50WzBdLmNoaWxkcmVuLCBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoc3R5bGUgKyAnLWxpc3QtaXRlbScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFtmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIHZtID0gdGhpcztcclxufV07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdj48c3VidGl0bGUtaGVhZGVyPjxoMj57eyA6OnZtLmRhdGEudGl0bGUgfX08L2gyPjxzdHJvbmcgbmctaWY9XFxcIjo6dm0uZGF0YS5sb2NhdGlvbk5hbWVcXFwiPnt7IDo6dm0uZGF0YS5sb2NhdGlvbk5hbWUgfX0gLSB7eyA6OnZtLmRhdGEubG9jYXRpb25BZGRyZXNzIH19PC9zdHJvbmc+PC9zdWJ0aXRsZS1oZWFkZXI+PHA+PHN0cm9uZyBuZy1pZj1cXFwiOjp2bS5kYXRhLnN0YXJ0RGF0ZVxcXCI+e3sgOjp2bS5kYXRhLnN0YXJ0RGF0ZSB8IGRhdGU6ICdNTU0geXl5eScgfX0gLSB7eyA6OnZtLmRhdGEuZW5kRGF0ZSB8IGRhdGU6ICdNTU0geXl5eScgfX08L3N0cm9uZz57eyA6OnZtLmRhdGEuc3VtbWFyeSB9fSAmbmJzcDs8YSBocmVmPVxcXCJ7eyA6OnZtLmRhdGEubGluayB9fVxcXCIgbmctaWY9XFxcIjo6dm0uZGF0YS5saW5rXFxcIj57eyA6OnZtLmRhdGEubGluayB9fTwvYT48L3A+PHVsIG5nLWlmPVxcXCI6OnZtLmRhdGEuYWNjb21wbGlzaG1lbnRzXFxcIiBjbGFzcz1cXFwicHJvamVjdC1saXN0XFxcIj48bGkgbmctcmVwZWF0PVxcXCJhY2NvbXBsaXNobWVudCBpbiA6OnZtLmRhdGEuYWNjb21wbGlzaG1lbnRzXFxcIiBjbGFzcz1cXFwicHJvamVjdC1saXN0LWl0ZW1cXFwiPnt7IDo6YWNjb21wbGlzaG1lbnQgfX08L2xpPjwvdWw+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICBzY29wZToge1xyXG4gICAgICBkYXRhOiAnPSdcclxuICAgIH0sXHJcbiAgICByZXBsYWNlOiB0cnVlLFxyXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vcHJvamVjdC10ZW1wbGF0ZS5qYWRlJyksXHJcbiAgICBjb250cm9sbGVyOiByZXF1aXJlKCcuL3Byb2plY3QtY29udHJvbGxlcicpLFxyXG4gICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZVxyXG4gIH07XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgIGVsZW1lbnRbMF0uY2xhc3NMaXN0LmFkZCgnc3VidGl0bGUtaGVhZGVyJyk7XHJcbiAgICAgIHZhciBjaGlsZHJlbiA9IGVsZW1lbnRbMF0uY2hpbGRyZW47XHJcbiAgICAgIGNoaWxkcmVuWzBdLmNsYXNzTGlzdC5hZGQoJ3N1YnRpdGxlLWhlYWRlci10aXRsZScpO1xyXG4gICAgfVxyXG4gIH07XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gWydQcm9maWxlJywgZnVuY3Rpb24gKFByb2ZpbGUpIHtcclxuICB2YXIgcGFnZSA9IHRoaXM7XHJcblxyXG4gIHBhZ2UudXNlciA9IFByb2ZpbGU7XHJcbn1dO1xyXG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8aGVhZGVyPjxzZWN0aW9uIGNsYXNzPVxcXCJoZWFkZXItc2VjdGlvblxcXCI+PGgxPnt7IDo6cGFnZS51c2VyLm5hbWUgfX08L2gxPjxoMj57eyA6OnBhZ2UudXNlci50aXRsZSB9fTwvaDI+PC9zZWN0aW9uPjxzZWN0aW9uIGNsYXNzPVxcXCJoZWFkZXItc2VjdGlvblxcXCI+PGgyPkV4cGVydGlzZTwvaDI+PGljb24gaWNvbi1pZD1cXFwiI2NoZWNrXFxcIj48L2ljb24+PHVsIGxpc3Qtc3R5bGU9XFxcImNlbnRlcmVkXFxcIj48bGkgbmctcmVwZWF0PVxcXCJleHBlcnRpc2UgaW4gOjpwYWdlLnVzZXIuZXhwZXJ0aXNlXFxcIj57eyA6OmV4cGVydGlzZSB9fTwvbGk+PC91bD48L3NlY3Rpb24+PHNlY3Rpb24gY2xhc3M9XFxcImhlYWRlci1zZWN0aW9uXFxcIj48aDI+VGVjaCBTa2lsbCBTZXQ8L2gyPjxpY29uIGljb24taWQ9XFxcIiNtYXJrdXBcXFwiPjwvaWNvbj48dWwgbGlzdC1zdHlsZT1cXFwiY2VudGVyZWRcXFwiPjxsaSBuZy1yZXBlYXQ9XFxcInNraWxsIGluIDo6cGFnZS51c2VyLnNraWxsc1xcXCI+e3sgOjpza2lsbCB9fTwvbGk+PC91bD48L3NlY3Rpb24+PC9oZWFkZXI+PG1haW4+PHNlY3Rpb24gY2xhc3M9XFxcIm1haW4tc2VjdGlvbiBwcm9maWxlXFxcIj48aWNvbi1oZWFkZXI+PGljb24gaWNvbi1pZD1cXFwiI3Byb2ZpbGVcXFwiPjwvaWNvbj48aDI+UHJvZmlsZTwvaDI+PC9pY29uLWhlYWRlcj48cD57eyA6OnBhZ2UudXNlci5wcm9maWxlIH19PC9wPjwvc2VjdGlvbj48c2VjdGlvbiBjbGFzcz1cXFwibWFpbi1zZWN0aW9uIGV4cGVyaWVuY2VcXFwiPjxpY29uLWhlYWRlcj48aWNvbiBpY29uLWlkPVxcXCIjYnJpZWZjYXNlXFxcIj48L2ljb24+PGgyPkV4cGVyaWVuY2U8L2gyPjwvaWNvbi1oZWFkZXI+PHVsIGxpc3Qtc3R5bGU9XFxcIm9mZnNldFxcXCI+PGxpIG5nLXJlcGVhdD1cXFwiam9iIGluIDo6cGFnZS51c2VyLmpvYnNcXFwiPjxwcm9qZWN0IGRhdGE9XFxcImpvYlxcXCI+PC9wcm9qZWN0PjwvbGk+PC91bD48aWNvbi1oZWFkZXI+PGljb24gaWNvbi1pZD1cXFwiI2ZvcmtcXFwiPjwvaWNvbj48aDI+UHJvamVjdHM8L2gyPjwvaWNvbi1oZWFkZXI+PHVsIGxpc3Qtc3R5bGU9XFxcIm9mZnNldFxcXCI+PGxpIG5nLXJlcGVhdD1cXFwicHJvamVjdCBpbiA6OnBhZ2UudXNlci5wcm9qZWN0c1xcXCI+PHByb2plY3QgZGF0YT1cXFwicHJvamVjdFxcXCI+PC9wcm9qZWN0PjwvbGk+PC91bD48aWNvbi1oZWFkZXI+PGljb24gaWNvbi1pZD1cXFwiI3BlbmNpbFxcXCI+PC9pY29uPjxoMj5FZHVjYXRpb248L2gyPjwvaWNvbi1oZWFkZXI+PHVsIGxpc3Qtc3R5bGU9XFxcIm9mZnNldFxcXCI+PGxpPjxoMj57eyA6OnBhZ2UudXNlci5lZHVjYXRpb24uZGVncmVlIH19PC9oMj48cD48c3Ryb25nPnt7IDo6cGFnZS51c2VyLmVkdWNhdGlvbi5kYXRlIHwgZGF0ZTogJ01NTSB5eXl5JyB9fTwvc3Ryb25nPjxzcGFuPnt7IDo6cGFnZS51c2VyLmVkdWNhdGlvbi5jb2xsZWdlIH19PC9zcGFuPjwvcD48L2xpPjwvdWw+PC9zZWN0aW9uPjxmb290ZXI+PGljb24gaWNvbi1pZD1cXFwiI2NvbnRhY3RcXFwiIGNsYXNzPVxcXCJjb250YWN0LWJveC1pY29uXFxcIj48L2ljb24+PGRpdiBjbGFzcz1cXFwiY29udGFjdC1ib3hcXFwiPjxkaXYgY2xhc3M9XFxcImNvbnRhY3QtYm94LWluZm9cXFwiPjxzdHJvbmc+e3sgOjpwYWdlLnVzZXIuYWRkcmVzcyB9fSwge3sgOjpwYWdlLnVzZXIuemlwY29kZSB9fTwvc3Ryb25nPjxhIGhyZWY9XFxcIm1haWx0bzp7eyA6OnBhZ2UudXNlci5lbWFpbCB9fVxcXCI+PHN0cm9uZz57eyA6OnBhZ2UudXNlci5lbWFpbCB9fTwvc3Ryb25nPjwvYT48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb250YWN0LWJveC1pbmZvXFxcIj48c3Ryb25nPnt7IDo6cGFnZS51c2VyLnBob25lIH19PC9zdHJvbmc+PGEgaHJlZj1cXFwie3sgOjpwYWdlLnVzZXIubGluayB9fVxcXCI+PHN0cm9uZz57eyA6OnBhZ2UudXNlci5saW5rIH19PC9zdHJvbmc+PC9hPjwvZGl2PjwvZGl2PjwvZm9vdGVyPjwvbWFpbj48YSBocmVmPVxcXCJodHRwczovL2dpdGh1Yi5jb20vdGhyZWVoYW1zL3RocmVlaGFtcy5naXRodWIuaW8vdHJlZS9tYXN0ZXIvc3JjXFxcIiBjbGFzcz1cXFwidmlldy1zb3VyY2VcXFwiPlZpZXcgU291cmNlPC9hPlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICBuYW1lOiAnRGF2aWQgRWRtb25kc29uJyxcclxuICB0aXRsZTogJ1dlYiBEZXZlbG9wZXInLFxyXG4gIGFkZHJlc3M6ICc0NjA3IFdpbGxpcyBBdmUgQXB0LiAxNCcsXHJcbiAgY2l0eTogJ1NoZXJtYW4gT2FrcycsXHJcbiAgc3RhdGU6ICdDQScsXHJcbiAgemlwY29kZTogOTE0MDMsXHJcbiAgZW1haWw6ICdkYXZpZGFlZG1vbmRzb25AZ21haWwuY29tJyxcclxuICBwaG9uZTogJzgxOC44MDQuNzI1NScsXHJcbiAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS90aHJlZWhhbXMnLFxyXG4gIHByb2ZpbGU6ICdGdWxsLXN0YWNrIGRldmVsb3BlciB3aXRoIGJhY2tncm91bmQgaW4gc3lzdGVtcyBhZG1pbmlzdHJhdGlvbiwgY29udGVudCBtYW5hZ2VtZW50LCBhbmQgYXV0b21hdGVkIHRlc3RpbmcsIHdpdGggNCB5ZWFycyBvZiBleHBlcmllbmNlIGluIHNvZnR3YXJlIGRldmVsb3BtZW50IGFuZCB0ZXN0IGVuZ2luZWVyaW5nLicsXHJcbiAgZWR1Y2F0aW9uOiB7XHJcbiAgICBkZWdyZWU6ICdCYWNoZWxvciBvZiBGaW5lIEFydHMgLSBGaWxtIGFuZCBBbmltYXRpb24nLFxyXG4gICAgY29sbGVnZTogJ1JvY2hlc3RlciBJbnN0aXR1dGUgb2YgVGVjaG5vbG9neScsXHJcbiAgICBkYXRlOiBuZXcgRGF0ZSgyMDA1LCA0KVxyXG4gIH0sXHJcbiAgam9iczogW1xyXG4gICAge1xyXG4gICAgICB0aXRsZTogJ1NvZnR3YXJlIEVuZ2luZWVyJyxcclxuICAgICAgc3RhcnREYXRlOiBuZXcgRGF0ZSgyMDEyLCA2KSxcclxuICAgICAgZW5kRGF0ZTogbmV3IERhdGUoMjAxNSwgMiksXHJcbiAgICAgIGxvY2F0aW9uTmFtZTogJ1N3ZWV0eSBIaWdoJyxcclxuICAgICAgbG9jYXRpb25BZGRyZXNzOiAnTWFyaW5hIERlbCBSZXksIENBJyxcclxuICAgICAgc3VtbWFyeTogJ0Z1bGwtc3RhY2sgZGV2ZWxvcGVyIGZvciBhIHNvY2lhbCBuZXR3b3JraW5nIHNpdGUgYW5kIG1vYmlsZSBhcHAgQVBJLCB1c2luZyBSYWlscywgTm9kZS5qcywgalF1ZXJ5LCBhbmQgQW5ndWxhci4gUHJvbW90ZWQgZnJvbSBRQSBFbmdpbmVlciB0byBTb2Z0d2FyZSBFbmdpbmVlciB3aXRoaW4gZmlyc3QgeWVhci4nLFxyXG4gICAgICBhY2NvbXBsaXNobWVudHM6IFtcclxuICAgICAgICAnQnVpbHQgYSBjb250ZW50IG1hbmFnZW1lbnQgc3lzdGVtIHdpdGggUmFpbHMgdG8gb3JnYW5pemUgYWxsIHBob3RvcyBhbmQgdmlkZW9zLCBjb250ZXN0cywgYW5kIGN1cmF0ZWQgY29tbXVuaXR5IHBob3RvL3ZpZGVvIHBsYXlsaXN0cy4nLFxyXG4gICAgICAgICdEZXZlbG9wZWQgYSBjb21tdW5pdHkgbW9kZXJhdGlvbiBzeXN0ZW0gd2l0aCBSYWlscyBmb3IgYXBwcm92YWwgYW5kIHJlamVjdGlvbiBvZiB1c2VyIHBvc3RlZCB0ZXh0LCBwaG90b3MsIGFuZCB2aWRlb3MuJyxcclxuICAgICAgICAnQnVpbHQgYSBSdWJ5IG9uIFJhaWxzIHNlcnZpY2UgdGhhdCBtYW5hZ2VkIGFsbCB3ZWJzaXRlIGFuZCBtb2JpbGUgdXNlciBhdXRoZW50aWNhdGlvbiwgYXV0aG9yaXphdGlvbiwgYWNjb3VudCwgcmVsYXRpb25zaGlwLCBhbmQgYWdlIHZlcmlmaWNhdGlvbi4nLFxyXG4gICAgICAgICdXcm90ZSBhIGZ1bGwgc3VpdGUgb2YgbG9hZCB0ZXN0cywgaWRlbnRpZmllZCwgcmVtb3ZlZCwgb3Igb3B0aW1pemVkIHNsb3cgcXVlcmllcywgYW5kIGluY3JlYXNlZCB0aGUgbnVtYmVyIG9mIHBvc3NpYmxlIHJlcXVlc3RzIHBlciBzZWNvbmQgYnkgNDAwJS4nLFxyXG4gICAgICAgICdXcm90ZSB0aGUgYmFja2VuZCBBUEkgZm9yIHRoZSB2aWRlbyBjcmVhdGlvbiwgb3JnYW5pemF0aW9uLCBhbmQgc2hhcmluZyBzZWN0aW9uIG9mIHRoZSBzaXRlLicsXHJcbiAgICAgICAgJ0ludGVncmF0ZWQgYSBOb2RlLmpzIEFQSSB3aXRoIGEgdGhpcmQtcGFydHkgbW9kZXJhdGlvbiBzeXN0ZW0gdXNpbmcgYSByZWxpYWJsZSBtZXNzYWdlIHF1ZXVlLidcclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGl0bGU6ICdRQSBFbmdpbmVlcicsXHJcbiAgICAgIHN0YXJ0RGF0ZTogbmV3IERhdGUoMjAxMCwgNyksXHJcbiAgICAgIGVuZERhdGU6IG5ldyBEYXRlKDIwMTEsIDExKSxcclxuICAgICAgbG9jYXRpb25OYW1lOiAnTWV0ZW9yIEdhbWVzJyxcclxuICAgICAgbG9jYXRpb25BZGRyZXNzOiAnQmV2ZXJseSBIaWxscywgQ0EnLFxyXG4gICAgICBzdW1tYXJ5OiAnRGV2ZWxvcGVkIHBpcGVsaW5lIGFuZCB0ZXN0aW5nIHRvb2xzIGFuZCBwZXJmb3JtZWQgYXV0b21hdGVkIHRlc3Rpbmcgb24gZm91ciBGYWNlYm9vayBnYW1lcy4gUHJvbW90ZWQgZnJvbSBRQSBUZXN0ZXIgdG8gUUEgRW5naW5lZXIgd2l0aGluIGZpcnN0IHllYXIuJyxcclxuICAgICAgYWNjb21wbGlzaG1lbnRzOiBbXHJcbiAgICAgICAgJ0FuYWx5emVkIHdvcmtmbG93cyBmb3IgMjAgc3RhZmYgdG8gaWRlbnRpZnkgc291cmNlcyBvZiBpbmVmZmljaWVuY3ksIHByaW9yaXRpemUgdGFza3MsIGFuZCBkZXZlbG9wIGNvbnRlbnQgbWFuYWdlbWVudCBhbmQgZGVidWdnaW5nIHRvb2xzLCBzYXZpbmcgNEsgbWFuIGhvdXJzIGFuZCAkMTUwSyBhbm51YWxseS4nLFxyXG4gICAgICAgICdDcmVhdGVkIGEgc2V0IG9mIHNjcmlwdHMgdG8gc2ltcGxpZnkgYW5kIHZhbGlkYXRlIGRhdGFiYXNlIGVudHJ5IHdpdGggUHl0aG9uIGFuZCBTZWxlbml1bSwgd2hpY2ggcmVkdWNlZCByZWxhdGVkIGJ1Z3MgYnkgb3ZlciA5MCUsIGFuZCBxdWFkcnVwbGVkIGRlcGFydG1lbnQgcHJvZHVjdGlvbi4nLFxyXG4gICAgICAgICdBdXRvbWF0ZWQgdGlja2V0IHZhbGlkYXRpb24gYW5kIHBvcHVsYXRpb24gd2l0aCBQeXRob24sIHJlZHVjaW5nIHdlZWtseSBwcm9jZXNzIHRpbWUgYnkgMTQgaG91cnMuJyxcclxuICAgICAgICAnQnVpbHQgYXJ0IHZlcmlmaWNhdGlvbiB0b29scyB0byBlbGltaW5hdGUgdGVjaG5pY2FsIGFydCBpc3N1ZXMsIGluY2x1ZGluZyBhIFVJIHVzZWQgYnkgZWlnaHQgYXJ0aXN0cyBhbmQgc2l4IHRlc3RlcnMgdGhhdCBhbGxvd2VkIHRoZSBRQSBEZXBhcnRtZW50IHRvIHRlc3QgYXJ0IHdlZWtzIGluIGFkdmFuY2Ugb2YgaW4tZ2FtZSBhcHBlYXJhbmNlLicsXHJcbiAgICAgICAgJ1RhdWdodCB3ZWVrbHkgY2xhc3NlcyB0byBzZXZlbiB0ZXN0ZXJzIG9uIEpTT04sIHNwZWNpZmljIGdhbWUgZGF0YSBmb3JtYXRzLCBrZXlib2FyZCBzaG9ydGN1dHMsIGFuZCBlZmZpY2llbmN5LidcclxuICAgICAgXVxyXG4gICAgfVxyXG4gIF0sXHJcbiAgcHJvamVjdHM6IFtcclxuICAgIHtcclxuICAgICAgdGl0bGU6ICdLb2FuZ3VscGl0ZXN0aWZ5JyxcclxuICAgICAgc3VtbWFyeTogJ0Z1bGwtc3RhY2sgSlMgYm9pbGVycGxhdGUgcHJvamVjdCwgdXNlZCBhcyBhIGJhc2UgZm9yIG90aGVyIHByb2plY3RzLiBJbmNsdWRlcyBLb2EgYmFja2VuZCBhbmQgQW5ndWxhciBjb21wb25lbnQtYmFzZWQgZnJvbnRlbmQsIGFuZCBpcyBlbnRpcmVseSBidWlsdCBvbiBwcm9taXNlcy4gU2F2aW5nIGEgZmlsZSBzZWxlY3RpdmVseSB0cmlnZ2VycyBhc3NldCBjb21waWxhdGlvbiwgZnJvbnRlbmQvYmFja2VuZCB0ZXN0IHJ1bm5lcnMsIHNlcnZlciByZXN0YXJ0LCBhbmQgYnJvd3NlciByZWxvYWQgYXMgbmVlZGVkLicsXHJcbiAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vdGhyZWVoYW1zL2tvYW5ndWxwaXRlc3RpZnknXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0aXRsZTogJ0RlYXRoIFdoaW1zeSBSb2FkbWFwJyxcclxuICAgICAgc3VtbWFyeTogJ1B1YmxpYyBzaXRlIHRvIHNob3cgZGV2ZWxvcG1lbnQgcHJvZ3Jlc3Mgb2YgYSBnYW1lIGRldmVsb3BlZCBieSBTcXVpZCBCbGluayBHYW1lcy4gV3JpdHRlbiBpbiBBbmd1bGFyIGFuZCBLb2EsIHdpdGggRmxleGJveCBhbmQgSFRNTDUgQ2FudmFzLiBQdWxscyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBKaXJhIEFQSSBhbmQgcmVjZWl2ZXMgcmVhbHRpbWUgdXBkYXRlcyB1c2luZyBKaXJhIHdlYmhvb2tzLicsXHJcbiAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vdGhyZWVoYW1zL2RlYXRoLXdoaW1zeS1yb2FkbWFwJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGl0bGU6ICdHYW1lIFByb3RvdHlwZXMnLFxyXG4gICAgICBzdW1tYXJ5OiAnRm91ciBnYW1lIHByb3RvdHlwZXMgdXNpbmcgdGhlIFBoYXNlciBnYW1lIGVuZ2luZS4gRG9uZSB0byBleHBsb3JlIHRoZSBkZXNpZ24gY29tcGxleGl0eSBvZiBnYW1lcywgYW5kIHBlcmZvcm1hbmNlIGRpZmZpY3VsdGllcyBpbiBtYWludGFpbmluZyA2MCBmcmFtZXMgcGVyIHNlY29uZC4nLFxyXG4gICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3RocmVlaGFtcy9waGFzZXItZ2FtZS1wcm90b3R5cGVzJ1xyXG4gICAgfVxyXG4gIF0sXHJcbiAgZXhwZXJ0aXNlOiBbXHJcbiAgICAnQW5ndWxhckpTJyxcclxuICAgICdOb2RlLmpzIC8gSGFwaScsXHJcbiAgICAnUnVieSBvbiBSYWlscycsXHJcbiAgICAnVGVzdC1Ecml2ZW4gRGV2ZWxvcG1lbnQnXHJcbiAgXSxcclxuICBza2lsbHM6IFtcclxuICAgICdBbmd1bGFySlMnLFxyXG4gICAgJ0hUTUwvQ1NTJyxcclxuICAgICdQaG90b3Nob3AvSWxsdXN0cmF0b3InLFxyXG4gICAgJ1Bvc2dyZVNRTCcsXHJcbiAgICAnQ2Fzc2FuZHJhJyxcclxuICAgICdSdWJ5IG9uIFJhaWxzJ1xyXG4gIF1cclxufTtcclxuIl19
