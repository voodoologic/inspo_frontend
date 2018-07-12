import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: District', {
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

test('visiting /districts without data', function(assert) {
  visit('/districts');

  andThen(function() {
    assert.equal(currentPath(), 'districts.index');
    assert.equal(find('#blankslate').text().trim(), 'No Districts found');
  });
});

test('visiting /districts with data', function(assert) {
  server.create('district');
  visit('/districts');

  andThen(function() {
    assert.equal(currentPath(), 'districts.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new district', function(assert) {
  visit('/districts');
  click('a:contains(New District)');

  andThen(function() {
    assert.equal(currentPath(), 'districts.new');

    fillIn('label:contains(Name) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing district', function(assert) {
  server.create('district');
  visit('/districts');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'districts.edit');

    fillIn('label:contains(Name) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing district', function(assert) {
  server.create('district');
  visit('/districts');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'districts.show');

    assert.equal(find('p strong:contains(Name:)').next().text(), 'MyString');
  });
});

test('delete a district', function(assert) {
  server.create('district');
  visit('/districts');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'districts.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
