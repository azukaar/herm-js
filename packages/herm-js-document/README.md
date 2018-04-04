
[![CircleCI](https://circleci.com/gh/azukaar/herm-js/tree/master.svg?style=shield)](https://circleci.com/gh/azukaar/herm-js/tree/master) [![Coverage Status](https://coveralls.io/repos/github/azukaar/herm-js/badge.svg?branch=master)](https://coveralls.io/github/azukaar/herm-js?branch=master) [![js-airbnb-style](https://img.shields.io/badge/code%20style-Airbnb-brightgreen.svg)](https://www.npmjs.com/package/eslint-config-airbnb-base)

# Herm document system

[![NPM](https://nodei.co/npm/herm-js-document.png)](https://npmjs.org/package/herm-js-document)

This module allow you to create a "git like" sync system for documents in JS with automatic conflict resolution. With this module, you can edit multiple instances of the same document and merge them in a queue, the module will solve the conflict by itself.

# Installation

You can either use it via NPM (for Node or bundled modules)

```
npm install herm-js-document
```

or via ES6 modules

```js
<script type="module">
    import HermDoc from '//unpkg.com/herm-js-document';
    let doc = new HermDoc();
</script>
```

# Usage

For plain text :

```js
let doc = new HermDoc();
doc.push(0, "Hello");

let doc2 = doc.duplicate();

doc.push(6, " world");
doc2.push(6, " !");

console.log("doc1 : ", doc.display()); // doc1 :  Hello world
console.log("doc2 : ", doc2.display()); // doc2 :  Hello !

doc = doc.merge(doc2); // first merge 
console.log("doc(first merge) : ", doc.display()); // doc(first merge) :  Hello world !

doc2.push(7, "?");
console.log("doc2(updated) : ", doc2.display()); // doc2(updated) : Hello ?!

doc = doc.merge(doc2); // no duplicates, even with outdated documents

console.log("doc(merged with outdated) : ", doc.display()); // doc(merged with outdated) :  Hello world ?!

doc.deleteRange(0, 6);

console.log("doc(delete)  : ", doc.display()); // doc(merged with outdated) : world ?!
```

For JSON : 

```js
let docJson = new HermJsonDoc();
docJson.key = "123";
console.log(docJson.display()) // {key: "123"}

let docJson2 = docJson.duplicate();
docJson2.key = "5";
docJson2.key2 = "7";

docJson = docJson.merge(docJson2);

console.log(docJson.display()) // {key: "5", key2: "7"}
```