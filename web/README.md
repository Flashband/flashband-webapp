Flashband Web Application
=========

*   [Install](https://github.com/Flashband/flashband-webapp/tree/fs/25-import-bracelets "Install")

Unit Tests
==========
    $ gulp test

E2E testing with mocked requests.
==========
    $ gulp protractor


* to run tests from specifc file(s)

  * in other console, tab, etc... 'gulp serve' (or start the API)
    
    $ protractor test/protractor.conf.mocked.js --specs 'path.to.spec.1.js[,path.to.spec.2.js[,...]]'

E2E testing without mocked requests.
==========
Before run tests, needed prepare server api.

    $ gulp protractor:api

Development real time with watcher
==========
    $ gulp serve

Run Code Analysis
==========
    $ gulp scripts
