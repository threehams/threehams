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

buf.push("<header><section><h1 class=\"header-full-name\">{{ page.user.name }}</h1><h2 class=\"header-job-title\">{{ page.user.title }}</h2></section><section><h2 class=\"header-cenetered\">Expertise</h2><icon icon-id=\"'#check'\"></icon><ul class=\"centered-list\"><li ng-repeat=\"expertise in page.user.expertise\" class=\"centered-list-item\">{{ expertise }}</li></ul></section><section><h2>Tech Skill Set</h2><icon icon-id=\"'#markup'\"></icon><ul class=\"centered-list\"><li ng-repeat=\"skill in page.user.skills\" class=\"centered-list-item\">{{ skill }}</li></ul></section></header><main><section class=\"profile\"><h2 class=\"icon-header\"><icon icon-id=\"'#profile'\" class=\"icon-header-icon\"></icon><span>Profile</span></h2><p>{{ page.user.profile }}</p></section><section class=\"experience\"><h2 class=\"icon-header\"><icon icon-id=\"'#briefcase'\" class=\"icon-header-icon\"></icon>Experience</h2><ul class=\"offset-list\"><li ng-repeat=\"job in page.user.jobs\" class=\"offset-list-item\"><div class=\"subtitle-header\"><h2 class=\"subtitle-header-title\">{{ job.title }}</h2><strong>{{ job.company }} - {{ job.companyLocation }}</strong></div><p><strong>{{ job.startDate | date: 'MMM yyyy' }} - {{ job.endDate | date: 'MMM yyyy' }}</strong>{{ job.summary }}</p><ul><li ng-repeat=\"accomplishment in job.accomplishments\">{{ accomplishment }}</li></ul></li></ul><h2 class=\"icon-header\"><icon icon-id=\"'#fork'\" class=\"icon-header-icon\"></icon>Projects</h2><ul class=\"offset-list\"><li ng-repeat=\"project in page.user.projects\" class=\"offset-list-item\"><h2>{{ project.name }}</h2><p>{{ project.summary }} &nbsp;<a href=\"{{ project.link }}\">{{ project.link }}</a></p></li></ul><h2 class=\"icon-header\"><icon icon-id=\"'#pencil'\" class=\"icon-header-icon\"></icon>Education</h2><ul class=\"offset-list\"><li class=\"offset-list-item\"><h2>{{ page.user.education.degree }}</h2><p><strong>{{ page.user.education.date | date: 'MMM yyyy' }}</strong><span>{{ page.user.education.college }}</span></p></li></ul></section><footer><icon icon-id=\"'#contact'\" class=\"contact-box-icon\"></icon><div class=\"contact-box\"><div class=\"contact-box-info\"><strong>{{ page.user.address }}, {{ page.user.zipcode }}</strong><strong>{{ page.user.email }}</strong></div><div class=\"contact-box-info\"><strong>{{ page.user.phone }}</strong><strong>{{ page.user.link }}</strong></div></div></footer></main>");;return buf.join("");
};
},{"jade/runtime":"C:\\Users\\threehams\\workspace\\threehams\\node_modules\\jade\\runtime.js"}],"C:\\Users\\threehams\\workspace\\threehams\\src\\js\\services\\profile.js":[function(require,module,exports){
module.exports = {
  name: 'David Edmondson',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXJlc29sdmUvZW1wdHkuanMiLCJub2RlX21vZHVsZXMvamFkZS9ydW50aW1lLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvaWNvbi9pY29uLWNvbnRyb2xsZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9pY29uL2ljb24tdGVtcGxhdGUuamFkZSIsInNyYy9qcy9jb21wb25lbnRzL2ljb24vaWNvbi5qcyIsInNyYy9qcy9wYWdlcy9wYWdlL3BhZ2UtY29udHJvbGxlci5qcyIsInNyYy9qcy9wYWdlcy9wYWdlL3BhZ2UtdGVtcGxhdGUuamFkZSIsInNyYy9qcy9zZXJ2aWNlcy9wcm9maWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDN0NBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG5yZXF1aXJlKCdhbmd1bGFyJyk7XHJcbnJlcXVpcmUoJ2FuZ3VsYXItcm91dGUnKTtcclxucmVxdWlyZSgnYW5ndWxhci1hbmltYXRlJyk7XHJcbmdsb2JhbC5fID0gcmVxdWlyZSgnbG9kYXNoJyk7XHJcblxyXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ1Jlc3VtZScsIFsnbmdSb3V0ZScsICduZ0FuaW1hdGUnXSk7XHJcblxyXG4vLyBwYWdlc1xyXG5hcHAuY29udHJvbGxlcignUGFnZUNvbnRyb2xsZXInLCByZXF1aXJlKCcuL3BhZ2VzL3BhZ2UvcGFnZS1jb250cm9sbGVyLmpzJykpO1xyXG5cclxuLy8gY29tcG9uZW50cyAoY29udHJvbGxlcnMgZXhwb3NlZCBmb3IgdGVzdGluZylcclxuYXBwLmRpcmVjdGl2ZSgnaWNvbicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9pY29uL2ljb24nKSk7XHJcbmFwcC5jb250cm9sbGVyKCdJY29uQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9pY29uL2ljb24tY29udHJvbGxlci5qcycpKTtcclxuXHJcbmFwcC52YWx1ZSgnUHJvZmlsZScsIHJlcXVpcmUoJy4vc2VydmljZXMvcHJvZmlsZScpKTtcclxuXHJcbmFwcC5jb25maWcoW1xyXG4gICckbG9jYXRpb25Qcm92aWRlcicsXHJcbiAgJyRyb3V0ZVByb3ZpZGVyJyxcclxuICBmdW5jdGlvbiAoJGxvY2F0aW9uUHJvdmlkZXIsICRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XHJcblxyXG4gICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgLndoZW4oJy8nLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vcGFnZXMvcGFnZS9wYWdlLXRlbXBsYXRlLmphZGUnKSxcclxuICAgICAgICBjb250cm9sbGVyOiAnUGFnZUNvbnRyb2xsZXInLFxyXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3BhZ2UnXHJcbiAgICAgIH0pXHJcbiAgICAgIC5vdGhlcndpc2Uoe1xyXG4gICAgICAgIHJlZGlyZWN0VG86ICcvJ1xyXG4gICAgICB9KTtcclxuICB9XHJcbl0pO1xyXG5cclxuLy8gVW5jb21tZW50IGZvciBkZWJ1Z2dpbmdcclxuLy9hbmd1bGFyLm1vZHVsZSgndXRpbHMnKS5maWx0ZXIoJ2lzRGVmaW5lZCcsIGZ1bmN0aW9uICgpIHtcclxuLy8gIHJldHVybiBmdW5jdGlvbiAodmFsdWUsIG1zZykge1xyXG4vLyAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4vLyAgICAgIHRocm93IG5ldyBFcnJvcignaXNEZWZpbmVkIGZpbHRlciBnb3QgdW5kZWZpbmVkIHZhbHVlICcgKyBtc2cpO1xyXG4vLyAgICB9XHJcbi8vICAgIHJldHVybiB2YWx1ZTtcclxuLy8gIH07XHJcbi8vfSk7XHJcbiIsbnVsbCwiKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuamFkZSA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNZXJnZSB0d28gYXR0cmlidXRlIG9iamVjdHMgZ2l2aW5nIHByZWNlZGVuY2VcbiAqIHRvIHZhbHVlcyBpbiBvYmplY3QgYGJgLiBDbGFzc2VzIGFyZSBzcGVjaWFsLWNhc2VkXG4gKiBhbGxvd2luZyBmb3IgYXJyYXlzIGFuZCBtZXJnaW5nL2pvaW5pbmcgYXBwcm9wcmlhdGVseVxuICogcmVzdWx0aW5nIGluIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gKiBAcGFyYW0ge09iamVjdH0gYlxuICogQHJldHVybiB7T2JqZWN0fSBhXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLm1lcmdlID0gZnVuY3Rpb24gbWVyZ2UoYSwgYikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBhdHRycyA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRycyA9IG1lcmdlKGF0dHJzLCBhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJzO1xuICB9XG4gIHZhciBhYyA9IGFbJ2NsYXNzJ107XG4gIHZhciBiYyA9IGJbJ2NsYXNzJ107XG5cbiAgaWYgKGFjIHx8IGJjKSB7XG4gICAgYWMgPSBhYyB8fCBbXTtcbiAgICBiYyA9IGJjIHx8IFtdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhYykpIGFjID0gW2FjXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYmMpKSBiYyA9IFtiY107XG4gICAgYVsnY2xhc3MnXSA9IGFjLmNvbmNhdChiYykuZmlsdGVyKG51bGxzKTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGtleSAhPSAnY2xhc3MnKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIEZpbHRlciBudWxsIGB2YWxgcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG51bGxzKHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsICE9PSAnJztcbn1cblxuLyoqXG4gKiBqb2luIGFycmF5IGFzIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5qb2luQ2xhc3NlcyA9IGpvaW5DbGFzc2VzO1xuZnVuY3Rpb24gam9pbkNsYXNzZXModmFsKSB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheSh2YWwpID8gdmFsLm1hcChqb2luQ2xhc3NlcykgOlxuICAgICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpID8gT2JqZWN0LmtleXModmFsKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdmFsW2tleV07IH0pIDpcbiAgICBbdmFsXSkuZmlsdGVyKG51bGxzKS5qb2luKCcgJyk7XG59XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGNsYXNzZXNcbiAqIEBwYXJhbSB7QXJyYXkuPEJvb2xlYW4+fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuY2xzID0gZnVuY3Rpb24gY2xzKGNsYXNzZXMsIGVzY2FwZWQpIHtcbiAgdmFyIGJ1ZiA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZXNjYXBlZCAmJiBlc2NhcGVkW2ldKSB7XG4gICAgICBidWYucHVzaChleHBvcnRzLmVzY2FwZShqb2luQ2xhc3NlcyhbY2xhc3Nlc1tpXV0pKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1Zi5wdXNoKGpvaW5DbGFzc2VzKGNsYXNzZXNbaV0pKTtcbiAgICB9XG4gIH1cbiAgdmFyIHRleHQgPSBqb2luQ2xhc3NlcyhidWYpO1xuICBpZiAodGV4dC5sZW5ndGgpIHtcbiAgICByZXR1cm4gJyBjbGFzcz1cIicgKyB0ZXh0ICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cblxuZXhwb3J0cy5zdHlsZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWwpLm1hcChmdW5jdGlvbiAoc3R5bGUpIHtcbiAgICAgIHJldHVybiBzdHlsZSArICc6JyArIHZhbFtzdHlsZV07XG4gICAgfSkuam9pbignOycpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWw7XG4gIH1cbn07XG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXNjYXBlZFxuICogQHBhcmFtIHtCb29sZWFufSB0ZXJzZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHIgPSBmdW5jdGlvbiBhdHRyKGtleSwgdmFsLCBlc2NhcGVkLCB0ZXJzZSkge1xuICBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgdmFsID0gZXhwb3J0cy5zdHlsZSh2YWwpO1xuICB9XG4gIGlmICgnYm9vbGVhbicgPT0gdHlwZW9mIHZhbCB8fCBudWxsID09IHZhbCkge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHJldHVybiAnICcgKyAodGVyc2UgPyBrZXkgOiBrZXkgKyAnPVwiJyArIGtleSArICdcIicpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9IGVsc2UgaWYgKDAgPT0ga2V5LmluZGV4T2YoJ2RhdGEnKSAmJiAnc3RyaW5nJyAhPSB0eXBlb2YgdmFsKSB7XG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KHZhbCkuaW5kZXhPZignJicpICE9PSAtMSkge1xuICAgICAgY29uc29sZS53YXJuKCdTaW5jZSBKYWRlIDIuMC4wLCBhbXBlcnNhbmRzIChgJmApIGluIGRhdGEgYXR0cmlidXRlcyAnICtcbiAgICAgICAgICAgICAgICAgICAnd2lsbCBiZSBlc2NhcGVkIHRvIGAmYW1wO2AnKTtcbiAgICB9O1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgZWxpbWluYXRlIHRoZSBkb3VibGUgcXVvdGVzIGFyb3VuZCBkYXRlcyBpbiAnICtcbiAgICAgICAgICAgICAgICAgICAnSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArIFwiPSdcIiArIEpTT04uc3RyaW5naWZ5KHZhbCkucmVwbGFjZSgvJy9nLCAnJmFwb3M7JykgKyBcIidcIjtcbiAgfSBlbHNlIGlmIChlc2NhcGVkKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgZXhwb3J0cy5lc2NhcGUodmFsKSArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJztcbiAgfVxufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZXMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0cnMgPSBmdW5jdGlvbiBhdHRycyhvYmosIHRlcnNlKXtcbiAgdmFyIGJ1ZiA9IFtdO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcblxuICBpZiAoa2V5cy5sZW5ndGgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldXG4gICAgICAgICwgdmFsID0gb2JqW2tleV07XG5cbiAgICAgIGlmICgnY2xhc3MnID09IGtleSkge1xuICAgICAgICBpZiAodmFsID0gam9pbkNsYXNzZXModmFsKSkge1xuICAgICAgICAgIGJ1Zi5wdXNoKCcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuYXR0cihrZXksIHZhbCwgZmFsc2UsIHRlcnNlKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1Zi5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBnaXZlbiBzdHJpbmcgb2YgYGh0bWxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmVzY2FwZSA9IGZ1bmN0aW9uIGVzY2FwZShodG1sKXtcbiAgdmFyIHJlc3VsdCA9IFN0cmluZyhodG1sKVxuICAgIC5yZXBsYWNlKC8mL2csICcmYW1wOycpXG4gICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpO1xuICBpZiAocmVzdWx0ID09PSAnJyArIGh0bWwpIHJldHVybiBodG1sO1xuICBlbHNlIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFJlLXRocm93IHRoZSBnaXZlbiBgZXJyYCBpbiBjb250ZXh0IHRvIHRoZVxuICogdGhlIGphZGUgaW4gYGZpbGVuYW1lYCBhdCB0aGUgZ2l2ZW4gYGxpbmVub2AuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZW5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBsaW5lbm9cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucmV0aHJvdyA9IGZ1bmN0aW9uIHJldGhyb3coZXJyLCBmaWxlbmFtZSwgbGluZW5vLCBzdHIpe1xuICBpZiAoIShlcnIgaW5zdGFuY2VvZiBFcnJvcikpIHRocm93IGVycjtcbiAgaWYgKCh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnIHx8ICFmaWxlbmFtZSkgJiYgIXN0cikge1xuICAgIGVyci5tZXNzYWdlICs9ICcgb24gbGluZSAnICsgbGluZW5vO1xuICAgIHRocm93IGVycjtcbiAgfVxuICB0cnkge1xuICAgIHN0ciA9IHN0ciB8fCByZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgJ3V0ZjgnKVxuICB9IGNhdGNoIChleCkge1xuICAgIHJldGhyb3coZXJyLCBudWxsLCBsaW5lbm8pXG4gIH1cbiAgdmFyIGNvbnRleHQgPSAzXG4gICAgLCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJylcbiAgICAsIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gY29udGV4dCwgMClcbiAgICAsIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgY29udGV4dCk7XG5cbiAgLy8gRXJyb3IgY29udGV4dFxuICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/ICcgID4gJyA6ICcgICAgJylcbiAgICAgICsgY3VyclxuICAgICAgKyAnfCAnXG4gICAgICArIGxpbmU7XG4gIH0pLmpvaW4oJ1xcbicpO1xuXG4gIC8vIEFsdGVyIGV4Y2VwdGlvbiBtZXNzYWdlXG4gIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8ICdKYWRlJykgKyAnOicgKyBsaW5lbm9cbiAgICArICdcXG4nICsgY29udGV4dCArICdcXG5cXG4nICsgZXJyLm1lc3NhZ2U7XG4gIHRocm93IGVycjtcbn07XG5cbmV4cG9ydHMuRGVidWdJdGVtID0gZnVuY3Rpb24gRGVidWdJdGVtKGxpbmVubywgZmlsZW5hbWUpIHtcbiAgdGhpcy5saW5lbm8gPSBsaW5lbm87XG4gIHRoaXMuZmlsZW5hbWUgPSBmaWxlbmFtZTtcbn1cblxufSx7XCJmc1wiOjJ9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxufSx7fV19LHt9LFsxXSkoMSlcbn0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gW2Z1bmN0aW9uICgpIHtcclxuICB2YXIgdm0gPSB0aGlzO1xyXG59XTsiLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcblxuYnVmLnB1c2goXCI8c3ZnIGNsYXNzPVxcXCJpY29uXFxcIj48dXNlIHhsaW5rOmhyZWY9XFxcInt7IDo6dm0uaWNvbklkIH19XFxcIj48L3VzZT48L3N2Zz5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICByZXR1cm4ge1xyXG4gICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgIHNjb3BlOiB7XHJcbiAgICAgIGljb25JZDogJz0nXHJcbiAgICB9LFxyXG4gICAgcmVwbGFjZTogdHJ1ZSxcclxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2ljb24tdGVtcGxhdGUuamFkZScpLFxyXG4gICAgY29udHJvbGxlcjogcmVxdWlyZSgnLi9pY29uLWNvbnRyb2xsZXInKSxcclxuICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWVcclxuICB9O1xyXG59O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFsnUHJvZmlsZScsIGZ1bmN0aW9uIChQcm9maWxlKSB7XHJcbiAgdmFyIHBhZ2UgPSB0aGlzO1xyXG5cclxuICBwYWdlLnVzZXIgPSBQcm9maWxlO1xyXG59XTtcclxuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPGhlYWRlcj48c2VjdGlvbj48aDEgY2xhc3M9XFxcImhlYWRlci1mdWxsLW5hbWVcXFwiPnt7IHBhZ2UudXNlci5uYW1lIH19PC9oMT48aDIgY2xhc3M9XFxcImhlYWRlci1qb2ItdGl0bGVcXFwiPnt7IHBhZ2UudXNlci50aXRsZSB9fTwvaDI+PC9zZWN0aW9uPjxzZWN0aW9uPjxoMiBjbGFzcz1cXFwiaGVhZGVyLWNlbmV0ZXJlZFxcXCI+RXhwZXJ0aXNlPC9oMj48aWNvbiBpY29uLWlkPVxcXCInI2NoZWNrJ1xcXCI+PC9pY29uPjx1bCBjbGFzcz1cXFwiY2VudGVyZWQtbGlzdFxcXCI+PGxpIG5nLXJlcGVhdD1cXFwiZXhwZXJ0aXNlIGluIHBhZ2UudXNlci5leHBlcnRpc2VcXFwiIGNsYXNzPVxcXCJjZW50ZXJlZC1saXN0LWl0ZW1cXFwiPnt7IGV4cGVydGlzZSB9fTwvbGk+PC91bD48L3NlY3Rpb24+PHNlY3Rpb24+PGgyPlRlY2ggU2tpbGwgU2V0PC9oMj48aWNvbiBpY29uLWlkPVxcXCInI21hcmt1cCdcXFwiPjwvaWNvbj48dWwgY2xhc3M9XFxcImNlbnRlcmVkLWxpc3RcXFwiPjxsaSBuZy1yZXBlYXQ9XFxcInNraWxsIGluIHBhZ2UudXNlci5za2lsbHNcXFwiIGNsYXNzPVxcXCJjZW50ZXJlZC1saXN0LWl0ZW1cXFwiPnt7IHNraWxsIH19PC9saT48L3VsPjwvc2VjdGlvbj48L2hlYWRlcj48bWFpbj48c2VjdGlvbiBjbGFzcz1cXFwicHJvZmlsZVxcXCI+PGgyIGNsYXNzPVxcXCJpY29uLWhlYWRlclxcXCI+PGljb24gaWNvbi1pZD1cXFwiJyNwcm9maWxlJ1xcXCIgY2xhc3M9XFxcImljb24taGVhZGVyLWljb25cXFwiPjwvaWNvbj48c3Bhbj5Qcm9maWxlPC9zcGFuPjwvaDI+PHA+e3sgcGFnZS51c2VyLnByb2ZpbGUgfX08L3A+PC9zZWN0aW9uPjxzZWN0aW9uIGNsYXNzPVxcXCJleHBlcmllbmNlXFxcIj48aDIgY2xhc3M9XFxcImljb24taGVhZGVyXFxcIj48aWNvbiBpY29uLWlkPVxcXCInI2JyaWVmY2FzZSdcXFwiIGNsYXNzPVxcXCJpY29uLWhlYWRlci1pY29uXFxcIj48L2ljb24+RXhwZXJpZW5jZTwvaDI+PHVsIGNsYXNzPVxcXCJvZmZzZXQtbGlzdFxcXCI+PGxpIG5nLXJlcGVhdD1cXFwiam9iIGluIHBhZ2UudXNlci5qb2JzXFxcIiBjbGFzcz1cXFwib2Zmc2V0LWxpc3QtaXRlbVxcXCI+PGRpdiBjbGFzcz1cXFwic3VidGl0bGUtaGVhZGVyXFxcIj48aDIgY2xhc3M9XFxcInN1YnRpdGxlLWhlYWRlci10aXRsZVxcXCI+e3sgam9iLnRpdGxlIH19PC9oMj48c3Ryb25nPnt7IGpvYi5jb21wYW55IH19IC0ge3sgam9iLmNvbXBhbnlMb2NhdGlvbiB9fTwvc3Ryb25nPjwvZGl2PjxwPjxzdHJvbmc+e3sgam9iLnN0YXJ0RGF0ZSB8IGRhdGU6ICdNTU0geXl5eScgfX0gLSB7eyBqb2IuZW5kRGF0ZSB8IGRhdGU6ICdNTU0geXl5eScgfX08L3N0cm9uZz57eyBqb2Iuc3VtbWFyeSB9fTwvcD48dWw+PGxpIG5nLXJlcGVhdD1cXFwiYWNjb21wbGlzaG1lbnQgaW4gam9iLmFjY29tcGxpc2htZW50c1xcXCI+e3sgYWNjb21wbGlzaG1lbnQgfX08L2xpPjwvdWw+PC9saT48L3VsPjxoMiBjbGFzcz1cXFwiaWNvbi1oZWFkZXJcXFwiPjxpY29uIGljb24taWQ9XFxcIicjZm9yaydcXFwiIGNsYXNzPVxcXCJpY29uLWhlYWRlci1pY29uXFxcIj48L2ljb24+UHJvamVjdHM8L2gyPjx1bCBjbGFzcz1cXFwib2Zmc2V0LWxpc3RcXFwiPjxsaSBuZy1yZXBlYXQ9XFxcInByb2plY3QgaW4gcGFnZS51c2VyLnByb2plY3RzXFxcIiBjbGFzcz1cXFwib2Zmc2V0LWxpc3QtaXRlbVxcXCI+PGgyPnt7IHByb2plY3QubmFtZSB9fTwvaDI+PHA+e3sgcHJvamVjdC5zdW1tYXJ5IH19ICZuYnNwOzxhIGhyZWY9XFxcInt7IHByb2plY3QubGluayB9fVxcXCI+e3sgcHJvamVjdC5saW5rIH19PC9hPjwvcD48L2xpPjwvdWw+PGgyIGNsYXNzPVxcXCJpY29uLWhlYWRlclxcXCI+PGljb24gaWNvbi1pZD1cXFwiJyNwZW5jaWwnXFxcIiBjbGFzcz1cXFwiaWNvbi1oZWFkZXItaWNvblxcXCI+PC9pY29uPkVkdWNhdGlvbjwvaDI+PHVsIGNsYXNzPVxcXCJvZmZzZXQtbGlzdFxcXCI+PGxpIGNsYXNzPVxcXCJvZmZzZXQtbGlzdC1pdGVtXFxcIj48aDI+e3sgcGFnZS51c2VyLmVkdWNhdGlvbi5kZWdyZWUgfX08L2gyPjxwPjxzdHJvbmc+e3sgcGFnZS51c2VyLmVkdWNhdGlvbi5kYXRlIHwgZGF0ZTogJ01NTSB5eXl5JyB9fTwvc3Ryb25nPjxzcGFuPnt7IHBhZ2UudXNlci5lZHVjYXRpb24uY29sbGVnZSB9fTwvc3Bhbj48L3A+PC9saT48L3VsPjwvc2VjdGlvbj48Zm9vdGVyPjxpY29uIGljb24taWQ9XFxcIicjY29udGFjdCdcXFwiIGNsYXNzPVxcXCJjb250YWN0LWJveC1pY29uXFxcIj48L2ljb24+PGRpdiBjbGFzcz1cXFwiY29udGFjdC1ib3hcXFwiPjxkaXYgY2xhc3M9XFxcImNvbnRhY3QtYm94LWluZm9cXFwiPjxzdHJvbmc+e3sgcGFnZS51c2VyLmFkZHJlc3MgfX0sIHt7IHBhZ2UudXNlci56aXBjb2RlIH19PC9zdHJvbmc+PHN0cm9uZz57eyBwYWdlLnVzZXIuZW1haWwgfX08L3N0cm9uZz48L2Rpdj48ZGl2IGNsYXNzPVxcXCJjb250YWN0LWJveC1pbmZvXFxcIj48c3Ryb25nPnt7IHBhZ2UudXNlci5waG9uZSB9fTwvc3Ryb25nPjxzdHJvbmc+e3sgcGFnZS51c2VyLmxpbmsgfX08L3N0cm9uZz48L2Rpdj48L2Rpdj48L2Zvb3Rlcj48L21haW4+XCIpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIG5hbWU6ICdEYXZpZCBFZG1vbmRzb24nLFxyXG4gIGFkZHJlc3M6ICc0NjA3IFdpbGxpcyBBdmUgQXB0LiAxNCcsXHJcbiAgY2l0eTogJ1NoZXJtYW4gT2FrcycsXHJcbiAgc3RhdGU6ICdDQScsXHJcbiAgemlwY29kZTogOTE0MDMsXHJcbiAgZW1haWw6ICdkYXZpZGFlZG1vbmRzb25AZ21haWwuY29tJyxcclxuICBwaG9uZTogJzgxOC44MDQuNzI1NScsXHJcbiAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS90aHJlZWhhbXMnLFxyXG4gIHByb2ZpbGU6ICdGdWxsLXN0YWNrIGRldmVsb3BlciB3aXRoIDQgeWVhcnMgb2YgZXhwZXJpZW5jZSBpbiBzb2Z0d2FyZSBkZXZlbG9wbWVudCBhbmQgUUEgZW5naW5lZXJpbmcsIHNwZWNpYWxpemluZyBpbiBhdXRvbWF0ZWQgdGVzdGluZyBhbmQgd2ViIGRldmVsb3BtZW50LicsXHJcbiAgZWR1Y2F0aW9uOiB7XHJcbiAgICBkZWdyZWU6ICdCYWNoZWxvciBvZiBGaW5lIEFydHMgLSBGaWxtIGFuZCBBbmltYXRpb24nLFxyXG4gICAgY29sbGVnZTogJ1JvY2hlc3RlciBJbnN0aXR1dGUgb2YgVGVjaG5vbG9neScsXHJcbiAgICBkYXRlOiBuZXcgRGF0ZSgyMDA1LCA2KVxyXG4gIH0sXHJcbiAgam9iczogW1xyXG4gICAge1xyXG4gICAgICB0aXRsZTogJ1NvZnR3YXJlIEVuZ2luZWVyJyxcclxuICAgICAgc3RhcnREYXRlOiBuZXcgRGF0ZSgyMDEyLCA2KSxcclxuICAgICAgZW5kRGF0ZTogbmV3IERhdGUoMjAxNSwgMyksXHJcbiAgICAgIGNvbXBhbnk6ICdTd2VldHkgSGlnaCcsXHJcbiAgICAgIGNvbXBhbnlMb2NhdGlvbjogJ01hcmluYSBEZWwgUmV5LCBDQScsXHJcbiAgICAgIHN1bW1hcnk6ICdGdWxsLXN0YWNrIGRldmVsb3BlciBmb3IgYSBzb2NpYWwgbmV0d29ya2luZyBzaXRlIGFuZCBtb2JpbGUgYXBwIEFQSSwgdXNpbmcgUmFpbHMsIE5vZGUuanMsIGpRdWVyeSwgYW5kIEFuZ3VsYXIuIFByb21vdGVkIGZyb20gUUEgRW5naW5lZXIgdG8gU29mdHdhcmUgRW5naW5lZXIgd2l0aGluIGZpcnN0IHllYXIuJyxcclxuICAgICAgYWNjb21wbGlzaG1lbnRzOiBbXHJcbiAgICAgICAgJ0J1aWx0IGEgY29udGVudCBtYW5hZ2VtZW50IHN5c3RlbSB3aXRoIFJhaWxzIHRvIG9yZ2FuaXplIGFsbCBwaG90b3MgYW5kIHZpZGVvcywgY29udGVzdHMsIGFuZCBjdXJhdGVkIGNvbW11bml0eSBwaG90by92aWRlbyBwbGF5bGlzdHMuJyxcclxuICAgICAgICAnRGV2ZWxvcGVkIGEgY29tbXVuaXR5IG1vZGVyYXRpb24gc3lzdGVtIHdpdGggUmFpbHMgZm9yIGFwcHJvdmFsIGFuZCByZWplY3Rpb24gb2YgdXNlciBwb3N0ZWQgdGV4dCwgcGhvdG9zLCBhbmQgdmlkZW9zLicsXHJcbiAgICAgICAgJ0J1aWx0IGEgUnVieSBvbiBSYWlscyBzZXJ2aWNlIHRoYXQgbWFuYWdlZCBhbGwgd2Vic2l0ZSBhbmQgbW9iaWxlIHVzZXIgYXV0aGVudGljYXRpb24sIGF1dGhvcml6YXRpb24sIGFjY291bnQsIHJlbGF0aW9uc2hpcCwgYW5kIGFnZSB2ZXJpZmljYXRpb24nLFxyXG4gICAgICAgICdXcm90ZSBhIGZ1bGwgc3VpdGUgb2YgbG9hZCB0ZXN0cywgaWRlbnRpZmllZCwgcmVtb3ZlZCwgb3Igb3B0aW1pemVkIHNsb3cgcXVlcmllcywgYW5kIGluY3JlYXNlZCB0aGUgbnVtYmVyIG9mIHBvc3NpYmxlIHJlcXVlc3RzIHBlciBzZWNvbmQgYnkgNDAwJS4nLFxyXG4gICAgICAgICdXcm90ZSB0aGUgYmFja2VuZCBBUEkgZm9yIHRoZSB2aWRlbyBjcmVhdGlvbiwgb3JnYW5pemF0aW9uLCBhbmQgc2hhcmluZyBzZWN0aW9uIG9mIHRoZSBzaXRlLicsXHJcbiAgICAgICAgJ0ludGVncmF0ZWQgYSBOb2RlLmpzIEFQSSB3aXRoIGEgdGhpcmQtcGFydHkgbW9kZXJhdGlvbiBzeXN0ZW0gdXNpbmcgYSByZWxpYWJsZSBtZXNzYWdlIHF1ZXVlLidcclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGl0bGU6ICdRQSBFbmdpbmVlcicsXHJcbiAgICAgIHN0YXJ0RGF0ZTogbmV3IERhdGUoMjAxMCwgOCksXHJcbiAgICAgIGVuZERhdGU6IG5ldyBEYXRlKDIwMTEsIDEyKSxcclxuICAgICAgY29tcGFueTogJ01ldGVvciBHYW1lcycsXHJcbiAgICAgIGNvbXBhbnlMb2NhdGlvbjogJ0JldmVybHkgSGlsbHMsIENBJyxcclxuICAgICAgc3VtbWFyeTogJ0RldmVsb3BlZCBwaXBlbGluZSBhbmQgdGVzdGluZyB0b29scyBhbmQgcGVyZm9ybWVkIGF1dG9tYXRlZCB0ZXN0aW5nIG9uIGZvdXIgRmFjZWJvb2sgZ2FtZXMuIFByb21vdGVkIGZyb20gUUEgVGVzdGVyIHRvIFFBIEVuZ2luZWVyIHdpdGhpbiBmaXJzdCB5ZWFyLicsXHJcbiAgICAgIGFjY29tcGxpc2htZW50czogW1xyXG4gICAgICAgICdBbmFseXplZCBjb250ZW50IGFuZCB0ZXN0IHdvcmtmbG93cyBmb3IgMjAgc3RhZmYgdG8gaWRlbnRpZnkgc291cmNlcyBvZiBpbmVmZmljaWVuY3ksIHByaW9yaXRpemUgdGFza3MsIGFuZCBkZXZlbG9wIGNvbnRlbnQgbWFuYWdlbWVudCBhbmQgZGVidWdnaW5nIHRvb2xzLCBzYXZpbmcgNEsgbWFuIGhvdXJzIGFuZCAkMTUwSyBhbm51YWxseS4nLFxyXG4gICAgICAgICdDcmVhdGVkIGEgc2V0IG9mIHNjcmlwdHMgdG8gc2ltcGxpZnkgYW5kIHZhbGlkYXRlIGRhdGFiYXNlIGVudHJ5IHdpdGggUHl0aG9uIGFuZCBTZWxlbml1bSwgd2hpY2ggcmVkdWNlZCByZWxhdGVkIGJ1Z3MgYnkgb3ZlciA5MCUsIGFuZCBxdWFkcnVwbGVkIGRlcGFydG1lbnQgcHJvZHVjdGlvbi4nLFxyXG4gICAgICAgICdBdXRvbWF0ZWQgdGlja2V0IHZhbGlkYXRpb24gYW5kIHBvcHVsYXRpb24gcHJvY2Vzc2VzIHdpdGggUHl0aG9uLCByZWR1Y2luZyB3ZWVrbHkgcHJvY2VzcyB0aW1lIGJ5IDE0IGhvdXJzLicsXHJcbiAgICAgICAgJ0J1aWx0IGFydCB2ZXJpZmljYXRpb24gdG9vbHMgdG8gZWxpbWluYXRlIHRlY2huaWNhbCBhcnQgaXNzdWVzLCBpbmNsdWRpbmcgYSBVSSB1c2VkIGJ5IGVpZ2h0IGFydGlzdHMgYW5kIHNpeCB0ZXN0ZXJzIHRoYXQgYWxsb3dlZCB0aGUgUUEgRGVwYXJ0bWVudCB0byB0ZXN0IGFydCB3ZWVrcyBpbiBhZHZhbmNlIG9mIGluLWdhbWUgYXBwZWFyYW5jZS4nLFxyXG4gICAgICAgICdUYXVnaHQgd2Vla2x5IGNsYXNzZXMgdG8gc2V2ZW4gdGVzdGVycyBvbiBKU09OLCBzcGVjaWZpYyBnYW1lIGRhdGEgZm9ybWF0cywga2V5Ym9hcmQgc2hvcnRjdXRzLCBhbmQgZWZmaWNpZW5jeS4nXHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdLFxyXG4gIHByb2plY3RzOiBbXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdLb2FuZ3VscGl0ZXN0aWZ5JyxcclxuICAgICAgc3VtbWFyeTogJ0Z1bGwtc3RhY2sgSlMgYm9pbGVycGxhdGUgcHJvamVjdCwgdXNlZCBhcyBhIGJhc2UgZm9yIG90aGVyIHByb2plY3RzLiBJbmNsdWRlcyBLb2EgYmFja2VuZCBhbmQgQW5ndWxhciBjb21wb25lbnQtYmFzZWQgZnJvbnRlbmQsIGFuZCBpcyBlbnRpcmVseSBidWlsdCBvbiBwcm9taXNlcy4gU2F2aW5nIGEgZmlsZSBzZWxlY3RpdmVseSB0cmlnZ2VycyBhc3NldCBjb21waWxhdGlvbiwgZnJvbnRlbmQvYmFja2VuZCB0ZXN0IHJ1bm5lcnMsIHNlcnZlciByZXN0YXJ0LCBhbmQgYnJvd3NlciByZWxvYWQgYXMgbmVlZGVkLicsXHJcbiAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vdGhyZWVoYW1zL2tvYW5ndWxwaXRlc3RpZnknXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAnRGVhdGggV2hpbXN5IFJvYWRtYXAnLFxyXG4gICAgICBzdW1tYXJ5OiAnUHVibGljIHNpdGUgdG8gc2hvdyBkZXZlbG9wbWVudCBwcm9ncmVzcyBvZiBhIGdhbWUgZGV2ZWxvcGVkIGJ5IFNxdWlkIEJsaW5rIEdhbWVzLiBXcml0dGVuIGluIEFuZ3VsYXIgYW5kIEtvYSwgd2l0aCBGbGV4Ym94IGFuZCBIVE1MNSBDYW52YXMuIFB1bGxzIGluZm9ybWF0aW9uIGZyb20gdGhlIEppcmEgQVBJIGFuZCByZWNlaXZlcyByZWFsdGltZSB1cGRhdGVzIHVzaW5nIEppcmEgd2ViaG9va3MuJyxcclxuICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS90aHJlZWhhbXMvZGVhdGgtd2hpbXN5LXJvYWRtYXAnXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAnR2FtZSBQcm90b3R5cGVzJyxcclxuICAgICAgc3VtbWFyeTogJ0ZvdXIgZ2FtZSBwcm90b3R5cGVzIHVzaW5nIHRoZSBQaGFzZXIgZ2FtZSBlbmdpbmUsIG1hZGUgaW4gMS0yIGRheXMgZWFjaC4gRG9uZSB0byBleHBsb3JlIHRoZSBkZXNpZ24gY29tcGxleGl0eSBvZiBnYW1lcywgYW5kIHBlcmZvcm1hbmNlIGRpZmZpY3VsdGllcyBpbiBtYWludGFpbmluZyA2MCBmcmFtZXMgcGVyIHNlY29uZC4nLFxyXG4gICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3RocmVlaGFtcy9waGFzZXItZ2FtZS1wcm90b3R5cGVzJ1xyXG4gICAgfVxyXG4gIF0sXHJcbiAgZXhwZXJ0aXNlOiBbXHJcbiAgICAnSmF2YXNjcmlwdCcsXHJcbiAgICAnQW5ndWxhckpTJyxcclxuICAgICdOb2RlLmpzJyxcclxuICAgICdSdWJ5IG9uIFJhaWxzJyxcclxuICAgICdBdXRvbWF0ZWQgVGVzdGluZydcclxuICBdLFxyXG4gIHNraWxsczogW1xyXG4gICAgJ1J1Ynkgb24gUmFpbHMnLFxyXG4gICAgJ0FuZ3VsYXJKUycsXHJcbiAgICAnSFRNTC9DU1MnLFxyXG4gICAgJ05vZGUuanMnXHJcbiAgXVxyXG59O1xyXG4iXX0=
