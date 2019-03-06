# React 知识总结
### 个人总结要点
react难点：组件怎么拆分？ 单一原则，只干一件事，功能简单，不复用不拆，考虑迭代 

#### 数据

- props：数据传递 
- state：私有状态（用户输入、默认属性） 
- 数据尽量给顶层组件 
- 为什么用setState？ 因为虚拟dom没完成更新，且修改的是复制的state 
- setState：在原来的基础上进行合并，异步，解决：this.setState（function（prevState，props）｛｝） 
- 钩子（获取默认属性）：getDefaultProps、getInitialState

#### Tips
1. react 一旦会复用，就做成组件 
2. 尽量用无状态组件（不能访问this对象，只能访问props，纯函数，无需实例化，性能高） 
3. 传值思路 
- 子-父-子 
- pub/sub 
- 状态管理

----
### JSX 
JSX 语法是 React 的一大特色，允许 HTML 和 JavaScript 的混写。
JSX 用来声明 React 当中的元素。
```
    const element = <h1>Hello, world!</h1>;
    
    const user = {
      firstName: 'Harper',
      lastName: 'Perez'
    };
```
---

#### JSX 属性
可以使用引号来定义以字符串为值的属性。
```
    const element = <div tabIndex="0"></div>;
```
可以使用大括号来定义以 JavaScript 表达式为值的属性。
```
    const element = <img src={user.avatarUrl} />;
```
---
#### JSX 嵌套
JSX 标签同样可以相互嵌套。
如果 JSX 标签是闭合式的，那么你需要在结尾处用 />, 就好像 XML/HTML 一样.
```
    const element = <img src={user.avatarUrl} />;
```
---
####警告:
因为 JSX 的特性更接近 JavaScript 而不是 HTML , 所以 React DOM 使用 camelCase 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称。

例如，class 变成了 className，而 tabindex 则对应着 tabIndex。

----
###元素渲染
React 只会更新必要的部分
React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分。
----
###组件 & Props
组件可以将UI切分成一些独立的、可复用的部件，这样你就只需专注于构建每一个单独的部件。

组件从概念上看就像是函数，它可以接收任意的输入值（称之为“props”），并返回一个需要在页面上展示的React元素。

---
####函数定义/类定义组件
定义一个组件最简单的方式是使用JavaScript函数：
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
---
####警告:

组件名称必须以大写字母开头。

例如，\<div /> 表示一个DOM标签，但 <Welcome /> 表示一个组件，并且在使用该组件时你必须定义或引入它。

组件的返回值只能有一个根元素。这也是我们要用一个\<div>来包裹所有\<Welcome />元素的原因。

----
####Props的只读性
无论是使用函数或是类来声明一个组件，它决不能修改它自己的props。
纯函数（不改变数据）：
```
function sum(a, b) {
  return a + b;
}
```
非纯函数，它会改变它自身的输入值：
```$xslt
function withdraw(account, amount) {
  account.total -= amount;
}
```
**所有的React组件必须像纯函数那样使用它们的props。**

---
###State & 生命周期
状态与属性十分相似，但是状态是私有的，完全受控于当前组件。

我们之前提到过，定义为类的组件有一些额外的特性。局部状态就是如此：只能用于类的一个功能。

