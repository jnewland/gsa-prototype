Gsa.Results = Class.create({
  initialize: function(json) {
    this.json = json;
    this._object = $H();
    this.parseJSON();
  },
  
  parseJSON: function () {
    //this is where the magic happens!
    this.set('query', this.json.Q);
    this.set('time', this.json.TM);
    this.set('results', []);
  },
  
  _each: function(iterator) {
    this.get('results')._each(iterator);
  },
  
  first: function() {
    return this.get('results')[0];
  },

  last: function() {
    return this.get('results')[this.get('results').size() - 1];
  },
  
  set: function(key, value) {
    return this._object[key] = value;
  },

  get: function(key) {
    return this._object[key];
  },

  unset: function(key) {
    var value = this._object[key];
    delete this._object[key];
    return value;
  },

  toObject: function() {
    return Object.clone(this._object);
  },
  
  size: function() {
    return this.get('results').length;
  },
});

Object.extend(Gsa.Results, Enumerable);