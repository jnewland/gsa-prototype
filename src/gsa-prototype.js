/*  gsa-prototype, version 0.0.1
 *  (c) 2008 Jesse Newland
 *  jnewland@gmail.com
 *
 *  gsa-prototype is freely distributable under the terms of an MIT-style license.
 *--------------------------------------------------------------------------*/
var Gsa = Class.create({
  initialize: function(domain) {
    this.domain = domain;
  },
  domain: function() {
    return this.domain;
  }
});