---
####将函数转换为类 为一个类添加局部状态
```$xslt
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
render()必须有。
组件的返回值只能有一个根元素。需要用\<div>\</div>包起来。
类组件应始终使用props调用基础构造函数。

---
####将生命周期方法添加到类中
![生命周期](生命周期.jpg )
#####初始化:
```
getDefaultProps()
```
设置默认的props，也可以用dufaultProps设置组件的默认属性.
```$xslt
getInitialState()
```
在使用es6的class语法时是没有这个钩子函数的，可以直接在constructor中定义this.state。此时可以访问this.props
```$xslt
componentWillMount()
```
组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state。
```$xslt
render()
```
react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行。此时就不能更改state了。
```$xslt
componentDidMount()
```
组件渲染之后调用，只调用一次。
#####更新:
```$xslt
componentWillReceiveProps(nextProps)
```
组件初始化时不调用，组件接受新的props时调用。
```$xslt
shouldComponentUpdate(nextProps, nextState)
```
react性能优化非常重要的一环。组件接受新的state或者props时调用，我们可以设置在此对比前后两个props和state是否相同，如果相同则返回false阻止更新，因为相同的属性状态一定会生成相同的dom树，这样就不需要创造新的dom树和旧的dom树进行diff算法对比，节省大量性能，尤其是在dom结构复杂的时候
```$xslt
componentWillUpdata(nextProps, nextState)
```
组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state
```$xslt
render()
```
组件渲染
```$xslt
componentDidUpdate()
```
组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。

#####卸载:
```$xslt
componentWillUnmount()
```
组件将要卸载时调用，一些事件监听和定时器需要在此时清除。

----
###正确地使用状态
关于 setState() 这里有三件事情需要知道
####不要直接更新状态
```$xslt
// Wrong
this.state.comment = 'Hello';
```
此代码不会重新渲染组件,应当使用 setState():
```$xslt
// Correct
this.setState({comment: 'Hello'});
```
构造函数是唯一能够初始化 this.state 的地方。
####状态更新可能是异步的
React 可以将多个setState() 调用合并成一个调用来提高性能。

因为 this.props 和 this.state 可能是异步更新的，你不应该依靠它们的值来计算下一个状态。
例如，此代码可能无法更新计数器：
```$xslt
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```
要修复它，请使用第二种形式的 setState() 来接受一个函数而不是一个对象。 该函数将接收先前的状态作为第一个参数，将此次更新被应用时的props做为第二个参数
```$xslt
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```
```$xslt
// Correct
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});
```
####状态更新合并
当你调用 setState() 时，React 将你提供的对象合并到当前状态。

例如，你的状态可能包含一些独立的变量：
```$xslt
constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```
你可以调用 setState() 独立地更新它们：
```$xslt
componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```
这里的合并是浅合并，也就是说this.setState({comments})完整保留了this.state.posts，但完全替换了this.state.comments。

----
###数据自顶向下流动
父组件或子组件都不能知道某个组件是有状态还是无状态，并且它们不应该关心某组件是被定义为一个函数还是一个类。

这就是为什么状态通常被称为局部或封装。 除了拥有并设置它的组件外，其它组件不可访问。

组件可以选择将其状态作为属性传递给其子组件：
```$xslt
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```
这也适用于用户定义的组件：
```$xslt
<FormattedDate date={this.state.date} />
```
FormattedDate 组件将在其属性中接收到 date 值，并且不知道它是来自 Clock 状态、还是来自 Clock 的属性、亦或手工输入：
```$xslt
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```
这通常被称为自顶向下或单向数据流。 任何状态始终由某些特定组件所有，并且从该状态导出的任何数据或 UI 只能影响树中下方的组件。

如果你想象一个组件树作为属性的瀑布，每个组件的状态就像一个额外的水源，它连接在一个任意点，但也流下来。

---
###事件处理
React 元素的事件处理和 DOM元素的很相似。但是有一点语法上的不同:

1. React事件绑定属性的命名采用驼峰式写法，而不是小写。
2. 如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)

传统的 HTML：
```$xslt
<button onclick="activateLasers()">
  Activate Lasers
</button>
```
React 中稍稍有点不同：
```$xslt
<button onClick={activateLasers}>
  Activate Lasers
