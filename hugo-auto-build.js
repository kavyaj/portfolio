const { spawn } = require('child_process');
const path = require('path');

// Auto-build Hugo when content changes
function buildHugo() {
  console.log('Building Hugo site...');
  const hugo = spawn('hugo', ['-s', 'hugo-portfolio'], {
    stdio: 'pipe'
  });
  
  hugo.stdout.on('data', (data) => {
    console.log(`Hugo: ${data}`);
  });
  
  hugo.stderr.on('data', (data) => {
    console.error(`Hugo Error: ${data}`);
  });
  
  hugo.on('close', (code) => {
    if (code === 0) {
      console.log('Hugo build completed successfully');
    } else {
      console.error(`Hugo build failed with code ${code}`);
    }
  });
}

// Build on start
buildHugo();

module.exports = { buildHugo };