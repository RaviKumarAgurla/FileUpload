var express = require('express');
var path = require('path')
var PORT = 8000
var app = express()


app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({extended: false}))

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file)
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null,  Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage});

app.get('/', (req, res)=> {
    res.render('homepage')
})

app.post('/upload', upload.single('profileImage'), (req, res) => {
    console.log(req.file);
    res.redirect('/')
})

app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`)
})