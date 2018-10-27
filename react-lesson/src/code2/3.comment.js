import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'moment/locale/zh-cn'
axios.interceptors.response.use(function (res) {
  if (res.data.err === 0) {
    return res.data.xxxx
  }
});
// vue v-for
class List extends React.Component {
  state = {
    num: 0
  }
  render() {
    let { avatar, title, content, cre,date="" } = this.props;
    console.log(date);
    return <li className="list-group-item" >
      <div className="media">
        <div className="media-left">
          <img
            style={{ width: '100px', height: '100px' }}
            className="media-object" src={avatar} alt="" />
        </div>
        <div className="media-body">
          <h4 className="media-heading">{title}</h4>
          <div>{content}</div>
          <button onClick={() => {
            this.setState({ num: this.state.num + 1 });
            cre(5);
          }}>👍</button> {this.state.num} {moment(date).fromNow()}
        </div>
      </div>
    </li>
  }
}
class Comment extends React.Component {
  state = {
    comments: [],
    total: 0
  }
  increment = (index) => {
    this.setState({ total: this.state.total + index });
  }
  async componentDidMount() {
    let comments = await axios.get('/user.json');
    this.setState({
      comments
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let content = {
      avatar: '',
      username: 'zfpx',
      title: this.username.value,
      content: this.content.value,
      date: new Date()
    };
    let result = [...this.state.comments, content];
    this.setState({ comments: result });
  }
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username" className="control-label">用户</label>
            <input type="text" id="username" className="form-control" autoComplete="off" ref={x => this.username = x} />
          </div>
          <div>
            <label htmlFor="content" className="control-label">内容</label>
            <input type="text" id="content" className="form-control" autoComplete="off" ref={x => this.content = x} />
          </div>
          <div>
            <input type="submit" className="btn btn-default" />
          </div>
        </form>
        <ul className="list-group">
          {this.state.comments.map((comment, key) => (
            <List {...comment} key={key} index={key} cre={this.increment}></List>
          ))}
        </ul>
        <div>
          <Total total={this.state.total}></Total>
        </div>
      </div>
    )
  }
}
function Total(props) {
  return <div>当前评论数总点击量 {props.total}</div>
}
ReactDOM.render(<Comment></Comment>, window.root)
//http://localhost:3000/user.json