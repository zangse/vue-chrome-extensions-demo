
### 使用vue开发chrome扩展模板文件（webpack编译）
可根据需求进行删改
删改时请注意修改 manifest.json中的配置项和webpack.config.js中的入口文件
#### 项目目录结构
```
├── README.md
├── package.json
├── src
│   ├── _locales（国际化，可配置多种语言）
│   │   ├── en
│   │   │   └── messages.json
│   │   └── zh_CN
│   │       └── messages.json
│   ├── background（插件运行的环境）
│   │   └── background.js
│   ├── content（定义对页面进行操作的脚本）
│   │   └── content.js
│   ├── manifest.json（程序清单）
│   ├── option（选项页）
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── option.html
│   ├── popup（点击按钮弹出层）
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── popup.html
│   └── static（静态文件）
│       ├── images
│       │   └── icon128.png
│       └── styles
│           └── reset.scss
└── webpack.config.js
```
#### 使用
可直接下载模板进行修改，编译，并在浏览器中预览

```
git clone git@github.com:zangse/vue-chrome-extensions-demo.git

cd vue-chrome-extensions-demo

npm install

实时编译（编译后的文件在dist目录里，可在chrome浏览器chrome://extensions/里打开开发者模式，选择加载已解压的扩展程序，选择dist目录文件即可）
npm run watch

构建发布(去除console.log打印信息；会将代码打包成zip包，便于上传)
npm run build

```