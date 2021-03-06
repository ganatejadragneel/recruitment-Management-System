import React, { Component } from 'react';
import { Button, Form, FormGroup, Label,FormText, Input, Badge } from 'reactstrap';
import {Resumes} from './resumes'
import axios from 'axios';
import imgg from './spinno.gif'

const showed={
	display: 'block',
	paddingLeft:'90vh',
	paddingTop:'45vh',
	position:'fixed',
	width:'100%',
	height: '100%',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: '3'
}

const hidded={
	display: 'none',
	paddingLeft:'90vh',
	paddingTop:'45vh',
	position:'fixed',
	width:'100%',
	height: '100%',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: '3'
};


export class AddResumes extends Component {
	constructor() {
		super();
		this.state = {
		  Name: '',
		  Email: '',
		  Skills:'',
		  File:'',
		  sample:'',
		  chaange:false,
		  show:hidded
		};
	}

	onChange = (e) => {
		const state = this.state;
		switch (e.target.name) {
		  case 'File':
			state.File = e.target.files[0];
			break;
		  default:
			state[e.target.name] = e.target.value;
		}

		this.setState(state);
		this.setSampleToEmpty();
	}


	onSubmit = (e) => {
		e.preventDefault();
		const { Name, Email, Skills,File } = this.state;
		let formData = new FormData();
		this.loaderShow();
		setInterval(console.log(1),10000);
		formData.append('Name', Name);
		formData.append('Email', Email);
		formData.append('Skills', Skills);
		formData.append('File', File);

		axios.post('/first1/uploadresume', formData)
		  .then((result) => {
			this.setSampleToAdded();
			console.log(result);
			this.setState({
			  Name: '',
			  Email: '',
			  Skills:'',
			  show:hidded
			});
		  }).catch(()=>{this.setState({sample:'Error Adding Resume',show:hidded})});
	}
	
	setSampleToEmpty(){
		this.setState({sample:''})
	}
	
	setSampleToAdded(){
		this.setState({sample:'Resume Added Successfully'})
	}
	
	loaderShow(){
		this.setState({show:showed});
	}

	render() {
		const { Name, Email,Skills} = this.state;
		if(!this.state.chaange){
		return (
				<div>
				<div><h3 style={this.state.show}><img src={imgg} alt="Can't Load" /></h3></div>
				<div>
					<div className="leftBadge"><h2><Badge color="info">Add A New Resume</Badge></h2></div>
					<div className="space">
					<h4>
						{this.state.sample}
					</h4>
					</div>
					<div className="rightAdd"><Button onClick={()=>{this.setState({chaange:!this.state.chaange})}}>Back</Button></div>			
				</div>
				<br/>
				<br/>
				<Form id="myForm" onSubmit={this.onSubmit}>
					<FormGroup>
						<Label for="exampleEmail">Name</Label>
						<Input type="text" name="Name" value={Name} onChange={this.onChange} />
					</FormGroup>
					<FormGroup>
						<Label for="exampleEmail">Email</Label>
						<Input type="text" name="Email" value={Email} onChange={this.onChange} /><br/>
					</FormGroup>
					<FormGroup>
						<Label for="exampleEmail">Skills</Label>
						<Input type="text" name="Skills" value={Skills} onChange={this.onChange} /><br/>
					</FormGroup>
					<FormGroup>
					  <Label for="exampleFile">File</Label>
					  <Input type="file" name="File" onChange={this.onChange} />
					  <FormText color="muted">
						Upload The Resume in PDF Format only
					  </FormText>
					</FormGroup>
				<Button type="submit">Submit</Button>
				</Form>
				</div>
		);}
		else{
			return <Resumes/>;
		}
	}
}