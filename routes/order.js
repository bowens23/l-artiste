const express = require('express');
const router = express.Router();

const db = require("../models");


// GET order from the database
router.get('/', function(req, res) {
  
  if(req.user){
      db.Orders.findAll({
          where: {
              UserId: req.user.id
          }
      }).then(function(cart) {
        let total = 0;
          cart.forEach((item) =>{
            total += parseFloat(item.price);
          })

          res.render('cart', 
          {
            cart: cart,
            total: total
          });
      });
  }
  else{
    res.render('cart')
  }
	
});

// ADD item to the database
router.post('/addtocart', function(req, res) {
  
  // if user is logged in, send the items to their cart
  if(req.user){
    db.Orders.findOrCreate({
		where: {
			item: req.body.title,
			price: req.body.price,
			quantity: 1,
            UserId: req.user.id,
            ArtistId: req.body.ArtistId || 1
		}
	}).spread((order, created) => {
        
        // IF successfully added item to cart
        if(created){
          res.redirect(`/cart`);
        }
        // ELSE render error 
        else{
          res.render('error',{
            errors: 'An error occurred when trying to create your account! Try again'
          });
        }
        
      });
  }
	
});


// ADD item to the database
router.post('/checkout', function(req, res) {
  
  // if user is logged in, send the items to their cart
  if(req.user){
    db.Transactions.findOrCreate({
		where: {
			description: 'Completed Transaction',
			total: '1000',
			address: '123',
            city: 'Cleveland',
            state: 'Ohio',
            zipCode:'44243',
            UserId: req.user.id,
            ArtistId: 1,
            ArtworkId: 1,
            OrderId:1
		}
	}).spread((transaction, created) => {
        
        // IF successfully created new artist
        // redirect to artists page
        if(created){
          // success message
          // process orders, then remove from table
          db.Orders.destroy({
            where:{
              UserId: req.user.id
            }
          }).then(function(){
            res.render(`cart`,{
              success_msg: 'Transaction Processed!'
            });
          })
        }
        // ELSE render error 
        else{
          res.render('cart',{
            errors: 'An error occurred when trying to create your account! Try again'
          });
        }
        
      });
  }
	
});


module.exports = router;


// CHECKOUT from the cart
/*router.post('/checkout', function(req, res) {
	data.cartCheckout(req.body.name);
	res.redirect('/cart');
});

// To count number of product in the cart
router.get('/countproducts', function(req, res) {
	data.noofproducts().then((count) => {
		re.send('' + count);
	});
});



module.exports = router;

// Functions
function getProducts () { return Product.findAll(); } // end of the function getProducts

function addToProducts(product) // definition of the function addToProducts
{
    // Product.findById(product.id).then(cartItem => {
    //     return;
    // })
    return Product.create(
        {
            name: product.name,
            price: product.price,
            quantity: 1,
        });
} // end of the function definition

function addToCart (product) // definition of the function addToCart
{
    CartProduct.findById(product.id).then(cartItem => {
        cartItem.increment('quantity', {by: product.quantity});
        cartItem.increment('amount', {by: product.amount});
        return cartItem;
    })
    return CartProduct.create(
        {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            amount: product.amount
        });
} // end of the function addToCart

function getCart() // definition of the function getCart
{
    if (CartProduct.findAll())
        return CartProduct.findAll();
    else
        return 0;
} // end of the function getCart

function decrementCart(cartItemID) // definition of the function decrementCart
{
    CartProduct.findById(cartItemID).then(user => {
        user.decrement('quantity', {by: 1});
    user.decrement('amount', {by: user.price});
})
} // end of the function decrementCart

function incrementCart(cartItemID) // definition of the function incrementCart
{
    CartProduct.findById(cartItemID).then(user => {
        user.increment('quantity', {by: 1});
    user.increment('amount', {by: user.price});
})
} // end of the function incrementCart

function noofproducts() // definition of the function noofproducts
{
    if(CartProduct.sum('quantity'))
        return CartProduct.sum('quantity');
    else
        return 0;
} // end of the function noofproducts

function totalamount() // definition of the function totalamount
{
    if(CartProduct.sum('amount'))
        return CartProduct.sum('amount');
    else
        return 0;
} // end of the function totalamount

function cartCheckout(data) { CartProduct.destroy({ where: {}}); } // end of the function cartCheckout

function delFromCart(cartItemID) // definition of the function delFromCart
{
    return CartProduct.destroy(
        {
            where:
                {
                    id: cartItemID
                }
        });
} // end of the function delFromCart

module.exports = {
    getProducts,
    addToCart,
    addToProducts,
    getCart,
    cartCheckout,
    noofproducts,
    totalamount,
    delFromCart,
    incrementCart,
    decrementCart
};*/