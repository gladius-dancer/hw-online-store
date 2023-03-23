// shared config (dev and prod)
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

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

      // {
      //   test: /\.(scss|css)$/,
      //   use: [
      //     { loader: 'style-loader' },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: {
      //           localIdentName: '[local]--[hash:base64:5]',
      //         },
      //       },
      //     },
      //     'postcss-loader',
      //     {
      //       loader: 'sass-loader',
      //       options: {
      //         // additionalData:
      //         //   '@import "./src/Assets/Styles/variables.scss"; @import "./src/Assets/Styles/mixins.scss";',
      //         sassOptions: {
      //           includePaths: [__dirname, 'src'],
      //           webpackImporter: false,
      //         },
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset/resource"
      }

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html" }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: "public", to: "public" }
    //   ]
    // })
  ]
};
