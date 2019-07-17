$(document).ready(function(){
    if (window.location.pathname == "/tasks") {
      $('#nav-tasks').addClass("active");
    }
    else{
      $('#nav-tasks').removeClass("active");
    }
    //Goto Section event
    $( "a.nav-link" ).click(function( event ) {
        event.preventDefault();
        if (($(this).attr("href")).startsWith("/")) {
          window.location.href = window.location.protocol + "//" + window.location.host + $(this).attr("href");
          return;
        }
        if (window.location.pathname  == "/tasks" || window.location.pathname  == "/wallet") {
          window.location.href = window.location.protocol + "//" + window.location.host + $(this).attr("href");
          return;
        }
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top + (-72) }, 500);
        $(".dappoverlay").fadeOut();
        $("html").css('overflow', 'auto');
    });
});

//Scroll Menu event
function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#bs-example-navbar-collapse-1 a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top + (-400) <= scrollPos && refElement.position().top + (-400) + refElement.height() > scrollPos) {
            $('#bs-example-navbar-collapse-1 nav a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}