</button>
```
在 React 中另一个不同是你不能使用返回 false 的方式阻止默认行为。你必须明确的使用 preventDefault。例如，传统的 HTML 中阻止链接默认打开一个新页面，你可以这样写：
```$xslt
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```
在 React，应该这样来写：
```$xslt
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```
在这里，e 是一个合成事件。使用 React 的时候通常你不需要使用 addEventListener 为一个已创建的 DOM 元素添加监听器。你仅仅需要在这个元素初始渲染的时候提供一个监听器。
当你使用 ES6 class 语法来定义一个组件的时候，事件处理器会成为类的一个方法。例如，下面的 Toggle 组件渲染一个让用户切换开关状态的按钮：
    
```$xslt
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```          
你必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的。如果你忘记绑定 this.handleClick 并把它传入 onClick, 当你调用这个函数的时候 this 的值会是 undefined。

这并不是 React 的特殊行为；它是函数如何在 JavaScript 中运行的一部分。通常情况下，如果你没有在方法后面添加 () ，例如 onClick={this.handleClick}，你应该为这个方法绑定 this。

如果使用 bind 让你很烦，这里有两种方式可以解决。如果你正在使用实验性的属性初始化器语法，你可以使用属性初始化器来正确的绑定回调函数：
```$xslt
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```
这个语法在 Create React App 中默认开启。

如果你没有使用属性初始化器语法，你可以在回调函数中使用 箭头函数：
```$xslt
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```
使用这个语法有个问题就是每次 LoggingButton 渲染的时候都会创建一个不同的回调函数。在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。我们通常建议在构造函数中绑定或使用属性初始化器语法来避免这类性能问题。

---
###向事件处理程序传递参数

通常我们会为事件处理程序传递额外的参数。例如，若是 id 是你要删除那一行的 id，以下两种方式都可以向事件处理程序传递参数：
```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
上述两种方式是等价的，分别通过 arrow functions 和 Function.prototype.bind 来为事件处理函数传递参数。

上面两个例子中，参数 e 作为 React 事件对象将会被作为第二个参数进行传递。通过箭头函数的方式，事件对象必须显式的进行传递，但是通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。

值得注意的是，通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面，例如:
```$xslt
class Popper extends React.Component{
    constructor(){
        super();
        this.state = {name:'Hello world!'};
    }
    
    preventPop(name, e){    //事件对象e要放在最后
        e.preventDefault();
        alert(name);
    }
    
    render(){
        return (
            <div>
                <p>hello</p>
                {/* Pass params via bind() method. */}
                <a href="https://reactjs.org" onClick={this.preventPop.bind(this,this.state.name)}>Click</a>
            </div>
        );
    }
}
```
----
###条件渲染
在 React 中，你可以创建不同的组件来封装各种你需要的行为。然后还可以根据应用的状态变化只渲染其中的一部分。

React 中的条件渲染和 JavaScript 中的一致，使用 JavaScript 操作符 if 或条件运算符来创建表示当前状态的元素，然后让 React 根据它们来更新 UI。

先来看两个组件:
```$xslt
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```
我们将创建一个 Greeting 组件，它会根据用户是否登录来显示其中之一：
```$xslt
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```
此示例根据 isLoggedIn 的值渲染不同的问候语。

---

###元素变量

你可以使用变量来储存元素。它可以帮助你有条件的渲染组件的一部分，而输出的其他部分不会更改。

再来看两个新组件分别代表注销和登录：
```$xslt
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```

在下面的例子中，我们将要创建一个名为 LoginControl 的有状态的组件。

它会根据当前的状态来渲染 \<LoginButton /> 或 \<LogoutButton />，它也将渲染前面例子中的 \<Greeting />。
```$xslt
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```
---
声明变量并使用 if 语句是条件渲染组件的不错的方式，但有时你也想使用更简洁的语法，在 JSX 中有如下几种方法。


###与运算符 &&
你可以通过用花括号包裹代码在 JSX 中嵌入任何表达式 ，也包括 JavaScript 的逻辑与 &&，它可以方便地条件渲染一个元素。

```$xslt
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```
之所以能这样做，是因为在 JavaScript 中，true && expression 总是返回 expression，而 false && expression 总是返回 false。

因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。

---
###三目运算符
条件渲染的另一种方法是使用 JavaScript 的条件运算符 condition ? true : false。

在下面的例子中，我们用它来有条件的渲染一小段文本。
```$xslt
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```
同样它也可以用在较大的表达式中，虽然不太直观：

```$xslt
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

---
###阻止组件渲染
在极少数情况下，你可能希望隐藏组件，即使它被其他组件渲染。让 render 方法返回 null 而不是它的渲染结果即可实现。

在下面的例子中，\<WarningBanner /> 根据属性 warn 的值条件渲染。如果 warn 的值是 false，则组件不会渲染：
```$xslt
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true}
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```
组件的 render 方法返回 null 并不会影响该组件生命周期方法的回调。例如，componentWillUpdate 和 componentDidUpdate 依然可以被调用。

---
###列表 & Keys

如下代码，我们使用map()函数让数组中的每一项翻倍,我们得到了一个新的数列doubled
```$xslt
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

