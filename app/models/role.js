import DS from 'ember-data';

export default DS.Model.extend({
  roleType: DS.attr('string'),
  people: DS.belongsTo('person')
});
