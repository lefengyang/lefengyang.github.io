#linux下phantomJS输出中文乱码解决方法

最新版的phantomJS已经支持中文了。无法输出中文的最主要的原因是linux没有安装中文字体。

安装方法：

1）在/usr/share/fonts下建一个目录，目录名任意：

mkdir /usr/share/fonts/chinese

2）从c:\windows\fonts下拷贝arial.ttf、msyh.ttf、msyhbd.ttf和simsunb.ttf等几个字体文件到上面建立的目录下。

3）进入上面建立的目录，依次执行：

chmod 644 *.ttf

mkfontscale

mkfontdir

fc-cache -fv