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

function getSessionUUID() {
  // Định nghĩa key để lưu trong sessionStorage
  const uuidKey = 'session_uuid';
  // Thử lấy UUID từ sessionStorage
  let sessionUUID = sessionStorage.getItem(uuidKey);
  // Nếu chưa có UUID trong session này
  if (!sessionUUID) {
    // Tạo một UUID mới bằng API của trình duyệt
    sessionUUID = crypto.randomUUID();
    
    // Lưu UUID mới vào sessionStorage
    sessionStorage.setItem(uuidKey, sessionUUID);
  }
  // Trả về UUID
  return sessionUUID;
}

_loadSource('script', {
    src: `https://testcdnamisapp.misacdn.net/support/libs/chat-customer-0.0.0/core.js`,
    type: 'text/javascript',
    onload: async () => {
        window.initAmisSupport({
            clientId: '1',
            identityId: getSessionUUID(),
            environment: 'TestOnline'
        });
    }
});
