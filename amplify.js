const { writeFileSync } = require('fs');
writeFileSync('./dist/amplifyconfiguration.json', process.env[ 'AMPLIFY_CONFIGURATION' ]);