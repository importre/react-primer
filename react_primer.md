name: inverse
layout: true
class: center, middle, inverse

---

# A React primer

### react /riǽkt/

re((자극 등에) 반응하여)＋act(행동하다)

.footnote[Jaewe Heo - [@importre](https://github.com/importre)]

---

## A Javascript library for building UI

### Part. 1

.footnote[React - [@facebook/react](http://facebook.github.io/react)]

---

layout: false

## React

### - Just the UI
> React는 `MVC`에서 `View`만 생각합니다.

### - Virtual DOM
> React는 성능 향상을 위해 Virtual DOM을 사용합니다.  

### - Data flow
> React는 단방향 반응형 데이터 플로우를 구현합니다.

<br>
<br>

.right[무슨 소리인지?]

---

.left-column[
### Just the UI
]

.right-column[

먼저 HTML 파일을 작성합니다.

```html
<!DOCTYPE html>
<html>
  <head>
*   <script src="build/react.js"></script>
*   <script src="build/JSXTransformer.js"></script>
  </head>
  <body>
*   <div id="hello"></div>
*   <script type="text/jsx" src="hello.js"></script>
  </body>
</html>
```

`hello.js`를 작성하여  
`<div id="hello"></div>`에 `Hello, React!`가 나오도록 구현할 예정입니다.

html 파일은 더이상 수정할 필요가 없어요!
]

---

.left-column[
### Just the UI
]

.right-column[

`hello.js` with JSX

```js
var mountNode = document.getElementById('hello');
var Hello = React.createClass({
  render: function() {
    return <div>Hello React!</div>;
  }
});

React.render(<Hello />, mountNode);
```

pure Javascript

```
var mountNode = document.getElementById('hello');
var hello = React.createElement('div', null, 'Hello, React!');
React.render(hello, mountNode);
```

HTML 결과는 동일합니다.

```
Hello, React!
```
]

.footnote[.red[*] [JSX](http://goo.gl/rNCyq2): javascript syntax extension]

---

.left-column[
### Just the UI
]

.right-column[
아래 내용을 Javascript로 구현하기 귀찮겠죠?

```js
var Main = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Nested Structure</h1>
        <Hello />
      </div>
    );
  }
});
```

아마 그럴거에요.

```
var Main = React.createClass({displayName: "Main",
  render: function() {
    return (
      React.createElement("div", null,
        React.createElement("h1", null, "Nested Structure"),
        React.createElement(Hello, null)
      )
    );
  }
});
```

]

---

.left-column[
### Just the UI
### Virtual DOM
]

.right-column[
방금 보신 것이 Virtual DOM!
- 다른 말로 React DOM 이라고 합니다.

```xml
<div>
  <h1>Nested Structure</h1>
  <Hello />
</div>
```

`<Hello>` 뿐만 아니라,

`<div>`, `<h1>` 같은 HTML Element도 `ReactElement` 라고 부릅니다.
]

.footnote[.red[*] [React (Virtual) DOM Terminology](http://goo.gl/JZEOVp)]
---

.left-column[
### Just the UI
### Virtual DOM
### Data flow
]

.right-column[

간단한 실습을 위해 `pause` 버튼을 누릅니다.

> <button onclick="slideshow.pause();">pause</button>

이름을 입력해 보세요!

<script type="text/jsx" src="example/dataflow.js"></script>
> <div id="dataflow"></div>

`resume` 버튼을 누릅니다.
> <button onclick="slideshow.resume();">resume</button>

.footnote[.red[*] 버튼을 누르는 이유는 프리젠테이션 키보드 이벤트를 막고 풀기 위함]
]

---

.left-column[
### Just the UI
### Virtual DOM
### Data flow
]

.right-column[

소스코드,

```js
var mountNode = document.getElementById('dataflow')
var Hello = React.createClass({
  getInitialState: function() {
    return {name: ''};
  },
  handleChange: function() {
    this.setState({
      name: this.refs.input.getDOMNode().value
    });
  },
  render: function() {
    return (
      <div>
        <div>Hello <b>{this.state.name}</b>!</div>
        <input type="text" placeholder="Type your name"
               ref="input" onChange={this.handleChange}/>
      </div>
    );
  }
});

React.render(<Hello />, mountNode);
```

복잡한가요? `refs`, `state` 등 튜토리얼을 통해 하나하나 살펴봅시다.
]

---

template: inverse

## Anatomy of React Tutorial

with Firebase

### Part. 2

.footnote[React - [Tutorial](http://facebook.github.io/react/docs/tutorial.html)]

---

.left-column[
### Demo
]

.right-column[
아래에 코멘트를 남겨볼까요?

<iframe src="tutorial" width="100%" height="500px" frameBorder="0"></iframe>

.footnote[Demo - [Tutorial](https://importre.github.io/react-primer/tutorial)]
]

---

.left-column[
### Demo
### Tutorial
]

.right-column[
앞서 본 데모의 구조는 아래와 같습니다.

```
- CommentBox
    - CommentForm
    - CommentList
        - Comment
        - Comment
          ...
        - Comment
```

그리고 `id=tutorial`인 HTML element에 `<CommentBox />`를 렌더링하면 끝입니다.

```js
React.render(
  <CommentBox />,
  document.getElementById("tutorial")
);

```

그럼 시작...해볼까요?
]

---

.left-column[
### Demo
### Tutorial
### CommentBox
]

.right-column[
```js
var CommentBox = React.createClass({
* getInitialState: function() {
    this.data = [];
    this.fb = new Firebase("https://<user_app_id>.firebaseio.com/comments");
    return {data: []};
  },
* componentDidMount: function() {
    this.fb.limitToLast(30).on("child_added", function(dataSnapshot) {
      this.data.splice(0, 0, dataSnapshot.val());
*     this.setState({
*       data: this.data
*     });
    }.bind(this));
  },
  handleCommentSubmit: function(comment) {
    this.fb.push(comment);
  },
* render: function() {
    return (
      <div className="commentBox">
        <div className="page-header">
          <h1>React <small>with Firebase</small></h1>
        </div>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
*       <CommentList data={this.state.data} />
      </div>
    );
  }
});
```
]

---

.left-column[
### Demo
### Tutorial
### CommentBox
]

.right-column[
`getInitialState`, `componentDidMount`
- Part.3 `라이프사이클` 에서 살펴봅니다.

`this.setState`
- 다이나믹한 UI 업데이트의 핵심!
- `state`가 업데이트되면 콤포넌트는 스스로 렌더링을 다시 합니다.

`render`
- 인풋 데이터를 취해서 화면에 보여주는 역할을 합니다.
- `state`가 업데이트되면 호출됩니다.

`data={this.state.data}`
- .red[절대로] `this.state`를 직접적으로 변경하지 마세요!
- `<CommentList />`에 `data` 속성을 설정하여 데이터를 전달합니다.

.footnote[.red[*] Lifecycle - [Part. 3](#lifecycle)]
]

---

.left-column[
### Demo
### Tutorial
### CommentBox
### CommentForm
]

.right-column[
```js
var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
*   var author = this.refs.author.getDOMNode().value.trim();
*   var text = this.refs.text.getDOMNode().value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({
      author: author,
      text: text,
      time: new Date().toUTCString()
    });
    this.refs.text.getDOMNode().value = "";
  },
  render: function() {
    return (
*     <form className="form-group" onSubmit={this.handleSubmit}>
*       <input className="form-control" type="text"
*              placeholder="Your name" ref="author" />
        <div className="input-group">
*         <input className="form-control" type="text"
*                placeholder="Say something... (supported markdown)" ref="text" />
          <span className="input-group-btn">
            <input className="btn btn-default" type="submit" value="Post" />
          </span>
        </div>
      </form>
    );
  }
});
```
]

---

.left-column[
### Demo
### Tutorial
### CommentBox
### CommentForm
]

.right-column[
`onSubmit`
- 콤포넌트에 이벤트 핸들러 이름은 camelCase 형식을 따릅니다.
- HTML의 form 관련 event/element는 React의 [Forms](http://goo.gl/geFZKL)를 참고하세요.

`this.refs`
- `this.refs`를 통해 콤포넌트를 참조할 수 있습니다.
    - `ref` 속성으로 참조할 콤포넌트를 설정하세요.
- `getDOMNode()`를 통해 실제 DOM Node를 참조할 수 있습니다.

`className="form-group"`
- HTML element에서 사용하는 `class` 속성과 같습니다.
    - Javascript는 `class`가 예약어 이므로 다르게 표현합니다!
]

---

.left-column[
### Demo
### Tutorial
### CommentBox
### CommentForm
### CommentList
]

.right-column[
```js
var CommentList = React.createClass({
  render: function() {
*   var commentNodes = this.props.data.map(function (comment) {
      return (
*       <Comment author={comment.author} time={comment.time}>
*         {comment.text}
*       </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});
```
]

---

.left-column[
### Demo
### Tutorial
### CommentBox
### CommentForm
### CommentList
]

.right-column[

`this.props.data`
- 설정한 `data` 속성을 `this.props`를 통해 읽을 수 있습니다.

시작할 때 구조 기억나시죠?

```
- CommentBox
    - CommentForm
*   - CommentList
*       - Comment
*       - Comment
*         ...
*       - Comment
```

방금 한 작업이 `<Comment />` 리스트 목록을 구성한 것입니다.
]

---

.left-column[
### Demo
### Tutorial
### CommentBox
### CommentForm
### CommentList
### Comment
]

.right-column[
```js
var converter = new Showdown.converter();
var Comment = React.createClass({
  render: function() {
*   var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <blockquote>
*       <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
*       <footer>{this.props.author}. <i>{this.props.time}</i></footer>
      </blockquote>
    );
  }
});
```
]

---

.left-column[
### Demo
### Tutorial
### CommentBox
### CommentForm
### CommentList
### Comment
]

.right-column[
`this.props.children`
- Child ReactElement를 가져올 수 있습니다.

`dangerouslySetInnerHTML={{__html: rawMarkup}}`
- `__html`을 key로 가지는 `object`를 설정하면 raw HTML을 넣을 수 있습니다.
- XSS 공격을 방지하기 위해, 사용하기 어렵게 만들어진 속성입니다.

`this.props`
- 속성으로 넘어온 값을 가져올 수 있습니다.
]

---

name: lifecycle
template: inverse

## Lifecycle of Component

### Part. 3

.footnote[React - [Component Lifecycle](http://goo.gl/bcFYlb)]

---

.left-column[
### Main Points
]

.right-column[
콤포넌트 라이프사이클은 크게 세 부분으로 나뉩니다.

- Mounting
    - DOM에 콤포넌트가 삽입되는 상황

- Updating
    - DOM이 업데이트가 되어야 할지를 결정하기위해 다시 그려지는 상황

- Unmounting
    - 콤포넌트가 DOM에서 제거되는 상황
]

---

.left-column[
### Main Points
### Mounting
]

.right-column[
- getInitialState(): object
    - 콤포넌트가 마운트 되기 전에 호출됩니다.
    - 상태 유지를 위해 이 부분을 구현해서 초기 상태에 대한 데이터를 리턴해야 합니다.

- componentWillMount()
    - 마운트 되기 전에 바로 호출됩니다.

- componentDidMount()
    - 마운트 되고난 뒤에 바로 호출됩니다.
]

---

.left-column[
### Main Points
### Mounting
### Updating
]

.right-column[
- componentWillReceiveProps(object nextProps)
    - 마운트 된 콤포넌트가 새 `props`를 받으면 호출됩니다.
    - `this.props`와 `nextProps`를 비교해서 상태를 변환(`this.setState()`)하는데 사용합니다.

- shouldComponentUpdate(object nextProps, object nextState): boolean
    - DOM 업데이트 여부 전에 호출됩니다.
    - `this.props`와 `nextProps`, `this.state`와 `nextState`를 보고 결정하면 됩니다.
    - 리턴 값이 `false`이면 업데이트를 하지 않습니다.

- componentWillUpdate(object nextProps, object nextState)
    - 업데이트 발생 전에 바로 호출된다.
    - `this.setState()`를 여기서 호출할 수 없습니다.

- componentDidUpdate(object prevProps, object prevState)
    - 업데이트 후에 바로 호출됩니다.
]

---

.left-column[
### Main Points
### Mounting
### Updating
### Unmounting
]

.right-column[
- componentWillUnmount()
    - 콤포넌트가 언마운트되고 소멸되기 전에 호출됩니다.
    - 클린업을 여기서 해야 합니다.

- ( '') 언마운트는 위 하나 뿐 입니다.
]

---

.left-column[
### Main Points
### Mounting
### Updating
### Unmounting
### Lifecycle Test
]

.right-column[
직접 확인해 보세요!
<div id="lifecycle"></div>
<script type="text/jsx" src="lifecycle/app.js"></script>

.footnote[Demo - [Lifecycle](https://importre.github.io/react-primer/lifecycle)]
]

---

template: inverse

## 감사합니다. :^)

##### 2015.03.01

React to [React](http://facebook.github.io/react/)!

.footnote[발표자료 - [@importre/react-primer](https://github.com/importre/react-primer)]
