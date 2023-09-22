[![Jest coverage](https://img.shields.io/badge/dynamic/json?label=Coverage&query=$.total.lines.pct&suffix=%&url=https://gilhanan.github.io/chat-gpt-rtl/coverage/coverage-summary.json&color=green)](https://gilhanan.github.io/chat-gpt-rtl/coverage/lcov-report)

# ChatGPT RTL Chrome Extension

This is a Chrome extension designed to enhance the usability of ChatGPT for users who communicate using right-to-left (RTL) scripts. The extension automatically detects RTL characters and adjusts the direction of the DOM elements accordingly, providing a seamless and intuitive interface for RTL languages. Ideal for users who interact with languages like Arabic, Hebrew, Persian, Urdu, and others that require RTL orientation.

<img src="./documentation/tile/Tile.png" alt="drawing" width="180"/>

## Screenshots

<details>
<summary> <strong>Expand</strong> </summary>

### Arabic

<img src="./documentation/screenshots/Arabic/text/Text.png" alt="drawing" width="640"/>

### Hebrew

<img src="./documentation/screenshots/Hebrew/text/Text.png" alt="drawing" width="640"/>

</details>

## How to install

You can install it from [Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-rtl/nabcbpmmefiigmjpopfciegmlgihkofd) or [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/chatgpt-rtl/nanhglhndgcjhjcbfimjfopabdakdpmb)

## Getting Started

To get started with this project, clone the repository to your local machine:

```bash
git clone https://github.com/<your-username>/chatgpt-rtl.git
cd chatgpt-rtl
```

Then install the necessary dependencies:

```bash
npm install
```

## Building the Extension

You can build the extension by running the following command:

```bash
npm run build
```

This command will generate a `dist` directory with the built extension and a `extension.zip` file that you can upload to the Chrome Web Store.

## Developing the Extension

If you want to develop the extension and have webpack automatically rebuild any changes, you can run:

```bash
npm run watch
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
