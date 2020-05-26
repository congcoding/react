import React, { Component } from 'react'

class TOC extends Component {
	render() {
	  var lists = [];
	  var data = this.props.data;
	  var i = 0;
	  while(i < data.length) {
		  lists.push(
		  	<li key={data[i].id}>
				<a
					href={"/content/"+data[i].id}
					// data-id={data[i].id}
					//onClick={function(e){
					onClick={function(id, e){ //bind에 두번째 인자로 값을 넘겨주면 한칸씩 뒤로 밀림
						e.preventDefault();
						//this.props.onChangePage(e.target.dataset.id); //target = a, data-id = dataset.id
						this.props.onChangePage(id); //target = a, data-id = dataset.id
					// }.bind(this)}
					}.bind(this, data[i].id)} //
				>{data[i].title}</a>
			</li>);
		  i = i + 1;
	  }
	  return (
		<nav>
		  <ul>
			{lists}
		  </ul>
		</nav>
	  );
	}
  }

  export default TOC;
