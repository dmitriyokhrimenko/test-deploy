const pm2 = require('pm2');
const process = require('process');

pm2.connect(function(err) {
  if (err) {
    console.error(err);
    process.exit(2);
  }
  else {   
    pm2.start({
      script            : './src/main.ts',
      name              : 'Ryde Core',
      interpreter_args  : '--experimental-modules --experimental-specifier-resolution=node',
      shutdown_with_message: true 
    }, function(err, apps) {
      if (err) {
        console.error(err);
        return pm2.disconnect()
      }
    })
  }
})