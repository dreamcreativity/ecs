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
		},


	//Email Template variable 

	EmailStudentTempaleVars : {
		firstname : null,
		lastname : null,
		url : null
	},

	AgentInvitationTemplateVars : {
		firstname : null,
		lastname : null,
		url : null
	},

	ResetPasswordTemplateVars : {
		firstname : null,
		lastname : null,
		password : null
	},

	Country : [
		"Afghanistan",
		"Albania",
		"Algeria",
		"American Samoa",
		"Andorra",
		"Angola",
		"Anguilla",
		"Antarctica",
		"Antigua and Barbuda",
		"Argentina",
		"Armenia",
		"Aruba",
		"Australia",
		"Austria",
		"Azerbaijan",
		"Bahamas",
		"Bahrain",
		"Bangladesh",
		"Barbados",
		"Belarus",
		"Belgium",
		"Belize",
		"Benin",
		"Bermuda",
		"Bhutan",
		"Bolivia",
		"Bosnia-Herzegovina",
		"Botswana",
		"Bouvet Island",
		"Brazil",
		"British Indian Ocean Territory",
		"Brunei Darussalam",
		"Bulgaria",
		"Burkina Faso",
		"Burundi",
		"Cambodia",
		"Cameroon",
		"Canada",
		"Cape Verde",
		"Cayman Islands",
		"Central African Republic",
		"Chad",
		"Chile",
		"China",
		"Christmas Island",
		"Cocos (Keeling) Islands",
		"Colombia",
		"Comoros",
		"Congo",
		"Congo, Dem. Republic",
		"Cook Islands",
		"Costa Rica",
		"Croatia",
		"Cuba",
		"Cyprus",
		"Czech Rep.",
		"Denmark",
		"Djibouti",
		"Dominica",
		"Dominican Republic",
		"Ecuador",
		"Egypt",
		"El Salvador",
		"Equatorial Guinea",
		"Eritrea",
		"Estonia",
		"Ethiopia",
		"European Union",
		"Falkland Islands (Malvinas)",
		"Faroe Islands",
		"Fiji",
		"Finland",
		"France",
		"French Guiana",
		"French Southern Territories",
		"Gabon",
		"Gambia",
		"Georgia",
		"Germany",
		"Ghana",
		"Gibraltar",
		"Great Britain",
		"Greece",
		"Greenland",
		"Grenada",
		"Guadeloupe (French)",
		"Guam (USA)",
		"Guatemala",
		"Guernsey",
		"Guinea",
		"Guinea Bissau",
		"Guyana",
		"Haiti",
		"Heard Island and McDonald Islands",
		"Honduras",
		"Hong Kong",
		"Hungary",
		"Iceland",
		"India",
		"Indonesia",
		"Iran",
		"Iraq",
		"Ireland",
		"Isle of Man",
		"Israel",
		"Italy",
		"Ivory Coast",
		"Jamaica",
		"Japan",
		"Jersey",
		"Jordan",
		"Kazakhstan",
		"Kenya",
		"Kiribati",
		"Korea-North",
		"Korea-South",
		"Kuwait",
		"Kyrgyzstan",
		"Laos",
		"Latvia",
		"Lebanon",
		"Lesotho",
		"Liberia",
		"Libya",
		"Liechtenstein",
		"Lithuania",
		"Luxembourg",
		"Macau",
		"Macedonia",
		"Madagascar",
		"Malawi",
		"Malaysia",
		"Maldives",
		"Mali",
		"Malta",
		"Marshall Islands",
		"Martinique (French)",
		"Mauritania",
		"Mauritius",
		"Mayotte",
		"Mexico",
		"Micronesia",
		"Moldova",
		"Monaco",
		"Mongolia",
		"Montenegro",
		"Montserrat",
		"Morocco",
		"Mozambique",
		"Myanmar",
		"Namibia",
		"Nauru",
		"Nepal",
		"Netherlands",
		"Netherlands Antilles",
		"New Caledonia (French)",
		"New Zealand",
		"Nicaragua",
		"Niger",
		"Nigeria",
		"Niue",
		"Norfolk Island",
		"Northern Mariana Islands",
		"Norway",
		"Oman",
		"Pakistan",
		"Palau",
		"Panama",
		"Papua New Guinea",
		"Paraguay",
		"Peru",
		"Philippines",
		"Pitcairn Island",
		"Poland",
		"Polynesia (French)",
		"Portugal",
		"Puerto Rico",
		"Qatar",
		"Reunion (French)",
		"Romania",
		"Russia",
		"Rwanda",
		"Saint Helena",
		"Saint Kitts & Nevis Anguilla",
		"Saint Lucia",
		"Saint Pierre and Miquelon",
		"Saint Vincent & Grenadines",
		"Samoa",
		"San Marino",
		"Sao Tome and Principe",
		"Saudi Arabia",
		"Senegal",
		"Serbia",
		"Seychelles",
		"Sierra Leone",
		"Singapore",
		"Slovakia",
		"Slovenia",
		"Solomon Islands",
		"Somalia",
		"South Africa",
		"South Georgia & South Sandwich Islands",
		"South Sudan",
		"Spain",
		"Sri Lanka",
		"Sudan",
		"Suriname",
		"Svalbard and Jan Mayen Islands",
		"Swaziland",
		"Sweden",
		"Switzerland",
		"Syria",
		"Taiwan",
		"Tajikistan",
		"Tanzania",
		"Thailand",
		"Togo",
		"Tokelau",
		"Tonga",
		"Trinidad and Tobago",
		"Tunisia",
		"Turkey",
		"Turkmenistan",
		"Turks and Caicos Islands",
		"Tuvalu",
		"U.K.",
		"Uganda",
		"Ukraine",
		"United Arab Emirates",
		"Uruguay",
		"USA",
		"USA Minor Outlying Islands",
		"Uzbekistan",
		"Vanuatu",
		"Vatican",
		"Venezuela",
		"Vietnam",
		"Virgin Islands (British)",
		"Virgin Islands (USA)",
		"Wallis and Futuna Islands",
		"Western Sahara",
		"Yemen",
		"Zambia",
		"Zimbabwe"
	],

}