代码打印出[2, 4, 6, 8, 10]

在React中，把数组转化为数列元素的过程是相似的

---
###渲染多个组件

你可以通过使用{}在JSX内构建一个元素集合

下面，我们使用Javascript中的map()方法遍历numbers数组。对数组中的每个元素返回<li>标签，最后我们得到一个数组listItems

```$xslt
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

我们把整个listItems插入到ul元素中，然后渲染进DOM:

```$xslt
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

这段代码生成了一个1到5的数字列表

---
####基础列表组件
通常你需要渲染一个列表到组件中

我们可以把前面的例子重构成一个组件。这个组件接收numbers数组作为参数，输出一个无序列表。
```$xslt
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
当我们运行这段代码，将会看到一个警告 a key should be provided for list items ，意思是当你创建一个元素时，必须包括一个特殊的 key 属性。

让我们来给每个列表元素分配一个 key 来解决上面的那个警告：
```$xslt
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

---
####Keys
Keys可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。
```$xslt
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```
一个元素的key最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用来自数据的id作为元素的key:
```$xslt
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```
当元素没有确定的id时，你可以使用他的序列号索引index作为key
```$xslt
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```
如果列表项目的顺序可能会变化，我们不建议使用索引来用作键值，因为这样做会导致性能的负面影响，还可能引起组件状态问题。如果你想要了解更多，请点击深度解析key的必要性。如果你选择不指定显式的键值，那么React将默认使用索引用作为列表项目的键值。

---

####用keys提取组件

元素的key只有放在其环绕数组的上下文中才有意义。

比方说，如果你提取出一个ListItem组件，你应该把key保存在数组中的这个\<ListItem />元素上，而不是放在ListItem组件中的<li>元素上。

