let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());
 
// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);
 
let pets = {
    list: [
       { id: 1, type: "cat", age: 1, weight: 5, price: 2500 },
       { id: 2, type: "dog", age: 1, weight: 10, price: 3000 },
       { id: 3, type: "dog", age: 1, weight: 10, price: 3000 },
       { id: 4, type: "dog", age: 1, weight: 10, price: 3000 },
       { id: 5, type: "dog", age: 1, weight: 10, price: 3000 },
       { id: 6, type: "dog", age: 1, weight: 10, price: 3000 }
    ]
 }
 
 
router.route('/pets')
   .get((req, res) => res.json(pets))
   .post((req, res) => {
    let newPet = {}
    newPet.id = (pets.list.length)?pets.list[pets.list.length - 1].id + 1:1
    newPet.type = req.body.type
    newPet.age = req.body.age
    newPet.weight = req.body.weight
    newPet.price = req.body.price
    pets = { "list": [...pets.list, newPet] }
    console.log(pets)
    res.json(pets)
})

router.route('/pets/:pet_id')
   .get((req, res) => {
       const pet_id = req.params.pet_id
       const id = pets.list.findIndex(item => +item.id === +pet_id)
       res.json(pets.list[id])
   })
   .put((req, res) => {
       const pet_id = req.params.pet_id
       const id = pets.list.findIndex(item => +item.id === +pet_id)
       pets.list[id].type = req.body.type
       pets.list[id].age = req.body.age
       pets.list[id].weight = req.body.weight
       pets.list[id].price = req.body.price
       res.json(pets.list[id])
   })
 
   .delete((req, res) => {
       const pet_id = req.params.pet_id
       pets.list = pets.list.filter(item => +item.id !== +pet_id)
       res.json(pets.list)
   })

let income = 3000
router.route('/income')
   .get((req, res) => res.json(income))




app.use("*", (req, res) => res.status(404).send('404 Not found'));

app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});