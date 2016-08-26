module.exports = {

	StaticMediaId : {
		CurrentAcademyCalendar: '56c2a6db96c5e72979b79338' ,
		FutureAcademyCalendar: '576b4ed034605cb2179d0130'
	},

	StaticMediaTypeIndex : {
		ActivityCalendar: 12
	},


	MediaTypes : [
		'Image',
		'Document',
		'Video',
		'Other'
	],

	MediaTarget : [
		'Slider',
		'Calendar',
		'Material',
		'Course',
		'Student',
		'Staff',
		'Activity',
		'Event',
		'Other'
	],

	PaymentType : [
		'Cash',
		'Wire Transfer',
		'Credit Card'
	],

	PaymentMethod : [
		'Payment',
		'Refund'
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


	// CourseCategory: [
	// 	{'category': 'General ESL', 'subCategory': [ 'Core Courses', 'Elective Courses'] },
	// 	{'category': 'Focus Programs', 'subCategory': [ 'FOW', 'FOS', 'Health Care', 'Business English'] },
	// 	{'category': 'Test Prep Programs', 'subCategory': [ 'IELTS', 'TOEFL'] },
	// 	{'category': 'Pathway Programs', 'subCategory': [ 'UCTP', 'UCTP Prep.'] }	
	// ],

	CourseCategory: [
		{'category': 'General ESL', 'subCategory': [ 'Core Courses', 'Elective Courses'] },
		{'category': 'Focus Programs', 'subCategory': [] },
		{'category': 'Test Prep Programs', 'subCategory': [] },
		{'category': 'Pathway Programs', 'subCategory': [] }	
	],

	CourseSubCategory: [
		'General ESL',
		'Focus Programs',
		'Test Prep Programs',
		'Pathway Programs',
		
	],

	OnlineTestQuestionType: [
		'Multiple Choice',
		'Sentence Completion'
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
		agent :null,
		programName : null,
		programStartDate : null
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

	SchoolInfoEmails : [
		'minxianzhou@gmail.com',
		'spark@esc-toronto.com',
		'astille@esc-toronto.com'
	],
	EmailStudentTempaleVars : {
		firstname : null,
		lastname : null,
		studentID : null,
		url : null
	},

	EmailStudentTempaleNotifyStaffVars : {
		firstname : null,
		lastname : null,
		studentID : null,
		url : null
	},

	EmailStudentTempaleNotifyAgentVars : {
		firstname : null,
		lastname : null,
		studentID : null,
		url : null
	},

	EmailAgentTempaleVars : {
		firstname : null,
		lastname : null,
		username : null,
		password : null,
		url : null
	},

	EmailStaffTempaleVars : {
		firstname : null,
		lastname : null,
		username : null,
		password : null,
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
		type :null,
		username : null,
		password : null,
		url : null
	},

	ClientMessageFormVars : {
		name : null,
		email : null,
		phone : null,
		subject : null,
		service : null,
		message : null
	},

	OnlineTestResult :{
		firstName : null,
		lastName : null,
		country : null,
		email : null,
		created : null,
		rate : null
	},

	SummerProgramTorontoStartDate : [
		"June 18 2015 (Overnight)",
		"June 19 2015 (Overnight)",
		"June 25 2015 (Overnight)",
		"June 26 2015 (Overnight)",
		"July 02 2015 (Overnight)",
		"July 03 2015 (Overnight)",
		"July 09 2015 (Overnight)",
		"July 10 2015 (Overnight)",
		"July 16 2015 (Overnight)",
		"July 17 2015 (Overnight)",
		"July 21 2015 (Overnight)",
		"July 23 2015 (Overnight)",
		"July 24 2015 (Overnight)",
		"July 30 2015 (Overnight)",
		"August 06 2015 (Overnight)",
		"August 07 2015 (Overnight)",
		"June 20 2015 (Self-arranged)",
		"June 27 2015 (Self-arranged)",
		"July 04 2015 (Self-arranged)",
		"July 11 2015 (Self-arranged)",
		"July 18 2015 (Self-arranged)",
		"July 25 2015 (Self-arranged)",            
		"August 01 2015 (Self-arranged)",		                                  
		"August 08 2015 (Self-arranged)"                                                                                                                  
		],


	SummerProgramTorontoDuration : [
		"1 Week",
		"2 Weeks",
		"3 Weeks",
		"4 Weeks",
		"5 Weeks",
		"6 Weeks",
		"7 Weeks",
		"8 Weeks"
	],

	SummerProgramKingstonStartDate : [
		"July 16 2015 (Overnight)",
		"July 17 2015 (Overnight)",
		"July 21 2015 (Overnight)",
		"July 23 2015 (Overnight)",
		"July 24 2015 (Overnight)",
		"July 30 2015 (Overnight)",
		"August 06 2015 (Overnight)",
		"August 07 2015 (Overnight)",
		],

	SummerProgramKingstonDuration : [
		"1 Week",
		"2 Weeks",
		"3 Weeks",
		"4 Weeks"
	],


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





