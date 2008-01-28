Gsa.Results = Class.create({
  mappings: $H({
    CRAWLDATE: 'crawlDate',
    FS: 'details',
    LANG: 'lang',
    RK: 'rank',
    S: 'snippet',
    T: 'title',
    UD: 'url',
    MT: 'meta'
  }),
  
  initialize: function(json) {
    this.json = json;
    this._object = $H().toObject();
    this.parseJSON();
  },
  
  parseJSON: function () {
    this.set('query', this.json.Q);
    this.set('time', this.json.TM);
    this.set('start', this.json.RES.SN);
    this.set('end', this.json.RES.EN);
    this.set('total', this.json.RES.M);
    this.set('results', $A(this.json.RES.R).map(function (value){
      return this.parseResult(value);
    }.bind(this)));
  },
  
  parseResult: function (r) {
    r = $H(r);
    this.mappings.each(function (pair) {
      var key = pair.key, value = pair.value;
      if (Object.isString(r.get(key)) || Object.isNumber(r.get(key))) {
        r.set(value, new String(r.unset(key)).strip());
      } else {
        r.set(value, $H(r.unset(key)));
      }
    }.bind(r));
    return r;
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