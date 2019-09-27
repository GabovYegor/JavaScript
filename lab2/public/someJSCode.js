function ajax(){
    var xhttp = new XMLHttpRequest()
    xhttp.open("POST", `/test`, true)
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send({ form: 'data' })
    xhttp.onreadystatechange = function () {
        console.log('ready')
        if(this.readyState == 4 && this.statusCode == 200) {
            console.log('call function')
            //printBooksList(req, res)
        }
    }
    console.log('ready')
    books.push({egor: 'gabov'})
}