#用C++编写PHP扩展笔记

公司内部有很多公共组件，但一般之提供了C++的API，PHP要直接调用很麻烦。为了调用方便，于是打算将其写成PHP扩展。


假设我们需要编写的扩展名称为my_tool，简单描述步骤如下：

[1]进入php_src/ext目录，执行./ext_skel -extname=my_tool生成目录

[2]进入my_tool目录，编辑config.m4文件

[3]在当前目录执行/usr/local/php/bin/phpize，生成configure文件（只要修改了config.m4，都需要重复此步以生成最新configure文件）

[4]执行./configure --enable-my_tool --with-php-config=/usr/local/php/bin/php-config生成Makefile

[5]编写扩展

[6]编辑Makefile文件，将其他需要包含的文件和库加进来

[7]执行make，生成目标文件。目标文件在modules目录下

<hr>
##【坑1】
在调试了N久终于编译通过后，我遇到一个坑：运行时抛`undefined symbol`.

但是我明明已经将所有的包和类和头文件都包含进来了呀！

调试了很久，终于在网上找到了答案。

C程序在调用C++编写的库类时，需要在类和方法声明加上

<pre><code>#ifdef __cplusplus
extern "C" {
#endif
</code></pre>

否则就会抛undefined symbol错误。我将全部的头文件都加上这个声明后，果然就可以正常执行了。

<hr>
##【坑2】
我遇到的另一个坑是跟文件引用有关的。我在my_tool.cpp中引用了string

<pre><code>extern "C"
{
      #include ......
      #include ......
      #include &lt;string&gt;
}</code></pre>

编译时抛了一大堆错误，`error: template with C linkage`

后来发现，只要将#include <string>移到extern "C"{} 外面就可以了。

<hr>
## 【坑3】
第三个坑是我自己手误，重复定义了int i。运行时它抛的错误却是内存溢出：

`Fatal error: Out of memory (allocated 6553600) (tried to allocate 7305 bytes)`

这个问题定位了两个多小时，说多都是泪……

反正我也没搞懂这里抛这个错误的原因。反正如果碰到PHP内存溢出错误，很可能不是内存溢出。

<hr>

附录：config.m4文件编辑说明

1.dnl是注释

2.PHP_ARG_WITH或者PHP_ARG_ENABLE指定了PHP模块的工作方式,任选一种,我选择的是WITH

3.PHP_REQUIRE_CXX()用于指定这个扩展用到了C++

4.PHP_SUBST(SYSFILE_SHARED_LIBADD)用于说明这个扩展编译成动态链接库的形式

5.PHP_ADD_LIBRARY(stdc++,"",SYSFILE_SHARED_LIBADD)用于将标准C++库链接进入扩展

6.PHP_NEW_EXTENSION用于指定有哪些源文件应该被编译,文件和文件之间用空格隔开.

7.PHP_ADD_LIBRARY_WITH_PATH用于包含外部库类

ext_skel默认生成的模块框架是针对C的,我们要使用C++,那以上的3,5两个宏就是必须的.另外还要把testext.c改名成testext.cpp,所以PHP_NEW_EXTENSION原本包括的testext.c也要修改.

在使用C++之后要注意一个小问题,那就是php_testext.h这个文件可能被PHP的其他部分所引用到,而引用者很可能是一个.c文件,所以不能在php_testext.h里包含任何C++所独有的东西.比如标准模版库,类,或者bool类型等等.


