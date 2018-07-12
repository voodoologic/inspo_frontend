import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: State', {
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

test('visiting /states without data', function(assert) {
  visit('/states');

  andThen(function() {
    assert.equal(currentPath(), 'states.index');
    assert.equal(find('#blankslate').text().trim(), 'No States found');
  });
});

test('visiting /states with data', function(assert) {
  server.create('state');
  visit('/states');

  andThen(function() {
    assert.equal(currentPath(), 'states.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new state', function(assert) {
  visit('/states');
  click('a:contains(New State)');

  andThen(function() {
    assert.equal(currentPath(), 'states.new');

    fillIn('label:contains(Name) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing state', function(assert) {
  server.create('state');
  visit('/states');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'states.edit');

    fillIn('label:contains(Name) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing state', function(assert) {
  server.create('state');
  visit('/states');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'states.show');

    assert.equal(find('p strong:contains(Name:)').next().text(), 'MyString');
  });
});

test('delete a state', function(assert) {
  server.create('state');
  visit('/states');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'states.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
