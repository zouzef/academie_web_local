var Akademi  = function(){
	"use strict"
   /* Search Bar ============ */
   var screenWidth = $( window ).width();
   var screenHeight = $( window ).height();
   


   var handlePreloader = function(){
    // Wait for the page to fully load
    window.addEventListener('load', function() {
        // Page is loaded, now hide preloader
        jQuery('#preloader').fadeOut(500, function() {
            jQuery(this).remove();
        });
        $('#main-wrapper').addClass('show');
    });
}



// Call it immediately
handlePreloader();

   var handleMetisMenu = function() {
	   if(jQuery('#menu').length > 0 ){
		   $("#menu").metisMenu();
	   }
	   jQuery('.metismenu > .mm-active ').each(function(){
		   if(!jQuery(this).children('ul').length > 0)
		   {
			   jQuery(this).addClass('active-no-child');
		   }
	   });
   }
  
   var handleAllChecked = function() {
	   $("#checkAll").on('change',function() {
		   $("td input, .email-list .custom-checkbox input").prop('checked', $(this).prop("checked"));
	   });
   }

   var handleNavigation = function() {
    $(".hamburger").on('click', function() {
        console.log("Hamburger clicked!"); // TEST
        $('#main-wrapper').toggleClass("menu-toggle");
        $(this).toggleClass("is-active");
    });
}
 
   var handleCurrentActive = function() {
	   for (var nk = window.location,
		   o = $("ul#menu a").filter(function() {
			   
			   return this.href == nk;
			   
		   })
		   .addClass("mm-active")
		   .parent()
		   .addClass("mm-active");;) 
	   {
		   
		   if (!o.is("li")) break;
		   
		   o = o.parent()
			   .addClass("mm-show")
			   .parent()
			   .addClass("mm-active");
	   }
   }

   var handleMiniSidebar = function() {
	   $("ul#menu>li").on('click', function() {
		   const sidebarStyle = $('body').attr('data-sidebar-style');
		   if (sidebarStyle === 'mini') {
			   console.log($(this).find('ul'))
			   $(this).find('ul').stop()
		   }
	   })
   }
  
   var handleMinHeight = function() {
	   var win_h = window.outerHeight;
	   var win_h = window.outerHeight;
	   if (win_h > 0 ? win_h : screen.height) {
		   $(".content-body").css("min-height", (win_h + 60) + "px");
	   };
   }
   
   var handleDataAction = function() {
	   $('a[data-action="collapse"]').on("click", function(i) {
		   i.preventDefault(),
			   $(this).closest(".card").find('[data-action="collapse"] i').toggleClass("mdi-arrow-down mdi-arrow-up"),
			   $(this).closest(".card").children(".card-body").collapse("toggle");
	   });

	   $('a[data-action="expand"]').on("click", function(i) {
		   i.preventDefault(),
			   $(this).closest(".card").find('[data-action="expand"] i').toggleClass("icon-size-actual icon-size-fullscreen"),
			   $(this).closest(".card").toggleClass("card-fullscreen");
	   });



	   $('[data-action="close"]').on("click", function() {
		   $(this).closest(".card").removeClass().slideUp("fast");
	   });

	   $('[data-action="reload"]').on("click", function() {
		   var e = $(this);
		   e.parents(".card").addClass("card-load"),
			   e.parents(".card").append('<div class="card-loader"><i class=" ti-reload rotate-refresh"></div>'),
			   setTimeout(function() {
				   e.parents(".card").children(".card-loader").remove(),
					   e.parents(".card").removeClass("card-load")
			   }, 2000)
	   });
   }

   var handleHeaderHight = function() {
	   const headerHight = $('.header').innerHeight();
	   $(window).scroll(function() {
		   if ($('body').attr('data-layout') === "horizontal" && $('body').attr('data-header-position') === "static" && $('body').attr('data-sidebar-position') === "fixed")
			   $(this.window).scrollTop() >= headerHight ? $('.dlabnav').addClass('fixed') : $('.dlabnav').removeClass('fixed')
	   });
   }
   
   var handleDzScroll = function() {
	   jQuery('.dlab-scroll').each(function(){
		   var scroolWidgetId = jQuery(this).attr('id');
		   const ps = new PerfectScrollbar('#'+scroolWidgetId, {
			 wheelSpeed: 2,
			 wheelPropagation: true,
			 minScrollbarLength: 20
		   });
		   ps.isRtl = false;
	   })
   }
   
   var handleMenuTabs = function() {
	   if(screenWidth <= 991 ){
		   jQuery('.menu-tabs .nav-link').on('click',function(){
			   if(jQuery(this).hasClass('open'))
			   {
				   jQuery(this).removeClass('open');
				   jQuery('.fixed-content-box').removeClass('active');
				   jQuery('.hamburger').show();
			   }else{
				   jQuery('.menu-tabs .nav-link').removeClass('open');
				   jQuery(this).addClass('open');
				   jQuery('.fixed-content-box').addClass('active');
				   jQuery('.hamburger').hide();
			   }
			   //jQuery('.fixed-content-box').toggleClass('active');
		   });
		   jQuery('.close-fixed-content').on('click',function(){
			   jQuery('.fixed-content-box').removeClass('active');
			   jQuery('.hamburger').removeClass('is-active');
			   jQuery('#main-wrapper').removeClass('menu-toggle');
			   jQuery('.hamburger').show();
		   });
	   }
   }
   
   var handleChatbox = function() {
	   jQuery('.bell-link').on('click',function(){
		   jQuery('.chatbox').addClass('active');
	   });
	   jQuery('.chatbox-close').on('click',function(){
		   jQuery('.chatbox').removeClass('active');
	   });
   }
   
   var handleMenuWallet = function() {
	   jQuery('.menu-wallet').on('click',function(){
		   jQuery('.wallet-bar').toggleClass('active');
		   jQuery('.wallet-open').toggleClass('active');
			   $(this).toggleClass("main");
	   });
	   jQuery('.wallet-bar-close').on('click',function(){
		   jQuery('.wallet-bar').removeClass('active');
		   jQuery('.wallet-open').removeClass('active');
	   });
	   setTimeout(() => {
		   if ($(window).width() <= 1400) { 
			   jQuery('.wallet-open').removeClass('active');
		   }else{
			   jQuery('.wallet-open').addClass('active');
		   }
	   }, 500);
   }
   
   var handlePerfectScrollbar = function() {
	   if(jQuery('.dlabnav-scroll').length > 0)
	   {
		   //const qs = new PerfectScrollbar('.dlabnav-scroll');
		   const qs = new PerfectScrollbar('.dlabnav-scroll');
		   
		   qs.isRtl = false;
	   }
   }

   var handleBtnNumber = function() {
	   $('.btn-number').on('click', function(e) {
		   e.preventDefault();

		   fieldName = $(this).attr('data-field');
		   type = $(this).attr('data-type');
		   var input = $("input[name='" + fieldName + "']");
		   var currentVal = parseInt(input.val());
		   if (!isNaN(currentVal)) {
			   if (type == 'minus')
				   input.val(currentVal - 1);
			   else if (type == 'plus')
				   input.val(currentVal + 1);
		   } else {
			   input.val(0);
		   }
	   });
   }
   
   var handleDzChatUser = function() {
	   jQuery('.dlab-chat-user-box .dlab-chat-user').on('click',function(){
		   jQuery('.dlab-chat-user-box').addClass('d-none');
		   jQuery('.dlab-chat-history-box').removeClass('d-none');
		   //$(".chatbox .msg_card_body").height(vHeightArea());
		   //$(".chatbox .msg_card_body").css('height',vHeightArea());
	   }); 
	   
	   jQuery('.dlab-chat-history-back').on('click',function(){
		   jQuery('.dlab-chat-user-box').removeClass('d-none');
		   jQuery('.dlab-chat-history-box').addClass('d-none');
	   }); 
	   
	   jQuery('.dz-fullscreen').on('click',function(){
		   jQuery('.dz-fullscreen').toggleClass('active');
	   });
	   
	   /* var vHeight = function(){ */
		   
	   /* } */
	   
	   
   }
   /* WOW ANIMATION ============ */
   var wow_animation = function(){
	   if($('.wow').length > 0)
	   {
		   var wow = new WOW(
		   {
			 boxClass:     'wow',      // animated element css class (default is wow)
			 animateClass: 'animated', // animation css class (default is animated)
			 offset:       0,          // distance to the element when triggering the animation (default is 0)
			 mobile:       false       // trigger animations on mobile devices (true is default)
		   });
		   wow.init();	
	   }	
   }
   
   
   
   
   var handleshowPass = function(){
	   jQuery('.show-pass').on('click',function(){
		   jQuery(this).toggleClass('active');
		   if(jQuery('#dlab-password').attr('type') == 'password'){
			   jQuery('#dlab-password').attr('type','text');
		   }else if(jQuery('#dlab-password').attr('type') == 'text'){
			   jQuery('#dlab-password').attr('type','password');
		   }
	   });
   }
   
   var heartBlast = function (){
	   $(".heart").on("click", function() {
		   $(this).toggleClass("heart-blast");
	   });
   }
   
   var handleDzLoadMore = function() {
	   $(".dlab-load-more").on('click', function(e)
	   {
		   e.preventDefault();	//STOP default action
		   $(this).append(' <i class="fas fa-sync"></i>');
		   
		   var dlabLoadMoreUrl = $(this).attr('rel');
		   var dlabLoadMoreId = $(this).attr('id');
		   
		   $.ajax({
			   method: "POST",
			   url: dlabLoadMoreUrl,
			   dataType: 'html',
			   success: function(data) {
				   $( "#"+dlabLoadMoreId+"Content").append(data);
				   $('.dlab-load-more i').remove();
			   }
		   })
	   });
   }
   
   var handleLightgallery = function(){
	   if(jQuery('#lightgallery ,#lightgallery-2').length > 0){
		   $('#lightgallery ,#lightgallery-2').lightGallery({
			   loop:true,
			   thumbnail:true,
			   exThumbImage: 'data-exthumbimage'
		   });
	   }
   }
   var handleLightgallery1 = function(){
	   if(jQuery('#lightgallery-1').length > 0){
		   $('#lightgallery-1').lightGallery({
			   loop:true,
			   thumbnail:true,
			   exThumbImage: 'data-exthumbimage'
		   });
	   }
   }
   var handleCustomFileInput = function() {
	   $(".custom-file-input").on("change", function() {
		   var fileName = $(this).val().split("\\").pop();
		   $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
	   });
   }
   
	 var vHeight = function(){
	   var ch = $(window).height() - 206;
	   $(".chatbox .msg_card_body").css('height',ch);
   }
   

   var domoPanel = function(){
	   if(jQuery(".dlab-demo-content").length>0) {
		   const ps = new PerfectScrollbar('.dlab-demo-content');
		   $('.dlab-demo-trigger').on('click', function() {
				   $('.dlab-demo-panel').addClass('show');
		   });
		   $('.dlab-demo-close, .bg-close').on('click', function() {
				   $('.dlab-demo-panel').removeClass('show');
		   });
		   
		   $('.dlab-demo-bx').on('click', function() {
			   $('.dlab-demo-bx').removeClass('demo-active');
			   $(this).addClass('demo-active');
		   });
	   }
   } 
   
   var handleDatetimepicker = function(){
	   if(jQuery("#datetimepicker1").length>0) {
		   $('#datetimepicker1').datetimepicker({
			   inline: true,
		   });
	   }
   }
   
   var handleCkEditor = function(){
	   if(jQuery("#ckeditor").length>0) {
		   ClassicEditor
		   .create( document.querySelector( '#ckeditor' ), {
			   // toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ]
		   } )
		   .then( editor => {
			   window.editor = editor;
		   } )
		   .catch( err => {
			   console.error( err.stack );
		   } );
	   }
   }
   
   var handleMenuPosition = function(){
	   
	   if(screenWidth > 1024){
		   $(".metismenu  li").unbind().each(function (e) {
			   if ($('ul', this).length > 0) {
				   var elm = $('ul:first', this).css('display','block');
				   var off = elm.offset();
				   var l = off.left;
				   var w = elm.width();
				   var elm = $('ul:first', this).removeAttr('style');
				   var docH = $("body").height();
				   var docW = $("body").width();
				   
				   if(jQuery('html').hasClass('rtl')){
					   var isEntirelyVisible = (l + w <= docW);	
				   }else{
					   var isEntirelyVisible = (l > 0)?true:false;	
				   }
					   
				   if (!isEntirelyVisible) {
					   $(this).find('ul:first').addClass('left');
				   } else {
					   $(this).find('ul:first').removeClass('left');
				   }
			   }
		   });
	   }
   }

   var handleCustomActions = function(){
	   jQuery('.w3-delete').on('click',function(){
		   jQuery(this).parents('tr').attr('style','background-color:red !important').fadeOut('slow',function(){
			   jQuery(this).remove();
		   });
	   });
   }
   var handleImageSelect = function(){
	   if(jQuery(".image-select").length>0) {
	   
		   const $_SELECT_PICKER = $('.image-select');
		   $_SELECT_PICKER.find('option').each((idx, elem) => {
			   const $OPTION = $(elem);
			   const IMAGE_URL = $OPTION.attr('data-thumbnail');
			   if (IMAGE_URL) {
				   $OPTION.attr('data-content', "<img src='%i'/> %s".replace(/%i/, IMAGE_URL).replace(/%s/, $OPTION.text()))
			   }
		   });
	   
			   $_SELECT_PICKER.selectpicker();
	   }
	   
   }
   var onePageLayout = function() {
	   'use strict';
	   if($('.header').length > 0 && $(".scroll").length > 0)
	   {
		   var headerHeight =   parseInt($('.header').css('height'), 10);
		   //alert(headerHeight); 
		   
		   $(".scroll").unbind().on('click',function(event) 
		   {
			   event.preventDefault();
			   
			   if (this.hash !== "") {
				   var hash = this.hash;	
				   var seactionPosition = $(hash).offset().top;
				   var headerHeight =   parseInt($('.header').css('height'), 10);
				   
				   
				   $('body').scrollspy({target: ".navbar", offset: headerHeight+2}); 
				   
				   var scrollTopPosition = seactionPosition - (headerHeight);
				   
				   $('html, body').animate({
					   scrollTop: scrollTopPosition
				   }, 800, function(){
					   
				   });
			   }   
		   });
		   $('body').scrollspy({target: ".navbar", offset: headerHeight + 2});  
	   }
   }

   
    var handelBootstrapSelect = function(){
        /* Bootstrap Select box function by  = bootstrap-select.min.js */
        if(jQuery('select').length > 0){
            jQuery('select').selectpicker();
        /* Bootstrap Select box function by  = bootstrap-select.min.js end*/
        }
    }
 
   /* Header Fixed ============ */
   var headerFix = function(){
	   'use strict';
	   /* Main navigation fixed on top  when scroll down function custom */		
	   jQuery(window).on('scroll', function () {
		   
		   if(jQuery('.header').length > 0){
			   var menu = jQuery('.header');
			   $(window).scroll(function(){
				 var sticky = $('.header'),
					 scroll = $(window).scrollTop();

				 if (scroll >= 100){ sticky.addClass('is-fixed');
								   }else {sticky.removeClass('is-fixed');}
			   });				
		   }
		   
	   });
	   /* Main navigation fixed on top  when scroll down function custom end*/
   }
   var handleDraggableCard = function() {
	   var dzCardDraggable = function () {
		return {
		 //main function to initiate the module
		 init: function () {
		  var containers = document.querySelectorAll('.draggable-zone');

		  if (containers.length === 0) {
		   return false;
		  }

		  var swappable = new Sortable.default(containers, {
		   draggable: '.draggable',
		   handle: '.draggable.draggable-handle',
		   mirror: {
			appendTo: 'body',
			constrainDimensions: true
		   }
		   
		  });
		  swappable.on('drag:stop', () => {
			   setTimeout(function(){
				   setBoxCount();
			   }, 200);
			   
		   })
		 }
		};
	   }();

	   jQuery(document).ready(function () {
		dzCardDraggable.init();
	   });
	   
	   
	   function setBoxCount(){
		   var cardCount = 0;
		   jQuery('.dropzoneContainer').each(function(){
			   cardCount = jQuery(this).find('.draggable-handle').length;
			   jQuery(this).find('.totalCount').html(cardCount);
		   });
	   }
   }
   var handleThemeMode = function() {
		if(jQuery(".dz-theme-mode").length>0) {
			jQuery('.dz-theme-mode').on('click',function(){
				jQuery(this).toggleClass('active');
				if(jQuery(this).hasClass('active')){
					jQuery('body').attr('data-theme-version','dark');
					setCookie('version', 'dark');
					jQuery('#theme_version').val('dark');
				}else{
					jQuery('body').attr('data-theme-version','light');
					setCookie('version', 'light');
					jQuery('#theme_version').val('light');					
				}
				$('.default-select').selectpicker('refresh');
			});
			var version = getCookie('version');
			
			jQuery('body').attr('data-theme-version', version);
			jQuery('.dz-theme-mode').removeClass('active');
			setTimeout(function(){
				if(jQuery('body').attr('data-theme-version') === "dark")
				{
					jQuery('.dz-theme-mode').addClass('active');
				}
			},1500)
		}
	}
   var handleDzFullScreen = function() {
	   jQuery('.dz-fullscreen').on('click',function(e){
		   if(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement) { 
			   /* Enter fullscreen */
			   if(document.exitFullscreen) {
				   document.exitFullscreen();
			   } else if(document.msExitFullscreen) {
				   document.msExitFullscreen(); /* IE/Edge */
			   } else if(document.mozCancelFullScreen) {
				   document.mozCancelFullScreen(); /* Firefox */
			   } else if(document.webkitExitFullscreen) {
				   document.webkitExitFullscreen(); /* Chrome, Safari & Opera */
			   }
		   } 
		   else { /* exit fullscreen */
			   if(document.documentElement.requestFullscreen) {
				   document.documentElement.requestFullscreen();
			   } else if(document.documentElement.webkitRequestFullscreen) {
				   document.documentElement.webkitRequestFullscreen();
			   } else if(document.documentElement.mozRequestFullScreen) {
				   document.documentElement.mozRequestFullScreen();
			   } else if(document.documentElement.msRequestFullscreen) {
				   document.documentElement.msRequestFullscreen();
			   }
		   }		
	   });
   }
   /* Handle Page On Scroll ============ */
   /* Handle Page On Scroll ============ */
   var handlePageOnScroll = function(event){
	   
	   'use strict';
	   var headerHeight = parseInt($('.header').css('height'), 10);
	   
	   $('.navbar-nav .scroll').on('click', function(event) 
	   {
		   event.preventDefault();

		   jQuery('.navbar-nav .scroll').parent().removeClass('active');
		   jQuery(this).parent().addClass('active');
		   
		   if (this.hash !== "") {
			   var hash = this.hash;	
			   var seactionPosition = parseInt($(hash).offset().top, 10);
			   var headerHeight =   parseInt($('.header').css('height'), 10);
			   
			   var scrollTopPosition = seactionPosition - headerHeight;
			   $('html, body').animate({
				   scrollTop: scrollTopPosition
			   }, 800, function(){
				   
			   });
		   }   
	   });
	   
	   pageOnScroll();
   }

   /* Page On Scroll ============ */
   var pageOnScroll = function(event){
	   
	   if(jQuery('.navbar-nav').length > 0){
		   
		   var headerHeight = parseInt(jQuery('.header').height(), 10);
		   
		   jQuery(document).on("scroll", function(){
			   
			   var scrollPos = jQuery(this).scrollTop();
			   jQuery('.navbar-nav .scroll').each(function () {
				   var elementLink = jQuery(this);
				   
				   //console.log(this.hash);
				   //console.log(jQuery(this.hash).offset());
				   
				   var refElement = jQuery(elementLink.attr("href"));
				   
				   if(jQuery(this.hash).offset() != undefined){
					   var seactionPosition = parseInt(jQuery(this.hash).offset().top, 10);
				   }else{
					   var seactionPosition = 0;
				   }
				   var scrollTopPosition = (seactionPosition - headerHeight);

				   if (scrollTopPosition <= scrollPos){
					   elementLink.parent().addClass("active");
					   elementLink.parent().siblings().removeClass("active");
				   }
			   });
			   
		   });
	   }
   } 
   

   
	   

   /* Function ============ */
   return {
	   init:function(){
		   handleMetisMenu();
		   handleAllChecked();
		   handleNavigation();
		   handleCurrentActive();
		   handleMiniSidebar();
		   handleMinHeight();
		   handleDataAction();
		   handleHeaderHight();
		   //handleDzScroll();
		   handleMenuTabs();
		   handleChatbox();
		   handleMenuWallet();
		   //handlePerfectScrollbar();
		   handleBtnNumber();
		   handleDzChatUser();
		   //handleDzFullScreen();
		   handleshowPass();
		   heartBlast();
		   wow_animation();
		   handleDzLoadMore();
		   handleLightgallery();
		   handleCustomFileInput();
		   vHeight();
		   domoPanel();
		   handleDatetimepicker();
		   handleCkEditor();
		   handleImageSelect();
		   //headerFix();
		   handelBootstrapSelect();
		   //onePageLayout();
		   //handleResizeElement();
		   handleDraggableCard();
		   handleThemeMode();
		   handleDzFullScreen();
		   handlePageOnScroll();
		   handleLightgallery1();
		   
	   },

	   
	   load:function(){
		   handlePreloader();
		   /* handleNiceSelect(); */
		   //handleMenuWallet();
		   handleCustomActions();
	   },
	   
	   resize:function(){
		   vHeight();
		   //handleMenuWallet();
	   },
	   
	   handleMenuPosition:function(){
		   
		   handleMenuPosition();
	   },
   }
   
}();

