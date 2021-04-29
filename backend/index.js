
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

router.get('/foo',
passport.authenticate('jwt', { session: false }),
(req, res, next) => {
    res.send('Foo')
});

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
  .route("/puppys")
  .get((req, res) => {
    res.send(pupps);
  })
  .post((req, res) => {
    console.log(req.body);
    let newstudent = {};
    newpuppy.id = puppys.list.length ? pupps.list[pupps.list.length - 1].id + 1 : 1;
    newpuppy.species = req.body.species;
    newpuppy.sex = req.body.sex;
    newpuppy.age = req.body.age;
    newpuppy.price = req.body.price;
    newpuppy.imageurl = req.body.imageurl;
    puppys = { list: [...puppys.list, newpuppy] };
    res.json(puppys);
  });

  router
  .route("/puppys/:puppyid")
  .get((req, res) => {
    let id = puppys.list.findIndex((item) => +item.id == +req.params.puppyid)
    res.json(puppys.list[id]);
  })
  .put((req, res) => {
    let id = puppys.list.findIndex((item) => item.id == +req.params.puppyid);
    puppys.list[id].species = req.body.species;
    puppys.list[id].sex = req.body.sex;
    puppys.list[id].age = req.body.age;
    puppys.list[id].price = req.body.price;
    puppys.list[id].image = req.body.image;
    res.json(puppys.list);
  })
  .delete((req, res) => {
    puppys.list = puppys.list.filter((item) => +item.id !== +req.params.puppyid);
    res.json(puppys.list);
  });


router.route("/purchase/:puppyId")
.post((req,res) => {
  let id = puppys.list.findIndex((item) => +item.id == +req.params.studentId)
  if (id == -1) {
    res.json({message: "Student not found"})
  }
  else {
    puppys.list = puppys.list.filter((item) => +item.id !== +req.params.puppyId);
    res.json(puppys.list);
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