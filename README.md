# Steam logs.tf Extension

A lightweight, open-source Chrome extension designed for competitive Team Fortress 2 players. It automatically injects quick-access links into Steam profile pages, allowing you to jump directly to the user's data on logs.tf, demos.tf and matcha.tf.

---

## Features

* **Automated Injection:** Seamlessly adds links to your Steam profile header without breaking the site's native layout.
* **Multi-Platform Support:** Quickly navigate to external services including:
    * **Logs.tf** (Match performance and logs)
    * **Demos.tf** (Demo recordings)
    * **Matcha.tf** (Match data)

---

## Installation

### From Source (Developer Mode)

1.  **Clone or Download** this repository to your local machine.
2.  Open Google Chrome and navigate to `chrome://extensions/`.
3.  Toggle **Developer mode** in the top right corner.
4.  Click **Load unpacked**.
5.  Select the folder containing `manifest.json`.

---

## How it Works

The extension operates as a content script that runs on `steamcommunity.com`. 

1.  **Targeting:** It monitors the DOM for the `.profile_header_actions` container.
2.  **Extraction:** It retrieves the profile owner's unique Steam account ID via the `data-miniprofile` attribute.
3.  **Conversion:** It performs a mathematical conversion (AccountID + 76561197960265728n) to obtain the standard SteamID64.
4.  **Injection:** It dynamically injects a styled button group into the profile header.

---

## Privacy Policy

This extension respects your privacy:
* **No Data Collection:** We do not track, store, or transmit your browsing history or personal profile information to any external server.
* **Local Processing:** All SteamID extraction and URL generation occur locally within your browser.
* **Permissions:** The extension only requests the minimum permissions necessary to interact with the Steam Community domain and the specific service websites it links to.

---

## Development

If you want to add support for a new website, simply update the `services` array in `content.js`:

```javascript
const services = [
    {
        name: "NewService.tf",
        urlBase: "[https://newservice.tf/profile/](https://newservice.tf/profile/)"
    }
];
