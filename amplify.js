const { writeFileSync  } = require('fs');
writeFileSync('src/amplifyconfiguration2.json', process.env[ 'AMPLIFY_CONFIGURATION']);

