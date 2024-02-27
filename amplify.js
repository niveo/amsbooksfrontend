const { writeFileSync } = require('fs');
console.log('Iniciado AMPLIFY_CONFIGURATION')
console.log(process.env[ 'AMPLIFY_CONFIGURATION' ])
writeFileSync('./dist/amplifyconfiguration.json', process.env[ 'AMPLIFY_CONFIGURATION']);
console.log('Finalizado AMPLIFY_CONFIGURATION')