const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const srcFolder = "src";
const content = "content";
const popup = "popup";

const src = path.resolve(__dirname, "..", srcFolder);

module.exports = {
  mode: "production",
  entry: {
    [`${content}/${content}`]: path.resolve(src, content, `${content}.ts`),
    [`${popup}/${popup}`]: path.resolve(src, popup, `${popup}.ts`),
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".js", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: ".", to: ".", context: "public" },
        {
          from: path.resolve(src, popup, `${popup}.html`),
          to: path.resolve(__dirname, "../dist", popup, `${popup}.html`),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
