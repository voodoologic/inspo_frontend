import DS from 'ember-data';
import { computed } from '@ember/object';
import { filterBy } from '@ember/object/computed';


export default DS.Model.extend({
  name: DS.attr('string'),
  state: DS.belongsTo('state'),
  people: DS.hasMany('people'),
  candidates: filterBy('people', 'isCandidate', true)
});
