import React, { Component } from 'react'

class Subject extends Component {
	render() {  //반드시 render가 있어야 함 (function 생략 가능)
	  return (
		//하나의 최상위 태그에서 시작해야 함
		<header>
		  {/*
			<h1>WEB</h1>
			world wide web!
		  */}
		  <h1><a href="/" onClick={function(e){
			  e.preventDefault();
			  this.props.onChangePage();
		  }.bind(this)}>{this.props.title}</a></h1>
		  {this.props.sub}
		</header>
	  );
	}
  }

  export default Subject;
