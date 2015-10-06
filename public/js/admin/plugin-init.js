function ShowGritter(Title, Text){
	jQuery.gritter.add({
		// (string | mandatory) the heading of the notification
		title: Title,
		// (string | mandatory) the text inside the notification
		text: Text,
		// (bool | optional) if you want it to fade out on its own or just sit there
		sticky: false,
		// use style classes 
		class_name: '',
		// (int | optional) the time you want it to be alive for before fading out
		time: '2000'				
	});
	return false;
}

function ShowGritterCenter(Title, Text){
	jQuery.gritter.add({
		// (string | mandatory) the heading of the notification
		title: Title,
		// (string | mandatory) the text inside the notification
		text: Text,
		// (bool | optional) if you want it to fade out on its own or just sit there
		sticky: false,
		// use style classes 
		class_name: 'bg-success gritter-center',
		// (int | optional) the time you want it to be alive for before fading out
		time: '2000'				
	});
	return false;
}