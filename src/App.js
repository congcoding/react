import React, { Component } from 'react'
import TOC from "./components/TOC"
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import UpdateContent from "./components/UpdateContent"
import Subject from "./components/Subject"
import Control from "./components/Control"

/* import React from 'react'; */
/* import logo from './logo.svg'; */
import './App.css';

//유사 자바스크립트
class App extends Component {
  //render()보다 먼저 실행되면서, 그 Component를 초기화시켜주고 싶은 코드는 constructor()안에 코드를 작성한다.
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'welcome',
      selected_content_id:2,
      subject:{title:'WEB', sub:'World Wide Web!'},
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  getReadContent(){
    var i = 0;
    while (i < this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id) {
        return data;
      }
      i = i + 1;
    }
  }
  getContent(){
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc){
        // add content to this.state.contents
        this.max_content_id = this.max_content_id + 1;
        // this.state.contents.push( //push는 원본에 추가 -> 성능 개선 힘듦
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );

        // var _contents = this.state.contents.concat( //concat은 사본에 추가 (immutable) -> 성능 개선에 유리
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // )

        var _contents = Array.from(this.state.contents) //imuutable
        _contents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          contents:_contents,
          mode:'read',
          selected_content_id:this.max_content_id
        });
          console.log(_title, _desc);
      }.bind(this)}></CreateContent>
    } else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
          var _contents = Array.from(this.state.contents); //복제해서 새로운 배열을 만들어서 사용 (immutable)
          var i = 0;
          while (i < _contents.length) {
            if (_contents[i].id === _id) {
              _contents[i] = {id:_id, title:_title, desc:_desc}
              break;
            }
            i = i + 1;
          }
          this.setState({
            contents:_contents,
            mode:'read'
          });
          // console.log(_title, _desc);
        }.bind(this)}></UpdateContent>
    }
    //console.log('render', this);
    return _article;
  }

  render() {
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
        >
        </Subject>
        {/* <header>
          <h1><a href="/" onClick={function(e){
            console.log(e);
            e.preventDefault();
            //alert('hi');
            //this.state.mode = 'welcome'; //event에서는 this가 undefined (bind(this)를 추가하면 this를 사용할 수 있음)
            this.setState({
              mode:'welcome' //this.state.mode로 바꿔도 react는 알지 못함
            });
          }.bind(this)}>{this.state.subject.title}</a></h1>
          {this.state.subject.sub}
        </header> */}
        <TOC
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
            });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>
        <Control onChangeMode={function(_mode){
          if(_mode === 'delete') {
            if (window.confirm('really?')) {
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while (i < _contents.length) {
                if (_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i, 1); //원본 변경
                  break;
                }
                i = i + 1;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert('deleted!');
            }
          } else {
            this.setState({
              mode:_mode
            });
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default App;
