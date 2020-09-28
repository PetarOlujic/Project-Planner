import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { deleteProject } from "../../store/actions/projectActions";
import { updateProject } from "../../store/actions/projectActions";

class ProjectDetails extends Component {
	handleDelete = e => {
		//console.log(this.props);
		if (this.props.auth.uid === this.props.project.authorId) {
			const { id } = this.props;
			e.preventDefault();
			this.props.deleteProject(id);
			console.log(id);
			this.props.history.push("/");
		} else {
			alert("You are not authorised to delete this post!");
		}
	};

	handleUpdate = e => {
		if (this.props.auth.uid === this.props.project.authorId) {
			let updatedContent = prompt("Enter your updated content here:", this.props.project.content);
			if (updatedContent === null || updatedContent === "") {
				alert("Content is not updated!");
				updatedContent = this.props.project.content;
			}
			const { id } = this.props;
			e.preventDefault();
			console.log(id, updatedContent);
			this.props.updateProject(id, updatedContent);
			//this.props.history.push("/");
		} else {
			alert("You are not authorised to update this post!");
		}
	};

	render() {
		const { project, auth } = this.props;
		if (!auth.uid) return <Redirect to="/signin" />;
		if (project) {
			return (
				<div className="container section project-details">
					<div className="card">
						<div className="card-content">
							<span className="card-title">{project.title}</span>
							<p>{project.content}</p>

							<button
								className="btn pink lighten-1 z-depth-0 project-details-btn"
								onClick={this.handleDelete}
							>
								Delete
							</button>
							<button
								className="btn pink lighten-1 z-depth-0 project-update-btn"
								onClick={this.handleUpdate}
							>
								Update project content
							</button>
						</div>
						<div className="card-action grey lighten-4 grey-text">
							<div>
								Posted by {project.authorFirstName} {project.authorLastName}
							</div>
							<div>{moment(project.createdAt.toDate()).calendar()}</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="progress">
					<div className="indeterminate blue lighten-3"></div>
				</div>
			);
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	//console.log(state);
	const id = ownProps.match.params.id;
	const projects = state.firestore.data.projects;
	const project = projects ? projects[id] : null;
	return {
		id,
		project: project,
		auth: state.firebase.auth,
	};
};

const mapDistpacthToProps = dispatch => {
	return {
		updateProject: (id, updatedContent) => dispatch(updateProject(id, updatedContent)),
		deleteProject: id => dispatch(deleteProject(id)),
	};
};

export default compose(
	connect(mapStateToProps, mapDistpacthToProps),
	firestoreConnect([{ collection: "projects" }])
)(ProjectDetails);
