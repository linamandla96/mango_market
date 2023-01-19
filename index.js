const express = require('express');
const exphbs = require('express-handlebars');
const pgp = require('pg-promise')();
var bodyParser = require('body-parser')
const shopFruitDeal = require('./mango-shopper');
const session = require('express-session')




const app = express();

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
	useSSL = true;
}

// TODO configure this to work.
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://@localhost:5432/mango_market';
const config = {
 connectionString : DATABASE_URL
}

const db = pgp(DATABASE_URL);

let mangofruitDeal = shopFruitDeal(db);


app.use(session({
    secret: "string save",
    resave: false,
    saveUninitialized: true
}))

const handlebarSetup = exphbs.engine({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.use(express.static('public'));

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// const pg = require("pg");
// const Pool = pg.Pool;




let counter = 0;
let total = 0;

app.get('/', async function (req, res) {
	const allShops = await mangofruitDeal.createShop()

	res.render('index', {
		counter,
		total,
		shopDeal,
		allShops

	});
});

app.post('/add-price', function (req, res) {


	let fruitprice = req.body.price;
	counter = fruitprice;
	res.redirect('/')

})

app.post('/buy', function (req, res) {
	let fruitqty = req.body.qty;
	total += (fruitqty * counter);
	res.redirect('/')

})

app.post('/buy', function (req, res) {
	let shopDeal = req.body.shop;
	total += (fruitqty * counter);
	res.redirect('/')

})
app.get('/shops', async function (req, res) {

	await mangofruitDeal.listShops();

	res.render('/allshops');
});

app.get('/shopsmango', async function (req, res) {
	
	const mego_dealId = req.params.id
	const shop_id = req.body.shop_id;
	const qty = re.body.qty;

	const shopmangos = await createDeal(shopId, qty, price)
	qty = req, body.
		res.render('/mangoshop', {

			mangos,
			shopmangos,
			mego_dealId,
			shop_id,
			qty,

		});
});




app.get('/newshop',async function (req, res) {
	
	await mangofruitDeal.createShop()

	res.render('/addnew-shop');
});



app.get('/topmangos',  async function (req, res) {
	
	 const topmMangoFruit = await mangofruitDeal.topFiveDeals()
	res.render('/topmango',{

		topmMangoFruit
	});
});


app.get('/users', async function (req, res) {
	
	await mangofruitDeal.recommendDeals(amount)
	res.render('/user');
});




app.post('/mangoshops', async function (req, res) {


	const mangos = await mangofruitDeal.topFiveDeals()

	res.redirect('/mangoshop')

})

// start  the server and start listening for HTTP request on the PORT number specified...

let PORT = process.env.PORT || 3035;

app.listen(PORT, function () {
    console.log('MangoApp started on port:', PORT);
});