/* Document.ready Start */	
jQuery(document).ready(function() {
   $('[data-bs-toggle="popover"]').popover();
   'use strict';
   Akademi.init();
   
});
/* Document.ready END */

/* Window Load START */
jQuery(window).on('load',function () {
   'use strict'; 
   Akademi.load();
   setTimeout(function(){
		   Akademi.handleMenuPosition();
   }, 1000);
   
});
/*  Window Load END */
/* Window Resize START */
jQuery(window).on('resize',function () {
   'use strict'; 
   Akademi.resize();
   setTimeout(function(){
		   Akademi.handleMenuPosition();
   }, 1000);
});
/*  Window Resize END */



/*====================== js pour page show attendance ======================*/
// Function to update attendance status
function update_attendance(attendanceId, button) {
    // Read the current status from the button's data attribute
    const currentStatus = button.getAttribute('data-status');

    // Convert string to boolean for comparison
    const isCurrentlyPresent = currentStatus === 'True' || currentStatus === 'true' || currentStatus === true;

    // Toggle the status (Present becomes 0 for Absent, Absent becomes 1 for Present)
    const newStatus = isCurrentlyPresent ? 0 : 1;

    console.log('Current Status:', currentStatus, 'Is Present:', isCurrentlyPresent, 'New Status:', newStatus);

    fetch(`/api/change-status/${newStatus}/${attendanceId}`)
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Find the row for this attendance
            const row = button.closest('tr');

            // Update the badge in the "Attendance Status" column
            const statusCell = row.querySelector('td:nth-child(3)');

            if (newStatus === 1) {
                // Mark as Present
                statusCell.innerHTML = '<span class="badge badge-success">Present</span>';
                button.classList.remove('btn-primary');
                button.classList.add('btn-warning');
                button.textContent = 'Mark as Absent';
                button.setAttribute('data-status', 'True');
            } else {
                // Mark as Absent
                statusCell.innerHTML = '<span class="badge badge-danger">Absent</span>';
                button.classList.remove('btn-warning');
                button.classList.add('btn-primary');
                button.textContent = 'Mark as Present';
                button.setAttribute('data-status', 'False');
            }

            console.log('Attendance updated successfully');
        } else {
            alert('Failed to update attendance: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to update attendance');
    });
}

