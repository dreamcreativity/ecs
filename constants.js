module.exports = {

	MediaTypes : [
		'Image',
		'Document',
		'Video',
		'Other'
	],

	MediaTarget : [
		'Slider',
		// 'Gallery',
		'Material',
		'Course',
		'Student',
		'Staff',
		'Activity',
		'Event',
		'Other'
	],

	CourseType: [
		'Weekly',
		'Fixed Period'
	],

	CourseLevel: [
		'Intensive',
		'Standard',
		'Part-time'
	],



	// template seaction

	RegistrationTemplateVars : {
		firstname : null,
		lastname : null,
		gender : null,
		birthday : null,
		age : null,
		citizenship : null,
		address : null,
		city : null,
		province : null,
		country : null,
		isHomeCountryAddress : null,
		telephone : null,
		fax : null,
		email : null,
		emergency : null,
		englishLevel : null,
		TOEFL : null,
		IELTS : null,
		healthInsuranceEndDate : null,
		healthInsuranceStartingDate : null,
		commissionRate : null,
		pomotionRate : null,
		isHomestay : null,
		type : null,
		studentID : null,
		agent :null
	},

	AccommodationTemplateVars : {
		option : null,
		startDate : null,
		endDate : null,
		numOfWeeks : null,
		isSmoke : null,
		isWithSmoke : null,
		isWithPet : null,
		isWithKid : null,
		isSpecialFood : null,
		isAllergies :null,
		hobbies : null,
		occupation : null,
		comments : null,
		specialFood : null,
		allergiesMedical : null,
		isPrivateBathroom : null,
		departureDateFromToronto : null
	},

	FlightTemplateVars : {
		arrivalDateTime : null,
		arrivalAirline : null,
		isPickup : null,
		departureDateTime : null,
		departureAirline : null,
		isDropoff : null	
	},


	CourseRegistrationTemplateVars :
		{
			course : null,
			title : null,
			level : null,
			duration : null,
			startDate : null
		}
}





