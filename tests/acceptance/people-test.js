import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Person', {
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

test('visiting /people without data', function(assert) {
  visit('/people');

  andThen(function() {
    assert.equal(currentPath(), 'people.index');
    assert.equal(find('#blankslate').text().trim(), 'No People found');
  });
});

test('visiting /people with data', function(assert) {
  server.create('person');
  visit('/people');

  andThen(function() {
    assert.equal(currentPath(), 'people.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new person', function(assert) {
  visit('/people');
  click('a:contains(New Person)');

  andThen(function() {
    assert.equal(currentPath(), 'people.new');

    fillIn('label:contains(First name) input', 'MyString');
    fillIn('label:contains(Last name) input', 'MyString');
    fillIn('label:contains(Email) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing person', function(assert) {
  server.create('person');
  visit('/people');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'people.edit');

    fillIn('label:contains(First name) input', 'MyString');
    fillIn('label:contains(Last name) input', 'MyString');
    fillIn('label:contains(Email) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing person', function(assert) {
  server.create('person');
  visit('/people');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'people.show');

    assert.equal(find('p strong:contains(First name:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Last name:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Email:)').next().text(), 'MyString');
  });
});

test('delete a person', function(assert) {
  server.create('person');
  visit('/people');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'people.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
