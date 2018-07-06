# Herm network tools

[![NPM](https://nodei.co/npm/herm-js-network.png)](https://npmjs.org/package/herm-js-network)

Collection of network wrappers for Herm

## Network compensator

Allow you to interpolate values based on time thought network calls.

```javascript
import { NetworkCompensator } from 'herm-js';

const characterPosition = {
    x: new NetworkCompensator(0),
    y: new NetworkCompensator(0),
    z: new NetworkCompensator(0),
};

network.onValue((position) => {
    characterPosition.x.set(position),
    characterPosition.y.set(position),
    characterPosition.z.set(position),
});

...

// even if no network update is received, Herm interpolate and guess the next value

requestAnimationFrame(() => character.setPosition(characterPosition));
```