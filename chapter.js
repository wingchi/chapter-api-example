var parseHeaders = {
  "X-Parse-Application-Id": "<application id goes here>",
  "X-Parse-REST-API-Key": "<api key goes here>",
  "Content-Type": "application/json",
};

$.ajax({
  url: "https://api.parse.com/1/classes/Chapter?keys=Title",
  method: "GET",
  headers: parseHeaders
}).done( function(data){
  for(var i in data.results) {
    var title = data.results[i].Title;
    var objectId = data.results[i].objectId;
    $('#chapter-list')
      .append('<li data-objectid=' + objectId + ' class="chapter-link">'+title+'</li>');
  }

  $('.chapter-link').click( function(linkEvent) {
    var chapterObjectId = $(linkEvent.target).data('objectid');
    // alert(chapterObjectId);
    getChapterContents(chapterObjectId);
  });
});

function getChapterContents(chapterObjectId) {
  // alert(chapterObjectId);
  $.ajax({
    url: "https://api.parse.com/1/classes/Chapter/" + chapterObjectId,
    method: "GET",
    headers: parseHeaders
  }).done( function(data) {
    $('#chapter-title').text(data.Title);
    $('#chapter-contents').text(data.Contents);
  });
}
