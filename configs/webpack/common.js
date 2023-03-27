const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  context: resolve(__dirname, "../../"),
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset/resource"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html" }),
  ]
};
