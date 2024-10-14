// const express = require('express');
// const path = require('path');
// const app = express();
// const bodyparser = require("body-parser");
// const mongoose = require('mongoose');

// const port = 8000;

// // Connect to MongoDB
// async function connectToDatabase() {
//   try {
//     console.log('Connecting to MongoDB...');
//     await mongoose.connect('mongodb://127.0.0.1:27017/MyMeal', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('Connected to MongoDB.');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//   }
// }

// connectToDatabase();

// // Define the contact schema
// const contactSchema = new mongoose.Schema({
//   name: String,
//   age: String,
//   gender: String,
//   address: String,
//   phone: String,
//   email: String,
// });
// const Contact = mongoose.model('Contact', contactSchema);

// // Middleware and settings
// app.use('/static', express.static('static'));
// app.use(express.urlencoded({ extended: true })); // Parse the request body

// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));

// // Routes
// app.get('/', (req, res) => {
//   const params = {};
//   res.status(200).render('home.pug', params);
// });

// app.get('/contact', (req, res) => {
//   const params = {};
//   res.status(200).render('contact.pug', params);
// });

// app.post('/contact', (req, res) => {
//   const mydata = new Contact(req.body);
//   mydata.save().then(() => {
//     res.send("This item has been saved to the database");
//   }).catch(() => {
//     res.status(400).send("Item was not saved to the database");
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`The application started successfully on port ${port}`);
// });

const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

const port = 8000;

// Connect to MongoDB
async function connectToDatabase() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect('mongodb://127.0.0.1:27017/MyMeal', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB.');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToDatabase();

// Define the contact schema
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    address: String,
    phone: String,
    email: String,
});
const Contact = mongoose.model('Contact', contactSchema);

// Define the order schema
const orderSchema = new mongoose.Schema({
    name: String,
    address: String,
    food: String,
    quantity: Number,
});
const Order = mongoose.model('Order', orderSchema);

// Middleware and settings
app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true })); // Parse the request body

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
});

// Update the /order route to render the order.pug template
app.get('/order', (req, res) => {
    const menuItems = [
        {
            name: 'Peppy Paneer Pizza',
            description: 'A Peppy Paneer Pizza is a tangy and flavored delight, featuring succulent paneer, vibrant bell peppers, red paprika, and a zesty tomato sauce.',
            price: 200,
        },
        {
            name: 'Indo Panner Makhni Pizza',
            description: 'Our Indo Panner Makhni Pizza is delicious fusion of rich and creamy flavours of creamy sauce, topped up with makhni. ',
            price: 250,
        },
        {
            name: ' Margherita',
            description: 'A classic pizza topped with tomato, mozzarella, and fresh basil.',
            price: 150,
        },
        {
            name: 'Italian Farm Pizza',
            description: 'A classic pizza topped with flavours of italy, combination of ripened tomato, earth mushrooms,fresh black olives, capsicum .',
            price: 300,
        },

        {
            name: 'Veggie Supreme Pizza',
            description: 'It is a garden inspired supreme pizza filled with bountfull selected vegetable like bell peppers, baby corn, jalapenos, corn, black olives, rich tomato sauce.',
            price: 350,
        },

        {
            name: 'Veg Tex Mex Pizza ',
            description: ' It is tengy spicy pizza with vibrant ingredients like crispy crust, smothered in zesty tomato sauce, melty chese bread',
            price: 400,
        },
        // Add more pizza items here
        {
            name: 'Classic Burger',
            description: 'A delicious classic burger with lettuce, tomato, and cheese.',
            price: 35,
        },
        {
            name: 'Aloo Tikky Burger',
            description: 'A classic Burger filled with vagetables and fried allo tikky.',
            price: 35,
        },
        {
            name: 'Cheese Burst Burger',
            description: 'A juicy potato and peas patty ,juicy tomatoes and a slice of cheese.',
            price: 80,
        },
        {
            name: ' Veggie King Burger',
            description: 'A fried veggie patty made with potato, carror, corn, bean and pea.',
            price: 120,
        },
        {
            name: ' Big SNO Burger',
            description: "A SNO Burger is made up of two patties: A Potato and a Veggie patty. It's features nachos ,jalapenos, lettuce and mayonnaise on top.",
            price: 200,
        },
        // Add more burger items here
        {
            name: 'sushi Platter',
            description: 'A mouthwatering sushi platter with a variety of sushi rolls.',
            price: 150,
        },
        // Add more sushi items here

        {
            name: 'Paneer Steam Paratha',
            description: ' A paratha made in steam and a paneer inside the paratha .',
            price: 100,
        },

        {
            name: 'Butter Paratha',
            description: 'A paratha made on tawa and butter sparkled on it.',
            price: 120,
        },

        {
            name: ' Mirchi Paratha',
            description: 'A pratha with red mirchi inside it made in owen .',
            price: 150,
        },

        {
            name: 'Lacha Paratha',
            description: 'A mouthwatering Lacha Paratha with a variety of flour rolls.',
            price: 200,
        },

        // Add more paratha items here

        {
            name: 'Tandori Chicken',
            description: 'Juicy seasoned chicken with freshly ground spices and grilled to perefection.',
            price: 300,
        },

        {
            name: ' Boneless Crispy Chicken',
            description: 'Juicy seasoned chicken without bones inside it.',
            price: 360,
        },

        {
            name: 'Chicken Tikka',
            description: 'Super soft chunks of chicken coated are with spicy and peppery masala grilled to perfection.',
            price: 400,
        },

        {
            name: ' Kali Mirch Chicken Tikka',
            description: 'Spicy flavoured chicken mince shaped onto skewers and grilled to perferction.',
            price: 450,
        },
        // Add more chicken items here
    ];

    const params = {
        menuItems: menuItems,
    };

    res.status(200).render('order.pug', params);
});


app.post('/contact', (req, res) => {
    const mydata = new Contact(req.body);
    mydata.save().then(() => {
        res.send('This item has been saved to the database');
    }).catch(() => {
        res.status(400).send('Item was not saved to the database');
    });
});
app.post('/order', (req, res) => {
    const orderData = new Order(req.body);
    orderData.save().then(() => {
        res.send('Your order has been saved to the database');
    }).catch((error) => {
        console.error('Error saving order:', error);
        res.status(400).send('Order was not saved to the database');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});

