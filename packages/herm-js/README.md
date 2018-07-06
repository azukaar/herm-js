
[![CircleCI](https://img.shields.io/circleci/project/github/azukaar/herm-js.svg)](https://circleci.com/gh/azukaar/herm-js/tree/master) [![Coverage Status](https://img.shields.io/coveralls/github/azukaar/herm-js.svg)](https://coveralls.io/github/azukaar/herm-js?branch=master) [![js-airbnb-style](https://img.shields.io/badge/code%20style-Airbnb-brightgreen.svg)](https://www.npmjs.com/package/eslint-config-airbnb-base)

# Herm JS

[![NPM](https://nodei.co/npm/herm-js.png)](https://npmjs.org/package/herm-js)

Herm-js is a networking framwork with collection of tools and functionnalities to provide powerful and flexible networking capabilities to Javascript

```
npm install herm-js
```

```javascript
import { NetworkCompensator, HermDoc } from 'herm-js';
```

Here's the breakdown of internal packages : 

# Herm-js-document

[![NPM](https://nodei.co/npm/herm-js-document.png)](https://npmjs.org/package/herm-js-document)

This module allow you to create a "git like" sync system for documents in JS with automatic conflict resolution. With this module, you can edit multiple instances of the same document and merge them in a queue, the module will solve the conflict by itself.

# Herm-js-network

[![NPM](https://nodei.co/npm/herm-js-network.png)](https://npmjs.org/package/herm-js-network)

Allow you to interpolate values based on time thought network calls.