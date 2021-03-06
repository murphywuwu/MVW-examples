## 问题

- [x] 为什么会有MVC：解决了什么场景下的什么问题
- [x] 为什么会有MVVM：解决了什么场景下的什么问题

## 实践
从实现一个简单的todo开始。
### 原始版
[原始版代码](./vanillajs/index.html)

这样的代码的复杂度在于dom结构和状态耦合在一起。耦合意味着某个数据的结果依赖于其他数据的计算。也就是说dom的修改可能会引起状态的变化。而这个变化不一定是我们期待的变化，即会引出bug。

比如当我们在todoTemplate的li元素上的class属性上添加todo，代码如下
```
let todoTemplate = '<li class="{{completed}} todo">' 
  + '<label>{{value}}</label>' 
  + '<button class="del">x</button>'
'</li>';
```

原来我们是通过`!el.className`逻辑来筛选未完成的待办事项。而当我们对todoTemplate做了如上修改后，便会出现bug。

### MVC

现在我们使用MVC模式来重构代码:
[MVC版代码](./MVC/MVC.html)


我们可以看出MVC模式下的代码。状态(状态即model)和dom进行了解耦。
Model负责管理数据的增删查改。View层则负责管理DOM的增删查改。controller层则用于响应用户的交互，修改model。并同时监听model的变化同步到view层。在MVC这样的代码架构设计下，对代码中各个角色的职责作了明确的划分，实现了Model层与View层的解耦。

虚线表示监听关系。
实线表示调用关系。

![image](https://user-images.githubusercontent.com/12481194/109470787-d9151a80-7aaa-11eb-8df7-06216622cda8.png)


图中两条虚线分别表示：
+ controller层监听view层用户交互的变化
+ view层监听model层的变化。

1，2，3则表示当界面上发生用户交互后，它们三则之间的调用顺序。如下：

1. 首先界面上发生用户交互后，controller会作出响应调用相应的函数
2. 接着controller层会调用model层的接口，对model层的数据进行增删查改
3. 当model层的数据发生变化时，通过调用view层的render函数同步变化到view层

通过MVC模式编写代码，我们需要手动操作DOM，随着view的膨胀，我们需要操作的DOM就越来越多，代码的复杂度也越高。

### MVVM
现在我们使用MVVM框架`vue`来重构代码。

[MVVM版代码](./MVVM/mvvm.html)

所以MVVM的目的是当model层发生变化时，view层能够自动更新。而不用我们手动操作DOM，从而减少代码的复杂度。

## 参考资料
[浅析前端开发中的 MVC/MVP/MVVM 模式](https://juejin.cn/post/6844903480126078989)
[界面之下：还原真实的MV*模式 #](https://github.com/livoras/blog/issues/11)
[相比于原生 JavaScript，现在流行的 JS 框架 React 和 Vue 都解决了什么问题？](https://www.zhihu.com/question/358226500)
[javascript激增的思考03】MVVM与Knockout](https://www.cnblogs.com/yexiaochai/p/3148382.html)
[mvc-mvp-mvvm](https://github.com/shuizhubocai/mvc-mvp-mvvm)