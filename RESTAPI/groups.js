let express = require('express')
let router = express.Router()

let groups = [
    {id:1, name: '7381', students: 15},
    {id:2, name: '7382', students: 21},
    {id:3, name: '7383', students: 18},
    {id:4, name: '7303', students: 13},
]

router.get('/', (req, res) => {
    res.json(groups)
})

router.get('/:id([0-9]{1,})', (req, res) => {
    var group = groups.filter((g) => {
        if(g.id == req.params.id)
            return true;
    })

    if(group.length == 1){
        res.json(group[0])
    }
    else{
        res.status(404)
        res.json({message: 'Not Found'})
    }
})

router.post('/', (req, res) => {
    let body = req.body
    console.log(body)
    if(!body.name || !body.students.toString().match(/^[0-9]{1,}$/g)){
        res.status(404)
        res.json('not found')
    }
    else{
        var newID = groups[groups.length-1].id + 1
        groups.push({
            id: newID,
            name: body.name,
            students: body.students
        })
        res.json({message: "New group created" , location: "/groups/" + newID})
    }
})

router.put('/:id', (req, res) => {
    let body = req.body
    if(!body.name){
        res.status(404)
        res.json({message: 'not found'})
    }
    else{
        var updateIndex = groups.map((group) => {
            return parseInt((group.id))
        }).indexOf(parseInt(req.params.id))

        if(updateIndex === -1){
            var newIndex = groups[groups.length-1].id + 1
            groups.push({
                id: newIndex,
                name: body.name,
                students: body.students
            })
            res.json('new group')
        } else {
            groups[updateIndex] = {
                id: updateIndex,
                name: body.name,
                students: body.students
            }
            res.json('Update group ID')
        }
    }
})

router.delete('/:id', (req, res) => {
    var updateIndex = groups.map((group) => {
        return parseInt((group.id))
    }).indexOf(parseInt(req.params.id))

    if(updateIndex ===  -1){
        res.status(404)
        res.json('This is no this id')
    } else {
        groups.splice(updateIndex, 1)
        res.json('delete ${updateIndex')
    }
})

module.exports = router
