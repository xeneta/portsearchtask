# My First Xeneta

We are providing a simplified real-world usage scenario of a core
Xeneta feature. In our system, users are given the option to search
for origin and destination ports by name, and see a visualisation of
the price development over a selected period of time. We provide a
small backend with three API endpoints that return port information,
do a simple string search, or return the time-series information about
the prices. Your task is to develop an interface for the actions
described below.



## Usage

```sh
# Install dependencies
$ npm install

# Single build
$ npm run build

# Development server at localhost:3000
$ npm start

# Watcher build (Rebuilds on file changes) + Development server at localhost:3000
$ npm run watch
```

# Task
Create a simple port-to-port search page, with visualization of the freight rates over time, on a provided port-port
combination, within a customizable date range.

* Make it pretty-ish, using your awesome CSS skills
* Make it efficient, limit network use, and load fast
* Feel free to add your personal flair

Please read the full document for the details on the build process and the APIs. 

# Building
The project will build HTML using EJS templates from the `views` folder. Client-side JavaScript is built
from the `src/index.js` entrypoint with Webpack 4 and Babel 7. CSS is currently loaded
statically from the `public/stylesheets` folder.

You are free to install any frameworks, libraries, and software you want using NPM or Yarn. You can also change
any aspect of the build process if needed. For example, the build setup supports React/JSX out of the box,
but if you are more comfortable using for example Vue.js, we're not going to stop you.

# API
Provided is a simple web server, with an API that allows looking up ports and querying for time-series of freight
rates between the respective ports. It is available from http://localhost:3000/

## /api/ports/:id
Returns a single port based on the provided port code. (NOOSL, CNSGH, NLRTM)

```json
{"id":"NOOSL","country":"NO","name":"Oslo"}
```

## /api/ports/search/:query
Free text search for port codes and port names. Returns an object with matching ports.

```json
{"results":[{"id":"CNSGH","country":"CN","name":"Shanghai"},{"id":"CNSTG","country":"CN","name":"Shantou"}]}
```

## /api/rates/:origin/:destination/:fromdate/:todate
Returns a timeseries of rates from port to port, within the given time-period. `origin` and `destination`
are port codes, the date formats are ISO-8601 dates, e.g. `2018-06-30`.
https://github.com/xeneta/portsearchtask
This returns an object containing a time-series of freight rates. The time-series is an array of arrays,
containing the date and the price for that given day.

```json
{"rates":[["2018-06-30",1972],["2018-07-01",2022],["2018-07-02",2022],["2018-07-03",2022]]}
```

Note that the dataset only contains data between `2017-08-30` and `2018-06-30`. If there is no rate available
on a specific date within the dataset, the price is set to `null`.

# Evaluation
When evaluating the code, we will install dependencies, run a single build, then start the development server.
