GSA Prototype
=============

Prototype / Javascript wrapper for the Google Search Appliance Search Protocol. Fancy cross-domain JSON support included.

Install
=======

gsa-prototype requires a custom XSL be installed on your Google Search Appliance

* Login to the GSA Admin Console
* Click 'Serving' on the sidebar
* Create a new frontend named 'json'
* Click 'Edit' beside the newly created frontend
* Click 'Edit underlying XSLT code'
* Select 'Import Stylesheet'
* Import the template at xsl/json.xsl
* Done!

Usage
=====

```
var gsa = new Gsa('foo.com')
``` 
```
gsa.search('jesse newland')
```

true

```
gsa.results.first().get('title')
```

"LexBlog IT Director talks about today&#39;s platform upgrade : Real **...**"

```
gsa.results.first().get('url')
```

"http://kevin.lexblog.com/2007/07/articles/cool-stuff/lexblog-it-director-talks-about-todays-platform-upgrade/"

See inline documentation in gsa.js for more details.