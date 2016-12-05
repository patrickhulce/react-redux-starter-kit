if (__DEV__) {
  module.exports = require('react-router').hashHistory
} else {
  module.exports = require('react-router').browserHistory
}
