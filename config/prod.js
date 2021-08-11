
var dbuser = process.env.DB_USER;
var dbpass = process.env.DB_PASS;
module.exports = {
	'url': `mongodb+srv://${dbuser}:${dbpass}@cluster0.ji60s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
};
