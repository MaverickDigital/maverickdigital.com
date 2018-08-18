// add "home" to body when coming soon page is activated
if(window.location.href.indexOf("home") > -1) {
	$("body").addClass("home");
}
if(window.location.href.indexOf("about") > -1) {
	$("body").addClass("about");
	$('#menu-item-139').addClass('current_page_item');
}

if ($("body").hasClass("home")) {
	$(".video-background.home").show();	
	$(".video-background.inner").hide();
	$(".video-background.about").hide();
} else if($("body").hasClass("about")){
	$(".video-background.home").hide();
	$(".video-background.inner").hide();
	$(".video-background.about").show();
} else{
	$(".video-background.home").hide();
	$(".video-background.about").hide();
	$(".video-background.inner").show();
}


var isMobile = true;
// var isMobile = false;
// if (/Mobi|Android/i.test(navigator.userAgent)) {
//     isMobile = true;
// }

videoPreload =  {
	init: function() {
		console.log('init')
		this.vidCount = $("#preload video").length;
		this.loopVids();
	},
	loopVids: function() {
		var self = this;
		$("#preload video").each(function(idx,val){
			self.checkLoad(val);
		})
	},
	checkLoad: function(vid) {
		console.log(vid)
		var self = this;
		vid.onloadeddata = function() {
			self.vidCount--;
			if(self.vidCount == 0) {
				setTimeout(function(){
					showHomepage(); 
				},2000)
			}
		};
	}
};

var getQueryVariable = function(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
	return(false);
};
var fadeOutTagline = function() {
	TweenMax.staggerTo(".tagline", 1, {
		alpha: 0,
		ease: Expo.easeInOut,
		y: "-20%"
	}, 0, function(){
		showLogo();
	})
};

var showLogo = function() {
	$(".intro-logo").fadeIn("slow");
	$(".intro-video").attr("src","video/flamme_high.mp4");
	$(".intro-video").fadeIn("slow");
	setTimeout(function(){
		$(".intro-logo").fadeOut("slow");
		$(".intro-video").fadeOut("slow");
		if(isMobile == true) showHomepage();
	},3500)

};

var showHomepage = function() {
	$(".content-homepage").fadeIn("slow");
	$(".home-logo-container").fadeIn("2000");
	if ($("body").hasClass("home")) {
		$(".video-background.home").show();
	}
	TweenMax.set(".list-menu", {
		alpha: 0,
		y: "20%"
	})
	TweenMax.staggerTo(".list-menu", 1, {
		alpha: 1,
		y: "0%",
		ease: Expo.easeInOut
	}, .25, function() {

	})
};
console.log(getCookie("maverickDigital"))
if( getCookie("maverickDigital") == "") {
	document.cookie = "maverickDigital=loaded";
	console.log('not loaded')
	$(".video-background.home").hide();
	
	if(!isMobile) videoPreload.init();
	
	setTimeout(function(){
		$(".progress-bar").addClass("active");
	},50)

	$(".tagline-container").show();

	TweenMax.set(".tagline", {
		alpha: 0,
		y: "20%"
	})

	TweenMax.staggerTo(".tagline", 1, {
		alpha: 1,
		y: "0%",
		ease: Expo.easeInOut
	}, .25, function() {
		fadeOutTagline();
	})
	
} 
else {

	TweenMax.set(".tagline", {
		alpha: 0,
		y: "20%"
	})
	showHomepage();
}

var clickAnimation = function(menuitem){
	$(".home-logo-container").fadeOut();
	menuitem
		.fadeOut()
		.addClass("clicked")
	$( ".item-menu" ).each(function() {
		if(!$(this).hasClass("clicked")) {
			$(this).fadeOut(500,function(){
				menuitem
					.removeClass("clicked")
					.fadeIn()
					.parent().animate({ 
						top: "20px",
						bottom: "-20px",
					  }, 300, function(){
						setTimeout(function(){
							document.location.href = menuitem.attr("href");
						},500)
					} );
			});
		};
	});
};

