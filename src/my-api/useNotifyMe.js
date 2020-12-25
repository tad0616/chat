// 通知功能
export function notifyMe(title, msg, link = "") {
  let notifyConfig = {
    body: msg, // 設定內容
    icon: require("@/assets/images/chat.png"), // 設定 icon
  };
  if (!("Notification" in window)) {
    alert("此瀏覽器不支援通知功能");
  }

  // 用戶已授權
  else if (Notification.permission === "granted") {
    const notify = new Notification(title, notifyConfig);
    if (link) {
      notify.onclick = function(e) {
        e.preventDefault();
        window.open(link);
      };
    }
  }
  // 用戶未拒絕者
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notify = new Notification(title, notifyConfig);
        if (link) {
          notify.onclick = function(e) {
            e.preventDefault();
            window.open(link);
          };
        }
      }
    });
  }
  return notifyMe;
}
