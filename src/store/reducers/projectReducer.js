const initState = {
	projects: [
		{
			id: "1",
			title: "A new chat application",
			content:
				"Up unpacked friendly ecstatic so possible humoured do. Ample end might folly quiet one set spoke her. We no am former valley assure. Four need spot ye said we find mile. Are commanded him convinced dashwoods did estimable forfeited. Shy celebrated met sentiments she reasonably but. Proposal its disposed eat advanced marriage sociable. Drawings led greatest add subjects endeavor gay remember. Principles one yet assistance you met impossible.",
		},
		{
			id: "2",
			title: "Constructing a weather app",
			content:
				"With my them if up many. Lain week nay she them her she. Extremity so attending objection as engrossed gentleman something. Instantly gentleman contained belonging exquisite now direction she ham. West room at sent if year. Numerous indulged distance old law you. Total state as merit court green decay he. Steepest sex bachelor the may delicate its yourself. As he instantly on discovery concluded to. Open draw far pure miss felt say yet few sigh",
		},
		{
			id: "3",
			title: "Food application for restaurants",
			content:
				"Ten the hastened steepest feelings pleasant few surprise property. An brother he do colonel against minutes uncivil. Can how elinor warmly mrs basket marked. Led raising expense yet demesne weather musical. Me mr what park next busy ever. Elinor her his secure far twenty eat object. Late any far saw size want man. Which way you wrong add shall one. As guest right of he scale these. Horses nearer oh elinor of denote. ",
		},
	],
};

const projectReducer = (state = initState, action) => {
	switch (action.type) {
		case "CREATE_PROJECT":
			console.log("Created project", action.project);
			return state;
		case "CREATE_PROJECT_ERROR":
			console.log("Create project error", action.error);
			return state;
		case "DELETE_PROJECT":
			console.log("Deleted project");
			return state;
		case "DELETE_PROJECT_ERROR":
			console.log("Deleted project error", action.project);
			return state;
		case "UPDATE_PROJECT":
			console.log("Updated project");
			return state;
		case "UPDATE_PROJECT_ERROR":
			console.log("Updated project error", action.project);
			return state;
		default:
			//console.log("Default state!");
			return state;
	}
};

export default projectReducer;
