// show password
$(".toggle-password").click(function() {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
});

// patient view and aides view switching
$('.view_tab').click(function(){  
	$(".tab-pane").removeClass('active');
	$(".tab-pane[data-id='"+$(this).attr('data-id')+"']").addClass("active");
	$(".view_tab").removeClass('active');
	$(this).addClass('active');
});

// settings view switching
$('.settings-tab').click(function(){
	console.log('click')
	$(".tab-pane").removeClass('active');
	$(".tab-pane[data-id='"+$(this).attr('data-id')+"']").addClass("active");
	$(".settings-tab").removeClass('active');
	$(this).addClass('active');
});

// permission view switching
$(".per-tab .tab-pane:first").show();
$('.permission-tab').click(function(){  
    $(".per-tab .tab-pane").hide();
    $(".per-tab .tab-pane[data-id='"+$(this).attr('data-id')+"']").show();
    $(".permission-tab").removeClass('active');
    $(this).addClass('active');
});