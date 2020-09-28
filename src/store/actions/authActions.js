export const signIn = credentials => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signInWithEmailAndPassword(credentials.email, credentials.password)
			.then(() => {
				dispatch({ type: "LOGIN_SUCCESS" });
			})
			.catch(error => {
				dispatch({ type: "LOGIN_ERROR", error });
			});
	};
};

//getFirebase() vraca instancu firebase-a koju cemo iskoristit za login korisnika
//auth() ce nam vratiti promise
export const signOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signOut()
			.then(() => {
				dispatch({ type: "SIGNOUT_SUCCESS" });
			});
	};
};

//getFirebase sluzi za signUp-anje novog korisnika pomocu auth servicea FB
//getFirestore sluzi za komunikaciju sa firestore DB
export const signUp = newUser => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();

		firebase
			.auth()
			.createUserWithEmailAndPassword(newUser.email, newUser.password)
			.then(response => {
				return firestore
					.collection("users")
					.doc(response.user.uid)
					.set({
						firstName: newUser.firstName,
						lastName: newUser.lastName,
						initials: newUser.firstName[0] + newUser.lastName[0],
					});
			})
			.then(() => {
				dispatch({ type: "SIGNUP_SUCCESS" });
			})
			.catch(error => {
				dispatch({ type: "SIGNUP_ERROR", error });
			});
	};
};
//korstimo .doc() umisto .add() jer bi se s add stvoria novi document sa novim id-em koji nam ne triba
//jer koristimo uid koji je generiran u kodu povise za novog korisnika
//1. then vraca promise, pa onda moramo resolveat to sa 2. then-om, u kojemu dispatchamo akciju
