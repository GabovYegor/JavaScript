$(document).ready(()=>{
    $(document).on('click', '#adminPanel', function () {
        if($(this).hasClass('adminActive')){
            $('#adminEnterForm').remove()
            $(this).removeClass('adminActive')
        }
        else {
            $(this).addClass('adminActive')
            $(this).after('<form id="adminEnterForm" action="/admin" method="POST">' +
                '  <input class="w3-panel" id="adminPassword" type="password" name="password" placeholder="password">' +
                 '  <input class="w3-btn" type="submit" id="adminBtn">' +
                '  </form> ')
        }
    })

})