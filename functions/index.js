const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config.firebase);

// exports.helloWorld = functions.https.onRequest((request, response) => {
// 	functions.logger.info("Hello logs!", { structuredData: true });
// 	response.send("Hello from Firebase!");
// });

const createNotification = notification => {
	return admin
		.firestore()
		.collection("notifications")
		.add(notification)
		.then(doc => console.log("Notification added", doc));
};

//trigger za kreiranje dokumenta
exports.projectCreated = functions.firestore.document("projects/{projectId}").onCreate(doc => {
	//dohvacanje podataka(ime, prezime,...) iz novog kreiranog dokumenta
	const project = doc.data();
	//notifikacijski objekt
	const notification = {
		content: "Added a new project",
		user: `${project.authorFirstName} ${project.authorLastName}`,
		time: admin.firestore.FieldValue.serverTimestamp(),
	};

	return createNotification(notification);
});

//trigger za brisanje dokumenta
exports.projectDeleted = functions.firestore.document("projects/{projectId}").onDelete(doc => {
	const project = doc.data();
	const notification = {
		content: "Deleted a project",
		user: `${project.authorFirstName} ${project.authorLastName}`,
		time: admin.firestore.FieldValue.serverTimestamp(),
	};

	return createNotification(notification);
});

//trigger za update-anje sadrzaja projekta
exports.projectUpdated = functions.firestore.document("projects/{projectId}").onUpdate(change => {
	//console.log(doc);
	//console.log(doc.data());
	const project = change.after.data();
	const notification = {
		content: "Updated a project",
		user: `${project.authorFirstName} ${project.authorLastName}`,
		time: admin.firestore.FieldValue.serverTimestamp(),
	};

	return createNotification(notification);
});

//trigger prilikom signUp-a usera pomocu auth servisa
exports.userJoined = functions.auth.user().onCreate(user => {
	return admin
		.firestore()
		.collection("users")
		.doc(user.uid)
		.get()
		.then(doc => {
			const newUser = doc.data();
			const notification = {
				content: "Joined the session",
				user: `${newUser.firstName} ${newUser.lastName}`,
				time: admin.firestore.FieldValue.serverTimestamp(),
			};

			return createNotification(notification);
		});
});
