const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = [];
let categories = ["Technology", "Travel", "Food", "Lifestyle"];

const popularBlogs = [
  { title: "TechCrunch", url: "https://techcrunch.com" },
  { title: "Smashing Magazine", url: "https://www.smashingmagazine.com" },
  { title: "Nomadic Matt", url: "https://www.nomadicmatt.com" },
  { title: "Minimalist Baker", url: "https://minimalistbaker.com" },
  { title: "Lifehacker", url: "https://lifehacker.com" },
  { title: "Wired", url: "https://www.wired.com" },
  { title: "The Verge", url: "https://www.theverge.com" },
  { title: "Mashable", url: "https://mashable.com" },
  { title: "HubSpot Blog", url: "https://blog.hubspot.com" },
  { title: "Moz Blog", url: "https://moz.com/blog" }
];

// Homepage
app.get("/", (req, res) => {
  const allCategories = [...new Set([...categories, ...posts.map(p => p.category)])];
  res.render("index", { 
    posts,
    categories: allCategories,
    selectedCategory: null,
    popularBlogs
  });
});
// Create new post
app.post('/create', (req, res) => {
  const newPost = {
    id: Date.now().toString(), // simple ID based on array length
    title: req.body.title,
    content: req.body.content,
    category: req.body.category
  };
  posts.push(newPost);
  res.redirect('/posts');
});

// Single post page


app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) {
    return res.status(404).send('Post not found');
  }

  const allCategories = [...new Set(posts.map(p => p.category))];

  res.render('post', { 
    post, 
    categories: allCategories, 
    selectedCategory: null 
  });
});
// All posts page
app.get("/posts", (req, res) => {
  const allCategories = [...new Set([...categories, ...posts.map(p => p.category)])];
  res.render("posts", {
    posts,
    categories: allCategories,
    selectedCategory: null,
    popularBlogs
  });
});

// Create post page
app.get("/create", (req, res) => {
  const allCategories = [...new Set([...categories, ...posts.map(p => p.category)])];
  res.render("create", { 
  categories: allCategories,
  selectedCategory: null
});
});

app.post('/add', (req, res) => {
  const newPost = {
    id: posts.length, // Assign ID based on array index
    title: req.body.title,
    content: req.body.content,
    category: req.body.category
  };
  posts.push(newPost);
  res.redirect('/posts');
});

// Category route
app.get("/category/:name", (req, res) => {
  const categoryName = req.params.name;
  const filteredPosts = posts.filter(p => p.category === categoryName);
  const allCategories = [...new Set([...categories, ...posts.map(p => p.category)])];

  res.render("category", { 
    posts: filteredPosts,
    categories: allCategories,
    selectedCategory: categoryName,
    popularBlogs
  });
});

// Delete a post
app.post('/delete/:id', (req, res) => {
  const postId = req.params.id;
  posts.splice(postId, 1);
  res.redirect('/');
});

// Edit post page
app.get('/edit/:id', (req, res) => {
  const postId = req.params.id;
  const allCategories = [...new Set([...categories, ...posts.map(p => p.category)])];
  res.render('edit', { post: posts[postId], id: postId, categories: allCategories });
});

// Handle post update
app.post('/edit/:id', (req, res) => {
  const postId = req.params.id;
  posts[postId] = {
    title: req.body.title,
    content: req.body.content,
    category: req.body.category
  };
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('✅ Server started on port 3000');
});
