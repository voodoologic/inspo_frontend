'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'frontend',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      usingCors: true,
      apiURL: 'http://lvh.me:3000'
    },
    contentSecurityPolicyHeader: 'Content-Security-Policy',
    contentSecurityPolicy: {
      'default-src': [ "'none'" ],
      'script-src':  [ "'self'" , "http://inspo-rails:3000", "http://lvh.me:7020/livereload.js", "http://lvh.me:3000", "'unsafe-inline'" , "'unsafe-eval'" ],
      'font-src':    [ "'self'"],
      'connect-src': [ "'self'", "ws://lvh.me:7020/" , "http://lvh.me:3000", "http://inspo-rails:3000"],
      'img-src':     [ "'self'"],
      'report-uri':  ["'localhost'"],
      'style-src':   [ "'self'", "'unsafe-inline'" ],
      'frame-src':   ["'none'"]
    },
  };

  if (environment === 'development') {
    ENV['ember-cli-mirage'] = { enabled: false };
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
