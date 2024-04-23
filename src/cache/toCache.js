const cache = require('memory-cache');

exports.cachingData=(url,data,timeInCache)=>{
    cache.put(url,data,timeInCache);
}