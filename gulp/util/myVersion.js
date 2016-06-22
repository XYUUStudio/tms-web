var dateFormat = require('dateformat');


module.exports = (function(){
    var _version = dateFormat(new Date(), "yyyymmddHHMMss");

    return function(){
        return _version;
    }
})();