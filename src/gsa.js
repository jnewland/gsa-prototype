Gsa = Class.create({

  initialize: function(domain, options) {

    //required options
    if (domain == null)
      throw("'domain' argument required");

    //default parameters for the request
    this.options = $H({
      output: 'xml_no_dtd',
      proxystylesheet: 'json'
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
    return $H(options);
  },
  
  buildUri: function () {
    var uriString = 'http://' + this.domain + '/search?' + this.options.toQueryString();
    return uriString;
  }
});
