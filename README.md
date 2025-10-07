# 💾 DO Finance Backup Helper (Tampermonkey Script)

A simple helper script to **export and import** your Dugout-Online finance data ('DOFinanceDatabase') stored in **IndexedDB**, so you don’t lose your historical financial information when changing computers or browsers.

---

## 📦 Features

- 🧠 Backup and restore all your **DOFinanceDatabase** data  
- 💻 Works directly through **Tampermonkey menu commands**  
- 📂 Exports data to a human-readable `.json` file  
- 🔄 Imports data from a previous backup file  
- ✅ No need to use browser developer tools or IndexedDB manually

---

## ⚙️ Requirements

- A modern browser (Chrome, Edge, Firefox, etc.)
- [Tampermonkey extension](https://www.tampermonkey.net/) installed
- Your Dugout-Online finance script already running on the same site

---

## 🚀 Installation

1. Open Tampermonkey in your browser
2. Click the link below to install directly:
👉 [**Install DOFinanceBackupHelper.js**](https://raw.githubusercontent.com/osvdel/DOFinanceBackupHelper/main/DOFinanceBackupHelper.user.js)
3. Tampermonkey will open and ask you to confirm installation.  
4. Save and enable the script  
5. Visit [dugout-online.com](https://www.dugout-online.com)

---

## 🔒 Notes

- Importing a backup **overwrites** existing data in the same object stores.  
- Works only for the **same Dugout-Online script/database name ('DOFinanceDatabase')**.
  
## 💡 How to use
Once this script is active:
        1. Go to any Dugout-Online page.
        2. Click the Tampermonkey icon → DO Finance Backup Helper →
                💾 Export DOFinanceDatabase → Downloads a .json backup file
                📂 Import DOFinanceDatabase → Opens a file picker to restore it

⚠️ After importing, reload the page to ensure the new data is loaded properly by your finance script.
