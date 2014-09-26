flashband-api
=========
[![Codacy Badge](https://www.codacy.com/project/badge/9d6caced45da40b2bcd3ed5b913aa803)](https://www.codacy.com)
[![Circle CI](https://circleci.com/gh/oncast-labs/flashband-webapp.png?style=badge&circle-token=733e2af1886cc5a474f78cc72636689e9ee2c1ff)](https://circleci.com/gh/oncast-labs/flashband-webapp)

Install API
==========
    $ git clone git@github.com:oncast-labs/flashband-webapp.git flashband

    $ cd flashband/api/

    $ npm install


Run Tests
==========
    $ npm test

    or

    $ grunt test

Run Code Coverage
=================
  $ mocha --require blanket -R html-cov > [path-to-output.html]
  
  or

  $ grunt cov > [path-to-output.html]


  INFO: 

    instrumentation paths are defined in config.blanket from package.json


Run Code Analysis
=================
    $ npm run-script jshint


Start Server
=========
    $ npm start

