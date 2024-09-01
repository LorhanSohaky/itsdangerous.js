import {TimestampSigner} from '../dist/index.js';

const signer = new TimestampSigner({secretKey: 'secret-key'});
const signature = await signer.sign('foo');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
try {
	await sleep(6000);
	// note: the following line will throw an error if the token is expired
	const data = await signer.unsign(signature, 5);
} catch (err) {
	console.log(err.name); // SignatureExpiredError
	console.log(err.message); // Signature age 6 > 5 seconds
}
