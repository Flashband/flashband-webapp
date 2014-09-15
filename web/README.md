Flashband Web Application
=========

*   [Install](https://github.com/Flashband/flashband-webapp/tree/fs/25-import-bracelets "Install")

Unit Tests
==========
    $ gulp test

E2E testing with mocked requests.
==========
    $ gulp protractor

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
