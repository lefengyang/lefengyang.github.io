#html5调用手机摄像头拍照

近期跟银行搞微信申请信用卡，其中有一个步骤是要求需要用户上传一张手持身份证的照片。由于担心用户造假，银行侧要求只允许用户当场拍照，不能从相册中选择照片上传。

问了一下人，说可以用getUserMedia和capture=camera两个特性来实现这个功能。

##1)getUserMedia
这个在微信中试了一下，不行，alert(navigator.getUserMedia)是undefined。

[http://blog.csdn.net/jin123wang/article/details/7413254](http://blog.csdn.net/jin123wang/article/details/7413254) 这篇文章中介绍该特性只有chrome和opera支持，微信的webkit估计没打包进这个特性，因此用不了。

##2)capture=camera
<pre><code>&lt;input type="file" capture="camera" accept="image/*"&gt;</code></pre>

这个代码在android下试验成功，系统只唤起提供拍照功能的程序，不会唤起图片程序。

IOS却仍能调起图片选择，因此只能另找其他方法了。

##3)使用视频流+canvas为IOS提供照片
之前的试验发现，如果将accept限制为视频的话，那&lt;input type="file"/&gt;标签就只能选择视频内容。

因此这里有一个变通方法是让用户选择一个视频，然后通过canvas将视频的最后一帧取出来，作为本人照片上传。

<pre><code>&lt;input type="file" capture="camera" accept="video/*"&gt;</code></pre>


