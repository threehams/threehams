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
app.controller('IconController', require('./components/icon/icon-controller.js'));
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

},{"./components/icon/icon":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\icon\\icon.js","./components/icon/icon-controller.js":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\icon\\icon-controller.js","./components/project/project":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\project\\project.js","./components/project/project-controller.js":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\project\\project-controller.js","./pages/page/page-controller.js":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\pages\\page\\page-controller.js","./pages/page/page-template.jade":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\pages\\page\\page-template.jade","./services/profile":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\services\\profile.js","angular":"angular","angular-animate":"angular-animate","angular-route":"angular-route","lodash":"lodash"}],"C:\\Users\\threehams\\workspace\\threehams\\node_modules\\browserify\\node_modules\\browser-resolve\\empty.js":[function(require,module,exports){

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

},{"fs":"C:\\Users\\threehams\\workspace\\threehams\\node_modules\\browserify\\node_modules\\browser-resolve\\empty.js"}],"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\icon\\icon-controller.js":[function(require,module,exports){
'use strict';

module.exports = [function () {
  var vm = this;
}];
},{}],"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\icon\\icon-template.jade":[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<svg class=\"icon\"><use xlink:href=\"{{ ::vm.iconId }}\"></use></svg>");;return buf.join("");
};
},{"jade/runtime":"C:\\Users\\threehams\\workspace\\threehams\\node_modules\\jade\\runtime.js"}],"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\icon\\icon.js":[function(require,module,exports){
'use strict';

module.exports = function() {
  return {
    restrict: 'E',
    scope: {
      iconId: '@'
    },
    replace: true,
    template: require('./icon-template.jade'),
    controller: require('./icon-controller'),
    controllerAs: 'vm',
    bindToController: true
  };
};

},{"./icon-controller":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\icon\\icon-controller.js","./icon-template.jade":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\icon\\icon-template.jade"}],"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\project\\project-controller.js":[function(require,module,exports){
arguments[4]["C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\icon\\icon-controller.js"][0].apply(exports,arguments)
},{}],"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\project\\project-template.jade":[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div><div class=\"subtitle-header\"><h2 class=\"subtitle-header-title\">{{ ::vm.data.title }}</h2><strong ng-if=\"::vm.data.locationName\">{{ ::vm.data.locationName }} - {{ ::vm.data.locationAddress }}</strong></div><p><strong ng-if=\"::vm.data.startDate\">{{ ::vm.data.startDate | date: 'MMM yyyy' }} - {{ ::vm.data.endDate | date: 'MMM yyyy' }}</strong>{{ ::vm.data.summary }} &nbsp;<a href=\"{{ ::vm.data.link }}\" ng-if=\"::vm.data.link\">{{ ::vm.data.link }}</a></p><ul ng-if=\"::vm.data.accomplishments\" class=\"project-list\"><li ng-repeat=\"accomplishment in ::vm.data.accomplishments\" class=\"project-list-item\">{{ ::accomplishment }}</li></ul></div>");;return buf.join("");
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

},{"./project-controller":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\project\\project-controller.js","./project-template.jade":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\project\\project-template.jade"}],"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\pages\\page\\page-controller.js":[function(require,module,exports){
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

buf.push("<header><section><h1 class=\"header-full-name\">{{ ::page.user.name }}</h1><h2 class=\"header-job-title\">{{ ::page.user.title }}</h2></section><section><h2 class=\"header-cenetered\">Expertise</h2><icon icon-id=\"#check\"></icon><ul class=\"centered-list\"><li ng-repeat=\"expertise in ::page.user.expertise\" class=\"centered-list-item\">{{ ::expertise }}</li></ul></section><section><h2>Tech Skill Set</h2><icon icon-id=\"#markup\"></icon><ul class=\"centered-list\"><li ng-repeat=\"skill in ::page.user.skills\" class=\"centered-list-item\">{{ ::skill }}</li></ul></section></header><main><section class=\"profile\"><h2 class=\"icon-header\"><icon icon-id=\"#profile\" class=\"icon-header-icon\"></icon><span>Profile</span></h2><p>{{ ::page.user.profile }}</p></section><section class=\"experience\"><h2 class=\"icon-header\"><icon icon-id=\"#briefcase\" class=\"icon-header-icon\"></icon>Experience</h2><ul class=\"offset-list\"><li ng-repeat=\"job in ::page.user.jobs\" class=\"offset-list-item\"><project data=\"job\"></project></li></ul><h2 class=\"icon-header\"><icon icon-id=\"#fork\" class=\"icon-header-icon\"></icon>Projects</h2><ul class=\"offset-list\"><li ng-repeat=\"project in ::page.user.projects\" class=\"offset-list-item\"><project data=\"project\"></project></li></ul><h2 class=\"icon-header\"><icon icon-id=\"#pencil\" class=\"icon-header-icon\"></icon>Education</h2><ul class=\"offset-list\"><li class=\"offset-list-item\"><h2>{{ ::page.user.education.degree }}</h2><p><strong>{{ ::page.user.education.date | date: 'MMM yyyy' }}</strong><span>{{ ::page.user.education.college }}</span></p></li></ul></section><footer><icon icon-id=\"#contact\" class=\"contact-box-icon\"></icon><div class=\"contact-box\"><div class=\"contact-box-info\"><strong>{{ ::page.user.address }}, {{ ::page.user.zipcode }}</strong><a href=\"mailto:{{ ::page.user.email }}\"><strong>{{ ::page.user.email }}</strong></a></div><div class=\"contact-box-info\"><strong>{{ ::page.user.phone }}</strong><a href=\"{{ ::page.user.link }}\"><strong>{{ ::page.user.link }}</strong></a></div></div></footer></main><a href=\"https://github.com/threehams/threehams.github.io/tree/master/src\" class=\"view-source\">View Source</a>");;return buf.join("");
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
    date: new Date(2005, 6)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXJlc29sdmUvZW1wdHkuanMiLCJub2RlX21vZHVsZXMvamFkZS9ydW50aW1lLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvaWNvbi9pY29uLWNvbnRyb2xsZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9pY29uL2ljb24tdGVtcGxhdGUuamFkZSIsInNyYy9qcy9jb21wb25lbnRzL2ljb24vaWNvbi5qcyIsInNyYy9qcy9jb21wb25lbnRzL3Byb2plY3QvcHJvamVjdC10ZW1wbGF0ZS5qYWRlIiwic3JjL2pzL2NvbXBvbmVudHMvcHJvamVjdC9wcm9qZWN0LmpzIiwic3JjL2pzL3BhZ2VzL3BhZ2UvcGFnZS1jb250cm9sbGVyLmpzIiwic3JjL2pzL3BhZ2VzL3BhZ2UvcGFnZS10ZW1wbGF0ZS5qYWRlIiwic3JjL2pzL3NlcnZpY2VzL3Byb2ZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDL0NBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxucmVxdWlyZSgnYW5ndWxhcicpO1xyXG5yZXF1aXJlKCdhbmd1bGFyLXJvdXRlJyk7XHJcbnJlcXVpcmUoJ2FuZ3VsYXItYW5pbWF0ZScpO1xyXG5nbG9iYWwuXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5cclxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdSZXN1bWUnLCBbJ25nUm91dGUnLCAnbmdBbmltYXRlJ10pO1xyXG5cclxuLy8gcGFnZXNcclxuYXBwLmNvbnRyb2xsZXIoJ1BhZ2VDb250cm9sbGVyJywgcmVxdWlyZSgnLi9wYWdlcy9wYWdlL3BhZ2UtY29udHJvbGxlci5qcycpKTtcclxuXHJcbi8vIGNvbXBvbmVudHMgKGNvbnRyb2xsZXJzIGV4cG9zZWQgZm9yIHRlc3RpbmcpXHJcbmFwcC5kaXJlY3RpdmUoJ2ljb24nLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvaWNvbi9pY29uJykpO1xyXG5hcHAuY29udHJvbGxlcignSWNvbkNvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvaWNvbi9pY29uLWNvbnRyb2xsZXIuanMnKSk7XHJcbmFwcC5kaXJlY3RpdmUoJ3Byb2plY3QnLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvcHJvamVjdC9wcm9qZWN0JykpO1xyXG5hcHAuY29udHJvbGxlcignUHJvamVjdENvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvcHJvamVjdC9wcm9qZWN0LWNvbnRyb2xsZXIuanMnKSk7XHJcblxyXG5hcHAudmFsdWUoJ1Byb2ZpbGUnLCByZXF1aXJlKCcuL3NlcnZpY2VzL3Byb2ZpbGUnKSk7XHJcblxyXG5hcHAuY29uZmlnKFtcclxuICAnJGxvY2F0aW9uUHJvdmlkZXInLFxyXG4gICckcm91dGVQcm92aWRlcicsXHJcbiAgZnVuY3Rpb24gKCRsb2NhdGlvblByb3ZpZGVyLCAkcm91dGVQcm92aWRlcikge1xyXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xyXG5cclxuICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgIC53aGVuKCcvJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3BhZ2VzL3BhZ2UvcGFnZS10ZW1wbGF0ZS5qYWRlJyksXHJcbiAgICAgICAgY29udHJvbGxlcjogJ1BhZ2VDb250cm9sbGVyJyxcclxuICAgICAgICBjb250cm9sbGVyQXM6ICdwYWdlJ1xyXG4gICAgICB9KVxyXG4gICAgICAub3RoZXJ3aXNlKHtcclxuICAgICAgICByZWRpcmVjdFRvOiAnLydcclxuICAgICAgfSk7XHJcbiAgfVxyXG5dKTtcclxuXHJcbi8vIFVuY29tbWVudCBmb3IgZGVidWdnaW5nXHJcbi8vYW5ndWxhci5tb2R1bGUoJ3V0aWxzJykuZmlsdGVyKCdpc0RlZmluZWQnLCBmdW5jdGlvbiAoKSB7XHJcbi8vICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlLCBtc2cpIHtcclxuLy8gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuLy8gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lzRGVmaW5lZCBmaWx0ZXIgZ290IHVuZGVmaW5lZCB2YWx1ZSAnICsgbXNnKTtcclxuLy8gICAgfVxyXG4vLyAgICByZXR1cm4gdmFsdWU7XHJcbi8vICB9O1xyXG4vL30pO1xyXG4iLG51bGwsIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLmphZGUgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTWVyZ2UgdHdvIGF0dHJpYnV0ZSBvYmplY3RzIGdpdmluZyBwcmVjZWRlbmNlXG4gKiB0byB2YWx1ZXMgaW4gb2JqZWN0IGBiYC4gQ2xhc3NlcyBhcmUgc3BlY2lhbC1jYXNlZFxuICogYWxsb3dpbmcgZm9yIGFycmF5cyBhbmQgbWVyZ2luZy9qb2luaW5nIGFwcHJvcHJpYXRlbHlcbiAqIHJlc3VsdGluZyBpbiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKGEsIGIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgYXR0cnMgPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0cnMgPSBtZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuICB2YXIgYWMgPSBhWydjbGFzcyddO1xuICB2YXIgYmMgPSBiWydjbGFzcyddO1xuXG4gIGlmIChhYyB8fCBiYykge1xuICAgIGFjID0gYWMgfHwgW107XG4gICAgYmMgPSBiYyB8fCBbXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWMpKSBhYyA9IFthY107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGJjKSkgYmMgPSBbYmNdO1xuICAgIGFbJ2NsYXNzJ10gPSBhYy5jb25jYXQoYmMpLmZpbHRlcihudWxscyk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChrZXkgIT0gJ2NsYXNzJykge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBGaWx0ZXIgbnVsbCBgdmFsYHMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBudWxscyh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbCAhPT0gJyc7XG59XG5cbi8qKlxuICogam9pbiBhcnJheSBhcyBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuam9pbkNsYXNzZXMgPSBqb2luQ2xhc3NlcztcbmZ1bmN0aW9uIGpvaW5DbGFzc2VzKHZhbCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbC5tYXAoam9pbkNsYXNzZXMpIDpcbiAgICAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSA/IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHZhbFtrZXldOyB9KSA6XG4gICAgW3ZhbF0pLmZpbHRlcihudWxscykuam9pbignICcpO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBjbGFzc2VzXG4gKiBAcGFyYW0ge0FycmF5LjxCb29sZWFuPn0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNscyA9IGZ1bmN0aW9uIGNscyhjbGFzc2VzLCBlc2NhcGVkKSB7XG4gIHZhciBidWYgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVzY2FwZWQgJiYgZXNjYXBlZFtpXSkge1xuICAgICAgYnVmLnB1c2goZXhwb3J0cy5lc2NhcGUoam9pbkNsYXNzZXMoW2NsYXNzZXNbaV1dKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWYucHVzaChqb2luQ2xhc3NlcyhjbGFzc2VzW2ldKSk7XG4gICAgfVxuICB9XG4gIHZhciB0ZXh0ID0gam9pbkNsYXNzZXMoYnVmKTtcbiAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcgY2xhc3M9XCInICsgdGV4dCArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5cbmV4cG9ydHMuc3R5bGUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsKS5tYXAoZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgICByZXR1cm4gc3R5bGUgKyAnOicgKyB2YWxbc3R5bGVdO1xuICAgIH0pLmpvaW4oJzsnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG59O1xuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gZnVuY3Rpb24gYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgIHZhbCA9IGV4cG9ydHMuc3R5bGUodmFsKTtcbiAgfVxuICBpZiAoJ2Jvb2xlYW4nID09IHR5cGVvZiB2YWwgfHwgbnVsbCA9PSB2YWwpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSBlbHNlIGlmICgwID09IGtleS5pbmRleE9mKCdkYXRhJykgJiYgJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkge1xuICAgIGlmIChKU09OLnN0cmluZ2lmeSh2YWwpLmluZGV4T2YoJyYnKSAhPT0gLTEpIHtcbiAgICAgIGNvbnNvbGUud2FybignU2luY2UgSmFkZSAyLjAuMCwgYW1wZXJzYW5kcyAoYCZgKSBpbiBkYXRhIGF0dHJpYnV0ZXMgJyArXG4gICAgICAgICAgICAgICAgICAgJ3dpbGwgYmUgZXNjYXBlZCB0byBgJmFtcDtgJyk7XG4gICAgfTtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIGVsaW1pbmF0ZSB0aGUgZG91YmxlIHF1b3RlcyBhcm91bmQgZGF0ZXMgaW4gJyArXG4gICAgICAgICAgICAgICAgICAgJ0lTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyBcIj0nXCIgKyBKU09OLnN0cmluZ2lmeSh2YWwpLnJlcGxhY2UoLycvZywgJyZhcG9zOycpICsgXCInXCI7XG4gIH0gZWxzZSBpZiAoZXNjYXBlZCkge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIGV4cG9ydHMuZXNjYXBlKHZhbCkgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gZnVuY3Rpb24gYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBidWYgPSBbXTtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICAsIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PSBrZXkpIHtcbiAgICAgICAgaWYgKHZhbCA9IGpvaW5DbGFzc2VzKHZhbCkpIHtcbiAgICAgICAgICBidWYucHVzaCgnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWYucHVzaChleHBvcnRzLmF0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYuam9pbignJyk7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lc2NhcGUgPSBmdW5jdGlvbiBlc2NhcGUoaHRtbCl7XG4gIHZhciByZXN1bHQgPSBTdHJpbmcoaHRtbClcbiAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxuICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKTtcbiAgaWYgKHJlc3VsdCA9PT0gJycgKyBodG1sKSByZXR1cm4gaHRtbDtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBqYWRlIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBmdW5jdGlvbiByZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnSmFkZScpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuXG5leHBvcnRzLkRlYnVnSXRlbSA9IGZ1bmN0aW9uIERlYnVnSXRlbShsaW5lbm8sIGZpbGVuYW1lKSB7XG4gIHRoaXMubGluZW5vID0gbGluZW5vO1xuICB0aGlzLmZpbGVuYW1lID0gZmlsZW5hbWU7XG59XG5cbn0se1wiZnNcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbn0se31dfSx7fSxbMV0pKDEpXG59KTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFtmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIHZtID0gdGhpcztcclxufV07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPHN2ZyBjbGFzcz1cXFwiaWNvblxcXCI+PHVzZSB4bGluazpocmVmPVxcXCJ7eyA6OnZtLmljb25JZCB9fVxcXCI+PC91c2U+PC9zdmc+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICBzY29wZToge1xyXG4gICAgICBpY29uSWQ6ICdAJ1xyXG4gICAgfSxcclxuICAgIHJlcGxhY2U6IHRydWUsXHJcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9pY29uLXRlbXBsYXRlLmphZGUnKSxcclxuICAgIGNvbnRyb2xsZXI6IHJlcXVpcmUoJy4vaWNvbi1jb250cm9sbGVyJyksXHJcbiAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlXHJcbiAgfTtcclxufTtcclxuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdj48ZGl2IGNsYXNzPVxcXCJzdWJ0aXRsZS1oZWFkZXJcXFwiPjxoMiBjbGFzcz1cXFwic3VidGl0bGUtaGVhZGVyLXRpdGxlXFxcIj57eyA6OnZtLmRhdGEudGl0bGUgfX08L2gyPjxzdHJvbmcgbmctaWY9XFxcIjo6dm0uZGF0YS5sb2NhdGlvbk5hbWVcXFwiPnt7IDo6dm0uZGF0YS5sb2NhdGlvbk5hbWUgfX0gLSB7eyA6OnZtLmRhdGEubG9jYXRpb25BZGRyZXNzIH19PC9zdHJvbmc+PC9kaXY+PHA+PHN0cm9uZyBuZy1pZj1cXFwiOjp2bS5kYXRhLnN0YXJ0RGF0ZVxcXCI+e3sgOjp2bS5kYXRhLnN0YXJ0RGF0ZSB8IGRhdGU6ICdNTU0geXl5eScgfX0gLSB7eyA6OnZtLmRhdGEuZW5kRGF0ZSB8IGRhdGU6ICdNTU0geXl5eScgfX08L3N0cm9uZz57eyA6OnZtLmRhdGEuc3VtbWFyeSB9fSAmbmJzcDs8YSBocmVmPVxcXCJ7eyA6OnZtLmRhdGEubGluayB9fVxcXCIgbmctaWY9XFxcIjo6dm0uZGF0YS5saW5rXFxcIj57eyA6OnZtLmRhdGEubGluayB9fTwvYT48L3A+PHVsIG5nLWlmPVxcXCI6OnZtLmRhdGEuYWNjb21wbGlzaG1lbnRzXFxcIiBjbGFzcz1cXFwicHJvamVjdC1saXN0XFxcIj48bGkgbmctcmVwZWF0PVxcXCJhY2NvbXBsaXNobWVudCBpbiA6OnZtLmRhdGEuYWNjb21wbGlzaG1lbnRzXFxcIiBjbGFzcz1cXFwicHJvamVjdC1saXN0LWl0ZW1cXFwiPnt7IDo6YWNjb21wbGlzaG1lbnQgfX08L2xpPjwvdWw+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICBzY29wZToge1xyXG4gICAgICBkYXRhOiAnPSdcclxuICAgIH0sXHJcbiAgICByZXBsYWNlOiB0cnVlLFxyXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vcHJvamVjdC10ZW1wbGF0ZS5qYWRlJyksXHJcbiAgICBjb250cm9sbGVyOiByZXF1aXJlKCcuL3Byb2plY3QtY29udHJvbGxlcicpLFxyXG4gICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZVxyXG4gIH07XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gWydQcm9maWxlJywgZnVuY3Rpb24gKFByb2ZpbGUpIHtcclxuICB2YXIgcGFnZSA9IHRoaXM7XHJcblxyXG4gIHBhZ2UudXNlciA9IFByb2ZpbGU7XHJcbn1dO1xyXG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8aGVhZGVyPjxzZWN0aW9uPjxoMSBjbGFzcz1cXFwiaGVhZGVyLWZ1bGwtbmFtZVxcXCI+e3sgOjpwYWdlLnVzZXIubmFtZSB9fTwvaDE+PGgyIGNsYXNzPVxcXCJoZWFkZXItam9iLXRpdGxlXFxcIj57eyA6OnBhZ2UudXNlci50aXRsZSB9fTwvaDI+PC9zZWN0aW9uPjxzZWN0aW9uPjxoMiBjbGFzcz1cXFwiaGVhZGVyLWNlbmV0ZXJlZFxcXCI+RXhwZXJ0aXNlPC9oMj48aWNvbiBpY29uLWlkPVxcXCIjY2hlY2tcXFwiPjwvaWNvbj48dWwgY2xhc3M9XFxcImNlbnRlcmVkLWxpc3RcXFwiPjxsaSBuZy1yZXBlYXQ9XFxcImV4cGVydGlzZSBpbiA6OnBhZ2UudXNlci5leHBlcnRpc2VcXFwiIGNsYXNzPVxcXCJjZW50ZXJlZC1saXN0LWl0ZW1cXFwiPnt7IDo6ZXhwZXJ0aXNlIH19PC9saT48L3VsPjwvc2VjdGlvbj48c2VjdGlvbj48aDI+VGVjaCBTa2lsbCBTZXQ8L2gyPjxpY29uIGljb24taWQ9XFxcIiNtYXJrdXBcXFwiPjwvaWNvbj48dWwgY2xhc3M9XFxcImNlbnRlcmVkLWxpc3RcXFwiPjxsaSBuZy1yZXBlYXQ9XFxcInNraWxsIGluIDo6cGFnZS51c2VyLnNraWxsc1xcXCIgY2xhc3M9XFxcImNlbnRlcmVkLWxpc3QtaXRlbVxcXCI+e3sgOjpza2lsbCB9fTwvbGk+PC91bD48L3NlY3Rpb24+PC9oZWFkZXI+PG1haW4+PHNlY3Rpb24gY2xhc3M9XFxcInByb2ZpbGVcXFwiPjxoMiBjbGFzcz1cXFwiaWNvbi1oZWFkZXJcXFwiPjxpY29uIGljb24taWQ9XFxcIiNwcm9maWxlXFxcIiBjbGFzcz1cXFwiaWNvbi1oZWFkZXItaWNvblxcXCI+PC9pY29uPjxzcGFuPlByb2ZpbGU8L3NwYW4+PC9oMj48cD57eyA6OnBhZ2UudXNlci5wcm9maWxlIH19PC9wPjwvc2VjdGlvbj48c2VjdGlvbiBjbGFzcz1cXFwiZXhwZXJpZW5jZVxcXCI+PGgyIGNsYXNzPVxcXCJpY29uLWhlYWRlclxcXCI+PGljb24gaWNvbi1pZD1cXFwiI2JyaWVmY2FzZVxcXCIgY2xhc3M9XFxcImljb24taGVhZGVyLWljb25cXFwiPjwvaWNvbj5FeHBlcmllbmNlPC9oMj48dWwgY2xhc3M9XFxcIm9mZnNldC1saXN0XFxcIj48bGkgbmctcmVwZWF0PVxcXCJqb2IgaW4gOjpwYWdlLnVzZXIuam9ic1xcXCIgY2xhc3M9XFxcIm9mZnNldC1saXN0LWl0ZW1cXFwiPjxwcm9qZWN0IGRhdGE9XFxcImpvYlxcXCI+PC9wcm9qZWN0PjwvbGk+PC91bD48aDIgY2xhc3M9XFxcImljb24taGVhZGVyXFxcIj48aWNvbiBpY29uLWlkPVxcXCIjZm9ya1xcXCIgY2xhc3M9XFxcImljb24taGVhZGVyLWljb25cXFwiPjwvaWNvbj5Qcm9qZWN0czwvaDI+PHVsIGNsYXNzPVxcXCJvZmZzZXQtbGlzdFxcXCI+PGxpIG5nLXJlcGVhdD1cXFwicHJvamVjdCBpbiA6OnBhZ2UudXNlci5wcm9qZWN0c1xcXCIgY2xhc3M9XFxcIm9mZnNldC1saXN0LWl0ZW1cXFwiPjxwcm9qZWN0IGRhdGE9XFxcInByb2plY3RcXFwiPjwvcHJvamVjdD48L2xpPjwvdWw+PGgyIGNsYXNzPVxcXCJpY29uLWhlYWRlclxcXCI+PGljb24gaWNvbi1pZD1cXFwiI3BlbmNpbFxcXCIgY2xhc3M9XFxcImljb24taGVhZGVyLWljb25cXFwiPjwvaWNvbj5FZHVjYXRpb248L2gyPjx1bCBjbGFzcz1cXFwib2Zmc2V0LWxpc3RcXFwiPjxsaSBjbGFzcz1cXFwib2Zmc2V0LWxpc3QtaXRlbVxcXCI+PGgyPnt7IDo6cGFnZS51c2VyLmVkdWNhdGlvbi5kZWdyZWUgfX08L2gyPjxwPjxzdHJvbmc+e3sgOjpwYWdlLnVzZXIuZWR1Y2F0aW9uLmRhdGUgfCBkYXRlOiAnTU1NIHl5eXknIH19PC9zdHJvbmc+PHNwYW4+e3sgOjpwYWdlLnVzZXIuZWR1Y2F0aW9uLmNvbGxlZ2UgfX08L3NwYW4+PC9wPjwvbGk+PC91bD48L3NlY3Rpb24+PGZvb3Rlcj48aWNvbiBpY29uLWlkPVxcXCIjY29udGFjdFxcXCIgY2xhc3M9XFxcImNvbnRhY3QtYm94LWljb25cXFwiPjwvaWNvbj48ZGl2IGNsYXNzPVxcXCJjb250YWN0LWJveFxcXCI+PGRpdiBjbGFzcz1cXFwiY29udGFjdC1ib3gtaW5mb1xcXCI+PHN0cm9uZz57eyA6OnBhZ2UudXNlci5hZGRyZXNzIH19LCB7eyA6OnBhZ2UudXNlci56aXBjb2RlIH19PC9zdHJvbmc+PGEgaHJlZj1cXFwibWFpbHRvOnt7IDo6cGFnZS51c2VyLmVtYWlsIH19XFxcIj48c3Ryb25nPnt7IDo6cGFnZS51c2VyLmVtYWlsIH19PC9zdHJvbmc+PC9hPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbnRhY3QtYm94LWluZm9cXFwiPjxzdHJvbmc+e3sgOjpwYWdlLnVzZXIucGhvbmUgfX08L3N0cm9uZz48YSBocmVmPVxcXCJ7eyA6OnBhZ2UudXNlci5saW5rIH19XFxcIj48c3Ryb25nPnt7IDo6cGFnZS51c2VyLmxpbmsgfX08L3N0cm9uZz48L2E+PC9kaXY+PC9kaXY+PC9mb290ZXI+PC9tYWluPjxhIGhyZWY9XFxcImh0dHBzOi8vZ2l0aHViLmNvbS90aHJlZWhhbXMvdGhyZWVoYW1zLmdpdGh1Yi5pby90cmVlL21hc3Rlci9zcmNcXFwiIGNsYXNzPVxcXCJ2aWV3LXNvdXJjZVxcXCI+VmlldyBTb3VyY2U8L2E+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIG5hbWU6ICdEYXZpZCBFZG1vbmRzb24nLFxyXG4gIHRpdGxlOiAnV2ViIERldmVsb3BlcicsXHJcbiAgYWRkcmVzczogJzQ2MDcgV2lsbGlzIEF2ZSBBcHQuIDE0JyxcclxuICBjaXR5OiAnU2hlcm1hbiBPYWtzJyxcclxuICBzdGF0ZTogJ0NBJyxcclxuICB6aXBjb2RlOiA5MTQwMyxcclxuICBlbWFpbDogJ2RhdmlkYWVkbW9uZHNvbkBnbWFpbC5jb20nLFxyXG4gIHBob25lOiAnODE4LjgwNC43MjU1JyxcclxuICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3RocmVlaGFtcycsXHJcbiAgcHJvZmlsZTogJ0Z1bGwtc3RhY2sgZGV2ZWxvcGVyIHdpdGggYmFja2dyb3VuZCBpbiBzeXN0ZW1zIGFkbWluaXN0cmF0aW9uLCBjb250ZW50IG1hbmFnZW1lbnQsIGFuZCBhdXRvbWF0ZWQgdGVzdGluZywgd2l0aCA0IHllYXJzIG9mIGV4cGVyaWVuY2UgaW4gc29mdHdhcmUgZGV2ZWxvcG1lbnQgYW5kIHRlc3QgZW5naW5lZXJpbmcuJyxcclxuICBlZHVjYXRpb246IHtcclxuICAgIGRlZ3JlZTogJ0JhY2hlbG9yIG9mIEZpbmUgQXJ0cyAtIEZpbG0gYW5kIEFuaW1hdGlvbicsXHJcbiAgICBjb2xsZWdlOiAnUm9jaGVzdGVyIEluc3RpdHV0ZSBvZiBUZWNobm9sb2d5JyxcclxuICAgIGRhdGU6IG5ldyBEYXRlKDIwMDUsIDYpXHJcbiAgfSxcclxuICBqb2JzOiBbXHJcbiAgICB7XHJcbiAgICAgIHRpdGxlOiAnU29mdHdhcmUgRW5naW5lZXInLFxyXG4gICAgICBzdGFydERhdGU6IG5ldyBEYXRlKDIwMTIsIDYpLFxyXG4gICAgICBlbmREYXRlOiBuZXcgRGF0ZSgyMDE1LCAyKSxcclxuICAgICAgbG9jYXRpb25OYW1lOiAnU3dlZXR5IEhpZ2gnLFxyXG4gICAgICBsb2NhdGlvbkFkZHJlc3M6ICdNYXJpbmEgRGVsIFJleSwgQ0EnLFxyXG4gICAgICBzdW1tYXJ5OiAnRnVsbC1zdGFjayBkZXZlbG9wZXIgZm9yIGEgc29jaWFsIG5ldHdvcmtpbmcgc2l0ZSBhbmQgbW9iaWxlIGFwcCBBUEksIHVzaW5nIFJhaWxzLCBOb2RlLmpzLCBqUXVlcnksIGFuZCBBbmd1bGFyLiBQcm9tb3RlZCBmcm9tIFFBIEVuZ2luZWVyIHRvIFNvZnR3YXJlIEVuZ2luZWVyIHdpdGhpbiBmaXJzdCB5ZWFyLicsXHJcbiAgICAgIGFjY29tcGxpc2htZW50czogW1xyXG4gICAgICAgICdCdWlsdCBhIGNvbnRlbnQgbWFuYWdlbWVudCBzeXN0ZW0gd2l0aCBSYWlscyB0byBvcmdhbml6ZSBhbGwgcGhvdG9zIGFuZCB2aWRlb3MsIGNvbnRlc3RzLCBhbmQgY3VyYXRlZCBjb21tdW5pdHkgcGhvdG8vdmlkZW8gcGxheWxpc3RzLicsXHJcbiAgICAgICAgJ0RldmVsb3BlZCBhIGNvbW11bml0eSBtb2RlcmF0aW9uIHN5c3RlbSB3aXRoIFJhaWxzIGZvciBhcHByb3ZhbCBhbmQgcmVqZWN0aW9uIG9mIHVzZXIgcG9zdGVkIHRleHQsIHBob3RvcywgYW5kIHZpZGVvcy4nLFxyXG4gICAgICAgICdCdWlsdCBhIFJ1Ynkgb24gUmFpbHMgc2VydmljZSB0aGF0IG1hbmFnZWQgYWxsIHdlYnNpdGUgYW5kIG1vYmlsZSB1c2VyIGF1dGhlbnRpY2F0aW9uLCBhdXRob3JpemF0aW9uLCBhY2NvdW50LCByZWxhdGlvbnNoaXAsIGFuZCBhZ2UgdmVyaWZpY2F0aW9uLicsXHJcbiAgICAgICAgJ1dyb3RlIGEgZnVsbCBzdWl0ZSBvZiBsb2FkIHRlc3RzLCBpZGVudGlmaWVkLCByZW1vdmVkLCBvciBvcHRpbWl6ZWQgc2xvdyBxdWVyaWVzLCBhbmQgaW5jcmVhc2VkIHRoZSBudW1iZXIgb2YgcG9zc2libGUgcmVxdWVzdHMgcGVyIHNlY29uZCBieSA0MDAlLicsXHJcbiAgICAgICAgJ1dyb3RlIHRoZSBiYWNrZW5kIEFQSSBmb3IgdGhlIHZpZGVvIGNyZWF0aW9uLCBvcmdhbml6YXRpb24sIGFuZCBzaGFyaW5nIHNlY3Rpb24gb2YgdGhlIHNpdGUuJyxcclxuICAgICAgICAnSW50ZWdyYXRlZCBhIE5vZGUuanMgQVBJIHdpdGggYSB0aGlyZC1wYXJ0eSBtb2RlcmF0aW9uIHN5c3RlbSB1c2luZyBhIHJlbGlhYmxlIG1lc3NhZ2UgcXVldWUuJ1xyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0aXRsZTogJ1FBIEVuZ2luZWVyJyxcclxuICAgICAgc3RhcnREYXRlOiBuZXcgRGF0ZSgyMDEwLCA3KSxcclxuICAgICAgZW5kRGF0ZTogbmV3IERhdGUoMjAxMSwgMTEpLFxyXG4gICAgICBsb2NhdGlvbk5hbWU6ICdNZXRlb3IgR2FtZXMnLFxyXG4gICAgICBsb2NhdGlvbkFkZHJlc3M6ICdCZXZlcmx5IEhpbGxzLCBDQScsXHJcbiAgICAgIHN1bW1hcnk6ICdEZXZlbG9wZWQgcGlwZWxpbmUgYW5kIHRlc3RpbmcgdG9vbHMgYW5kIHBlcmZvcm1lZCBhdXRvbWF0ZWQgdGVzdGluZyBvbiBmb3VyIEZhY2Vib29rIGdhbWVzLiBQcm9tb3RlZCBmcm9tIFFBIFRlc3RlciB0byBRQSBFbmdpbmVlciB3aXRoaW4gZmlyc3QgeWVhci4nLFxyXG4gICAgICBhY2NvbXBsaXNobWVudHM6IFtcclxuICAgICAgICAnQW5hbHl6ZWQgd29ya2Zsb3dzIGZvciAyMCBzdGFmZiB0byBpZGVudGlmeSBzb3VyY2VzIG9mIGluZWZmaWNpZW5jeSwgcHJpb3JpdGl6ZSB0YXNrcywgYW5kIGRldmVsb3AgY29udGVudCBtYW5hZ2VtZW50IGFuZCBkZWJ1Z2dpbmcgdG9vbHMsIHNhdmluZyA0SyBtYW4gaG91cnMgYW5kICQxNTBLIGFubnVhbGx5LicsXHJcbiAgICAgICAgJ0NyZWF0ZWQgYSBzZXQgb2Ygc2NyaXB0cyB0byBzaW1wbGlmeSBhbmQgdmFsaWRhdGUgZGF0YWJhc2UgZW50cnkgd2l0aCBQeXRob24gYW5kIFNlbGVuaXVtLCB3aGljaCByZWR1Y2VkIHJlbGF0ZWQgYnVncyBieSBvdmVyIDkwJSwgYW5kIHF1YWRydXBsZWQgZGVwYXJ0bWVudCBwcm9kdWN0aW9uLicsXHJcbiAgICAgICAgJ0F1dG9tYXRlZCB0aWNrZXQgdmFsaWRhdGlvbiBhbmQgcG9wdWxhdGlvbiB3aXRoIFB5dGhvbiwgcmVkdWNpbmcgd2Vla2x5IHByb2Nlc3MgdGltZSBieSAxNCBob3Vycy4nLFxyXG4gICAgICAgICdCdWlsdCBhcnQgdmVyaWZpY2F0aW9uIHRvb2xzIHRvIGVsaW1pbmF0ZSB0ZWNobmljYWwgYXJ0IGlzc3VlcywgaW5jbHVkaW5nIGEgVUkgdXNlZCBieSBlaWdodCBhcnRpc3RzIGFuZCBzaXggdGVzdGVycyB0aGF0IGFsbG93ZWQgdGhlIFFBIERlcGFydG1lbnQgdG8gdGVzdCBhcnQgd2Vla3MgaW4gYWR2YW5jZSBvZiBpbi1nYW1lIGFwcGVhcmFuY2UuJyxcclxuICAgICAgICAnVGF1Z2h0IHdlZWtseSBjbGFzc2VzIHRvIHNldmVuIHRlc3RlcnMgb24gSlNPTiwgc3BlY2lmaWMgZ2FtZSBkYXRhIGZvcm1hdHMsIGtleWJvYXJkIHNob3J0Y3V0cywgYW5kIGVmZmljaWVuY3kuJ1xyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgXSxcclxuICBwcm9qZWN0czogW1xyXG4gICAge1xyXG4gICAgICB0aXRsZTogJ0tvYW5ndWxwaXRlc3RpZnknLFxyXG4gICAgICBzdW1tYXJ5OiAnRnVsbC1zdGFjayBKUyBib2lsZXJwbGF0ZSBwcm9qZWN0LCB1c2VkIGFzIGEgYmFzZSBmb3Igb3RoZXIgcHJvamVjdHMuIEluY2x1ZGVzIEtvYSBiYWNrZW5kIGFuZCBBbmd1bGFyIGNvbXBvbmVudC1iYXNlZCBmcm9udGVuZCwgYW5kIGlzIGVudGlyZWx5IGJ1aWx0IG9uIHByb21pc2VzLiBTYXZpbmcgYSBmaWxlIHNlbGVjdGl2ZWx5IHRyaWdnZXJzIGFzc2V0IGNvbXBpbGF0aW9uLCBmcm9udGVuZC9iYWNrZW5kIHRlc3QgcnVubmVycywgc2VydmVyIHJlc3RhcnQsIGFuZCBicm93c2VyIHJlbG9hZCBhcyBuZWVkZWQuJyxcclxuICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS90aHJlZWhhbXMva29hbmd1bHBpdGVzdGlmeSdcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRpdGxlOiAnRGVhdGggV2hpbXN5IFJvYWRtYXAnLFxyXG4gICAgICBzdW1tYXJ5OiAnUHVibGljIHNpdGUgdG8gc2hvdyBkZXZlbG9wbWVudCBwcm9ncmVzcyBvZiBhIGdhbWUgZGV2ZWxvcGVkIGJ5IFNxdWlkIEJsaW5rIEdhbWVzLiBXcml0dGVuIGluIEFuZ3VsYXIgYW5kIEtvYSwgd2l0aCBGbGV4Ym94IGFuZCBIVE1MNSBDYW52YXMuIFB1bGxzIGluZm9ybWF0aW9uIGZyb20gdGhlIEppcmEgQVBJIGFuZCByZWNlaXZlcyByZWFsdGltZSB1cGRhdGVzIHVzaW5nIEppcmEgd2ViaG9va3MuJyxcclxuICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS90aHJlZWhhbXMvZGVhdGgtd2hpbXN5LXJvYWRtYXAnXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0aXRsZTogJ0dhbWUgUHJvdG90eXBlcycsXHJcbiAgICAgIHN1bW1hcnk6ICdGb3VyIGdhbWUgcHJvdG90eXBlcyB1c2luZyB0aGUgUGhhc2VyIGdhbWUgZW5naW5lLiBEb25lIHRvIGV4cGxvcmUgdGhlIGRlc2lnbiBjb21wbGV4aXR5IG9mIGdhbWVzLCBhbmQgcGVyZm9ybWFuY2UgZGlmZmljdWx0aWVzIGluIG1haW50YWluaW5nIDYwIGZyYW1lcyBwZXIgc2Vjb25kLicsXHJcbiAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vdGhyZWVoYW1zL3BoYXNlci1nYW1lLXByb3RvdHlwZXMnXHJcbiAgICB9XHJcbiAgXSxcclxuICBleHBlcnRpc2U6IFtcclxuICAgICdBbmd1bGFySlMnLFxyXG4gICAgJ05vZGUuanMgLyBIYXBpJyxcclxuICAgICdSdWJ5IG9uIFJhaWxzJyxcclxuICAgICdUZXN0LURyaXZlbiBEZXZlbG9wbWVudCdcclxuICBdLFxyXG4gIHNraWxsczogW1xyXG4gICAgJ0FuZ3VsYXJKUycsXHJcbiAgICAnSFRNTC9DU1MnLFxyXG4gICAgJ1Bob3Rvc2hvcC9JbGx1c3RyYXRvcicsXHJcbiAgICAnUG9zZ3JlU1FMJyxcclxuICAgICdDYXNzYW5kcmEnLFxyXG4gICAgJ1J1Ynkgb24gUmFpbHMnXHJcbiAgXVxyXG59O1xyXG4iXX0=
