jQuery(document).ready(function(){
	jQuery('.entry-list').on('click','.delete-button',function(e){
		e.preventDefault();
    const value = $("input[type='checkbox']:checked");
    
    console.log(value[0].id);
    console.log(value[1].id);
    console.log("clicked");
	});
});
