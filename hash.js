'use strict';

const Crypto  = require('crypto');

/**
 * Calculate SHA256 of a specified String
 * @param {String} source Clear text
 * @return {String}       Cipher text
 */
const GenerateSHA256 = (source) => {
  let cleanString = Sanitizer.sanitize(source);
  return Crypto.createHash('sha256').update(cleanString).digest('hex');
};

/**
 * Generate the Salting Key
 * @type {String}
 */
const mash_key = GenerateSHA256(Math.random().toString(36));

/**
 * Hash Function of Admin Password
 * @param {String} raw Clear Text
 * @return {String} Encrypted Password
 */
const mash_fnc = (raw) => {
  return GenerateSHA256(`${mash_key}${GenerateSHA256(raw)}${mash_key}`);
};

module.exports = {
  hash_key: mash_key,
  hash_fnc: mash_fnc
};
