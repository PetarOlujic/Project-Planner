const initState = {
	authError: null,
};

//state je state store-a, pri prvoj interakciji taj state ne postoji
//pa mora postojati neka inicijalna vrijednost state-a (initState) koji mi određujemo
const authReducer = (state = initState, action) => {
	switch (action.type) {
		case "LOGIN_ERROR":
			console.log("Login error!");
			return {
				...state,
				authError: "LOGIN FAILED.",
			};
		case "LOGIN_SUCCESS":
			console.log("Login success!");
			return {
				...state,
				authError: null,
			};
		case "SIGNOUT_SUCCESS":
			console.log("Signout success!");
			return state;
		case "SIGNUP_SUCCESS":
			console.log("Signup success!");
			return {
				...state,
				authError: null,
			};
		case "SIGNUP_ERROR":
			console.log("Signup error!");
			return {
				...state,
				authError: action.error.message,
			};
		default:
			//console.log("Default state!");
			return state;
	}
};

export default authReducer;
