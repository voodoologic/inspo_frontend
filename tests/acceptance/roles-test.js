import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Role', {
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

test('visiting /roles without data', function(assert) {
  visit('/roles');

  andThen(function() {
    assert.equal(currentPath(), 'roles.index');
    assert.equal(find('#blankslate').text().trim(), 'No Roles found');
  });
});

test('visiting /roles with data', function(assert) {
  server.create('role');
  visit('/roles');

  andThen(function() {
    assert.equal(currentPath(), 'roles.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new role', function(assert) {
  visit('/roles');
  click('a:contains(New Role)');

  andThen(function() {
    assert.equal(currentPath(), 'roles.new');

    fillIn('label:contains(Name) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing role', function(assert) {
  server.create('role');
  visit('/roles');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'roles.edit');

    fillIn('label:contains(Name) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing role', function(assert) {
  server.create('role');
  visit('/roles');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'roles.show');

    assert.equal(find('p strong:contains(Name:)').next().text(), 'MyString');
  });
});

test('delete a role', function(assert) {
  server.create('role');
  visit('/roles');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'roles.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
