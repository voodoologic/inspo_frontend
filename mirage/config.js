export default function() {
this.get('/people');
this.get('/people/:id');
this.post('/people');
this.del('/people/:id');
this.patch('/people/:id');

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  this.passthrough('/people');
  this.urlPrefix = 'http://lvh.me:3000';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = '/api/v1';    // make this `/api`, for example, if your API is namespaced
  this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.get('/people');

//    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
}
