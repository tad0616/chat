// 通知功能
export function notifyMe(title, msg) {
  let notifyConfig = {
    body: msg, // 設定內容
    icon: require("@/assets/images/chat.png"), // 設定 icon
  };
  if (!("Notification" in window)) {
    alert("此瀏覽器不支援通知功能");
  }

  // 用戶已授權
  else if (Notification.permission === "granted") {
    var notification = new Notification(title, notifyConfig);
  }
  // 用戶未拒絕者
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        var notification = new Notification(title, notifyConfig);
      }
    });
  }
  return notifyMe;
}
