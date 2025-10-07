// ==UserScript==
// @name         DOFinanceBackupHelper
// @namespace    dugout-online
// @version      1.0
// @author       Osvaldo Junior (clubid/113242)
// @description  Export and import IndexedDB data (DOFinanceDatabase) for Dugout-Online
// @match        *://*.dugout-online.com/*
// @grant        GM_registerMenuCommand
// @grant        GM_download
// @grant        GM_openInTab
// @homepage     https://github.com/osvdel/DOFinanceBackupHelper
// @downloadURL  https://github.com/osvdel/DOFinanceBackupHelper.js
// ==/UserScript==

(function() {
  'use strict';

  const DB_NAME = "DOFinanceDatabase";

  // ============ EXPORT FUNCTION ============
  async function exportIndexedDB() {
    try {
      const request = indexedDB.open(DB_NAME);
      request.onsuccess = event => {
        const db = event.target.result;
        const transaction = db.transaction(db.objectStoreNames, "readonly");
        const exportData = {};
        let remaining = db.objectStoreNames.length;

        for (const storeName of db.objectStoreNames) {
          const store = transaction.objectStore(storeName);
          const getAllReq = store.getAll();
          getAllReq.onsuccess = () => {
            exportData[storeName] = getAllReq.result;
            if (--remaining === 0) {
              const json = JSON.stringify(exportData, null, 2);
              const blob = new Blob([json], { type: "application/json" });
              GM_download({
                url: URL.createObjectURL(blob),
                name: `${DB_NAME}.json`,
                saveAs: true
              });
              alert("✅ Database exported successfully!");
            }
          };
        }
      };
      request.onerror = e => alert("❌ Error opening DB: " + e.target.error);
    } catch (err) {
      alert("❌ Export failed: " + err.message);
    }
  }

  // ============ IMPORT FUNCTION ============
  async function importIndexedDB() {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/json';
      input.onchange = async e => {
        const file = e.target.files[0];
        const text = await file.text();
        const importData = JSON.parse(text);

        const request = indexedDB.open(DB_NAME);
        request.onupgradeneeded = event => {
          const db = event.target.result;
          for (const storeName in importData) {
            if (!db.objectStoreNames.contains(storeName)) {
              db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
            }
          }
        };
        request.onsuccess = event => {
          const db = event.target.result;
          for (const storeName in importData) {
            const tx = db.transaction(storeName, "readwrite");
            const store = tx.objectStore(storeName);
            for (const item of importData[storeName]) store.put(item);
          }
          alert("✅ Database imported successfully!");
        };
      };
      input.click();
    } catch (err) {
      alert("❌ Import failed: " + err.message);
    }
  }

  // ============ ADD MENU OPTIONS ============
  GM_registerMenuCommand("💾 Export DOFinanceDatabase", exportIndexedDB);
  GM_registerMenuCommand("📂 Import DOFinanceDatabase", importIndexedDB);
})();
