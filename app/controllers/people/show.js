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
      let vote = this.store.createRecord('vote', {})
      vote.set('voter', this.get('person'))
      vote.set('candidate', candidate)
      vote.save();
    }
  }
});
