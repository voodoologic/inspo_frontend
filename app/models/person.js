import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  district: DS.belongsTo('district'),
  roles: DS.hasMany('role'),
  voted_for: DS.belongsTo('vote', { inverse: 'voter' }),
  voted_by: DS.hasMany('vote', { inverse: 'candidate' }),
  voteable: computed('roles', function(){
    return this.get('roles').any((role) => { return role.get('roleType') == 'voter'})
  }),
  isCandidate: computed('roles.[]', function(){
    return this.get('roles').any((role) => role.get('roleType') == 'candidate' )
  })

});
