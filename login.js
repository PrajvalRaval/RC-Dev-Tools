const axios = require('axios');

const login = async (user, password) =>
	await axios
		.post(
			`http://localhost:3000/api/v1/login`,
			{ user, password },
			{
				'Content-Type': 'application/json',
			},
		)
		.then((res) => res.data)
		.then((res) => {
			return {
				authToken: res.data.authToken,
				userId: res.data.userId,
			};
		})
		.catch((err) => {
			console.log(err);
		});

module.exports.login = login;
