const { execSync } = require('child_process')
const { mkdirSync, writeFileSync } = require('fs');

console.log('cloning legacy angularjs app..')
execSync(`cd packages && rm -rf conduit && git clone git@github.com:gothinkster/angularjs-realworld-example-app.git ./conduit`)

console.log('creating shell boilerplate files...');
const shellPath = 'packages/shell/src';
mkdirSync(shellPath, 0744);
writeFileSync(shellPath + '/index.js', '');
writeFileSync(shellPath + '/index.html', `<script src="index.js" type="module"></script>`);

console.log('creating createa-app for todos..')
execSync(`cd packages/todos && npx create-react-app .`)

console.log('Done!')