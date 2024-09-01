import {Signer} from '../dist/index.js';

const signer = new Signer({secretKey: 'secret-key'})
const signature = await signer.sign('foo')

const data = await signer.unsign(signature, 5)
const original = new TextDecoder().decode(data)
console.log(original); // foo

