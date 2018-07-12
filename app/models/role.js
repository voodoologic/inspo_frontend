import DS from 'ember-data';

export default DS.Model.extend({
  roleType: DS.attr('string'),
  person: DS.hasMany('person')
});
