Gsa.Results = Class.create({
  mappings: $H({
    CRAWLDATE: 'crawlDate',
    FS: 'details',
    LANG: 'lang',
    RK: 'rank',
    S: 'snippet',
    T: 'title',
    UD: 'url',
    MT: 'meta',
    UE: 'encoded_url'
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
    
    //cache_url
    r.unset('U');
    if (!Object.isUndefined(r.get('HAS')) && !Object.isUndefined(r.get('HAS').C) && !Object.isUndefined(r.get('HAS').C.SZ)) {
      r.set('cache_url', 'search?q=cache:'+r.get('HAS').C.CID+':'+r.get('encoded_url'))
    }
    r.unset('HAS');
    
    //toTemplateReplacements
    r.toTemplateReplacements = function () {
      hash = r.clone();
      hash.each(function (pair) {
        var key = pair.key, value = pair.value;
        if (!Object.isString(value) && !Object.isNumber(value)) {
          hash.set(key,value._object);
        }
      });
      return hash._object;
    }.bind(r);
    
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