$( ".item-menu" ).each(function( idx, value ) {
	if (!mobileResolution) {
		$(this).mouseenter(function() {
			$(".video-background video").attr("src",$(this).attr("vidSrc"));
		});
		$(this).mouseleave(function() {
			$(".video-background video").attr("src",defaultVidSrc);
		});
	}
	$(this).click(function(e){
		e.preventDefault();
		$(this).off( "mouseleave" )
		clickAnimation($(this))
	})
});
TweenMax.set("h3", {
	alpha: 0,
	y: "20%"
})

TweenMax.staggerTo("h3", 1, {
	alpha: 1,
	y: "0%",
	ease: Expo.easeInOut
}, .25, function() {

})

TweenMax.set(".wrapper a", {
	alpha: 0,
})

TweenMax.staggerTo(".wrapper a", 2, {
	alpha: 1,
	ease: Expo.easeInOut
}, .25, function() {

})

$(".menu-anchors a").hover(
	function () {
		$(this).addClass("active");
		$(this).find("span").addClass("active");
	},
	function () {
		$(this).removeClass("active");
		$(this).find("span").addClass("active");
	}
);

$(".menu-anchors a").each(function(){
	$(this).click(function(){
		$(".logo-container").fadeOut();
		var target = $(this).attr("data-slug");
		var aTag = $("a[name='" + target +"']");
		console.log(aTag)
		$("html,body").animate(
			{scrollTop: aTag.offset().top - 200}
			,1500, function(){
				$(".logo-container").fadeIn();
			});
	})
});




// temp hack for Safari issue - flashing on reload
$(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload() 
    }
});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



function isPassive() {
    var supportsPassiveOption = false;
    try {
        addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassiveOption = true;
            }
        }));
    } catch(e) {}
    return supportsPassiveOption;
}
var myScroll;

$(function() {
	console.log('scroll')
	if($('#scroll-container').length){
    myScroll = new IScroll('#scroll-container', { mouseWheel: true, click: true });
	}
});

//about arrow interaction
if($('.down-arrow-container').length){
	$('.down-arrow-container').fadeOut();
	$('.up-arrow-container').fadeOut();
}
$(".first-arrow").click(function(){
	console.log("red arrow");
	$('#main').css('background', '#fff');
	$(this).parent().parent().parent().hide();
	$('.next:nth-of-type(4)').fadeIn();
	$(".down-arrow-container").fadeIn();
  $(".up-arrow-container").fadeIn();
});

//going up
$(".up-arrow-container").click(function(){

console.log('go up');
console.log(clickcount);
  onnext = '.next:nth-of-type(' + clickcount + ')';
      $(onnext).css('display','none');
    	clickcount--;	
      console.log(clickcount);
    
        upto =   '.next:nth-of-type(' + clickcount + ')';
         if($(upto).hasClass('first')){
           console.log("top");
           $(".up-arrow-container").fadeOut();
           $('#main').removeAttr("style");
           $('#main').css('background', 'none');
           $('.down-arrow-container').fadeOut();
    		   console.log('background should be removed');
          } else{    
          $(".down-arrow-container").fadeIn();
          $('#main').css('background', '#fff');
    			$('body').removeAttr("style");
    			$('.video-background.about').css('display','block');
          }
           		  
          $(upto).fadeIn();
          
});
	

//going down
clickcount = 4;
$(".down-arrow-container").click(function(){
	console.log('on currently');
	onnext = '.next:nth-of-type(' + clickcount + ')';
	console.log(onnext);
	$(onnext).css('display','none');
	clickcount++;

	console.log(clickcount);
	if (clickcount <= 7){
	goto = '.next:nth-of-type(' + clickcount + ')';
	
    if($(goto).hasClass('last')){
   console.log("top");
 
   $(".down-arrow-container").fadeOut();
			console.log('last');
			$('#main,body').css('background', '#19191e');
			$('body').css('height', 'auto !important');
			$('body').css('overflow', 'visible');
			$('.video-background.about').css('display','none');
		}
	}
	console.log(goto);
	$(goto).fadeIn();
	
});


