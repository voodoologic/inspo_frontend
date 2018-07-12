import { computed } from '@ember/object';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { filterBy } from '@ember/object/computed';

export default Controller.extend({
  // candidates: Ember.computed('people', function(){
  //   return this.get('people').filter( (person) => person.isCandidate  )
  // })
  candidates(){
    return this.get('people').filterBy('isCandidate', true)
  },
  actions: {
    vote(candidate){
      this.store.createRecord('vote', {voter: this.get('person'), candidate: candidate}).save();
    }
  }
});