```$xslt
function ListItem(props) {
  const value = props.value;
  return (
    // 错啦！你不需要在这里指定key:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    //错啦！元素的key应该在这里指定：
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

```$xslt
function ListItem(props) {
  // 对啦！这里不需要指定key:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 又对啦！key应该在数组的上下文中被指定
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

一个好的大拇指法则：元素位于map()方法内时需要设置键属性。

---

####键（key）只是在兄弟之间必须唯一
数组元素中使用的key在其兄弟之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的键

```$xslt
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

key会作为给React的提示，但不会传递给你的组件。如果您的组件中需要使用和key相同的值，请用其他属性名显式传递这个值：

```$xslt
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```
上面例子中，Post组件可以读出props.id，但是不能读出props.key

---

####在jsx中嵌入map()

在上面的例子中，我们声明了一个单独的listItems变量并将其包含在JSX中

```$xslt
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

JSX允许在大括号中嵌入任何表达式，所以我们可以在map()中这样使用：

```$xslt
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />

      )}
    </ul>
  );
}
```

这么做有时可以使你的代码更清晰，但有时这种风格也会被滥用。就像在JavaScript中一样，何时需要为了可读性提取出一个变量，这完全取决于你。但请记住，如果一个map()嵌套了太多层级，那可能就是你提取出组件的一个好时机。

----

###表单

HTML表单元素与React中的其他DOM元素有所不同,因为表单元素生来就保留一些内部状态。例如，下面这个表单只接受一个唯一的name。

```$xslt
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

当用户提交表单时，HTML的默认行为会使这个表单跳转到一个新页面。在React中亦是如此。但大多数情况下，我们都会构造一个处理提交表单并可访问用户输入表单数据的函数。实现这一点的标准方法是使用一种称为“受控组件”的技术。

---

####受控组件

在HTML当中，像\<input>,\<textarea>, 和 \<select>这类表单元素会维持自身状态，并根据用户输入进行更新。但在React中，可变的状态通常保存在组件的状态属性中，并且只能用 setState() 方法进行更新。

我们通过使react变成一种单一数据源的状态来结合二者。React负责渲染表单的组件仍然控制用户后续输入时所发生的变化。相应的，其值由React控制的输入表单元素称为“受控组件”。

例如，我们想要使上个例子中在提交表单时输出name,我们可以写成“受控组件”的形式:

```$xslt
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

由于 value 属性是在我们的表单元素上设置的，因此显示的值将始终为 React数据源上this.state.value 的值。由于每次按键都会触发 handleChange 来更新当前React的state，所展示的值也会随着不同用户的输入而更新。

使用”受控组件”,每个状态的改变都有一个与之相关的处理函数。这样就可以直接修改或验证用户输入。例如，我们如果想限制输入全部是大写字母，我们可以将handleChange 写为如下：

---
####textarea 标签

在HTML当中，\<textarea> 元素通过子节点来定义它的文本内容

```
<textarea>
  Hello there, this is some text in a text area
</textarea>
```

在React中，\<textarea> 会用value属性来代替。这样的话，表单中的\<textarea> 非常类似于使用单行输入的表单：
```$xslt
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
注意this.state.value是在构造函数中初始化，这样文本区域就能获取到其中的文本。

----
####select 标签

在HTML当中，\<select>会创建一个下拉列表。例如这个HTML就创建了一个下拉列表的原型。
```$xslt
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

请注意，Coconut选项最初由于selected属性是被选中的。在React中，并不使用之前的selected属性，而在根select标签上用value属性来表示选中项。这在受控组件中更为方便，因为你只需要在一个地方来更新组件。例如：

```$xslt
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

---
####file input 标签

在HTML当中，\<input type="file"> 允许用户从他们的存储设备中选择一个或多个文件以提交表单的方式上传到服务器上, 或者通过 Javascript 的 File API 对文件进行操作 

```
<input type="file" />
```
由于该标签的 value 属性是只读的， 所以它是 React 中的一个非受控组件

---
####多个输入的解决方法
当你有处理多个受控的input元素时，你可以通过给每个元素添加一个name属性，来让处理函数根据 event.target.name的值来选择做什么。

```$xslt
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

注意我们如何使用ES6当中的计算属性名语法来更新与给定输入名称相对应的状态键：

```$xslt
this.setState({
  [name]: value
});
```

同样由于 setState() 自动将部分状态合并到当前状态，因此我们只需要使用发生变化的部分调用它。

---
####受控组件的替代方法
有时使用受控组件可能很繁琐，因为您要为数据可能发生变化的每一种方式都编写一个事件处理程序，并通过一个组件来管理全部的状态。当您将预先存在的代码库转换为React或将React应用程序与非React库集成时，这可能变得特别烦人。在以上情况下，你或许应该看看非受控组件，这是一种表单的替代技术。

----

###状态提升
使用 react 经常会遇到几个组件需要共用状态数据的情况。这种情况下，我们最好将这部分共享的状态提升至他们最近的父组件当中进行管理。我们来看一下具体如何操作吧。


这部分内容当中，我们会创建一个温度计算器来计算水是否会在给定的温度下烧开。

开始呢，我们先创建一个名为 BoilingVerdict 的组件。它会接受 celsius 这个温度变量作为它的 props 属性，最后根据温度判断返回内容：

```
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>水会烧开</p>;
  }
  return <p>水不会烧开</p>;
}
```

接下来，我们写一个名为 Calculator 的组件。它会渲染一个 \<input> 来接受用户输入，然后将输入的温度值保存在 this.state.temperature 当中。

之后呢，它会根据输入的值渲染出 BoilingVerdict 组件。

```$xslt
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>输入一个摄氏温度</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />

        <BoilingVerdict
          celsius={parseFloat(temperature)} />

      </fieldset>
    );
  }
}
```

---
####添加第二个输入框

现在我们有了一个新的需求，在提供摄氏度输入的基础之上，再提供一个华氏温度输入，并且它们能保持同步。

我们可以通过从 Calculator 组件中抽离一个 TemperatureInput 组件出来。我们也会给它添加一个值为 c 或 f 的表示温度单位的 scale 属性。

```$xslt
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```
我们现在可以对Calculator稍作修改，来渲染两个不同的温度输入框。

```$xslt
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```

我们现在有了两个输入框，但是当你在其中一个输入时，另一个并不会更新。这显然是不符合我们的需求的。

另外，我们此时也不能从 Calculator 组件中展示 BoilingVerdict 的渲染结果。因为现在表示温度的状态数据只存在于 TemperatureInput 组件当中

---
####写出转换函数
首先，我们写两个可以将摄氏度和华氏度互相转换的函数。

```$xslt
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

这两个函数只是单纯转换数字。我们还需要另外一个函数，它接受两个参数，第一个接受字符串 temperature 变量，第二个参数则是上面编写的单位转换函数。最后会返回一个字符串。我们会使用它来根据一个输入框的输入计算出另一个输入框的值。

我们最后取到输出的小数点后三位，而 temperature 输入不合法的时候，这个函数则会返回空字符串。

```$xslt
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```
举两个例子，tryConvert('abc', toCelsius) 会返回空字符串，而 tryConvert('10.22', toFahrenheit) 会返回 '50.396'。

---
###状态提升

到这一步为止，两个TemperatureInput组件都是在自己的 state 中独立保存数据。
```$xslt
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...  
```
但是，我们想要的是这两个输入能保持同步。当我们更新摄氏输入（Celsius）时，华氏度（Fahrenheit ）这个框应该能显示转换后的的温度数值，反之亦然。

在React中，状态分享是通过将state数据提升至离需要这些数据的组件最近的父组件来完成的。这就是所谓的状态提升。我们会将 TemperatureInput 组件自身保存的 state 移到 Calculator 中。

如果 Calculator 组件拥有了提升上来共享的状态数据，那它就会成为两个温度输入组件的“数据源”。它会传递给下面温度输入组件一致的数据。由于两个 TemperatureInput 温度组件的props属性都是来源于共同的父组件 Calculator，它们的数据也会保持同步。

让我们一步一步来分析如何操作。

首先，我们在 TemperatureInput 组件中将 this.state.temperature 替换为 this.props.temperature 。现在，先假定 this.props.temperature 值已经存在，将来我们需要从 Calculator 组件中传入。
```$xslt
 render() {
    // 之前的代码: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```
我们首先知道props是只读的 这么一个事实。而之前temperature变量是被保存在其自身的 state 中的，TemperatureInput 组件只需要调用 this.setState() 就能改变它。但现在，temperature 是作为 prop 从父组件传递下来的，TemperatureInput 组件是没有控制权的。

在React中，这个问题通常是通过让组件“受控”来解决。就像 \<input> 能够接受 value 和 onChange 这两个prop属性值，自定义组件 TemperatureInput 也能接受来自 Calculator 父组件的 temperature 变量和 onTemperatureChange 方法作为props属性值。

做完这些，当 TemperatureInput 组件希望更新温度时，就会调用 this.props.onTemperatureChange。
```$xslt
handleChange(e) {
    // 之前的代码: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
    // ...
```
onTemperatureChange加上temperature一起的两个属性（prop）由父组件Calculator提供。父组件处理变化只需通过改变其自身的状态，从而使用新的值来重新渲染两个输入框组件。很快我们将重新改写Calculator。

在我们改写Calculator组件之前，我们先花点时间总结下TemperatureInput组件的变化。我们将其自身的 state 从组件中移除，使用 this.props.temperature 替代 this.state.temperature。当我们想要响应数据改变时，现在是调用由Calculator提供的this.props.onTemperatureChange() 而不是this.setState()：

```$xslt
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>在{scaleNames[scale]}:中输入温度数值</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```
现在让我们来转向 Calculator 组件。

我们将会保存当前输入的temperature和scale值到它的局部状态（state）中，这是从输入框组件状态中“提升”上来的，它将会用作两个输入框共同的的“数据源”。这是我们为了渲染两个输入框组件需要知道的所有数据最精简表达。

举个例子，假如我们在摄氏度输入框中输入37，那么 Calculator 的 state 就是：

```$xslt
{
  temperature: '37',
  scale: 'c'
}
```

如果我们之后在华氏度输入框输入212，那么 Calculator 的状态数据就会是：
```$xslt
{
  temperature: '212',
  scale: 'f'
}
```
我们可以一起保存两个输入的值，但这么做似乎没有必要。保存最新输入的温度和温度单位就足够了。我们可以只需基于当前的 temperature 和 scale 计算出另一个输入框中的值。

现在这两个输入框中的值能保持同步了，因为它们使用的是通过同一个 state 计算出来的值。
```$xslt
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />

        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />

        <BoilingVerdict
          celsius={parseFloat(celsius)} />

      </div>
    );
  }
}
```

现在，无论你编辑哪一个输入框，Calculator 组件中 this.state.temperature 和 this.state.scale 都会更新。向其中一个输入框输入值，另一个输入框总是基于这个值显示计算结果。

让我们梳理下编辑输入框时所发生的一系列活动：

1. React在DOM的\<input>上调用被指定为onChange的函数。在本例中，是TemperatureInput组件上的handleChange函数。
2. TemperatureInput组件的handleChange函数会用新输入值调用this.props.onTemperatureChange()函数。输入框组件的属性，包括onTemperatureChange都是由父组件Calculator提供的。
3. 当最开始渲染时，Calculator组件的handleCelsiusChange方法被指定给摄氏温度输入组件TemperatureInput的onTemperatureChange方法，同时把handleFahrenheitChange方法指定给华氏输入组件TemperatureInput的onTemperatureChange方法。所以Calculator组件的两个方法都会在相应输入框被编辑时被调用。
4. 在这些方法内部，Calculator组件会使用编辑输入的新值和当前输入框的温度单位来让React调用this.setState()方法来重渲染自身。
5. React调用Calculator组件的render方法来识别UI界面的样子。基于当前值和激活的温度单位，两个输入框的值会被重新计算。温度转换就是在这里被执行的。
6. React使用由Calculator指定的新props来调用各个TemperatureInput组件的render方法，React也会识别出子组件的UI界面。
7. React调用BoilingVerdict组件的render方法，传递摄氏温度作为它的属性。
8. React DOM 会用沸腾裁决更新DOM来匹配渴望的输入值。我们编辑的输入框获取新值，而另一个输入框则用经过转换的温度值进行更新。
一切更新都是经过同样的步骤，因而输入框能保持同步的。

---
####经验教训

在React应用中，对应任何可变数据理应只有一个单一“数据源”。通常，状态都是首先添加在需要渲染数据的组件中。然后，如果另一个组件也需要这些数据，你可以将数据提升至离它们最近的共同祖先中。你应该依赖 自上而下的数据流，而不是尝试在不同组件中同步状态。

状态提升要写更多的“炉墙代码”，比起双向绑定方式，但带来的好处是，你也可以花更少的工作量找到和隔离bug。因为任何生活在某些组件中的状态数据，也只有该组件它自己能够操作这些数据，发生bug的表面积就被大大地减小了。此外，你也可以使用自定义逻辑来拒绝（reject）或转换（transform）用户的输入。

如果某些数据可以由props或者state推导出来，那么它很有可能不应该在state中出现。举个例子，我们没有同时保存 celsiusValue 和 fahrenheitValue，而只是保存最新编辑的temperature和它的scale值。另一个输入框中的值总是可以在 render() 函数中由这些保存的数据计算出来。这样我们在不损失任何用户输入精度的情况下，可以对另一字段清除或应用四舍五入。

当你在开发UI界面遇到问题时，你可以使用 React 开发者工具来检查props属性，并且可以点击查看组件树，直到你找到负责目前状态更新的组件。这能让你到追踪到产生 bug 的源头。

---
###组合 vs 继承
React 具有强大的组合模型，我们建议使用组合而不是继承来复用组件之间的代码。

---
####包含关系
一些组件不能提前知道它们的子组件是什么。这对于 Sidebar 或 Dialog 这类通用容器尤其常见。

我们建议这些组件使用 children 属性将子元素直接传递到输出。

```$xslt
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

这样做还允许其他组件通过嵌套 JSX 来传递子组件。
```$xslt
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```
\<FancyBorder> JSX 标签内的任何内容都将通过 children 属性传入 FancyBorder。由于 FancyBorder 在一个 \<div> 内渲染了 {props.children}，所以被传递的所有元素都会出现在最终输出中。

虽然不太常见，但有时你可能需要在组件中有多个入口，这种情况下你可以使用自己约定的属性而不是 children：

```$xslt
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

---
####特殊实例
有时我们认为组件是其他组件的特殊实例。例如，我们会说 WelcomeDialog 是 Dialog 的特殊实例。

在 React 中，这也是通过组合来实现的，通过配置属性用较特殊的组件来渲染较通用的组件。

```$xslt
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />

  );
}
```
组合对于定义为类的组件同样适用：
```$xslt
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />

        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```