// Add event listener to all toggle-attendance buttons
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('toggle-attendance')) {
            const attendanceId = e.target.getAttribute('data-id');
            update_attendance(attendanceId, e.target);
        }
    });
});



// Function 2: Add or edit note


// Function to save note
function change_status() {
    const attendanceId = document.getElementById('attendanceId').value;
    const noteText = document.getElementById('noteText').value;

    fetch(`/api/change-note/${attendanceId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            note: noteText
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const button = document.querySelector(`[data-id="${attendanceId}"].add-note`);
            const row = button.closest('tr');
            const noteCell = row.querySelector('td:nth-child(4) p');

            noteCell.textContent = noteText || 'N/A';
            button.setAttribute('data-note', noteText);
            button.textContent = noteText ? 'Edit Note' : 'Add Note';

            // Close the modal
            const modalElement = document.getElementById('attendanceNoteModal');
            const modal = bootstrap.Modal.getInstance(modalElement);

            if (modal) {
                modal.hide();
            }

            // 🔥 FORCE REMOVE BACKDROP & SCROLL LOCK
            document.body.classList.remove('modal-open');
            document.body.style.paddingRight = '';
            document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());

        } else {
            alert('Failed to update note: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to update note');
    });
}

//// Save note button click handler
//document.getElementById('saveNoteButton').addEventListener('click', function(e) {
//    e.preventDefault();
//    change_status();
//});




/* Function to reset attendance */
function reset_attendance(calendar_id) {
    if (!confirm("Are you sure you want to reset all attendances?")) {
        return;
    }
    fetch(`/api/reset-attendance/${calendar_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
        } else {
            alert("Unknown response from server");
        }

        // OPTIONAL: reload page or update table
        location.reload();
    })
    .catch(error => {
        console.error("Reset attendance error:", error);
        alert("An error occurred while resetting attendance.");
    });
}




