/*!
//Description: //Core scripts to handle the entire theme// This file should be included in all pages
 !**/
 
$(document).ready(function() {
	// Fixed Navbar Function
	if(localStorage.getItem('fixedTop'))
		{
			$('.navbar-top').addClass('fixed');
			$('#fixed-navbar').prop('checked', true);
		}
	
	$('#fixed-navbar').click( function(){
		if (this.checked) {
			$('.navbar-top').addClass('fixed');
			var fixedTop = 'fixed';
		} else if (!this.checked) {
			$('.navbar-top').removeClass('fixed');
			var fixedTop = '';
		}
			localStorage.setItem('fixedTop', fixedTop);		
    });
	
	// Fixed Navbar + Sidebar Function	
	if(localStorage.getItem('fixedsiderbar') != '')
		{
			$('.navbar-top, .navbar-side, #page-wrapper, .breadcrumbs').addClass('fixed');
			$('#fixed-sidebar').prop('checked', true);
			$('#fixed-navbar').prop('checked', true);
		}
	
	$('#fixed-sidebar').click( function(){
		if (this.checked) {
			$('.navbar-top, .navbar-side, #page-wrapper, .breadcrumbs').addClass('fixed');
			var fixedsiderbar = 'fixed';
		} else if (!this.checked) {
			$('.navbar-side,  #page-wrapper, .breadcrumbs').removeClass('fixed');
			var fixedsiderbar = '';
		}
		localStorage.setItem('fixedsiderbar', fixedsiderbar);
    });
	
	// Sidebar Toggle Function
	if(localStorage.getItem('sidetoggle'))
		{
			$('.navbar-side, #page-wrapper, .footer-inner, .breadcrumbs').addClass('collapsed');
			$('#sidebar-toggle').prop('checked', true);
		}
	
	$('#sidebar-toggle').click( function(){
		if (this.checked) {
			$('.navbar-side, #page-wrapper, .footer-inner, .breadcrumbs').addClass('collapsed');
			var sidetoggle = 'collapsed';
		} else if (!this.checked) {
			$('.navbar-side, #page-wrapper, .footer-inner, .breadcrumbs').removeClass('collapsed');
			var sidetoggle = '';
		}
		localStorage.setItem('sidetoggle', sidetoggle);
    });
	
	// Fixed width
	if(localStorage.getItem('insidecontainer'))
		{
			$('#main-container, .navbar-top').addClass('container');
			$('#in-container').prop('checked', true);
		}
	
	$('#in-container').click( function(){
		if (this.checked) {
			$('#main-container, .navbar-top').addClass('container');
			var insidecontainer = 'container';
		} else if (!this.checked) {
			$('#main-container, .navbar-top').removeClass('container');
			var insidecontainer = '';
		}
		localStorage.setItem('insidecontainer', insidecontainer);
    });
	
	// Light SideBar
	if(localStorage.getItem('SideBarLight'))
		{
			$('.navbar-side').addClass('sidebar-light');
			$('#side-bar-color').prop('checked', true);
		}
	
	$('#side-bar-color').click( function(){
		if (this.checked) {
			$('.navbar-side').addClass('sidebar-light');
			var SideBarLight = 'sidebar-light';
		} else if (!this.checked) {
			$('.navbar-side').removeClass('sidebar-light');
			var SideBarLight = '';
		}
			localStorage.setItem('SideBarLight', SideBarLight);		
    });
	
	// Scroll Function for Sidebar
	$(function () {	
		function setHeight() {
			windowHeight = $(window).height();
				if (jQuery(window).width() < 991) {
					$('.sidebar-collapse').css('max-height', windowHeight - 110);
				}
				else {
						if ($(".navbar-side").hasClass("fixed")) {
							$('.sidebar-collapse').css('max-height', windowHeight);
						} else {
							$('.sidebar-collapse').css('max-height', 5000);
						}
				}
		};
		setHeight(); 
		$(window).resize(function() {
			setHeight();
		});
				
		$('.sidebar-collapse').slimScroll({
			height: '100%',
			width: '100%',
			size: '1px'
		});
	});
	
	//Portlet Functions
	//--------------------------------
	$(".portlet-widgets .fa-chevron-down, .portlet-widgets .fa-chevron-up").click(function () {
		$(this).toggleClass("fa-chevron-down fa-chevron-up");
	});
	
	//Hidden	
	$(".box-close").click(function(){
		$(this).closest('.portlet').hide('slow');
	});
	
	//Tooltips Function
	//--------------------------------
	$(function () {
		$("[data-rel='tooltip']").tooltip()
	});
	
    // Popover Function
	//--------------------------------
    $("[data-toggle=popover]").popover({html:true});
	
	//Layout button
	//--------------------------------
	$('#qs-setting-btn').click(function() {
		$(this).toggleClass('open');
		$('#qs-setting-box').toggleClass('open');
	});
		
	$("#fo-btn").click(function(e) {
		e.preventDefault();
		$(".footer-warp").toggleClass("open");
	});
		
	// For Tasks Widget
	//--------------------------------
	$(".task-lists li input").on('click', function() {
		$(this).parent().toggleClass('todo-done');
	});
	
	//accordion Function
	//--------------------------------
    $('.collapse').on('show.bs.collapse', function() {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('accordion-active');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="fa fa-angle-down bigger-110"></i>');
    });
    $('.collapse').on('hide.bs.collapse', function() {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('accordion-active');
        $('a[href="#' + id + '"] .panel-title span').html('<i class="fa fa-angle-right bigger-110"></i>');
    });

    /* toggle function */
    $(".toggle").on("click",function(){
        var elm = $("#"+$(this).data("toggle"));
        if(elm.is(":visible"))
            elm.addClass("hide").removeClass("show");
        else
            elm.addClass("show").removeClass("hide");
        
        return false;
    });

	// fix stackable modal issue: when 2 or more modals opened, closing one of modal will remove .modal-open class. 
	$('body').on('hide.bs.modal', function() {
		if ($('.modal:visible').size() > 1 && $('html').hasClass('modal-open') === false) {
			$('html').addClass('modal-open');
			} else if ($('.modal:visible').size() <= 1) {
				$('html').removeClass('modal-open');
		}
	});
	// fix page scrollbars issue
	$('body').on('show.bs.modal', '.modal', function() {
		if ($(this).hasClass("modal-scroll")) {
			$('body').addClass("modal-open-noscroll");
		}
	});
	
	// fix page scrollbars issue
	$('body').on('hide.bs.modal', '.modal', function() {
		$('body').removeClass("modal-open-noscroll");
	});

	// remove ajax content and remove cache on modal closed 
	$('body').on('hidden.bs.modal', '.modal:not(.modal-cached)', function () {
		$(this).removeData('bs.modal');
	});
	
	//dropdown hold-on-click Function
	//--------------------------------
	$('body').on('click', '.dropdown-menu.hold-on-click', function (e) {
		e.stopPropagation();
	});	
	
	//loading state button function	
	//--------------------------------
	$(function() { 
		$("#btn-loading").click(function(){
			$(this).button('loading').delay(2000).queue(function() {
				$(this).button('reset');
				$(this).dequeue();
			});        
		});
	});		
	// dropdown hover
	$('li.dropdown').addClass('show-on-hover');

	//back top top
	$(window).scroll(function () {
       if ($(this).scrollTop() > 50) {
               $('#back-to-top').fadeIn();
           } else {
                $('#back-to-top').fadeOut();
            }
       });
       // scroll body to 0px on click
        $('#back-to-top').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });	
		
	//for side menu simple search if you wish can impliment this option as per your choice
	$(function() {    
        $('#input-items').on('keyup', function() {
          var rex = new RegExp($(this).val(), 'i');
            $('.side-nav li').hide();
            $('.side-nav li').filter(function() {
                return rex.test($(this).text());
            }).show();
        });
    });	
	
	// enable side menu arrow
	$(function() {
		$('#side').eKMenu();
	}); 

});

