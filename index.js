'use strict';

const Restify = require('restify');
const App     = Restify.createServer();
const Storage = require('./storage');
const Hash    = require('./hash');

let StorageInst = new Storage();

/**
 * Get key from environment variables
 * Error if Such Key Not Found. Important for Session Security
 * Generate a random key on development environment.
 */
if (!process.env.BOOT_KEY) {
  throw new Error('Crictical Error: No Initial Admin Password Defined.');
}
const boot_key = process.env.BOOT_KEY;
// Dispose the key in runtime to prevent leakage, umm...
delete process.env.BOOT_KEY;

// Save Password
StorageInst.setPassword(Hash.hash_fnc(boot_key));

App.use(Restify.bodyParser({ mapParams: true }));

App.post('/', (req, res, next) => {
  StorageInst.setPassword(Hash.hash_fnc(req.body.password));
  res.send(200, {
    password: Hash.hash_fnc(req.body.password)
  });
  return next();
});

App.post('/validate', (req, res, next) => {
  if (StorageInst.getPassword() === Hash.hash_fnc(req.body.password)) {
    res.send(200, {});
  } else {
    res.send(403);
  }
  return next();
});

App.listen(3000, () => {
  console.log('%s listening at %s', App.name, App.url);
});
