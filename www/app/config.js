angular.module('swift.services').constant('$swiftConfig', {
	basePath : 'https://platform-preprod.gtnexus.com/rest/310/',
	dataKey : '08d67e055e2cd9b03705380dc625fe7ea6ef3c80',
	customObjects : {
		POLL : '$pollB1',
		USER : '$userB1',
		ANSWER : '$answerB1'
	},
    missedPollLimit: 7,
	listLimit : 10,
	localstorage : {
		USER : 'user'
	},
	oql : {
		// @@ is the namespace for textValue which is dynamically assigned.
		// TODO: improve this possibly order by created date and limit required
		// amount.
		POLLS_ASSIGNED_TO_ME : "status='active' AND participantOrgIds.txtValue='@@'",
		ANSWERED_PROVIDED_BY_ME_FOR_POLLS_ASSGINGED_TO_ME : "status='active' AND submittedBy='1@@' AND pollUid IN (2@@)",
		CURRENT_LOGGED_IN_USER_CO : "status ='active' AND userId='1@@' AND userOrgId='2@@'"
	},
	log : true,
	ownerOrg : {
		"partyRoleCode" : "Buyer",
		"name" : "Swift Buyer",
		"memberId" : "3717989018024871",
		"contact" : {}
	}
});