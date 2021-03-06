import Ember from 'ember';
import SaveModelMixin from 'frontend/mixins/votes/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, {
  model: function() {
    return this.store.createRecord('vote');
  }
});
