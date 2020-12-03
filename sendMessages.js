const fetch = require('node-fetch');
var randomWords = require('random-words');
const { login } = require('./login');

async function sendMessages() {
	const { authToken, userId } = await login('prajval.admin', '123456');
	const serverUrl = 'http://localhost:3000';
	const messagesToSend = 1;

	for (let index = 0; index < messagesToSend; index++) {
		const a = randomWords(4);

		fetch(`${serverUrl}/api/v1/chat.sendMessage`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Auth-Token': authToken,
				'X-User-Id': userId,
			},
			body: JSON.stringify({ message: { rid: 'GENERAL', msg: `${a[0]} ${a[1]} ${a[2]} ${a[3]}` } }),
		})
			.then((res) => {
				console.log(index, res.status);
			})
			.catch((err) => {
				console.log(err);
			});
	}
}

sendMessages();
