const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("myAPI", {
  // Expose functions or objects here
});
