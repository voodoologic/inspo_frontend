import DS from 'ember-data';

export default DS.Model.extend({
  voter: DS.belongsTo('person'),
  candidate: DS.belongsTo('candidate')
});
