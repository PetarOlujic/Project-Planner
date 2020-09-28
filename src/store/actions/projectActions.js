export const createProject = project => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		//async poziv prema DB
		const firestore = getFirestore();
		//getState() je nacin pristupanja stateu preko parametra u return f-ji
		const profile = getState().firebase.profile;
		const authorId = getState().firebase.auth.uid;
		firestore
			.collection("projects")
			.add({
				...project,
				authorFirstName: profile.firstName,
				authorLastName: profile.lastName,
				authorId: authorId,
				createdAt: new Date(),
			})
			.then(() => {
				dispatch({ type: "CREATE_PROJECT", project });
			})
			.catch(error => {
				dispatch({ type: "CREATE_PROJECT_ERROR", error });
			});
	};
};

export const deleteProject = id => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		firestore
			.collection("projects")
			.doc(id)
			.delete()
			.then(() => {
				dispatch({ type: "DELETE_PROJECT", id });
			})
			.catch(error => {
				dispatch({ type: "DELETE_PROJECT_ERROR", error });
			});
	};
};

export const updateProject = (id, updatedContent) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		firestore
			.collection("projects")
			.doc(id)
			.update({ content: updatedContent })
			.then(() => {
				dispatch({ type: "UPDATE_PROJECT", id });
			})
			.catch(error => {
				dispatch({ type: "UPDATE_PROJECT_ERROR", error });
			});
	};
};
