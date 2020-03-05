const convict = require('convict');

const config = convict({
    env: {
        doc: "The application environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV"
    },
    db: {
        host: {
            doc: "Database host name/IP",
            format: '*',
            default: 'mongodb://localhost:27017'
        },
        name: {
            doc: "Database name",
            format: String,
            default: 'motiff-square'
        }
    }
})

var env = config.get('env');
config.loadFile('./config/' + env + '.json');

// Perform validation
config.validate({ allowed: 'strict' });
module.exports = config;