if (process.env.NODE_ENV === 'production') {
	module.exports = require('./prod');

} else {
	console.log('development');
	module.exports = require('./dev');
}
