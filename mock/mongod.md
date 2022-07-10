### 安装 mongodb

进入 mongodb 官网找到 Products 下的 Community Server 社区版，点击 Community Server 进入下载页面，在右侧选择适合自己系统的版本，点击下载。

下载完成之后点击安装包进行解压，解压完毕之后，将名字改为 `mongodb`。

进入访达，按 shift + command + G 进入 `/usr/local` 下，将解压好的 `mongodb` 拖入到 `local` 目录下。

####  创建 data 及 log 文件夹

进入到 `/usr/local/momgodb` 目录下，执行 `mkdir data log` 创建 data 及 log 文件夹：

```json
mkdir data log
```


