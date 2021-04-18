let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());
 
// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);
 
let books = {
    Array: [
       { id: 1, title: 'Harry Potter', pages: 120, price: 200, amount: 20 },
       { id: 2, title: 'Bitcoin 101', pages: 100, price: 120, amount: 35 },
       { id: 3, title: 'Naruto', pages: 100, price: 120, amount: 35 },
       { id: 4, title: 'Reborn', pages: 100, price: 120, amount: 35 },
       { id: 5, title: 'Onepiece', pages: 100, price: 120, amount: 35 },
       { id: 6, title: 'Next.js', pages: 100, price: 120, amount: 35 }
    ]
 }
 
 
router.route('/books')
   .get((req, res) => res.json(books))
   .post((req, res) => {
    let newBook = {}
    newBook.id = (books.Array.length)?books.Array[books.Array.length - 1].id + 1:1
    newBook.title = req.body.title
    newBook.pages = req.body.pages
    newBook.price = req.body.price
    newBook.amount = req.body.amount
    books = { "Array": [...books.Array, newBook] }
    res.json(books)
})

router.route('/books/:book_id')
   .get((req, res) => {
       const book_id = req.params.book_id
       const id = books.Array.findIndex(item => +item.id === + book_id)
       res.json(books.Array[id])
   })
   .put((req, res) => {
       const book_id = req.params.book_id
       const id = books.Array.findIndex(item => +item.id === +book_id)
       books.Array[id].page = req.body.page
       books.Array[id].price = req.body.price
       books.Array[id].amount = req.body.amount
       res.json(books.Array[id])
   })
 
   .delete((req, res) => {
       const book_id = req.params.book_id
       books.Array = books.Array.filter(item => +item.id !== +book_id)
       res.json(books.Array)
   })

let income = 0
router.route('/income')
   .get((req, res) => res.json(income))


router.route('/purchase/:book_id')
    .post((req, res) => {
      
        const book_id = req.params.book_id
        const id = books.Array.findIndex(item => +item.id === +book_id)
        const newIncome = books.Array[id].price
        const NewAmount = books.Array[id].amount

        console.log(NewAmount)
        console.log(newIncome)
        console.log(book_id)
        console.log(id)

        if(id < 0){

            res.send("book not found")
        }
        else{
            if(NewAmount > 0)
            {
                income += newIncome
                // console.log(income)
                amount = NewAmount-1
                books.Array[id].amount = amount
                // console.log(amount)
                res.json(income)
            }
            else{
                books.Array = books.Array.filter(item => +item.id !== +book_id)
                res.send("The book is out of stock")
                res.json(books.list)
            }
        }
    })


app.use("*", (req, res) => res.status(404).send('404 Not found'));

app.listen(4001, () => {
    console.log("Yey, your server is running on port 4001");
});