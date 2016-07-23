# Aim

Generating Open Graph HTML from object

# Installation

`npm install open-graph-response`

# Usage

````javascript
const OpenGraphResponse = require("open-graph-response"),
      og = new OpenGraphResponse((id, cb) => {
        const title = `Title for entity #${id}`;
        return cb(null, { title });
      });
og.html(1).then(console.log).catch(console.log);
````
