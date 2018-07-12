import { computed } from '@ember/object';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { filterBy } from '@ember/object/computed';

export default Controller.extend({
  candidates: Ember.computed('people', function(){
    return this.get('people').filter( (person) => person.isCandidate  )
  })
});
