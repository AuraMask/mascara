# AuraMascara [![CircleCI](https://circleci.com/gh/AuraMask/mascara.svg?style=svg)](https://circleci.com/gh/AuraMask/mascara)

AuraMascara(mascara) brings metamask when metamask is not installed.

## Disclaimer:

AuraMascara is in alpha expect breaking changes

to use as a CDN put this script tag in the `<head>` of your html file:

```html
<script src="https://wallet.metamask.io/auramascara.js"></script>
```

or bring your own:

`npm i --save auramascara`

```js
const metamask = require('auramascara')
const EthJs = require('ethjs')

// mascara will use the environmental provider if the user brings one
// in the form of metamask extension, mist or parity
// other wise it will make one for you :}

const ethereumProvider = metamask.createDefaultProvider()

const eth = new EthJs(ethereumProvider)

// do stuff...
```

## Developing:

For development with [metamask-extension/mascara] to point the iframe at localhost just do:

```js
const metamask = require('auramascara')
const ethereumProvider = metamask.createDefaultProvider({
    host: 'http://localhost:9001'
  }) // or what ever port you use
```

## How does it work and how to use it:

Mascara is an iframe that acts as a proxy between your dapp and metamask core.
The metamask core is the global context housed in a service worker, it does the
key management for every dapp the user visits.

![nomnom](./images/nomnoml.png)


## todo's:

- [ ] have an option to load metamask core off IPFS (relies on metamask issue [2163])
- [ ] [Subresource Integrity]

[metamask-extension/mascara]: https://github.com/MetaMask/metamask-extension/tree/master/mascara
[2163]: https://github.com/MetaMask/metamask-extension/issues/2163
[Subresource Integrity]: https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
