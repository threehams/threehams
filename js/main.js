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

buf.push("<header><section><h1>{{ ::page.user.name }}</h1><h2>{{ ::page.user.title }}</h2></section><section><h2>Expertise</h2><icon icon-id=\"#check\"></icon><ul list-style=\"centered\"><li ng-repeat=\"expertise in ::page.user.expertise\">{{ ::expertise }}</li></ul></section><section><h2>Tech Skill Set</h2><icon icon-id=\"#markup\"></icon><ul list-style=\"centered\"><li ng-repeat=\"skill in ::page.user.skills\">{{ ::skill }}</li></ul></section></header><main><section class=\"profile\"><icon-header><icon icon-id=\"#profile\"></icon><h2>Profile</h2></icon-header><p>{{ ::page.user.profile }}</p></section><section class=\"experience\"><icon-header><icon icon-id=\"#briefcase\"></icon><h2>Experience</h2></icon-header><ul list-style=\"offset\"><li ng-repeat=\"job in ::page.user.jobs\"><project data=\"job\"></project></li></ul><icon-header><icon icon-id=\"#fork\"></icon><h2>Projects</h2></icon-header><ul list-style=\"offset\"><li ng-repeat=\"project in ::page.user.projects\"><project data=\"project\"></project></li></ul><icon-header><icon icon-id=\"#pencil\"></icon><h2>Education</h2></icon-header><ul list-style=\"offset\"><li><h2>{{ ::page.user.education.degree }}</h2><p><strong>{{ ::page.user.education.date | date: 'MMM yyyy' }}</strong><span>{{ ::page.user.education.college }}</span></p></li></ul></section><footer><icon icon-id=\"#contact\" class=\"contact-box-icon\"></icon><div class=\"contact-box\"><div class=\"contact-box-info\"><strong>{{ ::page.user.address }}, {{ ::page.user.zipcode }}</strong><a href=\"mailto:{{ ::page.user.email }}\"><strong>{{ ::page.user.email }}</strong></a></div><div class=\"contact-box-info\"><strong>{{ ::page.user.phone }}</strong><a href=\"{{ ::page.user.link }}\"><strong>{{ ::page.user.link }}</strong></a></div></div></footer></main><a href=\"https://github.com/threehams/threehams.github.io/tree/master/src\" class=\"view-source\">View Source</a>");;return buf.join("");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXJlc29sdmUvZW1wdHkuanMiLCJub2RlX21vZHVsZXMvamFkZS9ydW50aW1lLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvaWNvbi1oZWFkZXIvaWNvbi1oZWFkZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9pY29uL2ljb24tdGVtcGxhdGUuamFkZSIsInNyYy9qcy9jb21wb25lbnRzL2ljb24vaWNvbi5qcyIsInNyYy9qcy9jb21wb25lbnRzL2xpc3Qtc3R5bGUvbGlzdC1zdHlsZS5qcyIsInNyYy9qcy9jb21wb25lbnRzL3Byb2plY3QvcHJvamVjdC1jb250cm9sbGVyLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvcHJvamVjdC9wcm9qZWN0LXRlbXBsYXRlLmphZGUiLCJzcmMvanMvY29tcG9uZW50cy9wcm9qZWN0L3Byb2plY3QuanMiLCJzcmMvanMvY29tcG9uZW50cy9zdWJ0aXRsZS1oZWFkZXIvc3VidGl0bGUtaGVhZGVyLmpzIiwic3JjL2pzL3BhZ2VzL3BhZ2UvcGFnZS1jb250cm9sbGVyLmpzIiwic3JjL2pzL3BhZ2VzL3BhZ2UvcGFnZS10ZW1wbGF0ZS5qYWRlIiwic3JjL2pzL3NlcnZpY2VzL3Byb2ZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2pEQTs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG5yZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnJlcXVpcmUoJ2FuZ3VsYXItcm91dGUnKTtcclxucmVxdWlyZSgnYW5ndWxhci1hbmltYXRlJyk7XHJcbmdsb2JhbC5fID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcblxyXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ1Jlc3VtZScsIFsnbmdSb3V0ZScsICduZ0FuaW1hdGUnXSk7XHJcblxyXG4vLyBwYWdlc1xyXG5hcHAuY29udHJvbGxlcignUGFnZUNvbnRyb2xsZXInLCByZXF1aXJlKCcuL3BhZ2VzL3BhZ2UvcGFnZS1jb250cm9sbGVyLmpzJykpO1xyXG5cclxuLy8gY29tcG9uZW50cyAoY29udHJvbGxlcnMgZXhwb3NlZCBmb3IgdGVzdGluZylcclxuYXBwLmRpcmVjdGl2ZSgnaWNvbicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9pY29uL2ljb24nKSk7XHJcbmFwcC5kaXJlY3RpdmUoJ2ljb25IZWFkZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvaWNvbi1oZWFkZXIvaWNvbi1oZWFkZXInKSk7XHJcbmFwcC5kaXJlY3RpdmUoJ3N1YnRpdGxlSGVhZGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL3N1YnRpdGxlLWhlYWRlci9zdWJ0aXRsZS1oZWFkZXInKSk7XHJcbmFwcC5kaXJlY3RpdmUoJ2xpc3RTdHlsZScsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9saXN0LXN0eWxlL2xpc3Qtc3R5bGUnKSk7XHJcbmFwcC5kaXJlY3RpdmUoJ3Byb2plY3QnLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvcHJvamVjdC9wcm9qZWN0JykpO1xyXG5hcHAuY29udHJvbGxlcignUHJvamVjdENvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvcHJvamVjdC9wcm9qZWN0LWNvbnRyb2xsZXIuanMnKSk7XHJcblxyXG5hcHAudmFsdWUoJ1Byb2ZpbGUnLCByZXF1aXJlKCcuL3NlcnZpY2VzL3Byb2ZpbGUnKSk7XHJcblxyXG5hcHAuY29uZmlnKFtcclxuICAnJGxvY2F0aW9uUHJvdmlkZXInLFxyXG4gICckcm91dGVQcm92aWRlcicsXHJcbiAgZnVuY3Rpb24gKCRsb2NhdGlvblByb3ZpZGVyLCAkcm91dGVQcm92aWRlcikge1xyXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xyXG5cclxuICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgIC53aGVuKCcvJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3BhZ2VzL3BhZ2UvcGFnZS10ZW1wbGF0ZS5qYWRlJyksXHJcbiAgICAgICAgY29udHJvbGxlcjogJ1BhZ2VDb250cm9sbGVyJyxcclxuICAgICAgICBjb250cm9sbGVyQXM6ICdwYWdlJ1xyXG4gICAgICB9KVxyXG4gICAgICAub3RoZXJ3aXNlKHtcclxuICAgICAgICByZWRpcmVjdFRvOiAnLydcclxuICAgICAgfSk7XHJcbiAgfVxyXG5dKTtcclxuXHJcbi8vIFVuY29tbWVudCBmb3IgZGVidWdnaW5nXHJcbi8vYW5ndWxhci5tb2R1bGUoJ3V0aWxzJykuZmlsdGVyKCdpc0RlZmluZWQnLCBmdW5jdGlvbiAoKSB7XHJcbi8vICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlLCBtc2cpIHtcclxuLy8gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuLy8gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lzRGVmaW5lZCBmaWx0ZXIgZ290IHVuZGVmaW5lZCB2YWx1ZSAnICsgbXNnKTtcclxuLy8gICAgfVxyXG4vLyAgICByZXR1cm4gdmFsdWU7XHJcbi8vICB9O1xyXG4vL30pO1xyXG4iLG51bGwsIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLmphZGUgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTWVyZ2UgdHdvIGF0dHJpYnV0ZSBvYmplY3RzIGdpdmluZyBwcmVjZWRlbmNlXG4gKiB0byB2YWx1ZXMgaW4gb2JqZWN0IGBiYC4gQ2xhc3NlcyBhcmUgc3BlY2lhbC1jYXNlZFxuICogYWxsb3dpbmcgZm9yIGFycmF5cyBhbmQgbWVyZ2luZy9qb2luaW5nIGFwcHJvcHJpYXRlbHlcbiAqIHJlc3VsdGluZyBpbiBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYVxuICogQHBhcmFtIHtPYmplY3R9IGJcbiAqIEByZXR1cm4ge09iamVjdH0gYVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKGEsIGIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgYXR0cnMgPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7IGkrKykge1xuICAgICAgYXR0cnMgPSBtZXJnZShhdHRycywgYVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbiAgfVxuICB2YXIgYWMgPSBhWydjbGFzcyddO1xuICB2YXIgYmMgPSBiWydjbGFzcyddO1xuXG4gIGlmIChhYyB8fCBiYykge1xuICAgIGFjID0gYWMgfHwgW107XG4gICAgYmMgPSBiYyB8fCBbXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWMpKSBhYyA9IFthY107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGJjKSkgYmMgPSBbYmNdO1xuICAgIGFbJ2NsYXNzJ10gPSBhYy5jb25jYXQoYmMpLmZpbHRlcihudWxscyk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChrZXkgIT0gJ2NsYXNzJykge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBGaWx0ZXIgbnVsbCBgdmFsYHMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBudWxscyh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbCAhPT0gJyc7XG59XG5cbi8qKlxuICogam9pbiBhcnJheSBhcyBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuam9pbkNsYXNzZXMgPSBqb2luQ2xhc3NlcztcbmZ1bmN0aW9uIGpvaW5DbGFzc2VzKHZhbCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbC5tYXAoam9pbkNsYXNzZXMpIDpcbiAgICAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSA/IE9iamVjdC5rZXlzKHZhbCkuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHZhbFtrZXldOyB9KSA6XG4gICAgW3ZhbF0pLmZpbHRlcihudWxscykuam9pbignICcpO1xufVxuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBjbGFzc2VzXG4gKiBAcGFyYW0ge0FycmF5LjxCb29sZWFuPn0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmNscyA9IGZ1bmN0aW9uIGNscyhjbGFzc2VzLCBlc2NhcGVkKSB7XG4gIHZhciBidWYgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVzY2FwZWQgJiYgZXNjYXBlZFtpXSkge1xuICAgICAgYnVmLnB1c2goZXhwb3J0cy5lc2NhcGUoam9pbkNsYXNzZXMoW2NsYXNzZXNbaV1dKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWYucHVzaChqb2luQ2xhc3NlcyhjbGFzc2VzW2ldKSk7XG4gICAgfVxuICB9XG4gIHZhciB0ZXh0ID0gam9pbkNsYXNzZXMoYnVmKTtcbiAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcgY2xhc3M9XCInICsgdGV4dCArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5cbmV4cG9ydHMuc3R5bGUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModmFsKS5tYXAoZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgICByZXR1cm4gc3R5bGUgKyAnOicgKyB2YWxbc3R5bGVdO1xuICAgIH0pLmpvaW4oJzsnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG59O1xuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gZnVuY3Rpb24gYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKGtleSA9PT0gJ3N0eWxlJykge1xuICAgIHZhbCA9IGV4cG9ydHMuc3R5bGUodmFsKTtcbiAgfVxuICBpZiAoJ2Jvb2xlYW4nID09IHR5cGVvZiB2YWwgfHwgbnVsbCA9PSB2YWwpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICByZXR1cm4gJyAnICsgKHRlcnNlID8ga2V5IDoga2V5ICsgJz1cIicgKyBrZXkgKyAnXCInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSBlbHNlIGlmICgwID09IGtleS5pbmRleE9mKCdkYXRhJykgJiYgJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkge1xuICAgIGlmIChKU09OLnN0cmluZ2lmeSh2YWwpLmluZGV4T2YoJyYnKSAhPT0gLTEpIHtcbiAgICAgIGNvbnNvbGUud2FybignU2luY2UgSmFkZSAyLjAuMCwgYW1wZXJzYW5kcyAoYCZgKSBpbiBkYXRhIGF0dHJpYnV0ZXMgJyArXG4gICAgICAgICAgICAgICAgICAgJ3dpbGwgYmUgZXNjYXBlZCB0byBgJmFtcDtgJyk7XG4gICAgfTtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIGVsaW1pbmF0ZSB0aGUgZG91YmxlIHF1b3RlcyBhcm91bmQgZGF0ZXMgaW4gJyArXG4gICAgICAgICAgICAgICAgICAgJ0lTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyBcIj0nXCIgKyBKU09OLnN0cmluZ2lmeSh2YWwpLnJlcGxhY2UoLycvZywgJyZhcG9zOycpICsgXCInXCI7XG4gIH0gZWxzZSBpZiAoZXNjYXBlZCkge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIGV4cG9ydHMuZXNjYXBlKHZhbCkgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgc3RyaW5naWZ5IGRhdGVzIGluIElTTyBmb3JtIGFmdGVyIDIuMC4wJyk7XG4gICAgfVxuICAgIHJldHVybiAnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIic7XG4gIH1cbn07XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGVzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gZXNjYXBlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHJzID0gZnVuY3Rpb24gYXR0cnMob2JqLCB0ZXJzZSl7XG4gIHZhciBidWYgPSBbXTtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXVxuICAgICAgICAsIHZhbCA9IG9ialtrZXldO1xuXG4gICAgICBpZiAoJ2NsYXNzJyA9PSBrZXkpIHtcbiAgICAgICAgaWYgKHZhbCA9IGpvaW5DbGFzc2VzKHZhbCkpIHtcbiAgICAgICAgICBidWYucHVzaCgnICcgKyBrZXkgKyAnPVwiJyArIHZhbCArICdcIicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidWYucHVzaChleHBvcnRzLmF0dHIoa2V5LCB2YWwsIGZhbHNlLCB0ZXJzZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYuam9pbignJyk7XG59O1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgZ2l2ZW4gc3RyaW5nIG9mIGBodG1sYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lc2NhcGUgPSBmdW5jdGlvbiBlc2NhcGUoaHRtbCl7XG4gIHZhciByZXN1bHQgPSBTdHJpbmcoaHRtbClcbiAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxuICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKTtcbiAgaWYgKHJlc3VsdCA9PT0gJycgKyBodG1sKSByZXR1cm4gaHRtbDtcbiAgZWxzZSByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZS10aHJvdyB0aGUgZ2l2ZW4gYGVycmAgaW4gY29udGV4dCB0byB0aGVcbiAqIHRoZSBqYWRlIGluIGBmaWxlbmFtZWAgYXQgdGhlIGdpdmVuIGBsaW5lbm9gLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtTdHJpbmd9IGZpbGVuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbGluZW5vXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJldGhyb3cgPSBmdW5jdGlvbiByZXRocm93KGVyciwgZmlsZW5hbWUsIGxpbmVubywgc3RyKXtcbiAgaWYgKCEoZXJyIGluc3RhbmNlb2YgRXJyb3IpKSB0aHJvdyBlcnI7XG4gIGlmICgodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyB8fCAhZmlsZW5hbWUpICYmICFzdHIpIHtcbiAgICBlcnIubWVzc2FnZSArPSAnIG9uIGxpbmUgJyArIGxpbmVubztcbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgdHJ5IHtcbiAgICBzdHIgPSBzdHIgfHwgcmVxdWlyZSgnZnMnKS5yZWFkRmlsZVN5bmMoZmlsZW5hbWUsICd1dGY4JylcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXRocm93KGVyciwgbnVsbCwgbGluZW5vKVxuICB9XG4gIHZhciBjb250ZXh0ID0gM1xuICAgICwgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpXG4gICAgLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIGNvbnRleHQsIDApXG4gICAgLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIGNvbnRleHQpO1xuXG4gIC8vIEVycm9yIGNvbnRleHRcbiAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSl7XG4gICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyAnICA+ICcgOiAnICAgICcpXG4gICAgICArIGN1cnJcbiAgICAgICsgJ3wgJ1xuICAgICAgKyBsaW5lO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICAvLyBBbHRlciBleGNlcHRpb24gbWVzc2FnZVxuICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCAnSmFkZScpICsgJzonICsgbGluZW5vXG4gICAgKyAnXFxuJyArIGNvbnRleHQgKyAnXFxuXFxuJyArIGVyci5tZXNzYWdlO1xuICB0aHJvdyBlcnI7XG59O1xuXG5leHBvcnRzLkRlYnVnSXRlbSA9IGZ1bmN0aW9uIERlYnVnSXRlbShsaW5lbm8sIGZpbGVuYW1lKSB7XG4gIHRoaXMubGluZW5vID0gbGluZW5vO1xuICB0aGlzLmZpbGVuYW1lID0gZmlsZW5hbWU7XG59XG5cbn0se1wiZnNcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbn0se31dfSx7fSxbMV0pKDEpXG59KTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgY29tcGlsZTogZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICBlbGVtZW50WzBdLmNsYXNzTGlzdC5hZGQoJ2ljb24taGVhZGVyJyk7XHJcbiAgICAgIHZhciBjaGlsZHJlbiA9IGVsZW1lbnRbMF0uY2hpbGRyZW47XHJcbiAgICAgIGNoaWxkcmVuWzBdLmNsYXNzTGlzdC5hZGQoJ2ljb24taGVhZGVyLWljb24nKTtcclxuICAgICAgY2hpbGRyZW5bMV0uY2xhc3NMaXN0LmFkZCgnaWNvbi1oZWFkZXItdGl0bGUnKTtcclxuICAgIH1cclxuICB9O1xyXG59O1xyXG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8c3ZnIGNsYXNzPVxcXCJpY29uXFxcIj48dXNlIHhsaW5rOmhyZWY9XFxcInt7IDo6aWNvbklkIH19XFxcIj48L3VzZT48L3N2Zz5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICByZXR1cm4ge1xyXG4gICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgIHJlcGxhY2U6IHRydWUsXHJcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9pY29uLXRlbXBsYXRlLmphZGUnKSxcclxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG4gICAgICBzY29wZS5pY29uSWQgPSBhdHRycy5pY29uSWQ7XHJcbiAgICB9XHJcbiAgfTtcclxufTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICByZXR1cm4ge1xyXG4gICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG4gICAgICB2YXIgc3R5bGUgPSBhdHRycy5saXN0U3R5bGU7XHJcbiAgICAgIGVsZW1lbnRbMF0uY2xhc3NMaXN0LmFkZChzdHlsZSArICctbGlzdCcpO1xyXG4gICAgICBzY29wZS4kd2F0Y2hDb2xsZWN0aW9uKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50LmNoaWxkcmVuKCk7XHJcbiAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIF8uZm9yRWFjaChlbGVtZW50WzBdLmNoaWxkcmVuLCBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoc3R5bGUgKyAnLWxpc3QtaXRlbScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFtmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIHZtID0gdGhpcztcclxufV07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGRpdj48c3VidGl0bGUtaGVhZGVyPjxoMj57eyA6OnZtLmRhdGEudGl0bGUgfX08L2gyPjxzdHJvbmcgbmctaWY9XFxcIjo6dm0uZGF0YS5sb2NhdGlvbk5hbWVcXFwiPnt7IDo6dm0uZGF0YS5sb2NhdGlvbk5hbWUgfX0gLSB7eyA6OnZtLmRhdGEubG9jYXRpb25BZGRyZXNzIH19PC9zdHJvbmc+PC9zdWJ0aXRsZS1oZWFkZXI+PHA+PHN0cm9uZyBuZy1pZj1cXFwiOjp2bS5kYXRhLnN0YXJ0RGF0ZVxcXCI+e3sgOjp2bS5kYXRhLnN0YXJ0RGF0ZSB8IGRhdGU6ICdNTU0geXl5eScgfX0gLSB7eyA6OnZtLmRhdGEuZW5kRGF0ZSB8IGRhdGU6ICdNTU0geXl5eScgfX08L3N0cm9uZz57eyA6OnZtLmRhdGEuc3VtbWFyeSB9fSAmbmJzcDs8YSBocmVmPVxcXCJ7eyA6OnZtLmRhdGEubGluayB9fVxcXCIgbmctaWY9XFxcIjo6dm0uZGF0YS5saW5rXFxcIj57eyA6OnZtLmRhdGEubGluayB9fTwvYT48L3A+PHVsIG5nLWlmPVxcXCI6OnZtLmRhdGEuYWNjb21wbGlzaG1lbnRzXFxcIiBjbGFzcz1cXFwicHJvamVjdC1saXN0XFxcIj48bGkgbmctcmVwZWF0PVxcXCJhY2NvbXBsaXNobWVudCBpbiA6OnZtLmRhdGEuYWNjb21wbGlzaG1lbnRzXFxcIiBjbGFzcz1cXFwicHJvamVjdC1saXN0LWl0ZW1cXFwiPnt7IDo6YWNjb21wbGlzaG1lbnQgfX08L2xpPjwvdWw+PC9kaXY+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICBzY29wZToge1xyXG4gICAgICBkYXRhOiAnPSdcclxuICAgIH0sXHJcbiAgICByZXBsYWNlOiB0cnVlLFxyXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vcHJvamVjdC10ZW1wbGF0ZS5qYWRlJyksXHJcbiAgICBjb250cm9sbGVyOiByZXF1aXJlKCcuL3Byb2plY3QtY29udHJvbGxlcicpLFxyXG4gICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZVxyXG4gIH07XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICBjb21waWxlOiBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgIGVsZW1lbnRbMF0uY2xhc3NMaXN0LmFkZCgnc3VidGl0bGUtaGVhZGVyJyk7XHJcbiAgICAgIHZhciBjaGlsZHJlbiA9IGVsZW1lbnRbMF0uY2hpbGRyZW47XHJcbiAgICAgIGNoaWxkcmVuWzBdLmNsYXNzTGlzdC5hZGQoJ3N1YnRpdGxlLWhlYWRlci10aXRsZScpO1xyXG4gICAgfVxyXG4gIH07XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gWydQcm9maWxlJywgZnVuY3Rpb24gKFByb2ZpbGUpIHtcclxuICB2YXIgcGFnZSA9IHRoaXM7XHJcblxyXG4gIHBhZ2UudXNlciA9IFByb2ZpbGU7XHJcbn1dO1xyXG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8aGVhZGVyPjxzZWN0aW9uPjxoMT57eyA6OnBhZ2UudXNlci5uYW1lIH19PC9oMT48aDI+e3sgOjpwYWdlLnVzZXIudGl0bGUgfX08L2gyPjwvc2VjdGlvbj48c2VjdGlvbj48aDI+RXhwZXJ0aXNlPC9oMj48aWNvbiBpY29uLWlkPVxcXCIjY2hlY2tcXFwiPjwvaWNvbj48dWwgbGlzdC1zdHlsZT1cXFwiY2VudGVyZWRcXFwiPjxsaSBuZy1yZXBlYXQ9XFxcImV4cGVydGlzZSBpbiA6OnBhZ2UudXNlci5leHBlcnRpc2VcXFwiPnt7IDo6ZXhwZXJ0aXNlIH19PC9saT48L3VsPjwvc2VjdGlvbj48c2VjdGlvbj48aDI+VGVjaCBTa2lsbCBTZXQ8L2gyPjxpY29uIGljb24taWQ9XFxcIiNtYXJrdXBcXFwiPjwvaWNvbj48dWwgbGlzdC1zdHlsZT1cXFwiY2VudGVyZWRcXFwiPjxsaSBuZy1yZXBlYXQ9XFxcInNraWxsIGluIDo6cGFnZS51c2VyLnNraWxsc1xcXCI+e3sgOjpza2lsbCB9fTwvbGk+PC91bD48L3NlY3Rpb24+PC9oZWFkZXI+PG1haW4+PHNlY3Rpb24gY2xhc3M9XFxcInByb2ZpbGVcXFwiPjxpY29uLWhlYWRlcj48aWNvbiBpY29uLWlkPVxcXCIjcHJvZmlsZVxcXCI+PC9pY29uPjxoMj5Qcm9maWxlPC9oMj48L2ljb24taGVhZGVyPjxwPnt7IDo6cGFnZS51c2VyLnByb2ZpbGUgfX08L3A+PC9zZWN0aW9uPjxzZWN0aW9uIGNsYXNzPVxcXCJleHBlcmllbmNlXFxcIj48aWNvbi1oZWFkZXI+PGljb24gaWNvbi1pZD1cXFwiI2JyaWVmY2FzZVxcXCI+PC9pY29uPjxoMj5FeHBlcmllbmNlPC9oMj48L2ljb24taGVhZGVyPjx1bCBsaXN0LXN0eWxlPVxcXCJvZmZzZXRcXFwiPjxsaSBuZy1yZXBlYXQ9XFxcImpvYiBpbiA6OnBhZ2UudXNlci5qb2JzXFxcIj48cHJvamVjdCBkYXRhPVxcXCJqb2JcXFwiPjwvcHJvamVjdD48L2xpPjwvdWw+PGljb24taGVhZGVyPjxpY29uIGljb24taWQ9XFxcIiNmb3JrXFxcIj48L2ljb24+PGgyPlByb2plY3RzPC9oMj48L2ljb24taGVhZGVyPjx1bCBsaXN0LXN0eWxlPVxcXCJvZmZzZXRcXFwiPjxsaSBuZy1yZXBlYXQ9XFxcInByb2plY3QgaW4gOjpwYWdlLnVzZXIucHJvamVjdHNcXFwiPjxwcm9qZWN0IGRhdGE9XFxcInByb2plY3RcXFwiPjwvcHJvamVjdD48L2xpPjwvdWw+PGljb24taGVhZGVyPjxpY29uIGljb24taWQ9XFxcIiNwZW5jaWxcXFwiPjwvaWNvbj48aDI+RWR1Y2F0aW9uPC9oMj48L2ljb24taGVhZGVyPjx1bCBsaXN0LXN0eWxlPVxcXCJvZmZzZXRcXFwiPjxsaT48aDI+e3sgOjpwYWdlLnVzZXIuZWR1Y2F0aW9uLmRlZ3JlZSB9fTwvaDI+PHA+PHN0cm9uZz57eyA6OnBhZ2UudXNlci5lZHVjYXRpb24uZGF0ZSB8IGRhdGU6ICdNTU0geXl5eScgfX08L3N0cm9uZz48c3Bhbj57eyA6OnBhZ2UudXNlci5lZHVjYXRpb24uY29sbGVnZSB9fTwvc3Bhbj48L3A+PC9saT48L3VsPjwvc2VjdGlvbj48Zm9vdGVyPjxpY29uIGljb24taWQ9XFxcIiNjb250YWN0XFxcIiBjbGFzcz1cXFwiY29udGFjdC1ib3gtaWNvblxcXCI+PC9pY29uPjxkaXYgY2xhc3M9XFxcImNvbnRhY3QtYm94XFxcIj48ZGl2IGNsYXNzPVxcXCJjb250YWN0LWJveC1pbmZvXFxcIj48c3Ryb25nPnt7IDo6cGFnZS51c2VyLmFkZHJlc3MgfX0sIHt7IDo6cGFnZS51c2VyLnppcGNvZGUgfX08L3N0cm9uZz48YSBocmVmPVxcXCJtYWlsdG86e3sgOjpwYWdlLnVzZXIuZW1haWwgfX1cXFwiPjxzdHJvbmc+e3sgOjpwYWdlLnVzZXIuZW1haWwgfX08L3N0cm9uZz48L2E+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29udGFjdC1ib3gtaW5mb1xcXCI+PHN0cm9uZz57eyA6OnBhZ2UudXNlci5waG9uZSB9fTwvc3Ryb25nPjxhIGhyZWY9XFxcInt7IDo6cGFnZS51c2VyLmxpbmsgfX1cXFwiPjxzdHJvbmc+e3sgOjpwYWdlLnVzZXIubGluayB9fTwvc3Ryb25nPjwvYT48L2Rpdj48L2Rpdj48L2Zvb3Rlcj48L21haW4+PGEgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tL3RocmVlaGFtcy90aHJlZWhhbXMuZ2l0aHViLmlvL3RyZWUvbWFzdGVyL3NyY1xcXCIgY2xhc3M9XFxcInZpZXctc291cmNlXFxcIj5WaWV3IFNvdXJjZTwvYT5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgbmFtZTogJ0RhdmlkIEVkbW9uZHNvbicsXHJcbiAgdGl0bGU6ICdXZWIgRGV2ZWxvcGVyJyxcclxuICBhZGRyZXNzOiAnNDYwNyBXaWxsaXMgQXZlIEFwdC4gMTQnLFxyXG4gIGNpdHk6ICdTaGVybWFuIE9ha3MnLFxyXG4gIHN0YXRlOiAnQ0EnLFxyXG4gIHppcGNvZGU6IDkxNDAzLFxyXG4gIGVtYWlsOiAnZGF2aWRhZWRtb25kc29uQGdtYWlsLmNvbScsXHJcbiAgcGhvbmU6ICc4MTguODA0LjcyNTUnLFxyXG4gIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vdGhyZWVoYW1zJyxcclxuICBwcm9maWxlOiAnRnVsbC1zdGFjayBkZXZlbG9wZXIgd2l0aCBiYWNrZ3JvdW5kIGluIHN5c3RlbXMgYWRtaW5pc3RyYXRpb24sIGNvbnRlbnQgbWFuYWdlbWVudCwgYW5kIGF1dG9tYXRlZCB0ZXN0aW5nLCB3aXRoIDQgeWVhcnMgb2YgZXhwZXJpZW5jZSBpbiBzb2Z0d2FyZSBkZXZlbG9wbWVudCBhbmQgdGVzdCBlbmdpbmVlcmluZy4nLFxyXG4gIGVkdWNhdGlvbjoge1xyXG4gICAgZGVncmVlOiAnQmFjaGVsb3Igb2YgRmluZSBBcnRzIC0gRmlsbSBhbmQgQW5pbWF0aW9uJyxcclxuICAgIGNvbGxlZ2U6ICdSb2NoZXN0ZXIgSW5zdGl0dXRlIG9mIFRlY2hub2xvZ3knLFxyXG4gICAgZGF0ZTogbmV3IERhdGUoMjAwNSwgNClcclxuICB9LFxyXG4gIGpvYnM6IFtcclxuICAgIHtcclxuICAgICAgdGl0bGU6ICdTb2Z0d2FyZSBFbmdpbmVlcicsXHJcbiAgICAgIHN0YXJ0RGF0ZTogbmV3IERhdGUoMjAxMiwgNiksXHJcbiAgICAgIGVuZERhdGU6IG5ldyBEYXRlKDIwMTUsIDIpLFxyXG4gICAgICBsb2NhdGlvbk5hbWU6ICdTd2VldHkgSGlnaCcsXHJcbiAgICAgIGxvY2F0aW9uQWRkcmVzczogJ01hcmluYSBEZWwgUmV5LCBDQScsXHJcbiAgICAgIHN1bW1hcnk6ICdGdWxsLXN0YWNrIGRldmVsb3BlciBmb3IgYSBzb2NpYWwgbmV0d29ya2luZyBzaXRlIGFuZCBtb2JpbGUgYXBwIEFQSSwgdXNpbmcgUmFpbHMsIE5vZGUuanMsIGpRdWVyeSwgYW5kIEFuZ3VsYXIuIFByb21vdGVkIGZyb20gUUEgRW5naW5lZXIgdG8gU29mdHdhcmUgRW5naW5lZXIgd2l0aGluIGZpcnN0IHllYXIuJyxcclxuICAgICAgYWNjb21wbGlzaG1lbnRzOiBbXHJcbiAgICAgICAgJ0J1aWx0IGEgY29udGVudCBtYW5hZ2VtZW50IHN5c3RlbSB3aXRoIFJhaWxzIHRvIG9yZ2FuaXplIGFsbCBwaG90b3MgYW5kIHZpZGVvcywgY29udGVzdHMsIGFuZCBjdXJhdGVkIGNvbW11bml0eSBwaG90by92aWRlbyBwbGF5bGlzdHMuJyxcclxuICAgICAgICAnRGV2ZWxvcGVkIGEgY29tbXVuaXR5IG1vZGVyYXRpb24gc3lzdGVtIHdpdGggUmFpbHMgZm9yIGFwcHJvdmFsIGFuZCByZWplY3Rpb24gb2YgdXNlciBwb3N0ZWQgdGV4dCwgcGhvdG9zLCBhbmQgdmlkZW9zLicsXHJcbiAgICAgICAgJ0J1aWx0IGEgUnVieSBvbiBSYWlscyBzZXJ2aWNlIHRoYXQgbWFuYWdlZCBhbGwgd2Vic2l0ZSBhbmQgbW9iaWxlIHVzZXIgYXV0aGVudGljYXRpb24sIGF1dGhvcml6YXRpb24sIGFjY291bnQsIHJlbGF0aW9uc2hpcCwgYW5kIGFnZSB2ZXJpZmljYXRpb24uJyxcclxuICAgICAgICAnV3JvdGUgYSBmdWxsIHN1aXRlIG9mIGxvYWQgdGVzdHMsIGlkZW50aWZpZWQsIHJlbW92ZWQsIG9yIG9wdGltaXplZCBzbG93IHF1ZXJpZXMsIGFuZCBpbmNyZWFzZWQgdGhlIG51bWJlciBvZiBwb3NzaWJsZSByZXF1ZXN0cyBwZXIgc2Vjb25kIGJ5IDQwMCUuJyxcclxuICAgICAgICAnV3JvdGUgdGhlIGJhY2tlbmQgQVBJIGZvciB0aGUgdmlkZW8gY3JlYXRpb24sIG9yZ2FuaXphdGlvbiwgYW5kIHNoYXJpbmcgc2VjdGlvbiBvZiB0aGUgc2l0ZS4nLFxyXG4gICAgICAgICdJbnRlZ3JhdGVkIGEgTm9kZS5qcyBBUEkgd2l0aCBhIHRoaXJkLXBhcnR5IG1vZGVyYXRpb24gc3lzdGVtIHVzaW5nIGEgcmVsaWFibGUgbWVzc2FnZSBxdWV1ZS4nXHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRpdGxlOiAnUUEgRW5naW5lZXInLFxyXG4gICAgICBzdGFydERhdGU6IG5ldyBEYXRlKDIwMTAsIDcpLFxyXG4gICAgICBlbmREYXRlOiBuZXcgRGF0ZSgyMDExLCAxMSksXHJcbiAgICAgIGxvY2F0aW9uTmFtZTogJ01ldGVvciBHYW1lcycsXHJcbiAgICAgIGxvY2F0aW9uQWRkcmVzczogJ0JldmVybHkgSGlsbHMsIENBJyxcclxuICAgICAgc3VtbWFyeTogJ0RldmVsb3BlZCBwaXBlbGluZSBhbmQgdGVzdGluZyB0b29scyBhbmQgcGVyZm9ybWVkIGF1dG9tYXRlZCB0ZXN0aW5nIG9uIGZvdXIgRmFjZWJvb2sgZ2FtZXMuIFByb21vdGVkIGZyb20gUUEgVGVzdGVyIHRvIFFBIEVuZ2luZWVyIHdpdGhpbiBmaXJzdCB5ZWFyLicsXHJcbiAgICAgIGFjY29tcGxpc2htZW50czogW1xyXG4gICAgICAgICdBbmFseXplZCB3b3JrZmxvd3MgZm9yIDIwIHN0YWZmIHRvIGlkZW50aWZ5IHNvdXJjZXMgb2YgaW5lZmZpY2llbmN5LCBwcmlvcml0aXplIHRhc2tzLCBhbmQgZGV2ZWxvcCBjb250ZW50IG1hbmFnZW1lbnQgYW5kIGRlYnVnZ2luZyB0b29scywgc2F2aW5nIDRLIG1hbiBob3VycyBhbmQgJDE1MEsgYW5udWFsbHkuJyxcclxuICAgICAgICAnQ3JlYXRlZCBhIHNldCBvZiBzY3JpcHRzIHRvIHNpbXBsaWZ5IGFuZCB2YWxpZGF0ZSBkYXRhYmFzZSBlbnRyeSB3aXRoIFB5dGhvbiBhbmQgU2VsZW5pdW0sIHdoaWNoIHJlZHVjZWQgcmVsYXRlZCBidWdzIGJ5IG92ZXIgOTAlLCBhbmQgcXVhZHJ1cGxlZCBkZXBhcnRtZW50IHByb2R1Y3Rpb24uJyxcclxuICAgICAgICAnQXV0b21hdGVkIHRpY2tldCB2YWxpZGF0aW9uIGFuZCBwb3B1bGF0aW9uIHdpdGggUHl0aG9uLCByZWR1Y2luZyB3ZWVrbHkgcHJvY2VzcyB0aW1lIGJ5IDE0IGhvdXJzLicsXHJcbiAgICAgICAgJ0J1aWx0IGFydCB2ZXJpZmljYXRpb24gdG9vbHMgdG8gZWxpbWluYXRlIHRlY2huaWNhbCBhcnQgaXNzdWVzLCBpbmNsdWRpbmcgYSBVSSB1c2VkIGJ5IGVpZ2h0IGFydGlzdHMgYW5kIHNpeCB0ZXN0ZXJzIHRoYXQgYWxsb3dlZCB0aGUgUUEgRGVwYXJ0bWVudCB0byB0ZXN0IGFydCB3ZWVrcyBpbiBhZHZhbmNlIG9mIGluLWdhbWUgYXBwZWFyYW5jZS4nLFxyXG4gICAgICAgICdUYXVnaHQgd2Vla2x5IGNsYXNzZXMgdG8gc2V2ZW4gdGVzdGVycyBvbiBKU09OLCBzcGVjaWZpYyBnYW1lIGRhdGEgZm9ybWF0cywga2V5Ym9hcmQgc2hvcnRjdXRzLCBhbmQgZWZmaWNpZW5jeS4nXHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdLFxyXG4gIHByb2plY3RzOiBbXHJcbiAgICB7XHJcbiAgICAgIHRpdGxlOiAnS29hbmd1bHBpdGVzdGlmeScsXHJcbiAgICAgIHN1bW1hcnk6ICdGdWxsLXN0YWNrIEpTIGJvaWxlcnBsYXRlIHByb2plY3QsIHVzZWQgYXMgYSBiYXNlIGZvciBvdGhlciBwcm9qZWN0cy4gSW5jbHVkZXMgS29hIGJhY2tlbmQgYW5kIEFuZ3VsYXIgY29tcG9uZW50LWJhc2VkIGZyb250ZW5kLCBhbmQgaXMgZW50aXJlbHkgYnVpbHQgb24gcHJvbWlzZXMuIFNhdmluZyBhIGZpbGUgc2VsZWN0aXZlbHkgdHJpZ2dlcnMgYXNzZXQgY29tcGlsYXRpb24sIGZyb250ZW5kL2JhY2tlbmQgdGVzdCBydW5uZXJzLCBzZXJ2ZXIgcmVzdGFydCwgYW5kIGJyb3dzZXIgcmVsb2FkIGFzIG5lZWRlZC4nLFxyXG4gICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3RocmVlaGFtcy9rb2FuZ3VscGl0ZXN0aWZ5J1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGl0bGU6ICdEZWF0aCBXaGltc3kgUm9hZG1hcCcsXHJcbiAgICAgIHN1bW1hcnk6ICdQdWJsaWMgc2l0ZSB0byBzaG93IGRldmVsb3BtZW50IHByb2dyZXNzIG9mIGEgZ2FtZSBkZXZlbG9wZWQgYnkgU3F1aWQgQmxpbmsgR2FtZXMuIFdyaXR0ZW4gaW4gQW5ndWxhciBhbmQgS29hLCB3aXRoIEZsZXhib3ggYW5kIEhUTUw1IENhbnZhcy4gUHVsbHMgaW5mb3JtYXRpb24gZnJvbSB0aGUgSmlyYSBBUEkgYW5kIHJlY2VpdmVzIHJlYWx0aW1lIHVwZGF0ZXMgdXNpbmcgSmlyYSB3ZWJob29rcy4nLFxyXG4gICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3RocmVlaGFtcy9kZWF0aC13aGltc3ktcm9hZG1hcCdcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRpdGxlOiAnR2FtZSBQcm90b3R5cGVzJyxcclxuICAgICAgc3VtbWFyeTogJ0ZvdXIgZ2FtZSBwcm90b3R5cGVzIHVzaW5nIHRoZSBQaGFzZXIgZ2FtZSBlbmdpbmUuIERvbmUgdG8gZXhwbG9yZSB0aGUgZGVzaWduIGNvbXBsZXhpdHkgb2YgZ2FtZXMsIGFuZCBwZXJmb3JtYW5jZSBkaWZmaWN1bHRpZXMgaW4gbWFpbnRhaW5pbmcgNjAgZnJhbWVzIHBlciBzZWNvbmQuJyxcclxuICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS90aHJlZWhhbXMvcGhhc2VyLWdhbWUtcHJvdG90eXBlcydcclxuICAgIH1cclxuICBdLFxyXG4gIGV4cGVydGlzZTogW1xyXG4gICAgJ0FuZ3VsYXJKUycsXHJcbiAgICAnTm9kZS5qcyAvIEhhcGknLFxyXG4gICAgJ1J1Ynkgb24gUmFpbHMnLFxyXG4gICAgJ1Rlc3QtRHJpdmVuIERldmVsb3BtZW50J1xyXG4gIF0sXHJcbiAgc2tpbGxzOiBbXHJcbiAgICAnQW5ndWxhckpTJyxcclxuICAgICdIVE1ML0NTUycsXHJcbiAgICAnUGhvdG9zaG9wL0lsbHVzdHJhdG9yJyxcclxuICAgICdQb3NncmVTUUwnLFxyXG4gICAgJ0Nhc3NhbmRyYScsXHJcbiAgICAnUnVieSBvbiBSYWlscydcclxuICBdXHJcbn07XHJcbiJdfQ==