document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
	capture: false,
	passive: false
} : false);

$(".show").click(function(e) {
	e.preventDefault();
	myScroll.refresh();
	console.log("clicked show");
    $(this).parent().next(".more-show").toggle();
	var textshow = $(this).text();
	if(textshow == 'More >'){
		$(this).text('Less >');
	}else{
		$(this).text('More >');
	}
});

//Initiating wow animation
//new WOW().init();

//myScroll.on('scroll', function(){
//	console.log('scrolling...');
//   new WOW().init();
//});

//reset scroll if tabs/accordions change
$("body").on('DOMSubtreeModified', ".panel-default", function() {
    console.log('changed');
	myScroll.refresh();
});


//mobile menu
$(".menu-toggle").click(function(e) {
jQuery('.menu-primary-menu-container ul').toggle();
	jQuery('.icon-bars').toggle();
	jQuery('.icon-close').toggle();
});

//slider for key people
$(document).ready(function(){
// invoke the carousel
    $('#myCarousel').carousel({
      interval: false
    });

// scroll slides on mouse scroll 
$('#myCarousel').bind('mousewheel DOMMouseScroll', function(e){

        if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
            $(this).carousel('prev');
			
        }
        else{
            $(this).carousel('next');
			
        }
    });

//scroll slides on swipe for touch enabled devices 

 	$("#myCarousel").on("touchstart", function(event){
 
        var yClick = event.originalEvent.touches[0].pageY;
    	$(this).one("touchmove", function(event){

        var yMove = event.originalEvent.touches[0].pageY;
        if( Math.floor(yClick - yMove) > 1 ){
            $(".carousel").carousel('next');
        }
        else if( Math.floor(yClick - yMove) < -1 ){
            $(".carousel").carousel('prev');
        }
    });
    $(".carousel").on("touchend", function(){
            $(this).off("touchmove");
    });
});
    
});



