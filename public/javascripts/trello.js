$(document).ready(function(){
	async function asyncForEach(array, callback) {
	  for (let index = 0; index < array.length; index++) {
	    await callback(array[index], index, array);
	  }
	}
	$(document).on('click','.trelloLink',function(event) {
	  event.preventDefault();
	  let dataId = $(this).attr("data-id");
	  const overlay = `<div class="dappoverlay" data-id="${dataId}"><a class="close"></a><div class="row"><div class="overlay-img-div"></div></div class="overlay-text"><div class="cardLoader"><div class="spinner-grow text-secondary"><span class="sr-only"></span></div><p>Loading...</p></div></div>`;
	  $('#tasklist').append(overlay);
	  fetch(`https://api.trello.com/1/cards/${dataId}?fields=all`)
	  .then(function(response) {
	    return response.json();
	  })
	  .then(function(cardDescription) {
	  	let y = `<h3>${cardDescription.name}</h3>
	  	<h2>Description</h2>
	  	<p>${cardDescription.desc}</p>
	  	<a class="walletstyle" target="_blank" href='${cardDescription.url}')>View This Card On Trello</a>
	  	`;
	  	$(".dappoverlay[data-id='" + dataId +"']").append(y);
	  	$( ".cardLoader" ).remove();
	  });
	  console.log(($(this).attr("href")));
	  return false;
	});

	$(document).on('click','.close',function(event) {
	  event.preventDefault();
	  $(this).parent().fadeOut(300, function() { $(this).remove(); });
	  return false;
	});

	function getTrelloBoardInfo(trelloBoardId){
	 fetch(`https://api.trello.com/1/boards/${trelloBoardId}/lists`)
	  .then(function(response) {
	    return response.json();
	  })
	  .then(function(list) {
	  	asyncForEach(list, async (trelloListInfo) => {
	  		//console.log(entry);
	  		await fetch(`https://api.trello.com/1/lists/${trelloListInfo.id}/cards`)
			  .then(function(response) {
			    return response.json();
			  })
			  .then(function(cards) {
			  	$('<div>',{
				  'class' : 'trelloCard col-md-4',
				  'data-id' : trelloListInfo.id,
				  'html': $('<h2>',{
				    'html' : $('<h2>').text(trelloListInfo.name)
				  })
				}).appendTo('#tasklist.row');
			  	asyncForEach(cards, async (trelloCardInfo) => {
			  		$('<div>',{
					  'html': $('<a>',{
					    'class' : 'trelloLink',
					    'href' : trelloCardInfo.url,
					    'data-id' : trelloCardInfo.id,
					  }).text(trelloCardInfo.name)
					}).appendTo(".trelloCard[data-id='" + trelloListInfo.id +"']");
				});
			  });
		});
	  }).then(function(response) {
	    $( ".loader" ).remove();
	  });
	};

	//get trello board data
	getTrelloBoardInfo('uTTKCXWU');

});