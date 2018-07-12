import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Vote', {
  beforeEach: function() {
    application = startApp();
    originalConfirm = window.confirm;
    window.confirm = function() {
      confirmCalledWith = [].slice.call(arguments);
      return true;
    };
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
    window.confirm = originalConfirm;
    confirmCalledWith = null;
  }
});

test('visiting /votes without data', function(assert) {
  visit('/votes');

  andThen(function() {
    assert.equal(currentPath(), 'votes.index');
    assert.equal(find('#blankslate').text().trim(), 'No Votes found');
  });
});

test('visiting /votes with data', function(assert) {
  server.create('vote');
  visit('/votes');

  andThen(function() {
    assert.equal(currentPath(), 'votes.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new vote', function(assert) {
  visit('/votes');
  click('a:contains(New Vote)');

  andThen(function() {
    assert.equal(currentPath(), 'votes.new');


    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing vote', function(assert) {
  server.create('vote');
  visit('/votes');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'votes.edit');


    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing vote', function(assert) {
  server.create('vote');
  visit('/votes');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'votes.show');

  });
});

test('delete a vote', function(assert) {
  server.create('vote');
  visit('/votes');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'votes.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
