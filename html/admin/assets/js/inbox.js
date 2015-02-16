jQuery(function($){
	//handling tabs and loading/displaying relevant messages and forms
	$('#inbox-tabs a[data-toggle="tab"]').on('show.bs.tab', function (e) {
		var currentTab = $(e.target).data('target');
			if(currentTab == 'write') {
				Inbox.show_form();
			}
			else if(currentTab == 'inbox') {
				Inbox.show_list();
			}
		})
			
	//basic initializations
	$('.message-list .message-item input[type=checkbox]').removeAttr('checked');
	$('.message-list').on('click', '.message-item input[type=checkbox]' , function() {
		$(this).closest('.message-item').toggleClass('selected');
		if(this.checked) Inbox.display_bar(1);//display action toolbar when a message is selected
		else {
			Inbox.display_bar($('.message-list input[type=checkbox]:checked').length);
			//determine number of selected messages and display/hide action toolbar accordingly
		}		
	});
			
			
	//check/uncheck all messages
	$('#id-toggle-all').removeAttr('checked').on('click', function(){
		if(this.checked) {
			Inbox.select_all();
		} else Inbox.select_none();
	});
				
	//select all
	$('#id-select-message-all').on('click', function(e) {
		e.preventDefault();
		Inbox.select_all();
	});
				
	//select none
	$('#id-select-message-none').on('click', function(e) {
		e.preventDefault();
		Inbox.select_none();
	});
				
	//select read
	$('#id-select-message-read').on('click', function(e) {
		e.preventDefault();
		Inbox.select_read();
	});
			
	//select unread
	$('#id-select-message-unread').on('click', function(e) {
		e.preventDefault();
		Inbox.select_unread();
	});

	//Select massage star
	$(".message-item .message-star, .message-header .fa-star-o").on("click",function(){
		$(this).toggleClass("selected");
	});
				
	/////////
			
	//display message
	$('.message-list .message-item .text').on('click', function() {
		//show the loading icon
		$('.message-container').append('<div class="message-loading-overlay"><i class="fa-spin fa fa-spinner text-primary bigger-160"></i></div>');			
		var message_list = $(this).closest('.message-list');
			
		$('#inbox-tabs a[href="#inbox"]').parent().removeClass('active');
		//some waiting
		setTimeout(function() {
			
		//hide everything that is after .message-list (which is either .message-content or .message-form)
		message_list.next().addClass('hide');
		$('.message-container').find('.message-loading-overlay').remove();
					
		//hide all navbars and footer
		$('.message-navbar').addClass('hide');
		$('.message-footer').addClass('hide');  //remove this if you want keep footer on massage reading
		
		//now show the navbar for single message item
		$('#id-message-item-navbar').removeClass('hide');					
						
		//move .message-content next to .message-list and hide .message-list
		$('.message-content').removeClass('hide').insertAfter(message_list.addClass('hide'));
			
		//add scrollbars to .message-body // if no need can remove this or change height as per your choice
		$('.message-content .message-body').slimScroll({
			height: '150px',
			alwaysVisible: true,
			touchScrollStep: 50
		});
			
		}, 500 + parseInt(Math.random() * 500));
	});			
			
	//back to message list
	$('.btn-back-message-list').on('click', function(e) {					
		e.preventDefault();					
		$('#inbox-tabs a[href="#inbox"]').tab('show');
	});
			
				
	//hide message list and display new message form //using for reply icon in massage disaply
	$('.btn-reply').on('click', function(e){
		e.preventDefault();
		Inbox.show_form();
	});
				
				
	//hide message list and display new message form
	var Inbox = {
		//displays a toolbar according to the number of selected messages
		display_bar : function (count) {
			if(count == 0) {
				$('#id-toggle-all').removeAttr('checked');
				$('#id-message-list-navbar .message-toolbar').addClass('hide');
				$('#id-message-list-navbar .message-infobar').removeClass('hide');
			}
			else {
				$('#id-message-list-navbar .message-infobar').addClass('hide');
				$('#id-message-list-navbar .message-toolbar').removeClass('hide');
			}
		},
		select_all : function() {
			var count = 0;
			$('.message-item input[type=checkbox]').each(function(){
				this.checked = true;
				$(this).closest('.message-item').addClass('selected');
				count++;
			});
						
			$('#id-toggle-all').get(0).checked = true;	
				Inbox.display_bar(count);
			},
			select_none : function() {
				$('.message-item input[type=checkbox]').removeAttr('checked').closest('.message-item').removeClass('selected');
				$('#id-toggle-all').get(0).checked = false;
						
				Inbox.display_bar(0);
			},
			select_read : function() {
				$('.message-unread input[type=checkbox]').removeAttr('checked').closest('.message-item').removeClass('selected');
						
				var count = 0;
				$('.message-item:not(.message-unread) input[type=checkbox]').each(function(){
					this.checked = true;
					$(this).closest('.message-item').addClass('selected');
					count++;
				});
				Inbox.display_bar(count);
			},
			select_unread : function() {
				$('.message-item:not(.message-unread) input[type=checkbox]').removeAttr('checked').closest('.message-item').removeClass('selected');
						
				var count = 0;
				$('.message-unread input[type=checkbox]').each(function(){
					this.checked = true;
					$(this).closest('.message-item').addClass('selected');
					count++;
				});
						
				Inbox.display_bar(count);
			}
	}
			
	//show message list (back from writing mail or reading a message)
	Inbox.show_list = function() {
		$('.message-navbar').addClass('hide');
		$('#id-message-list-navbar').removeClass('hide');
			
		$('.message-footer').addClass('hide');
		$('.message-footer:not()').removeClass('hide');
			
		$('.message-list').removeClass('hide').next().addClass('hide');
		//hide the message item / new message window and go back to list
	}
			
	//show write mail form
	Inbox.show_form = function() {
	if($('.message-form').is(':visible')) return;
	if(!form_initialized) {
		initialize_form();
		}	
					
		var message = $('.message-list');
		$('.message-container').append('<div class="message-loading-overlay"><i class="fa-spin fa fa-spinner text-primary bigger-160"></i></div>');
					
		setTimeout(function() {
		message.next().addClass('hide');
						
			$('.message-container').find('.message-loading-overlay').remove();
					
			$('.message-list').addClass('hide');
			$('.message-footer').addClass('hide');
			$('.message-form').removeClass('hide').insertAfter('.message-list');
						
			$('.message-navbar').addClass('hide');
			$('#id-message-new-navbar').removeClass('hide');
						
						
			//reset form??
			$('.message-form .wysiwyg-editor').empty();						
			$('.message-form').get(0).reset();
						
		}, 300 + parseInt(Math.random() * 300));
	}
			

	var form_initialized = false;
	function initialize_form() {
		if(form_initialized) return;
		form_initialized = true;
					
		//intialize wysiwyg editor
		$('.message-form .wysiwyg-editor').ek_wysiwyg({
			toolbar:
			[
				'bold',
				'italic',
				'strikethrough',
				'underline',
				null,
				'justifyleft',
				'justifycenter',
				'justifyright',
				null,
				'createLink',
				'unlink',
				null,
				'undo',
				'redo'
			]
			}).prev().addClass('editor-style1');

			//the button to add a new file input
			$('#id-add-attachment').on('click', function(){
				var file = $('<input type="file" name="attachment[]" /> <br />').appendTo('#form-attachments');
			});

	}//initialize_form

	//Massage search //example can improve in your live project
	$(function() {    
		$('.massage-list').on('keyup', function() {
				var rex = new RegExp($(this).val(), 'i');
			$('.message-item').hide();
			$('.message-item').filter(function() {
				return rex.test($(this).text());
			}).show();
		});
	});
	
});