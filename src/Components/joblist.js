import React from 'react'
import { Table } from 'reactstrap';
import JobData from './jobData'


export class JobList extends React.Component{
	
		constructor(props){
			super(props);
			this.state={numb:0,modal:false,response:[]}
			this.handleClick = this.handleClick.bind(this);
			this.toggle=this.toggle.bind(this);
		}
		componentDidMount() {
			this.callApi()
			  .then(res => {
				  console.log(res);
				  
				this.setState({ response: res.express});
				  
			  })
			  .catch(err => console.log(err));
		}

		callApi = async () => {
			const response = await fetch('/first1/joblist');
			const body = await response.json();

			if (response.status !== 200) throw Error(body.message);

			return body;
		};
	  
		handleClick(){
			this.toggle()
		}
		
		
		toggle() {
			this.setState({
			  modal: !this.state.modal
			});
		  }
		  
		update(i){
			this.setState({
				numb:i	
			});
		}
		render(){
		
				return (
				<div>
					<Table bordered>
						<thead>
							<th>ID No.</th>
							<th>Title</th>
							<th>Description</th>
							<th>Location</th>
							<th>Skills</th>
						</thead>{
						this.state.response.map((job)=>{
							return (
							<tr>
								<td>{job.id+1}</td>
								<td onClick={()=>{this.handleClick();this.update(job.id)}}>{job.Title}</td>
								<JobData tog={this.state.modal} closer={this.handleClick} id={this.state.numb} />
								<td>{job.Description}</td>
								<td>{job.Location}</td>
								<td>{job.Skills}</td>
							</tr>
							)
						})}
					</Table>
				</div>
		);
		}
}