/**
 * Load file
 * @author NTSAN 08.06.2025
 */
function _loadSource(tag, config) {
    var el = document.createElement(tag);
    if (config) {
        for (let i in config) {
            el[i] = config[i];
        }
    }
    document.head.appendChild(el);
}

_loadSource('script', {
    src: `https://testcdnamisapp.misacdn.net/support/libs/chat-customer-0.0.0/core.js`,
    type: 'text/javascript',
    onload: async () => {
        window.initAmisSupport({
            clientId: '1',
            identityId: '1',
            environment: 'TestOnline'
        });
    }
});
