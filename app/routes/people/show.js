import Ember from 'ember';

export default Ember.Route.extend( {
  setupController(controller, model) {
    this._super(...arguments);
    let person = controller.set('person', model);
    let people = null;
    this.get('store').find('district', parseInt(person.id)).then((data) => {
      let person_ids = data.store.peekAll('person').map( (person) =>  person.id  )
      this.get('store').query('person', { ids: person_ids }).then(function(data){
        controller.set('people', data.content)
      })
    })
  },
  model(params) {
    return this.store.find('person', params.person_id);
  }
});
