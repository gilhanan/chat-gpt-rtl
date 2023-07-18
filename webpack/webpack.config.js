const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const IgnoreEmitPlugin = require("ignore-emit-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const content = "content";
const styles = "styles";

module.exports = {
  mode: "production",
  entry: {
    [content]: path.resolve(__dirname, "..", "src", `${content}.ts`),
    [styles]: path.resolve(__dirname, "..", "src", `${styles}.scss`),
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
        test: /\.tsx?$/,
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
      patterns: [{ from: ".", to: ".", context: "public" }],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new IgnoreEmitPlugin([`${styles}.js`]),
  ],
};