let attendanceChart = null; // global variable to hold chart instance
/* Get statistic funtion */
function get_statistic(calendar_id) {
    fetch(`/api/get-statistic/${calendar_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        if (data.data) {
            const stats = data.data; // { present_count, absent_count, total_count }

            const ctx = document.getElementById('attendanceStatsChart').getContext('2d');

            // Destroy old chart if exists
            if (attendanceChart) {
                attendanceChart.destroy();
            }

            // Create chart with animation
            attendanceChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Present', 'Absent'],
                    datasets: [{
                        data: [stats.present_count, stats.absent_count],
                        backgroundColor: ['#a0e7e5', '#ffb3b3'],
                        borderColor: ['#5adbb5', '#ff6b6b'],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    animation: {
                        animateRotate: true, // rotate pie slices
                        animateScale: true   // scale in from center
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.label || '';
                                    let value = context.raw || 0;
                                    return `${label}: ${value}`;
                                }
                            }
                        }
                    }
                }
            });

            // Show modal
            const modalElement = document.getElementById('modalStatAttendance');
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        } else {
            alert(data.Message || "Unknown response from server");
        }
    })
    .catch(error => {
        console.error("Error fetching attendance statistics:", error);
        alert("An error occurred while fetching attendance statistics.");
    });
}



/* Function to download pdf */

function download_attendance_pdf() {
    const button = document.getElementById('download-attendance-pdf');
    const calendarId = button.getAttribute('data-id');

    // Get the table
    const table = document.querySelector('table#example-attendance');
    if (!table) {
        alert('Table not found');
        return;
    }

    // Get all rows from table
    const rows = table.querySelectorAll('tbody tr');
    const records = [];

    rows.forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 4) {
            records.push({
                number: (index + 1).toString(),
                student_name: cells[1].textContent.trim(),
                status: cells[2].textContent.trim(),
                note: cells[3].textContent.trim()
            });
        }
    });

    // Get session info from the heading and card elements
    const heading = document.querySelector('h2.heading');
    const heading_text = heading ? heading.textContent.trim() : '';
    const group = heading_text.replace('Group Attendances:', '').trim();

    const pText = document.querySelector('.card-header .text-muted');
    const lines = pText ? pText.innerHTML.split('<br>') : [];

    let date = 'N/A';
    let startTime = 'N/A';
    let endTime = 'N/A';

    lines.forEach(line => {
        if (line.includes('Date:')) {
            date = line.replace('Date:', '').trim();
        }
        if (line.includes('Start Time:')) {
            startTime = line.replace('Start Time:', '').trim();
        }
        if (line.includes('End Time:')) {
            endTime = line.replace('End Time:', '').trim();
        }
    });

    const sessionInfo = {
        group: group || 'N/A',
        date: date,
        startTime: startTime,
        endTime: endTime
    };

    // Create HTML for PDF
    let html = `
        <h2 style="text-align: center;">Attendance List</h2>

        <div style="margin: 20px 0; line-height: 1.8;">
            <p><b>Group Attendance:</b> ${sessionInfo.group}</p>
            <p><b>Date:</b> ${sessionInfo.date}</p>
            <p><b>Start Time:</b> ${sessionInfo.startTime}</p>
            <p><b>End Time:</b> ${sessionInfo.endTime}</p>
        </div>

        <table border="1" cellpadding="10" style="width:100%;margin-top: 20px;">
            <thead>
                <tr style="background-color: #1EBA62; color: white; height:40px;">
                    <th style="padding-left:5px; border-right:1px solid grey;">#</th>
                    <th style="padding-left:5px;border-right:1px solid grey;">Full Name</th>
                    <th style="padding-left:5px;border-right:1px solid grey;">Attendance</th>
                    <th style="padding-left:5px;border-right:1px solid grey;">Note</th>
                </tr>
            </thead>
            <tbody>
    `;

    records.forEach((record) => {
        html += `
            <tr>
                <td style="padding:10px; border:1px solid grey;">${record.number}</td>
                <td style="padding:5px; border:1px solid grey;">${record.student_name}</td>
                <td style="padding:5px; border:1px solid grey;">${record.status}</td>
                <td style="padding:5px; border:1px solid grey;">${record.note}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    // Use html2pdf to generate PDF
    const element = document.createElement('div');
    element.innerHTML = html;

    const opt = {
        margin: 10,
        filename: `attendance_${calendarId}_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    if (typeof html2pdf === 'undefined') {
        alert('PDF library not loaded');
        return;
    }

    html2pdf().set(opt).from(element).save();
}

document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.getElementById('download-attendance-pdf');
    if (downloadButton) {
        downloadButton.addEventListener('click', function(e) {
            e.preventDefault();
            download_attendance_pdf();
        });
    }
});

function loadGroupsToExternalEvents(accountId, sessionId) {

    fetch(`/api/get-group/${sessionId}/${accountId}`, {
        method: 'GET',
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        if (data.data) {
            const groups = data.data;
            console.log(groups);
            const container = document.getElementById('my-custom-events');

            // Clear previous groups
            container.innerHTML = '';

            // Colors to cycle through
            const colors = ['bg-info'];

            // Create div for each group
            groups.forEach((group, index) => {
                const color = colors[index % colors.length];
                const buttonClass = color.replace('bg-', 'btn-');

                const groupDiv = document.createElement('div');
                groupDiv.className = `external-event ${buttonClass} light`;
                groupDiv.setAttribute('data-class', color);
                groupDiv.innerHTML = `
                    <i class="fa fa-move"></i>
                    <span>${group.name}</span>
                `;

                container.appendChild(groupDiv);

                console.log(`Group ${index + 1}:`, {
                    id: group.id,
                    name: group.name,
                    capacity: group.capacity,
                    session_id: group.session_id,
                    local_id: group.local_id,
                    status: group.status
                });
            });

            console.log(`Loaded ${groups.length} groups successfully`);

        } else {
            console.error('No data.data found');
        }
    })
    .catch(error => {
        console.error("Error fetching groups:", error);
    });
}

// Call it when page loads - get accountId and sessionId from data attributes
document.addEventListener('DOMContentLoaded', function() {
    // Get data from the calendar-info div
    const calendarInfo = document.getElementById('calendar-info');

    if (calendarInfo) {
        const sessionId = parseInt(calendarInfo.getAttribute('data-session-id'));
        const accountId = parseInt(calendarInfo.getAttribute('data-account-id'));

        console.log('Loading groups for Session:', sessionId, 'Account:', accountId);
        loadGroupsToExternalEvents(accountId, sessionId);
    } else {
        console.error('calendar-info element not found');
    }
});



// Add this JavaScript to handle the modal dropdown shows
document.addEventListener('DOMContentLoaded', function() {

    // Handle when duplicate dropdown changes to show/hide time fields
    const eventDuplicate = document.getElementById('eventDuplicate');

    if (eventDuplicate) {
        eventDuplicate.addEventListener('change', function() {
            const startTimeFields = document.getElementById('startTimeFields');
            const endTimeFields = document.getElementById('endTimeFields');
            const eventEndFields = document.getElementById('eventEndFields');

            if (this.value !== 'none' && this.value !== '') {
                // Show time fields for recurring events
                startTimeFields.style.display = 'block';
                endTimeFields.style.display = 'block';
                eventEndFields.style.display = 'block';
            } else {
                // Hide time fields for non-recurring events
                startTimeFields.style.display = 'none';
                endTimeFields.style.display = 'none';
                eventEndFields.style.display = 'none';
            }
        });
    }

    // Handle save event button
    const saveEventButton = document.getElementById('saveEventButton');
    if (saveEventButton) {
        saveEventButton.addEventListener('click', function() {
            const eventForm = document.getElementById('eventForm');

            if (!eventForm.checkValidity()) {
                alert('Please fill in all required fields');
                return;
            }

            // Get form data
            const formData = {
                title: document.getElementById('eventTitle').value,
                date: document.getElementById('eventDate').value,
                type: document.getElementById('typeSessionSelect').value,
                room: document.getElementById('eventRoom').value,
                subject: document.getElementById('eventSubject').value,
                completionTags: Array.from(document.getElementById('eventCompletionTagCalander').selectedOptions).map(option => option.value),
                duplicate: document.getElementById('eventDuplicate').value,
                startTime: document.getElementById('eventStartTime').value || null,
                endTime: document.getElementById('eventEndTime').value || null,
                endDate: document.getElementById('eventEndDate').value || null,
                description: document.getElementById('eventDescription').value,
                groupId: document.getElementById('eventGroupId').value,
                groupCapacity: document.getElementById('eventGroupCapacity').value,
                sessionId: document.getElementById('eventSessionId').value,
                accountId: document.getElementById('eventAccountId').value,
                localId: document.getElementById('eventLocalId').value
            };

            console.log('Form Data:', formData);

            // Send to backend
            fetch('/api/create-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Response:', data);
                if (data.success) {
                    alert('Event created successfully!');
                    // Close modal
                    const eventModal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
                    eventModal.hide();
                    // Reload calendar
                    location.reload();
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to create event');
            });
        });
    }
});
