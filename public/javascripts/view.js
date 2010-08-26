$(document).ready(function(){
	
	$('#debug_info').click(function() {
		$('#debug_more').toggle('fast');
	});
	
  $("label").inFieldLabels();
	
  $('#flash_notice, #flash_error, #flash_alert').delay(2500).slideUp(130);
  
  $("div.image_cycle").cycle({
    fx: 'fade',
    random: 1,
    timeout: 2000,
    speed: 3000
  });

  //buttons//////
  $("#add_group_button").fancybox();
  $("#add_request_button").fancybox({ 'titleShow': false });

  $("input[type='submit']").addClass("button");

  $(".image_cycle img").load( function() {
    $(this).fadeIn("slow");
  });


  $(".edit_group_button").click(function() {

    var element = $(this).closest("li").children(".group_name").children("a");
    var oldHTML = element.html();

    var link = element.attr("href");

    element.toggleClass("editing");

    if( element.hasClass("editing") ) {

      element.attr("contentEditable", true);
      element.focus();


  
      //remove newline action
      $(element).keypress(function(e) {
        if (e.which == 13) {
          e.preventDefault();
          element.attr("contentEditable", false);
          element.toggleClass("editing");
          element.blur();

          //save changes
          $.ajax({
            type: "PUT",
            url: link,
            data: {"group" : {"name" : element.text() }}
          });
        }
      });

      //update all other group links
      $(element).keyup(function(e) {
        $("a[href='"+link+"']").not(element).text(element.text());
      });

    } else {
      element.attr("contentEditable", false);
    }

  });


});//end document ready



function pane_toggler_button( name ) {
  
    $("#add_" + name + "_button").toggle(
    function(evt){
      evt.preventDefault();
      $("#add_" + name + "_pane").fadeIn(300);
    },function(evt){
      evt.preventDefault();
      $("#add_" + name +"_pane").fadeOut(200);
    }
  );
}

//Called with $(selector).clearForm()
	$.fn.clearForm = function() {
		return this.each(function() {
		var type = this.type, tag = this.tagName.toLowerCase();
		if (tag == 'form')
			return $(':input',this).clearForm();
		if (type == 'text' || type == 'password' || tag == 'textarea')
			this.value = '';
		//else if (type == 'checkbox' || type == 'radio')
			//this.checked = false;
		else if (tag == 'select')
			this.selectedIndex = -1;
		$(this).blur();
    });
	};
