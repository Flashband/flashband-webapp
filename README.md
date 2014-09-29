Flashband Project
=========

*   Modules.
    * [api-server](https://github.com/Flashband/flashband-webapp/tree/fs/25-import-bracelets/api "api-server")
    * [web-application](https://github.com/Flashband/flashband-webapp/tree/fs/25-import-bracelets/web "web-application")

*   Suggestion to install node.
    * [ndenv](https://github.com/riywo/ndenv "ndenv")
    * [node-build](https://github.com/riywo/node-build "node-build")

Development dependencies:
==========
    $ ndenv install v0.10.31
    $ ndenv global v0.10.31
    $ ndenv rehash
    $ npm install -g yo gulp bower generator-gulp-angular
    $ ndenv rehash

Get sources
==========
    $ git clone git@github.com:Flashband/flashband-webapp.git flashband-web-server
    $ cd flashband-web-server/
    $ git fetch
    $ git checkout fs/25-import-bracelets

Project dependencies
==========
    $ bash install-flashband-project.sh