// side menu arrow function
// Source https://github.com/onokumus/metisMenu

;(function ($, window, document, undefined) {

    var pluginName = "eKMenu",
        defaults = {
            toggle: true
        };
        
    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {

            var $this = $(this.element),
                $toggle = this.settings.toggle;

            $this.find('li.open').has('ul').children('ul').addClass('collapse in');
            $this.find('li').not('.open').has('ul').children('ul').addClass('collapse');

            $this.find('li').has('ul').children('a').on('click', function (e) {
                e.preventDefault();

                $(this).parent('li').toggleClass('open').children('ul').collapse('toggle');

                if ($toggle) {
                    $(this).parent('li').siblings().removeClass('open').children('ul.in').collapse('hide');
                }
            });
        }
    };

    $.fn[ pluginName ] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);



//theme swap
if(localStorage.getItem('ektheme'))
	{
		var sheet = localStorage.getItem('ektheme');
		$("#qstyle").attr("href", sheet);
		
	}
function swapStyle(sheet){
	document.getElementById('qstyle').setAttribute('href', sheet);
	var ektheme = sheet;
	localStorage.setItem('ektheme', ektheme);
}

 
/*speech recognition only for chrome 25+*/
var App = function () {

  var config = {};  
  var voice_methods = [];  
  
  var speech_commands = [];
  if(('webkitSpeechRecognition' in window)){
    var rec = new webkitSpeechRecognition();  
  }
  
  var speech = function(options){
   
    if(('webkitSpeechRecognition' in window)){
    
      if(options=="start"){
        rec.start();
      }else if(options=="stop"){
        rec.stop();
      }else{
        var config = {
          continuous: true,
          interim: true,
          lang: false,
          onEnd: false,
          onResult: false,
          onNoMatch: false,
          onSpeechStart: false,
          onSpeechEnd: false
        };
        $.extend( config, options );
        
        if(config.continuous){rec.continuous = true;}
        if(config.interim){rec.interimResults = true;}
        if(config.lang){rec.lang = config.lang;}        
        var values = false;
        var val_command = "";
        
        rec.onresult = function(event){
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              var command = event.results[i][0].transcript;//Return the voice command
              command = command.toLowerCase();//Lowercase
              command = command.replace(/^\s+|\s+$/g,'');//Trim spaces
              console.log(command);
              if(config.onResult){
                config.onResult(command);
              }   
              
              $.each(speech_commands,function(i, v){
                if(values){//Second command
                  if(val_command == v.command){
                    if(v.dictation){
                      if(command == v.dictationEndCommand){
                        values = false;
                        v.dictationEnd(command);
                      }else{
                        v.listen(command);
                      }
                    }else{
                      values = false;
                      v.listen(command);
                    }
                  }
                }else{//Primary command
                  if(v.command == command){
                    v.action(command);
                    if(v.listen){
                      values = true;
                      val_command = v.command;
                    }
                  }
                }
              });
            }else{
              var res = event.results[i][0].transcript;//Return the interim results
              $.each(speech_commands,function(i, v){
                if(v.interim !== false){
                  if(values){                
                    if(val_command == v.command){
                      v.interim(res);
                    }
                  }
                }
              });
            }
          }
        };      
        
        
        if(config.onNoMatch){rec.onnomatch = function(){config.onNoMatch();};}
        if(config.onSpeechStart){rec.onspeechstart = function(){config.onSpeechStart();};}
        if(config.onSpeechEnd){rec.onspeechend = function(){config.onSpeechEnd();};}
        rec.onaudiostart = function(){ $(".speech-button i").addClass("blur"); }
        rec.onend = function(){
          $(".speech-button i").removeClass("blur");
          if(config.onEnd){config.onEnd();}
        };
        
        
      }    
      
    }else{ 
      alert("Only Chrome25+ browser support voice recognition.");
    }
   
    
  };
  
  var speechCommand = function(command, options){
    var config = {
      action: false,
      dictation: false,
      interim: false,
      dictationEnd: false,
      dictationEndCommand: 'final.',
      listen: false
    };
    
    $.extend( config, options );
    if(command){
      if(config.action){
        speech_commands.push({
          command: command, 
          dictation: config.dictation,
          dictationEnd: config.dictationEnd,
          dictationEndCommand: config.dictationEndCommand,
          interim: config.interim,
          action: config.action, 
          listen: config.listen 
        });
      }else{
        alert("Must have an action function");
      }
    }else{
      alert("Must have a command text");
    }
  };
  
        
  return { 
    //init: function (options) {
      //extends basic config with options
      //$.extend( config, options );
    //},
      
    /*pages javascript methods*/
    speech: function(options){
      speech(options);
    },
    
    speechCommand: function(com, options){
      speechCommand(com, options);
    },
    
  };
 
}();


// function collapse the navbar on scroll for front pages
var Apps = function () {
	return {
        init: function () {
            // init variables require for all front pages
			handleNavTopBar();
        },
        initNavTopBar: function (els) {
				$(window).scroll(function() {
					if ($(".top-navbar").offset().top > 50) {
						$(".navbar-fixed-top, .navbar-brand").addClass("top-nav-collapse");
					} else {
						$(".navbar-fixed-top, .navbar-brand").removeClass("top-nav-collapse");
					}
				});
        },
	};
}();

/*!
//end
 !**/