const configs = require('../../configs');
const is_reachable = require('is-reachable');
const uniqueRandomArray = require('./randomArray');


const proxies = () => {
    let proxy = uniqueRandomArray(configs.http.proxies);
    let check = is_reachable(proxy);

    switch (check) {
        case false:
            return proxies();

        default:
            return proxy;
    }

}

module.exports = {
    proxies,
}