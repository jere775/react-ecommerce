import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
// import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';

//class component
class App extends React.Component {
  //initializing objects state
  constructor() {
    //default for state component
    super();
    this.state = {
      products: data.products,
      //this check if exists else use empty array/it keeps the items after you refresh the page.
      cartItems: localStorage.getItem("cartItems") 
      ? JSON.parse(localStorage.getItem("cartItems")) 
      : [],
      sub: "",
      sort: "",
    };
  }
  //propts after submission
  createOrder = (order) =>{
    alert("Need to save order for " + order.name);
  }
  //remove cart functions
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      //arrow function that get rid of selected item 
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
    //even if you refresh the items stay in cart unless removed
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((x) => x._id !== product._id))
    );
  };
  //this is a function to add to the cart
  addToCart = (product) => {
    //clone copy of cart items inside the state
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    //if the item exist the number goes up
    //excute function once for each element
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      //creating a new instance of the item and pushing it to cart
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    //this convert JS object to a string
    localStorage.setItem("cartItem",JSON.stringify(cartItems));
  };

  //Functions for Filter
  //Logic for sort 
  //event parameter comes to the funtion
  sortProducts = (event) => {
    // impl
    //makes a variable for sorts
    const sort = event.target.value;
    //reads what selected
    console.log(event.target.value);
    //state that return an object as new state
    this.setState((state) => ({
      sort: sort,
      //comparing two parameters and returning a new object 
      products: this.state.products
      //moving product in array based on index
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    }));
  };
  //Function for Sub allows you to access setState method
  filterProducts = (event) => {
    // impl
    console.log(event.target.value);
    //all products show if empty
    if (event.target.value === "") {
      this.setState({ sub: event.target.value, products: data.products });
    } else {
      this.setState({
        sub: event.target.value,
        //function makes sure that the right sub exists in this array
        products: data.products.filter(
          (product) => product.availableSub.indexOf(event.target.value) >= 0
        ),
      });
    }
  };
  render() {
    return (
      <div className="grid-container">
        <header>
          <div className="nav-container">  
          <a href="/">i 愛 anime</a>
            {/* <Navbar></Navbar> */}
            {/* <Button></Button>  */}
          </div>
        </header>
        <main>
{/* using bootstap for carousel */}
        <Carousel><Carousel.Item>
    <img 
    // style={{opacity: '0.8'}}
      className="slide"
      src="/images/anime1.jpg"
      alt="Anime"
    />
    <Carousel.Caption >
      <h3 style={{ fontSize: '30px'}}>Anime</h3>
      {/* <p style={{fontSize: '15px'}}>Anime is hand-drawn and computer animation originating from Japan.</p> */}
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img 
      className="slide"
      src="/images/Netfilx.jpg"
      alt="Netfilx"
    />
    <Carousel.Caption>
      <h3 style={{ fontSize: '30px'}}>Netfilx</h3>
      <p style={{fontSize: '15px'}}>Netflix is a subscription-based streaming service that allows our members to watch TV shows and movies without commercials on an internet-connected device.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img 
      className="slide"
      src="/images/fun.jpg"
      alt="Funimation"
    />
    <Carousel.Caption>
      <h3 style={{ fontSize: '30px'}}>Funimation</h3>
      <p style={{fontSize: '15px'}}>Funimation creates extraordinary anime experiences for tens of millions of people around the world every day. For over 25 years, we have been the market leader.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="slide"
      src="/images/hulu.jpg"
      alt="Hulu"
    />
    <Carousel.Caption>
      <h3 style={{ fontSize: '30px'}}>Hulu</h3>
      <p style={{fontSize: '15px'}}> Hulu is the leading premium streaming service offering live and on-demand TV and movies, with and without commercials,in and outside the home.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="slide"
      src="/images/crunchy.jpeg"
      alt="Crunchyroll"
    />
    <Carousel.Caption>
      <h3 style={{ fontSize: '30px'}}>Crunchyroll</h3>
      <p style={{fontSize: '15px'}}>Crunchyroll, Inc. is an American distributor, publisher, and licensing company focused on streaming anime, manga, and dorama and was, founded in 2006.</p>
    </Carousel.Caption>
  </Carousel.Item></Carousel>

          <div className="content">
            
            <div className="main" 
            // style ="background:powerblue;"
            >
            {/* <Slider></Slider> */}
              <Filter
                count={this.state.products.length}
                sub={this.state.sub}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              ></Products>
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>
        <Footer></Footer>
        {/* <footer>Copyright &copy; 2020 | i 愛 anime</footer> */}
        </footer>
      </div>
    );
  }
}

export default App;
