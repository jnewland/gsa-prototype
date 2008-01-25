Gsa = Class.create({

  initialize: function(domain, options) {

    //required options
    if (domain == null)
      throw("'domain' argument required");

    //default parameters for the request
    this.options = $H({
      output: 'xml_no_dtd',
      proxystylesheet: 'json',
      client: 'json',
      site: 'default_collection'
    }).update(this.parseOptions(options));

    //set some properties based on the options
    this.domain = domain;
  },
  
  _request: function(url) {
    return this.request = new Json.Request(url, { onComplete: this._response.bind(this) });
  },
  
  _response: function () {
    return this.results = new Gsa.Results(this.request.response);
  },
  
  search: function (q, options) {
    if (q == null || q.blank())
      return false;
    this.options.set('q', q);
    this.options.update(this.parseOptions(options));
    (this.options.onSearch || Prototype.emptyFunction)(this);
    this._request(this.buildUri());
    return true;
  },
  
  parseOptions: function (options) {
    var raw_options = $H(options);
    //sort
    if (!Object.isUndefined(raw_options.get('sort'))) {
      var sort = raw_options.get('sort');
      if (Object.isString(sort)) {
        raw_options.set('sort',('date:' + sort.replace('date:','')));
      } else if (Object.isHash($H(sort))) {
        try {
          sort = $H(sort);
          var mode = (sort.get('mode') == 'date') ? 'S' : 'L';
          var direction = (sort.get('direction') == 'ascending') ? 'A' : 'D';
          raw_options.set('sort','date:'+direction+':'+mode+':d1');
        } catch (e) {
          raw_options.set('sort','date:D:L:d1');
        }
      }
    }
    return raw_options;
  },
  
  buildUri: function () {
    var uriString = 'http://' + this.domain + '/search?' + this.options.toQueryString();
    return uriString;
  }
});
