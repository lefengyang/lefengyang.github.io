#addEventListener和handleEvent

在阅读iScroll的代码时，发现一段这样的代码：
<pre><code>
_bind: function (type, el, bubble) {
	(el || this.scroller).addEventListener(type, this, !!bubble);
}
</code></pre>
立即感到很迷惑，因为addEventListener方法的第二个参数应该是function，它却将自身传了进去。


立即百度了了一番，找到了解释。原来在主流浏览器中支持addEventListener传入对象作为参数，条件是这个对象有***handleEvent***方法。


在我下方的参考[2]中，文章作者说使用handleEvent有两个好处：
###1)你在类中使用this的时候，不用担心它的语意改变了。
###2)如果想改变一个dom的事件时，你直接替换对象的handleEvent方法即可，不需要unbind再bind。

不过我认为这种写法应该属于邪道了（怀疑iScroll故意这样写，以便不兼容IE。它自己的官网在IE下就是一塌糊涂），正常这样写(el || this.scroller).addEventListener(type, this.handleEvent, !!bubble)不是更好？

注意：***IE9***以后才支持***handleEvent***。

参考：

[1][http://www.veryhuo.com/a/view/50318.html](http://www.veryhuo.com/a/view/50318.html)

[2][http://www.thecssninja.com/javascript/handleevent](http://www.thecssninja.com/javascript/handleevent)