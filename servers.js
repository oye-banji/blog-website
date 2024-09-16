const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
   //lodash
   const num = _.random(0, 20);
   console.log(num);

   const greet = _.once(() => {
    console.log('hello')
   })

   greet();

    //set header content type
    res.setHeader('content-type', 'text/html');

    let path = './views';

    switch(req.url){
        case '/':
            path += '/index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += '/about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '/404.html';
            res.statusCode = 404;
            break
        }

    //SEND AN HTML FILE
    fs.readFile(path, (err, data) =>{
        if(err){
            console.log(err)
            res.end()
        }else{
            //res.write(data)
            res.end(data)
        }
    })

});

server.listen(3000, 'localhost', () => {
    console.log( 'listening for request on port 3000')
})

// //APPS
// const express = require('express');
// const morgan = require('morgan');
// const mongoose = require('mongoose')
// const Blog = require('./models/blogs')

// //EXPRESS APP
// const app = express();

// //connect to mongodb
// const dbURI = 'mongodb+srv://netninja:test1234@NodeLearn.nxo08.mongodb.net/'
// mongoose.connect(dbURI)
//     .then(result => app.listen(3000))
//     .catch(err => console.log)
// //REGISTER VIEW ENGINE
// app.set('view engine', 'ejs');
// // app.set('views', 'newViews')

// //LISTEN FOR REQQUEST
// //app.listen(3000);

// //MIDDLEWARE AND STATIC FILE
// app.use(express.static('public'))
// app.use(express.urlencoded({extended: true}));
// app.use(morgan('dev'));

// //MONGOOSE AND MONGO SANDBOX ROUTES
// // app.get('/add-blog', (req, res) => {
// //     const blog = new Blog({
// //         title: 'new Blog 2',
// //         snippet:'about my new blog',
// //         body: 'more about my blog'
// //     });
// //     blog.save()
// //         .then(result => {
// //             res.send(result)
// //         })
// //         .catch(err => console.log(err))
// // });

// // app.get('/all-blogs', (req, res) => {
// //     Blog.find()
// //         .then(result => {
// //             res.send(result)
// //         })
// //         .catch(err => console.log(err))
// // })

// // app.get('/single-blog', (req, res) => {
// //     Blog.findById('66d121b884c15ecf182b79c1')
// //         .then(result => {
// //             res.send(result)
// //         })
// //         .catch(err => console.log(err))


// // })


// //ROUTES
//     //  - these are the basic routes
// app.get('/',(req, res) => {
//     res.redirect('/blogs')
//     //res.sendFile('./views/index.html', {root: __dirname})
//     //res.send('<p> home page <p>');
// });


// app.get('/about',(req, res) => {
//     res.render('about', {title: 'about'});

//     //res.send('<p> about page <p>');
//     //res.sendFile('./views/about.html', {root: __dirname})
// });


// //  - these are the blog route
// app.get('/blogs', (rew, res) => {
//     Blog.find().sort({createdAt: -1})
//         .then(result => {
//             res.render('index', {title: 'All Blogs', blogs : result})
//         })
//         .catch(err => console.log(err))
// })
// app.get('/blogs/create', (req, res) => {
//     res.render('create', {title: 'create a new blog'});
// })
// //POST REQUEST
// app.post('/blogs', (req, res) => {
//     const blog = new Blog(req .body); // using the blog instance we initialize the new blog using the object returned (res.body)
//     blog.save() // saves it to the database
//         .then(result => {
//             res.redirect('/blogs')
//         })
//         .catch(err => { console.log(err)})
// })

// app.get('/blogs/:id', (req, res) => {
//     const id = req.params.id;
//     Blog.findById(id)
//         .then(result => {
//             res.render('details', {blog:result, title: 'Blog Details'})
//         })
//         .catch(err => console.log(err))
// })

// app.delete('/blogs/:id', (req, res) => {
//     const id = req.params.id;

//     Blog.findByIdAndDelete(id)
//         .then(result => {
//             res.json({
//                 redirect: '/blogs'
//             })
//         })
//         .catch(err => console.log(err));
// })

// //REDIRECTS
// // app.get('/about-us', (req, res) => {
// //     res.redirect('./about');
// // })

// // 404 PAGE
// app.use((req, res) => {
//     res.render('404', {title: '404'})
//     //res.status(404).sendFile('./views/404.html', {root: __dirname})

// });
