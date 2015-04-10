#使用nginx_lua_module模块使json输出变成jsonp

事情是这样的，有一个服务器的输出内容是json格式，是给APP调用的。

后来我需要做一个内嵌web页面放在APP中，需要调用服务器。

但域名不一致，我又不想使用PHP做中转，怎么办呢？想来想去，突然想起nginx貌似提供一些编程功能，是否可以利用呢？

折腾了半天，终于使用nginx_lua_module模块实现了该功能，代码如下：

<code><pre>
location / {
	proxy_pass  http://127.0.0.1:30551;

	#由于输出的长度改变了，因此需要以下这句
	header_filter_by_lua 'ngx.header.content_length = nil';

	#在外部文件中调用
	body_filter_by_lua_file conf/lua/jsonp.lua;
}
</pre></code>

conf/lua/jsonp.lua文件的内容:
<code><pre>
local args=ngx.req.get_uri_args()
local cb=args["callback"]
if cb == nil then
elseif cb~="" then
        ngx.arg[1] = cb.."("..ngx.arg[1]..");"
        ngx.arg[2] = true
end
</pre></code>
