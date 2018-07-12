import DS from 'ember-data';
//import { filterBy } from '@ember/object/computed';


export default DS.Model.extend({
  name: DS.attr('string'),
  state: DS.belongsTo('state'),
  people: DS.hasMany('people')
});
