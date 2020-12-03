require('dotenv').config();

const fetch = require('node-fetch');
var randomWords = require('random-words');
const { login } = require('./login');

async function generateUsers() {
	const { authToken, userId } = await login('prajval.admin', '123456');
	const serverUrl = 'http://localhost:3000';
	const usersToCreate = 1;

	for (let index = 0; index < usersToCreate; index++) {
		const name = randomWords();
		const surname = randomWords();

		fetch(`${serverUrl}/api/v1/users.create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Auth-Token': authToken,
				'X-User-Id': userId,
			},
			body: JSON.stringify({ name: `${name} ${surname}`, email: `${name}@${surname}.com`, password: '123456', username: `${name}.${surname}` }),
		})
			.then((res) => {
				console.log(index, res.status);
			})
			.catch((err) => {
				console.log(err);
			});
	}
}

generateUsers();
