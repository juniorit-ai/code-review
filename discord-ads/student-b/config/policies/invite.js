'use strict';

/**
 * `invite` policy.
 */

module.exports = async (ctx, next) => {
  // Add your own logic here.
  console.log('In invite policy.');

  await next();
};