//bootstrap tab collapse
!function ($) {

    "use strict";

    // TABCOLLAPSE CLASS DEFINITION
    // ======================

    var TabCollapse = function (el, options) {
        this.options   = options;
        this.$tabs  = $(el);

        this._accordionVisible = false; //content is attached to tabs at first
        this._initAccordion();
        this._checkStateOnResize();


        // checkState() has gone to setTimeout for making it possible to attach listeners to
        // shown-accordion.bs.tabcollapse event on page load.
        // See https://github.com/flatlogic/bootstrap-tabcollapse/issues/23
        var that = this;
        setTimeout(function() {
          that.checkState();
        }, 0);
    };

    TabCollapse.DEFAULTS = {
        accordionClass: 'visible-xs',
        tabsClass: 'hidden-xs',
        accordionTemplate: function(heading, groupId, parentId, active) {
            return  '<div class="panel panel-default">' +
                    '   <div class="panel-heading">' +
                    '      <h4 class="panel-title">' +
                    '      </h4>' +
                    '   </div>' +
                    '   <div id="' + groupId + '" class="panel-collapse collapse ' + (active ? 'in' : '') + '">' +
                    '       <div class="panel-body js-tabcollapse-panel-body">' +
                    '       </div>' +
                    '   </div>' +
                    '</div>'

        }
    };

    TabCollapse.prototype.checkState = function(){
        if (this.$tabs.is(':visible') && this._accordionVisible){
            this.showTabs();
            this._accordionVisible = false;
        } else if (this.$accordion.is(':visible') && !this._accordionVisible){
            this.showAccordion();
            this._accordionVisible = true;
        }
    };

    TabCollapse.prototype.showTabs = function(){
        var view = this;
        this.$tabs.trigger($.Event('show-tabs.bs.tabcollapse'));

        var $panelHeadings = this.$accordion.find('.js-tabcollapse-panel-heading').detach();
        $panelHeadings.each(function() {
            var $panelHeading = $(this),
                $parentLi = $panelHeading.data('bs.tabcollapse.parentLi');
            view._panelHeadingToTabHeading($panelHeading);
            $parentLi.append($panelHeading);
        });

        var $panelBodies = this.$accordion.find('.js-tabcollapse-panel-body');
        $panelBodies.each(function(){
            var $panelBody = $(this),
                $tabPane = $panelBody.data('bs.tabcollapse.tabpane');
            $tabPane.append($panelBody.children('*').detach());
        });
        this.$accordion.html('');

        this.$tabs.trigger($.Event('shown-tabs.bs.tabcollapse'));
    };

    TabCollapse.prototype.showAccordion = function(){
        this.$tabs.trigger($.Event('show-accordion.bs.tabcollapse'));

        var $headings = this.$tabs.find('li:not(.dropdown) [data-toggle="tab"], li:not(.dropdown) [data-toggle="pill"]'),
            view = this;
        $headings.each(function(){
            var $heading = $(this),
                $parentLi = $heading.parent();
            $heading.data('bs.tabcollapse.parentLi', $parentLi);
            view.$accordion.append(view._createAccordionGroup(view.$accordion.attr('id'), $heading.detach()));
        });

        this.$tabs.trigger($.Event('shown-accordion.bs.tabcollapse'));
    };

    TabCollapse.prototype._panelHeadingToTabHeading = function($heading) {
        var href = $heading.attr('href').replace(/-collapse$/g, '');
        $heading.attr({
            'data-toggle': 'tab',
            'href': href,
            'data-parent': ''
        });
        return $heading;
    };

    TabCollapse.prototype._tabHeadingToPanelHeading = function($heading, groupId, parentId, active) {
        $heading.addClass('js-tabcollapse-panel-heading ' + (active ? '' : 'collapsed'));
        $heading.attr({
            'data-toggle': 'collapse',
            'data-parent': '#' + parentId,
            'href': '#' + groupId
        });
        return $heading;
    };

    TabCollapse.prototype._checkStateOnResize = function(){
        var view = this;
        $(window).resize(function(){
            clearTimeout(view._resizeTimeout);
            view._resizeTimeout = setTimeout(function(){
                view.checkState();
            }, 100);
        });
    };


    TabCollapse.prototype._initAccordion = function(){
        this.$accordion = $('<div class="panel-group ' + this.options.accordionClass + '" id="' + this.$tabs.attr('id') + '-accordion' +'"></div>');
        this.$tabs.after(this.$accordion);
        this.$tabs.addClass(this.options.tabsClass);
        this.$tabs.siblings('.tab-content').addClass(this.options.tabsClass);
    };

    TabCollapse.prototype._createAccordionGroup = function(parentId, $heading){
        var tabSelector = $heading.attr('data-target'),
            active = $heading.data('bs.tabcollapse.parentLi').is('.active');

        if (!tabSelector) {
            tabSelector = $heading.attr('href');
            tabSelector = tabSelector && tabSelector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
        }

        var $tabPane = $(tabSelector),
            groupId = $tabPane.attr('id') + '-collapse',
            $panel = $(this.options.accordionTemplate($heading, groupId, parentId, active));
        $panel.find('.panel-heading > .panel-title').append(this._tabHeadingToPanelHeading($heading, groupId, parentId, active));
        $panel.find('.panel-body').append($tabPane.children('*').detach())
            .data('bs.tabcollapse.tabpane', $tabPane);

        return $panel;
    };



    // TABCOLLAPSE PLUGIN DEFINITION
    // =======================

    $.fn.tabCollapse = function (option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('bs.tabcollapse');
            var options = $.extend({}, TabCollapse.DEFAULTS, $this.data(), typeof option === 'object' && option);

            if (!data) $this.data('bs.tabcollapse', new TabCollapse(this, options));
        });
    };

    $.fn.tabCollapse.Constructor = TabCollapse;


}(window.jQuery);
if ($(window).width() < 768) {
   $('#myTab').tabCollapse();
}

