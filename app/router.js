import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('people', function() {
    this.route('new');

    this.route('edit', {
      path: ':person_id/edit'
    });

    this.route('show', {
      path: ':person_id'
    });
  });
  this.route('states', function() {
    this.route('new');

    this.route('edit', { path: ':state_id/edit' });

    this.route('show', { path: ':state_id' }, function(){
      this.route('district', { path: '/district/:district_id'})
    });
  });
  this.route('districts', function() {
    this.route('new');

    this.route('edit', {
      path: ':district_id/edit'
    });

    this.route('show', {
      path: ':district_id'
    });
  });
  this.route('roles', function() {
    this.route('new');

    this.route('edit', {
      path: ':role_id/edit'
    });

    this.route('show', {
      path: ':role_id'
    });
  });
  this.route('votes', function() {
    this.route('new');

    this.route('edit', {
      path: ':vote_id/edit'
    });

    this.route('show', {
      path: ':vote_id'
    });
  });
});

export default Router;
