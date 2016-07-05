## 环境搭建
* node安装，[https://nodejs.org/en/](https://nodejs.org/en/)
* gulp安装，npm i -g gulp
* bower安装，npm i -g bower
* 安装node依赖，npm i
* 安装bower依赖，bower i

## 本地开发

### gulp serve
运行gulp serve启动本地服务器，访问路径：[http://localhost:8008/](http://localhost:8008/)

有如下功能：

* 动态编译scss文件
* 使用server.json中配置的serve环境的接口
* 监听server.json配置修改，配置一旦修改则会重载本地服务器
* 访问url里传参动态切换serve、dev、beta、prod环境的接口，方便本地调试。
	* 默认为serve环境接口
	* eg：http://localhost:8008/index.html?env=dev
* require string模版路径替换成对应的文件内容
	* eg：require('jdCapital/index.string');
* require vuejs的view视图路径替换成对应的文件内容
	* eg：require('jdCapital/index.view');

## 构建发布
### gulp dev
运行gulp dev生成联调环境代码

有如下功能：

* scss文件编译
* 使用server.json中配置的dev环境的接口
* bower_components目录的js如果没有以分号解决，自动添加末尾分号
* gulp dev --api=serve, 则接口使用假数据接口
	* 使用场景：有时需要传到dev环境看效果(比如让UI check界面实现)，但此时server dev接口没有ready
* 合并压缩css文件
* 合并压缩js文件
* gulp dev --not-min, 不压缩css和js文件
	* 使用场景：不压缩源码，方便联调环境调试bug
* gulp dev --project=h5app_分知名
	* 使用场景：多个分支同时开发提测时，避免项目名称覆盖 
* require string模版路径替换成对应的文件内容
* require vuejs的view视图路径替换成对应的文件内容
* 引入css和js的入口加上时间戳，清除浏览器缓存
* 图片压缩，调用tinypng的接口进行图片压缩
	* 压缩后覆盖源文件，已压缩文件会纪录到src/img/tinypng.json文件中，增量压缩.
	(PS: 请将tinypng.json文件及时push)
	* 压缩png和jpg文件，其他文件(如gif和svg)则不压缩
	* src/img/notMin/目录中的图片不会进行压缩, 微信/朋友圈分享icon建议放入此目录不进行压缩处理。
	
	
### gulp beta
运行gulp beta生成beta环境代码

有如下功能：

* scss文件编译
* 使用server.json中配置的beta环境的接口
* bower_components目录的js如果没有以分号解决，自动添加末尾分号
* 合并压缩css文件
* 合并压缩js文件
* require string模版路径替换成对应的文件内容
* require vuejs的view视图路径替换成对应的文件内容
* 引入css和js的入口加上时间戳，清除浏览器缓存
	

### gulp build
运行gulp build生成线上环境代码

有如下功能：

* scss文件编译
* 使用server.json中配置的prod环境的接口
* bower_components目录的js如果没有以分号解决，自动添加末尾分号
* 合并压缩css文件
* 合并压缩js文件
* require string模版路径替换成对应的文件内容
* require vuejs的view视图路径替换成对应的文件内容
* 引入css和js的入口加上时间戳，清除浏览器缓存



