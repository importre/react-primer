var CommentBox = React.createClass({
  getInitialState: function() {
    this.data = [];
    this.fb = new Firebase("https://dogfood.firebaseio.com/comments");
    return {data: []};
  },
  componentDidMount: function() {
    this.fb.limitToLast(30).on("child_added", function(dataSnapshot) {
      this.data.splice(0, 0, dataSnapshot.val());
      this.setState({
        data: this.data
      });
    }.bind(this));
  },
  handleCommentSubmit: function(comment) {
    this.fb.push(comment);
  },
  render: function() {
    return (
      <div className="commentBox">
        <div className="page-header">
          <h1>React <small>with Firebase</small></h1>
        </div>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        <CommentList data={this.state.data} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author} time={comment.time}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var converter = new Showdown.converter();
var Comment = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <blockquote>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
        <footer>{this.props.author}. <i>{this.props.time}</i></footer>
      </blockquote>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
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
      <form className="form-group" onSubmit={this.handleSubmit}>
        <input className="form-control" type="text" placeholder="Your name" ref="author" />
        <div className="input-group">
          <input className="form-control" type="text" placeholder="Say something... (supported markdown)" ref="text" />
          <span className="input-group-btn">
            <input className="btn btn-default" type="submit" value="Post" />
          </span>
        </div>
      </form>
    );
  }
});

React.render(
  <CommentBox />,
  document.getElementById("tutorial")
);
