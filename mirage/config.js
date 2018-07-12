export default function() {
this.get('/votes');
this.get('/votes/:id');
this.post('/votes');
this.del('/votes/:id');
this.patch('/votes/:id');
this.get('/roles');
this.get('/roles/:id');
this.post('/roles');
this.del('/roles/:id');
this.patch('/roles/:id');
this.get('/districts');
this.get('/districts/:id');
this.post('/districts');
this.del('/districts/:id');
this.patch('/districts/:id');
this.get('/states');
this.get('/states/:id');
this.post('/states');
this.del('/states/:id');
this.patch('/states/:id');
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
