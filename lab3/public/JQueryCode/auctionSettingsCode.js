$(document).ready(() => {
    $('div > *').click(
        function () {
            if (!$(this).hasClass('selected')) {
                if ($('div > *').hasClass('selected')) {
                    $('div > *').removeClass('selected')
                    $('#form').remove()
                }

                $(this).addClass('selected')
                $(this).append('<div id="form">\n' +
                    '  <input type="text" placeholder="new value" id="value"><br>\n' +
                    '  <button id="changeAuctionSetting">Change</button>' +
                    '   </div>  '
                )
            }
        })


    $(document).on('click', "#changeAuctionSetting", function() {
        let obj = {}
        obj[$(this).parent().parent().attr('id')] = $('#value').val()
        $.post( "/setUpAuction", obj, updateSettings($(this).parent().parent(), $('#value').val()), "json" )
    });

    function updateSettings(elem, newValue) {
        elem.text(newValue)
    }
})

