<div align="center">

# itsdangerous.js

**... so better sign this.**

> Note: This is an unofficial JavaScript port of the Python library
> [itsdangerous](https://github.com/pallets/itsdangerous).

Various helpers to pass data to untrusted environments and to get it back safe and sound. Data is cryptographically
signed to ensure that a token has not been tampered with.

It's possible to customize how data is serialized. Data is compressed as needed. A timestamp can be added and verified
automatically while loading a token.



[Features](#features) |
[Installation](#installation) |
[Usage](#usage) |
[License](#license) |
[Contributing](#contributing)

</div>

## Status
<a href="https://github.com/hampuskraft/itsdangerous.js/blob/master/LICENSE.md"><img alt="License" src="https://img.shields.io/github/license/hampuskraft/itsdangerous.js?style=flat-square"></a>
<a href="https://github.com/hampuskraft/itsdangerous.js/issues"><img alt="Issues" src="https://img.shields.io/github/issues/hampuskraft/itsdangerous.js?style=flat-square"></a>
<a href="https://github.com/hampuskraft/itsdangerous.js/pulls"><img alt="Pull requests" src="https://img.shields.io/github/issues-pr/hampuskraft/itsdangerous.js?style=flat-square"></a>
<a href="https://github.com/hampuskraft/itsdangerous.js/actions"><img alt="Actions" src="https://img.shields.io/github/checks-status/hampuskraft/itsdangerous.js/main?style=flat-square
"></a>

## Features

- URL safe serialization
- URL safe signing
- URL safe timestamp signing
- Secret key rotation
- Allows different digest algorithms (SHA1, SHA256, SHA512, etc.)

## Installation

```sh
npm install itsdangerous.js
```

## Usage

Below are some interesting use cases and basic examples. For more examples, see the [examples](examples) directory.

### Use Case

- Sign a user ID in a URL and email it to them to unsubscribe from a newsletter. This way you don’t need to generate one-time tokens and store them in the database. Same thing with any kind of activation link for accounts and similar things.

- Signed objects can be stored in cookies or other untrusted sources which means you don’t need to have sessions stored on the server, which reduces the number of necessary database queries.

- Signed information can safely do a round trip between server and client in general which makes them useful for passing server-side state to a client and then back.


### URL Safe Serialization

```js
import {URLSafeSerializer} from 'itsdangerous.js';

const authSerializer = new URLSafeSerializer({secretKey: 'secret key', salt: 'auth'});
const token = await authSerializer.stringify({id: 5, name: 'itsdangerous'});

console.log(token); // eyJpZCI6NSwibmFtZSI6Iml0c2Rhbmdlcm91cyJ9.6YP6T0BaO67XP--9UzTrmurXSmg

const data = await authSerializer.parse(token);
console.log(data.name); // itsdangerous
```

### URL Safe Timed Serialization

```js
import {URLSafeTimedSerializer} from 'itsdangerous.js';

const authSerializer = new URLSafeTimedSerializer({secretKey: 'secret key', salt: 'auth'});
const token = await authSerializer.stringify({id: 5, name: 'itsdangerous'});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
try{
	await sleep(6000);
	// note: the following line will throw an error if the token is expired
	const data = await authSerializer.parse(token, undefined, 5, true);
}catch(err){
	console.log(err.name); // SignatureExpiredError
	console.log(err.message); // Signature age 6 > 5 seconds
}

```

## License

This project follows the [MIT license](LICENSE).

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details the process for submitting pull requests to us.
