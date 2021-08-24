
const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASS;
const secret = process.env.SECRET;

module.exports = {
	'url': `mongodb+srv://${dbuser}:${dbpass}@cluster0.ji60s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
};
