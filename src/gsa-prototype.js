/*  gsa-prototype, version 0.0.1
 *  (c) 2008 Jesse Newland
 *  jnewland@gmail.com
 *
 *  gsa-prototype is freely distributable under the terms of an MIT-style license.
 *--------------------------------------------------------------------------*/
var Gsa = Class.create({
  initialize: function(options) {
    
    //default options
    this.options = $H({
      domain : null,
      format: 'json',
      protocol: 'http://'
    }).update($H(options));
    
    //required options
    if (this.options.get('domain') == null)
      throw("'domain' argument required");
      
    //set some properties based on the options
    this.domain = this.options.get('domain');
  },
  
  add_script_tag: function() {
    var head = $('head')[0];                 
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = 'http://search.lexblog.com/search?q='+q+'&output=xml_no_dtd&client=json&site='+site+'&proxystylesheet=json&proxyreload=1&getfields=*&requiredfields=page_id:individual&start='+start+'&callback=displayResults';
    head.appendChild(newScript);
  }
});