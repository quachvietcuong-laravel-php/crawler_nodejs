const { proxies } = require('./proxies');


function ProxyDetail() {
    let proxy = proxies();

    let proxy_port = proxy.substring(proxy.lastIndexOf(":") + 1, proxy.length);
    let proxy_host = proxy.substr(0, proxy.indexOf(':'));

    return {
        address: proxy_host,
        port: parseInt(proxy_port)
    }
}

module.exports = ProxyDetail;