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
    if (!Object.isUndefined(this.json.RES)) { 
      this.set('start', this.json.RES.SN);
      this.set('end', this.json.RES.EN);
      this.set('total', this.json.RES.M);
      this.set('has_next', !!this.json.RES.NB && !!this.json.RES.NB.NU);
      this.set('has_previous', !!this.json.RES.NB && !!this.json.RES.NB.PU);
      this.set('results', $A(this.json.RES.R).map(function (value){
        return this.parseResult(value);
      }.bind(this)));
    } else {
      this.set('results', $A());
      this.set('start', 0);
      this.set('end', 0);
      this.set('total', 0);
      this.set('has_next', false);
      this.set('has_previous', false);
    }
  },
  
  parseResult: function (r) {
    r = $H(r);
    this.mappings.each(function (pair) {
      var key = pair.key, value = pair.value;
      if (Object.isString(r.get(key)) || Object.isNumber(r.get(key))) {
        r.set(value, new String(r.unset(key)).strip());
      } else if (key == 'FS' || key == 'MT'){
        var array = $A(r.unset(key));
        var hash = $H();
        array.each(function(item) {
          item = $H(item);
          var key = item.keys()[0];
          var value = item.values()[0];
          if (Object.isUndefined(hash.get(key))) {
           hash.update(item); 
          } else {
            if (Object.isString(hash.get(key))) {
              hash.set(key,$A([hash.get(key)]));
            }
            if (Object.isArray(hash.get(key))) {
              hash.get(key).push(value)
              //FIXME: totally inefficient
              var array = hash.get(key);
              array.toString = function() { return this.join(', ') }
              hash.set(key,array);
            }
          }
        });
        r.set(value, hash);
      } else if (!Object.isUndefined(r.get(key))){
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
    for (var i = 0, length = this.get('results').length; i < length; i++)
      iterator(this.get('results')[i]);
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
  
  toTemplateReplacements: function() {
    return this._object;
  }
});

Object.extend(Gsa.Results.prototype, Enumerable);