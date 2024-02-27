const { writeFileSync } = require('fs');
writeFileSync('./src/amplifyconfiguration.json', process.env[ 'AMPLIFY_CONFIGURATION']);