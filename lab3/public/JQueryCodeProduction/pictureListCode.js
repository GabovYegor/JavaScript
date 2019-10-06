$(document).ready(() => {
  $(document).on('click', '#addPictureBtn', function () {
    if ($(this).hasClass('addActive')) {
      $(this).text('show add picture form');
      $('#addForm').remove();
      $(this).removeClass('addActive');
    } else {
      $(this).addClass('addActive');
      $(this).text('hide add picture form');
      $(this).after('<div id="addForm">\n' + '  <input type="text" placeholder="title" id="addTitle"><br>\n' + '  <input type="text" placeholder="author" id="addAuthor"><br>\n' + '  <input type="text" placeholder="picture image" id="addImage"><br>\n' + '  <textarea placeholder="description" id="addDescription"></textarea><br>\n' + '  <input type="text" placeholder="picture start price" id="addStartPrice"><br>\n' + '  <button id="addPictureFormBtn">Add picture</button>' + '  </div> ');
    }
  });
  $(document).on('click', '#addPictureFormBtn', function () {
    $.ajaxSetup({
      async: false
    });
    var response = $.post("/addPictureAction", {
      title: $('#addTitle').val(),
      author: $('#addAuthor').val(),
      image: $('#addImage').val(),
      description: $('#addDescription').val(),
      startPrice: $('#addStartPrice').val()
    }, () => {}, "json");
    imagePath = '/public/images/' + $('#addImage').val();
    $('ol').append('<li><img src="' + JSON.parse(response.responseText).imagePath + '"></img>Author: ' + $('#addAuthor').val() + 'Title: ' + $('#addTitle').val() + '<br><a href="/loadPictureCard/' + JSON.parse(response.responseText).id + '">Go to picture card</a><br><br><br><br><br></li>');
  });
});