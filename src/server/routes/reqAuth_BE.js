/** reqAuth_BE.js */
/** This file is meant to house the "middleware" functions such as:
 *  - Ensuring that users are Logged In
 *  - Ensuring that users are NOT Logged In
 *  - etc.
 *
 */

function IS_LOGGED_OUT(req, res, next) {
  if (!req.session.user) {
    return next();
  } //Continue past middleware
  else {
    res
      .status(403)
      .send("ERROR: Forbidden. Action invalid whilst already logged in.");
  } //Abort
}

function IS_LOGGED_IN(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    res.status(401).send("ERROR: Unauthorized request. Please log in.");
  }
  // TODO: Check if this should be be a 403
}

module.exports = { IS_LOGGED_OUT, IS_LOGGED_IN };
