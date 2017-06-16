import React, { Component } from 'react';
import { Header,Icon,Button, Comment, Form, Loader, Segment} from 'semantic-ui-react'
import logo from './logo.svg';
import './App.css';


import * as firebase from 'firebase';

var config = {
   apiKey: "AIzaSyC0sc-CMwxusNce54bS4o7YDdzEGDRGK4Y",
   authDomain: "cool-chat-82bb3.firebaseapp.com",
   databaseURL: "https://cool-chat-82bb3.firebaseio.com",
   projectId: "cool-chat-82bb3",
   storageBucket: ""
 };

firebase.initializeApp(config)
const rootRef = firebase.database().ref().child('chats')

class App extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {chats:[], new_text: ''};
  }


  componentDidMount(){

    let self = this
    rootRef.on('value',listChat => {
      self.setState({
        chats: listChat.val()
      })
    });
  }

  render() {
    return (
      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <div>
          <Header as='h2' icon textAlign='center'>
            <Icon name='users' circular />
            <Header.Content>
              Everybody can chat!
            </Header.Content>
          </Header>
        </div>

        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Comment.Group>
  
          <ChatList chats={this.state.chats} />

            <Form onSubmit={this.handleSubmit}>
              <Form.TextArea onChange={this.handleChange} value={this.state.new_text} placeholder='Send Message...' autoHeight/>
              <Button content='Send' labelPosition='left' icon='edit' primary />
            </Form>
          </Comment.Group>
        </div>

      </div>
    );
  }


  handleChange(e) {
    this.setState({new_text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    var time = new Date().getTime();
    var newdate = new Date(time).toString();

    var new_chat = {
      text: this.state.new_text,
      date: newdate
    };
    rootRef.push(new_chat)
    this.setState({
      new_text:''
    })
  }
}

class ChatList extends React.Component {
  render() {
    console.log('thisss----------',this.props);
    if(this.props.chats.length===0){
      return (
        <div>
         <Segment>
           <Loader active inline/>
         </Segment>
        </div>
      );
    }
    else{
      let list=[]
      let chats = this.props.chats
      for (let key in chats) {
        list.push(chats[key])
      }
      console.log('list---',list);
    return (
        <div>
          {list.map(chat => (
            <Comment key={chat.date}>
              <Comment.Avatar as='a' src='https://d30y9cdsu7xlg0.cloudfront.net/png/213810-200.png'/>
              <Comment.Content>
                <Comment.Author>Anonymous</Comment.Author>
                <Comment.Metadata>
                  <div>{chat.date}</div>
                </Comment.Metadata>
                <Comment.Text>
                  <p>{chat.text}</p>
                </Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
        </div>
      );
    }
  }
}

export default App;
