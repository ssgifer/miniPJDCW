
const express = require('express'),
app = express(),
passport = require('passport'),
port = process.env.PORT || 80,
cors = require('cors'),
cookie = require('cookie')

const bcrypt = require('bcrypt')


const db = require('./database.js')
let users = db.users

require('./passport.js')

const router = require('express').Router(),
jwt = require('jsonwebtoken')

app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))


router.post('/login', (req, res, next) => {
passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log('Login: ', req.body, user, err, info)
    if (err) return next(err)
    if (user) {
        const token = jwt.sign(user, db.SECRET, {
            expiresIn: '7d'
        })
        // req.cookie.token = token
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: 60 * 60,
                sameSite: "strict",
                path: "/",
            })
        );
        res.statusCode = 200
        return res.json({ user, token })
    } else
        return res.status(422).json(info)
})(req, res, next)
})

router.get('/logout', (req, res) => { 
res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: -1,
        sameSite: "strict",
        path: "/",
    })
);
res.statusCode = 200
return res.json({ message: 'Logout successful' })
})

// router.get('/foo', (req, res, next) => {
//     res.send('Foo');
// })

/* GET user profile. */
router.get('/profile',
passport.authenticate('jwt', { session: false }),
(req, res, next) => {
    res.send(req.user)
});

router.post('/register',
async (req, res) => {
    try {
        const SALT_ROUND = 10
        const { username, email, password } = req.body 
        if (!username || !email || !password)
            return res.json( {message: "Cannot register with empty string"})
        if (db.checkExistingUser(username) !== db.NOT_FOUND)
            return res.json({ message: "Duplicated user" })

        let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
        hash = await bcrypt.hash(password, SALT_ROUND)
        users.users.push({ id, username, password: hash, email })
        res.status(200).json({ message: "Register success" })
    } catch {
        res.status(422).json({ message: "Cannot register" })
    }
})

router.get('/alluser', (req,res) => res.json(db.users.users))

router.get('/', (req, res, next) => {
res.send('Respond without authentication');
});
let herolists = {
    list: [
]
  }


  router
  .route("/puppylists")
  .get((req, res) => {
    res.send(pupps);
  })
  .post((req, res) => {
    console.log(req.body);
    let newstudent = {};
    newpuppylist.id = puppylists.list.length ? puppylists.list[puppylists.list.length - 1].id + 1 : 1;
    newpuppylist.species = req.body.species;
    newpuppylist.sex = req.body.sex;
    newpuppylist.age = req.body.age;
    newpuppylist.price = req.body.price;
    newpuppylist.imageurl = req.body.imageurl;
    puppylists = { list: [...puppylists.list, newpuppylist] };
    res.json(puppys);
  });

  router
  .route("/puppylists/:puppylist")
  .get((req, res) => {
    let id = puppylist.list.findIndex((item) => +item.id == +req.params.puppylist)
    res.json(puppylists.list[id]);
  })
  .put((req, res) => {
    let id = puppylists.list.findIndex((item) => item.id == +req.params.puppylist);
    puppylists.list[id].species = req.body.species;
    puppylists.list[id].sex = req.body.sex;
    puppylists.list[id].age = req.body.age;
    puppylists.list[id].price = req.body.price;
    puppylists.list[id].imageurl = req.body.imageurl;
    res.json(puppylists.list);
  })
  .delete((req, res) => {
    puppylistslist = puppylists.list.filter((item) => +item.id !== +req.params.puppylist);
    res.json(puppylists.list);
  });


router.route("/purchase/:puppylist")
.post((req,res) => {
  let id = puppylists.list.findIndex((item) => +item.id == +req.params.puppylist)
  if (id == -1) {
    res.json({message: "Student not found"})
  }
  else {
    puppylists.list = puppylists.list.filter((item) => +item.id !== +req.params.puppylist);
    res.json(puppylists.list);
  }
})

// Error Handler
app.use((err, req, res, next) => {
let statusCode = err.status || 500;
res.status(statusCode);
res.json({
  error: {
    status: statusCode,
    message: err.message,
  },
});
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`));