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

},{"./components/icon/icon":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\icon\\icon.js","./components/icon/icon-controller.js":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\icon\\icon-controller.js","./pages/page/page-controller.js":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\pages\\page\\page-controller.js","./pages/page/page-template.jade":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\pages\\page\\page-template.jade","./services/profile":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\services\\profile.js","angular":"angular","angular-animate":"angular-animate","angular-route":"angular-route","lodash":"lodash"}],"C:\\Users\\threehams\\workspace\\threehams\\node_modules\\browserify\\node_modules\\browser-resolve\\empty.js":[function(require,module,exports){

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
      iconId: '='
    },
    replace: true,
    template: require('./icon-template.jade'),
    controller: require('./icon-controller'),
    controllerAs: 'vm',
    bindToController: true
  };
};

},{"./icon-controller":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\icon\\icon-controller.js","./icon-template.jade":"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\components\\icon\\icon-template.jade"}],"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\pages\\page\\page-controller.js":[function(require,module,exports){
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

buf.push("<header><section><h1 class=\"header-full-name\">{{ page.user.name }}</h1><h2 class=\"header-job-title\">{{ page.user.title }}</h2></section><section><h2 class=\"header-cenetered\">Expertise</h2><icon icon-id=\"'#check'\"></icon><ul class=\"centered-list\"><li ng-repeat=\"expertise in page.user.expertise\" class=\"centered-list-item\">{{ expertise }}</li></ul></section><section><h2>Tech Skill Set</h2><icon icon-id=\"'#markup'\"></icon><ul class=\"centered-list\"><li ng-repeat=\"skill in page.user.skills\" class=\"centered-list-item\">{{ skill }}</li></ul></section></header><main><section class=\"profile\"><h2 class=\"icon-header\"><icon icon-id=\"'#profile'\" class=\"icon-header-icon\"></icon><span>Profile</span></h2><p>{{ page.user.profile }}</p></section><section class=\"experience\"><h2 class=\"icon-header\"><icon icon-id=\"'#briefcase'\" class=\"icon-header-icon\"></icon>Experience</h2><ul class=\"offset-list\"><li ng-repeat=\"job in page.user.jobs\" class=\"offset-list-item\"><div class=\"subtitle-header\"><h2 class=\"subtitle-header-title\">{{ job.title }}</h2><strong>{{ job.company }} - {{ job.companyLocation }}</strong></div><p><strong>{{ job.startDate | date: 'MMM yyyy' }} - {{ job.endDate | date: 'MMM yyyy' }}</strong>{{ job.summary }}</p><ul><li ng-repeat=\"accomplishment in job.accomplishments\">{{ accomplishment }}</li></ul></li></ul><h2 class=\"icon-header\"><icon icon-id=\"'#fork'\" class=\"icon-header-icon\"></icon>Projects</h2><ul class=\"offset-list\"><li ng-repeat=\"project in page.user.projects\" class=\"offset-list-item\"><h2>{{ project.name }}</h2><p>{{ project.summary }} &nbsp;<a href=\"{{ project.link }}\">{{ project.link }}</a></p></li></ul><h2 class=\"icon-header\"><icon icon-id=\"'#pencil'\" class=\"icon-header-icon\"></icon>Education</h2><ul class=\"offset-list\"><li class=\"offset-list-item\"><h2>{{ page.user.education.degree }}</h2><p><strong>{{ page.user.education.date | date: 'MMM yyyy' }}</strong><span>{{ page.user.education.college }}</span></p></li></ul></section><footer><icon icon-id=\"'#contact'\" class=\"contact-box-icon\"></icon><div class=\"contact-box\"><div class=\"contact-box-info\"><strong>{{ page.user.address }}, {{ page.user.zipcode }}</strong><a href=\"mailto:{{ page.user.email }}\"><strong>{{ page.user.email }}</strong></a></div><div class=\"contact-box-info\"><strong>{{ page.user.phone }}</strong><a href=\"{{ page.user.link }}\"><strong>{{ page.user.link }}</strong></a></div></div></footer></main>");;return buf.join("");
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
  profile: 'Full-stack developer with 4 years of experience in software development and QA engineering, specializing in automated testing and web development.',
  education: {
    degree: 'Bachelor of Fine Arts - Film and Animation',
    college: 'Rochester Institute of Technology',
    date: new Date(2005, 6)
  },
  jobs: [
    {
      title: 'Software Engineer',
      startDate: new Date(2012, 6),
      endDate: new Date(2015, 3),
      company: 'Sweety High',
      companyLocation: 'Marina Del Rey, CA',
      summary: 'Full-stack developer for a social networking site and mobile app API, using Rails, Node.js, jQuery, and Angular. Promoted from QA Engineer to Software Engineer within first year.',
      accomplishments: [
        'Built a content management system with Rails to organize all photos and videos, contests, and curated community photo/video playlists.',
        'Developed a community moderation system with Rails for approval and rejection of user posted text, photos, and videos.',
        'Built a Ruby on Rails service that managed all website and mobile user authentication, authorization, account, relationship, and age verification',
        'Wrote a full suite of load tests, identified, removed, or optimized slow queries, and increased the number of possible requests per second by 400%.',
        'Wrote the backend API for the video creation, organization, and sharing section of the site.',
        'Integrated a Node.js API with a third-party moderation system using a reliable message queue.'
      ]
    },
    {
      title: 'QA Engineer',
      startDate: new Date(2010, 8),
      endDate: new Date(2011, 12),
      company: 'Meteor Games',
      companyLocation: 'Beverly Hills, CA',
      summary: 'Developed pipeline and testing tools and performed automated testing on four Facebook games. Promoted from QA Tester to QA Engineer within first year.',
      accomplishments: [
        'Analyzed content and test workflows for 20 staff to identify sources of inefficiency, prioritize tasks, and develop content management and debugging tools, saving 4K man hours and $150K annually.',
        'Created a set of scripts to simplify and validate database entry with Python and Selenium, which reduced related bugs by over 90%, and quadrupled department production.',
        'Automated ticket validation and population processes with Python, reducing weekly process time by 14 hours.',
        'Built art verification tools to eliminate technical art issues, including a UI used by eight artists and six testers that allowed the QA Department to test art weeks in advance of in-game appearance.',
        'Taught weekly classes to seven testers on JSON, specific game data formats, keyboard shortcuts, and efficiency.'
      ]
    }
  ],
  projects: [
    {
      name: 'Koangulpitestify',
      summary: 'Full-stack JS boilerplate project, used as a base for other projects. Includes Koa backend and Angular component-based frontend, and is entirely built on promises. Saving a file selectively triggers asset compilation, frontend/backend test runners, server restart, and browser reload as needed.',
      link: 'https://github.com/threehams/koangulpitestify'
    },
    {
      name: 'Death Whimsy Roadmap',
      summary: 'Public site to show development progress of a game developed by Squid Blink Games. Written in Angular and Koa, with Flexbox and HTML5 Canvas. Pulls information from the Jira API and receives realtime updates using Jira webhooks.',
      link: 'https://github.com/threehams/death-whimsy-roadmap'
    },
    {
      name: 'Game Prototypes',
      summary: 'Four game prototypes using the Phaser game engine, made in 1-2 days each. Done to explore the design complexity of games, and performance difficulties in maintaining 60 frames per second.',
      link: 'https://github.com/threehams/phaser-game-prototypes'
    }
  ],
  expertise: [
    'Javascript',
    'AngularJS',
    'Node.js',
    'Ruby on Rails',
    'Automated Testing'
  ],
  skills: [
    'Ruby on Rails',
    'AngularJS',
    'HTML/CSS',
    'Node.js'
  ]
};

},{}]},{},["./src/js/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXJlc29sdmUvZW1wdHkuanMiLCJub2RlX21vZHVsZXMvamFkZS9ydW50aW1lLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvaWNvbi9pY29uLWNvbnRyb2xsZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9pY29uL2ljb24tdGVtcGxhdGUuamFkZSIsInNyYy9qcy9jb21wb25lbnRzL2ljb24vaWNvbi5qcyIsInNyYy9qcy9wYWdlcy9wYWdlL3BhZ2UtY29udHJvbGxlci5qcyIsInNyYy9qcy9wYWdlcy9wYWdlL3BhZ2UtdGVtcGxhdGUuamFkZSIsInNyYy9qcy9zZXJ2aWNlcy9wcm9maWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN0NBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnJlcXVpcmUoJ2FuZ3VsYXInKTtcclxucmVxdWlyZSgnYW5ndWxhci1yb3V0ZScpO1xyXG5yZXF1aXJlKCdhbmd1bGFyLWFuaW1hdGUnKTtcclxuZ2xvYmFsLl8gPSByZXF1aXJlKCdsb2Rhc2gnKTtcclxuXHJcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnUmVzdW1lJywgWyduZ1JvdXRlJywgJ25nQW5pbWF0ZSddKTtcclxuXHJcbi8vIHBhZ2VzXHJcbmFwcC5jb250cm9sbGVyKCdQYWdlQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vcGFnZXMvcGFnZS9wYWdlLWNvbnRyb2xsZXIuanMnKSk7XHJcblxyXG4vLyBjb21wb25lbnRzIChjb250cm9sbGVycyBleHBvc2VkIGZvciB0ZXN0aW5nKVxyXG5hcHAuZGlyZWN0aXZlKCdpY29uJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL2ljb24vaWNvbicpKTtcclxuYXBwLmNvbnRyb2xsZXIoJ0ljb25Db250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL2ljb24vaWNvbi1jb250cm9sbGVyLmpzJykpO1xyXG5cclxuYXBwLnZhbHVlKCdQcm9maWxlJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9wcm9maWxlJykpO1xyXG5cclxuYXBwLmNvbmZpZyhbXHJcbiAgJyRsb2NhdGlvblByb3ZpZGVyJyxcclxuICAnJHJvdXRlUHJvdmlkZXInLFxyXG4gIGZ1bmN0aW9uICgkbG9jYXRpb25Qcm92aWRlciwgJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcclxuXHJcbiAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAud2hlbignLycsIHtcclxuICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9wYWdlcy9wYWdlL3BhZ2UtdGVtcGxhdGUuamFkZScpLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6ICdQYWdlQ29udHJvbGxlcicsXHJcbiAgICAgICAgY29udHJvbGxlckFzOiAncGFnZSdcclxuICAgICAgfSlcclxuICAgICAgLm90aGVyd2lzZSh7XHJcbiAgICAgICAgcmVkaXJlY3RUbzogJy8nXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXSk7XHJcblxyXG4vLyBVbmNvbW1lbnQgZm9yIGRlYnVnZ2luZ1xyXG4vL2FuZ3VsYXIubW9kdWxlKCd1dGlscycpLmZpbHRlcignaXNEZWZpbmVkJywgZnVuY3Rpb24gKCkge1xyXG4vLyAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSwgbXNnKSB7XHJcbi8vICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbi8vICAgICAgdGhyb3cgbmV3IEVycm9yKCdpc0RlZmluZWQgZmlsdGVyIGdvdCB1bmRlZmluZWQgdmFsdWUgJyArIG1zZyk7XHJcbi8vICAgIH1cclxuLy8gICAgcmV0dXJuIHZhbHVlO1xyXG4vLyAgfTtcclxuLy99KTtcclxuIixudWxsLCIoZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5qYWRlID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIGF0dHJzID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dHJzID0gbWVyZ2UoYXR0cnMsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG4gIH1cbiAgdmFyIGFjID0gYVsnY2xhc3MnXTtcbiAgdmFyIGJjID0gYlsnY2xhc3MnXTtcblxuICBpZiAoYWMgfHwgYmMpIHtcbiAgICBhYyA9IGFjIHx8IFtdO1xuICAgIGJjID0gYmMgfHwgW107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFjKSkgYWMgPSBbYWNdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShiYykpIGJjID0gW2JjXTtcbiAgICBhWydjbGFzcyddID0gYWMuY29uY2F0KGJjKS5maWx0ZXIobnVsbHMpO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoa2V5ICE9ICdjbGFzcycpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogRmlsdGVyIG51bGwgYHZhbGBzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbnVsbHModmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwgIT09ICcnO1xufVxuXG4vKipcbiAqIGpvaW4gYXJyYXkgYXMgY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmpvaW5DbGFzc2VzID0gam9pbkNsYXNzZXM7XG5mdW5jdGlvbiBqb2luQ2xhc3Nlcyh2YWwpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwubWFwKGpvaW5DbGFzc2VzKSA6XG4gICAgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JykgPyBPYmplY3Qua2V5cyh2YWwpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB2YWxba2V5XTsgfSkgOlxuICAgIFt2YWxdKS5maWx0ZXIobnVsbHMpLmpvaW4oJyAnKTtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gY2xhc3Nlc1xuICogQHBhcmFtIHtBcnJheS48Qm9vbGVhbj59IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5jbHMgPSBmdW5jdGlvbiBjbHMoY2xhc3NlcywgZXNjYXBlZCkge1xuICB2YXIgYnVmID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlc2NhcGVkICYmIGVzY2FwZWRbaV0pIHtcbiAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuZXNjYXBlKGpvaW5DbGFzc2VzKFtjbGFzc2VzW2ldXSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLnB1c2goam9pbkNsYXNzZXMoY2xhc3Nlc1tpXSkpO1xuICAgIH1cbiAgfVxuICB2YXIgdGV4dCA9IGpvaW5DbGFzc2VzKGJ1Zik7XG4gIGlmICh0ZXh0Lmxlbmd0aCkge1xuICAgIHJldHVybiAnIGNsYXNzPVwiJyArIHRleHQgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJztcbiAgfVxufTtcblxuXG5leHBvcnRzLnN0eWxlID0gZnVuY3Rpb24gKHZhbCkge1xuICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbCkubWFwKGZ1bmN0aW9uIChzdHlsZSkge1xuICAgICAgcmV0dXJuIHN0eWxlICsgJzonICsgdmFsW3N0eWxlXTtcbiAgICB9KS5qb2luKCc7Jyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxufTtcbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBlc2NhcGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRlcnNlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0ciA9IGZ1bmN0aW9uIGF0dHIoa2V5LCB2YWwsIGVzY2FwZWQsIHRlcnNlKSB7XG4gIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICB2YWwgPSBleHBvcnRzLnN0eWxlKHZhbCk7XG4gIH1cbiAgaWYgKCdib29sZWFuJyA9PSB0eXBlb2YgdmFsIHx8IG51bGwgPT0gdmFsKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgcmV0dXJuICcgJyArICh0ZXJzZSA/IGtleSA6IGtleSArICc9XCInICsga2V5ICsgJ1wiJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoMCA9PSBrZXkuaW5kZXhPZignZGF0YScpICYmICdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHtcbiAgICBpZiAoSlNPTi5zdHJpbmdpZnkodmFsKS5pbmRleE9mKCcmJykgIT09IC0xKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1NpbmNlIEphZGUgMi4wLjAsIGFtcGVyc2FuZHMgKGAmYCkgaW4gZGF0YSBhdHRyaWJ1dGVzICcgK1xuICAgICAgICAgICAgICAgICAgICd3aWxsIGJlIGVzY2FwZWQgdG8gYCZhbXA7YCcpO1xuICAgIH07XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBlbGltaW5hdGUgdGhlIGRvdWJsZSBxdW90ZXMgYXJvdW5kIGRhdGVzIGluICcgK1xuICAgICAgICAgICAgICAgICAgICdJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgXCI9J1wiICsgSlNPTi5zdHJpbmdpZnkodmFsKS5yZXBsYWNlKC8nL2csICcmYXBvczsnKSArIFwiJ1wiO1xuICB9IGVsc2UgaWYgKGVzY2FwZWQpIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyBleHBvcnRzLmVzY2FwZSh2YWwpICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtPYmplY3R9IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRycyA9IGZ1bmN0aW9uIGF0dHJzKG9iaiwgdGVyc2Upe1xuICB2YXIgYnVmID0gW107XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuXG4gIGlmIChrZXlzLmxlbmd0aCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgICAgLCB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT0ga2V5KSB7XG4gICAgICAgIGlmICh2YWwgPSBqb2luQ2xhc3Nlcyh2YWwpKSB7XG4gICAgICAgICAgYnVmLnB1c2goJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVmLnB1c2goZXhwb3J0cy5hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGdpdmVuIHN0cmluZyBvZiBgaHRtbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuZXNjYXBlID0gZnVuY3Rpb24gZXNjYXBlKGh0bWwpe1xuICB2YXIgcmVzdWx0ID0gU3RyaW5nKGh0bWwpXG4gICAgLnJlcGxhY2UoLyYvZywgJyZhbXA7JylcbiAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7Jyk7XG4gIGlmIChyZXN1bHQgPT09ICcnICsgaHRtbCkgcmV0dXJuIGh0bWw7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgamFkZSBpbiBgZmlsZW5hbWVgIGF0IHRoZSBnaXZlbiBgbGluZW5vYC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IGxpbmVub1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gZnVuY3Rpb24gcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcmV0aHJvdyhlcnIsIG51bGwsIGxpbmVubylcbiAgfVxuICB2YXIgY29udGV4dCA9IDNcbiAgICAsIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKVxuICAgICwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSBjb250ZXh0LCAwKVxuICAgICwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyBjb250ZXh0KTtcblxuICAvLyBFcnJvciBjb250ZXh0XG4gIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gJyAgPiAnIDogJyAgICAnKVxuICAgICAgKyBjdXJyXG4gICAgICArICd8ICdcbiAgICAgICsgbGluZTtcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgLy8gQWx0ZXIgZXhjZXB0aW9uIG1lc3NhZ2VcbiAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgJ0phZGUnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxuZXhwb3J0cy5EZWJ1Z0l0ZW0gPSBmdW5jdGlvbiBEZWJ1Z0l0ZW0obGluZW5vLCBmaWxlbmFtZSkge1xuICB0aGlzLmxpbmVubyA9IGxpbmVubztcbiAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xufVxuXG59LHtcImZzXCI6Mn1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG59LHt9XX0se30sWzFdKSgxKVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBbZnVuY3Rpb24gKCkge1xyXG4gIHZhciB2bSA9IHRoaXM7XHJcbn1dOyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuXG5idWYucHVzaChcIjxzdmcgY2xhc3M9XFxcImljb25cXFwiPjx1c2UgeGxpbms6aHJlZj1cXFwie3sgOjp2bS5pY29uSWQgfX1cXFwiPjwvdXNlPjwvc3ZnPlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgc2NvcGU6IHtcclxuICAgICAgaWNvbklkOiAnPSdcclxuICAgIH0sXHJcbiAgICByZXBsYWNlOiB0cnVlLFxyXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vaWNvbi10ZW1wbGF0ZS5qYWRlJyksXHJcbiAgICBjb250cm9sbGVyOiByZXF1aXJlKCcuL2ljb24tY29udHJvbGxlcicpLFxyXG4gICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZVxyXG4gIH07XHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gWydQcm9maWxlJywgZnVuY3Rpb24gKFByb2ZpbGUpIHtcclxuICB2YXIgcGFnZSA9IHRoaXM7XHJcblxyXG4gIHBhZ2UudXNlciA9IFByb2ZpbGU7XHJcbn1dO1xyXG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8aGVhZGVyPjxzZWN0aW9uPjxoMSBjbGFzcz1cXFwiaGVhZGVyLWZ1bGwtbmFtZVxcXCI+e3sgcGFnZS51c2VyLm5hbWUgfX08L2gxPjxoMiBjbGFzcz1cXFwiaGVhZGVyLWpvYi10aXRsZVxcXCI+e3sgcGFnZS51c2VyLnRpdGxlIH19PC9oMj48L3NlY3Rpb24+PHNlY3Rpb24+PGgyIGNsYXNzPVxcXCJoZWFkZXItY2VuZXRlcmVkXFxcIj5FeHBlcnRpc2U8L2gyPjxpY29uIGljb24taWQ9XFxcIicjY2hlY2snXFxcIj48L2ljb24+PHVsIGNsYXNzPVxcXCJjZW50ZXJlZC1saXN0XFxcIj48bGkgbmctcmVwZWF0PVxcXCJleHBlcnRpc2UgaW4gcGFnZS51c2VyLmV4cGVydGlzZVxcXCIgY2xhc3M9XFxcImNlbnRlcmVkLWxpc3QtaXRlbVxcXCI+e3sgZXhwZXJ0aXNlIH19PC9saT48L3VsPjwvc2VjdGlvbj48c2VjdGlvbj48aDI+VGVjaCBTa2lsbCBTZXQ8L2gyPjxpY29uIGljb24taWQ9XFxcIicjbWFya3VwJ1xcXCI+PC9pY29uPjx1bCBjbGFzcz1cXFwiY2VudGVyZWQtbGlzdFxcXCI+PGxpIG5nLXJlcGVhdD1cXFwic2tpbGwgaW4gcGFnZS51c2VyLnNraWxsc1xcXCIgY2xhc3M9XFxcImNlbnRlcmVkLWxpc3QtaXRlbVxcXCI+e3sgc2tpbGwgfX08L2xpPjwvdWw+PC9zZWN0aW9uPjwvaGVhZGVyPjxtYWluPjxzZWN0aW9uIGNsYXNzPVxcXCJwcm9maWxlXFxcIj48aDIgY2xhc3M9XFxcImljb24taGVhZGVyXFxcIj48aWNvbiBpY29uLWlkPVxcXCInI3Byb2ZpbGUnXFxcIiBjbGFzcz1cXFwiaWNvbi1oZWFkZXItaWNvblxcXCI+PC9pY29uPjxzcGFuPlByb2ZpbGU8L3NwYW4+PC9oMj48cD57eyBwYWdlLnVzZXIucHJvZmlsZSB9fTwvcD48L3NlY3Rpb24+PHNlY3Rpb24gY2xhc3M9XFxcImV4cGVyaWVuY2VcXFwiPjxoMiBjbGFzcz1cXFwiaWNvbi1oZWFkZXJcXFwiPjxpY29uIGljb24taWQ9XFxcIicjYnJpZWZjYXNlJ1xcXCIgY2xhc3M9XFxcImljb24taGVhZGVyLWljb25cXFwiPjwvaWNvbj5FeHBlcmllbmNlPC9oMj48dWwgY2xhc3M9XFxcIm9mZnNldC1saXN0XFxcIj48bGkgbmctcmVwZWF0PVxcXCJqb2IgaW4gcGFnZS51c2VyLmpvYnNcXFwiIGNsYXNzPVxcXCJvZmZzZXQtbGlzdC1pdGVtXFxcIj48ZGl2IGNsYXNzPVxcXCJzdWJ0aXRsZS1oZWFkZXJcXFwiPjxoMiBjbGFzcz1cXFwic3VidGl0bGUtaGVhZGVyLXRpdGxlXFxcIj57eyBqb2IudGl0bGUgfX08L2gyPjxzdHJvbmc+e3sgam9iLmNvbXBhbnkgfX0gLSB7eyBqb2IuY29tcGFueUxvY2F0aW9uIH19PC9zdHJvbmc+PC9kaXY+PHA+PHN0cm9uZz57eyBqb2Iuc3RhcnREYXRlIHwgZGF0ZTogJ01NTSB5eXl5JyB9fSAtIHt7IGpvYi5lbmREYXRlIHwgZGF0ZTogJ01NTSB5eXl5JyB9fTwvc3Ryb25nPnt7IGpvYi5zdW1tYXJ5IH19PC9wPjx1bD48bGkgbmctcmVwZWF0PVxcXCJhY2NvbXBsaXNobWVudCBpbiBqb2IuYWNjb21wbGlzaG1lbnRzXFxcIj57eyBhY2NvbXBsaXNobWVudCB9fTwvbGk+PC91bD48L2xpPjwvdWw+PGgyIGNsYXNzPVxcXCJpY29uLWhlYWRlclxcXCI+PGljb24gaWNvbi1pZD1cXFwiJyNmb3JrJ1xcXCIgY2xhc3M9XFxcImljb24taGVhZGVyLWljb25cXFwiPjwvaWNvbj5Qcm9qZWN0czwvaDI+PHVsIGNsYXNzPVxcXCJvZmZzZXQtbGlzdFxcXCI+PGxpIG5nLXJlcGVhdD1cXFwicHJvamVjdCBpbiBwYWdlLnVzZXIucHJvamVjdHNcXFwiIGNsYXNzPVxcXCJvZmZzZXQtbGlzdC1pdGVtXFxcIj48aDI+e3sgcHJvamVjdC5uYW1lIH19PC9oMj48cD57eyBwcm9qZWN0LnN1bW1hcnkgfX0gJm5ic3A7PGEgaHJlZj1cXFwie3sgcHJvamVjdC5saW5rIH19XFxcIj57eyBwcm9qZWN0LmxpbmsgfX08L2E+PC9wPjwvbGk+PC91bD48aDIgY2xhc3M9XFxcImljb24taGVhZGVyXFxcIj48aWNvbiBpY29uLWlkPVxcXCInI3BlbmNpbCdcXFwiIGNsYXNzPVxcXCJpY29uLWhlYWRlci1pY29uXFxcIj48L2ljb24+RWR1Y2F0aW9uPC9oMj48dWwgY2xhc3M9XFxcIm9mZnNldC1saXN0XFxcIj48bGkgY2xhc3M9XFxcIm9mZnNldC1saXN0LWl0ZW1cXFwiPjxoMj57eyBwYWdlLnVzZXIuZWR1Y2F0aW9uLmRlZ3JlZSB9fTwvaDI+PHA+PHN0cm9uZz57eyBwYWdlLnVzZXIuZWR1Y2F0aW9uLmRhdGUgfCBkYXRlOiAnTU1NIHl5eXknIH19PC9zdHJvbmc+PHNwYW4+e3sgcGFnZS51c2VyLmVkdWNhdGlvbi5jb2xsZWdlIH19PC9zcGFuPjwvcD48L2xpPjwvdWw+PC9zZWN0aW9uPjxmb290ZXI+PGljb24gaWNvbi1pZD1cXFwiJyNjb250YWN0J1xcXCIgY2xhc3M9XFxcImNvbnRhY3QtYm94LWljb25cXFwiPjwvaWNvbj48ZGl2IGNsYXNzPVxcXCJjb250YWN0LWJveFxcXCI+PGRpdiBjbGFzcz1cXFwiY29udGFjdC1ib3gtaW5mb1xcXCI+PHN0cm9uZz57eyBwYWdlLnVzZXIuYWRkcmVzcyB9fSwge3sgcGFnZS51c2VyLnppcGNvZGUgfX08L3N0cm9uZz48YSBocmVmPVxcXCJtYWlsdG86e3sgcGFnZS51c2VyLmVtYWlsIH19XFxcIj48c3Ryb25nPnt7IHBhZ2UudXNlci5lbWFpbCB9fTwvc3Ryb25nPjwvYT48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb250YWN0LWJveC1pbmZvXFxcIj48c3Ryb25nPnt7IHBhZ2UudXNlci5waG9uZSB9fTwvc3Ryb25nPjxhIGhyZWY9XFxcInt7IHBhZ2UudXNlci5saW5rIH19XFxcIj48c3Ryb25nPnt7IHBhZ2UudXNlci5saW5rIH19PC9zdHJvbmc+PC9hPjwvZGl2PjwvZGl2PjwvZm9vdGVyPjwvbWFpbj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgbmFtZTogJ0RhdmlkIEVkbW9uZHNvbicsXHJcbiAgdGl0bGU6ICdXZWIgRGV2ZWxvcGVyJyxcclxuICBhZGRyZXNzOiAnNDYwNyBXaWxsaXMgQXZlIEFwdC4gMTQnLFxyXG4gIGNpdHk6ICdTaGVybWFuIE9ha3MnLFxyXG4gIHN0YXRlOiAnQ0EnLFxyXG4gIHppcGNvZGU6IDkxNDAzLFxyXG4gIGVtYWlsOiAnZGF2aWRhZWRtb25kc29uQGdtYWlsLmNvbScsXHJcbiAgcGhvbmU6ICc4MTguODA0LjcyNTUnLFxyXG4gIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vdGhyZWVoYW1zJyxcclxuICBwcm9maWxlOiAnRnVsbC1zdGFjayBkZXZlbG9wZXIgd2l0aCA0IHllYXJzIG9mIGV4cGVyaWVuY2UgaW4gc29mdHdhcmUgZGV2ZWxvcG1lbnQgYW5kIFFBIGVuZ2luZWVyaW5nLCBzcGVjaWFsaXppbmcgaW4gYXV0b21hdGVkIHRlc3RpbmcgYW5kIHdlYiBkZXZlbG9wbWVudC4nLFxyXG4gIGVkdWNhdGlvbjoge1xyXG4gICAgZGVncmVlOiAnQmFjaGVsb3Igb2YgRmluZSBBcnRzIC0gRmlsbSBhbmQgQW5pbWF0aW9uJyxcclxuICAgIGNvbGxlZ2U6ICdSb2NoZXN0ZXIgSW5zdGl0dXRlIG9mIFRlY2hub2xvZ3knLFxyXG4gICAgZGF0ZTogbmV3IERhdGUoMjAwNSwgNilcclxuICB9LFxyXG4gIGpvYnM6IFtcclxuICAgIHtcclxuICAgICAgdGl0bGU6ICdTb2Z0d2FyZSBFbmdpbmVlcicsXHJcbiAgICAgIHN0YXJ0RGF0ZTogbmV3IERhdGUoMjAxMiwgNiksXHJcbiAgICAgIGVuZERhdGU6IG5ldyBEYXRlKDIwMTUsIDMpLFxyXG4gICAgICBjb21wYW55OiAnU3dlZXR5IEhpZ2gnLFxyXG4gICAgICBjb21wYW55TG9jYXRpb246ICdNYXJpbmEgRGVsIFJleSwgQ0EnLFxyXG4gICAgICBzdW1tYXJ5OiAnRnVsbC1zdGFjayBkZXZlbG9wZXIgZm9yIGEgc29jaWFsIG5ldHdvcmtpbmcgc2l0ZSBhbmQgbW9iaWxlIGFwcCBBUEksIHVzaW5nIFJhaWxzLCBOb2RlLmpzLCBqUXVlcnksIGFuZCBBbmd1bGFyLiBQcm9tb3RlZCBmcm9tIFFBIEVuZ2luZWVyIHRvIFNvZnR3YXJlIEVuZ2luZWVyIHdpdGhpbiBmaXJzdCB5ZWFyLicsXHJcbiAgICAgIGFjY29tcGxpc2htZW50czogW1xyXG4gICAgICAgICdCdWlsdCBhIGNvbnRlbnQgbWFuYWdlbWVudCBzeXN0ZW0gd2l0aCBSYWlscyB0byBvcmdhbml6ZSBhbGwgcGhvdG9zIGFuZCB2aWRlb3MsIGNvbnRlc3RzLCBhbmQgY3VyYXRlZCBjb21tdW5pdHkgcGhvdG8vdmlkZW8gcGxheWxpc3RzLicsXHJcbiAgICAgICAgJ0RldmVsb3BlZCBhIGNvbW11bml0eSBtb2RlcmF0aW9uIHN5c3RlbSB3aXRoIFJhaWxzIGZvciBhcHByb3ZhbCBhbmQgcmVqZWN0aW9uIG9mIHVzZXIgcG9zdGVkIHRleHQsIHBob3RvcywgYW5kIHZpZGVvcy4nLFxyXG4gICAgICAgICdCdWlsdCBhIFJ1Ynkgb24gUmFpbHMgc2VydmljZSB0aGF0IG1hbmFnZWQgYWxsIHdlYnNpdGUgYW5kIG1vYmlsZSB1c2VyIGF1dGhlbnRpY2F0aW9uLCBhdXRob3JpemF0aW9uLCBhY2NvdW50LCByZWxhdGlvbnNoaXAsIGFuZCBhZ2UgdmVyaWZpY2F0aW9uJyxcclxuICAgICAgICAnV3JvdGUgYSBmdWxsIHN1aXRlIG9mIGxvYWQgdGVzdHMsIGlkZW50aWZpZWQsIHJlbW92ZWQsIG9yIG9wdGltaXplZCBzbG93IHF1ZXJpZXMsIGFuZCBpbmNyZWFzZWQgdGhlIG51bWJlciBvZiBwb3NzaWJsZSByZXF1ZXN0cyBwZXIgc2Vjb25kIGJ5IDQwMCUuJyxcclxuICAgICAgICAnV3JvdGUgdGhlIGJhY2tlbmQgQVBJIGZvciB0aGUgdmlkZW8gY3JlYXRpb24sIG9yZ2FuaXphdGlvbiwgYW5kIHNoYXJpbmcgc2VjdGlvbiBvZiB0aGUgc2l0ZS4nLFxyXG4gICAgICAgICdJbnRlZ3JhdGVkIGEgTm9kZS5qcyBBUEkgd2l0aCBhIHRoaXJkLXBhcnR5IG1vZGVyYXRpb24gc3lzdGVtIHVzaW5nIGEgcmVsaWFibGUgbWVzc2FnZSBxdWV1ZS4nXHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRpdGxlOiAnUUEgRW5naW5lZXInLFxyXG4gICAgICBzdGFydERhdGU6IG5ldyBEYXRlKDIwMTAsIDgpLFxyXG4gICAgICBlbmREYXRlOiBuZXcgRGF0ZSgyMDExLCAxMiksXHJcbiAgICAgIGNvbXBhbnk6ICdNZXRlb3IgR2FtZXMnLFxyXG4gICAgICBjb21wYW55TG9jYXRpb246ICdCZXZlcmx5IEhpbGxzLCBDQScsXHJcbiAgICAgIHN1bW1hcnk6ICdEZXZlbG9wZWQgcGlwZWxpbmUgYW5kIHRlc3RpbmcgdG9vbHMgYW5kIHBlcmZvcm1lZCBhdXRvbWF0ZWQgdGVzdGluZyBvbiBmb3VyIEZhY2Vib29rIGdhbWVzLiBQcm9tb3RlZCBmcm9tIFFBIFRlc3RlciB0byBRQSBFbmdpbmVlciB3aXRoaW4gZmlyc3QgeWVhci4nLFxyXG4gICAgICBhY2NvbXBsaXNobWVudHM6IFtcclxuICAgICAgICAnQW5hbHl6ZWQgY29udGVudCBhbmQgdGVzdCB3b3JrZmxvd3MgZm9yIDIwIHN0YWZmIHRvIGlkZW50aWZ5IHNvdXJjZXMgb2YgaW5lZmZpY2llbmN5LCBwcmlvcml0aXplIHRhc2tzLCBhbmQgZGV2ZWxvcCBjb250ZW50IG1hbmFnZW1lbnQgYW5kIGRlYnVnZ2luZyB0b29scywgc2F2aW5nIDRLIG1hbiBob3VycyBhbmQgJDE1MEsgYW5udWFsbHkuJyxcclxuICAgICAgICAnQ3JlYXRlZCBhIHNldCBvZiBzY3JpcHRzIHRvIHNpbXBsaWZ5IGFuZCB2YWxpZGF0ZSBkYXRhYmFzZSBlbnRyeSB3aXRoIFB5dGhvbiBhbmQgU2VsZW5pdW0sIHdoaWNoIHJlZHVjZWQgcmVsYXRlZCBidWdzIGJ5IG92ZXIgOTAlLCBhbmQgcXVhZHJ1cGxlZCBkZXBhcnRtZW50IHByb2R1Y3Rpb24uJyxcclxuICAgICAgICAnQXV0b21hdGVkIHRpY2tldCB2YWxpZGF0aW9uIGFuZCBwb3B1bGF0aW9uIHByb2Nlc3NlcyB3aXRoIFB5dGhvbiwgcmVkdWNpbmcgd2Vla2x5IHByb2Nlc3MgdGltZSBieSAxNCBob3Vycy4nLFxyXG4gICAgICAgICdCdWlsdCBhcnQgdmVyaWZpY2F0aW9uIHRvb2xzIHRvIGVsaW1pbmF0ZSB0ZWNobmljYWwgYXJ0IGlzc3VlcywgaW5jbHVkaW5nIGEgVUkgdXNlZCBieSBlaWdodCBhcnRpc3RzIGFuZCBzaXggdGVzdGVycyB0aGF0IGFsbG93ZWQgdGhlIFFBIERlcGFydG1lbnQgdG8gdGVzdCBhcnQgd2Vla3MgaW4gYWR2YW5jZSBvZiBpbi1nYW1lIGFwcGVhcmFuY2UuJyxcclxuICAgICAgICAnVGF1Z2h0IHdlZWtseSBjbGFzc2VzIHRvIHNldmVuIHRlc3RlcnMgb24gSlNPTiwgc3BlY2lmaWMgZ2FtZSBkYXRhIGZvcm1hdHMsIGtleWJvYXJkIHNob3J0Y3V0cywgYW5kIGVmZmljaWVuY3kuJ1xyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgXSxcclxuICBwcm9qZWN0czogW1xyXG4gICAge1xyXG4gICAgICBuYW1lOiAnS29hbmd1bHBpdGVzdGlmeScsXHJcbiAgICAgIHN1bW1hcnk6ICdGdWxsLXN0YWNrIEpTIGJvaWxlcnBsYXRlIHByb2plY3QsIHVzZWQgYXMgYSBiYXNlIGZvciBvdGhlciBwcm9qZWN0cy4gSW5jbHVkZXMgS29hIGJhY2tlbmQgYW5kIEFuZ3VsYXIgY29tcG9uZW50LWJhc2VkIGZyb250ZW5kLCBhbmQgaXMgZW50aXJlbHkgYnVpbHQgb24gcHJvbWlzZXMuIFNhdmluZyBhIGZpbGUgc2VsZWN0aXZlbHkgdHJpZ2dlcnMgYXNzZXQgY29tcGlsYXRpb24sIGZyb250ZW5kL2JhY2tlbmQgdGVzdCBydW5uZXJzLCBzZXJ2ZXIgcmVzdGFydCwgYW5kIGJyb3dzZXIgcmVsb2FkIGFzIG5lZWRlZC4nLFxyXG4gICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3RocmVlaGFtcy9rb2FuZ3VscGl0ZXN0aWZ5J1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ0RlYXRoIFdoaW1zeSBSb2FkbWFwJyxcclxuICAgICAgc3VtbWFyeTogJ1B1YmxpYyBzaXRlIHRvIHNob3cgZGV2ZWxvcG1lbnQgcHJvZ3Jlc3Mgb2YgYSBnYW1lIGRldmVsb3BlZCBieSBTcXVpZCBCbGluayBHYW1lcy4gV3JpdHRlbiBpbiBBbmd1bGFyIGFuZCBLb2EsIHdpdGggRmxleGJveCBhbmQgSFRNTDUgQ2FudmFzLiBQdWxscyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBKaXJhIEFQSSBhbmQgcmVjZWl2ZXMgcmVhbHRpbWUgdXBkYXRlcyB1c2luZyBKaXJhIHdlYmhvb2tzLicsXHJcbiAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vdGhyZWVoYW1zL2RlYXRoLXdoaW1zeS1yb2FkbWFwJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ0dhbWUgUHJvdG90eXBlcycsXHJcbiAgICAgIHN1bW1hcnk6ICdGb3VyIGdhbWUgcHJvdG90eXBlcyB1c2luZyB0aGUgUGhhc2VyIGdhbWUgZW5naW5lLCBtYWRlIGluIDEtMiBkYXlzIGVhY2guIERvbmUgdG8gZXhwbG9yZSB0aGUgZGVzaWduIGNvbXBsZXhpdHkgb2YgZ2FtZXMsIGFuZCBwZXJmb3JtYW5jZSBkaWZmaWN1bHRpZXMgaW4gbWFpbnRhaW5pbmcgNjAgZnJhbWVzIHBlciBzZWNvbmQuJyxcclxuICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS90aHJlZWhhbXMvcGhhc2VyLWdhbWUtcHJvdG90eXBlcydcclxuICAgIH1cclxuICBdLFxyXG4gIGV4cGVydGlzZTogW1xyXG4gICAgJ0phdmFzY3JpcHQnLFxyXG4gICAgJ0FuZ3VsYXJKUycsXHJcbiAgICAnTm9kZS5qcycsXHJcbiAgICAnUnVieSBvbiBSYWlscycsXHJcbiAgICAnQXV0b21hdGVkIFRlc3RpbmcnXHJcbiAgXSxcclxuICBza2lsbHM6IFtcclxuICAgICdSdWJ5IG9uIFJhaWxzJyxcclxuICAgICdBbmd1bGFySlMnLFxyXG4gICAgJ0hUTUwvQ1NTJyxcclxuICAgICdOb2RlLmpzJ1xyXG4gIF1cclxufTtcclxuIl19
