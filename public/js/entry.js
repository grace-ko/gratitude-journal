jQuery(document).ready(function(){
	jQuery('.entry-list').on('click','.delete-button',function(e){
		e.preventDefault();
    const checkedEntry = $("input[type='checkbox']:checked");
		const entryItem = $(checkedEntry).parent();
		console.log($('.individual-entry'))
		for (var i = 0; i < entryItem.length; i++) {
			$(entryItem[i]).remove();
			$.ajax({
				method: 'DELETE',
				url: '/entry/'+ entryItem[i].id
			}).done(function(data){
				if($('.individual-entry').length===0) {
					$('.delete-button').hide();
				}
			});
		}
	});
});
