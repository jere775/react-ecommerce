import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from 'react-modal';
import Zoom from "react-reveal/Zoom";

// Class component
export default class Products extends Component {
  //hide/show modal we define a constructor
  constructor(props){
    super(props);
    //initial vlaue for modal if product exist
    //show if it doesn't 
    this.state = {
      product: null,
    }
  }
  //function runs this code and fills the state prodent with onClick
  openModal =(product) => {
    this.setState({product});
  };
  //sets product to null to close modal
  closeModal =() => {
    this.setState({ product:null });
  };
  render() {
    //modal
    const {product} = this.state;
    return (
      <div>
        {/* Fade Animation */}
        <Fade bottom cascade>
        <ul className="products">
          {/* Get list of products as prop from parent component */}
          {this.props.products.map((product) => (
            // key = new identity per to notice change
            <li key={product._id}>
              {/* each product has a unique key list that keeps track if being altered in maps */}
              <div className="product">
                {/* Give ID# to href */}
                <a href={"#" + product._id} onClick={()=> this.openModal(product)}>
                  {/* Product image */}
                  <img src={product.image} alt={product.title}></img>
                  {/* Product title */}
                  <p>{product.title}</p>
                </a>
                <div className="product-price">
                  {/* adds dollar sign to price */}
                  <div>{formatCurrency(product.price)}</div>
                  {/* arrow function event listener */}
                  {/* passes product to cart*/}
                  {/* product button in app.js */}
                  <button
                    onClick={() => this.props.addToCart(product)}
                    className="button primary"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        </Fade>
        {/* Conditional rendering for modal */}
        { product && (
          <Modal isOpen={true}
            onRequestClose={this.closeModal}>
              {/* Zoom Animation */}
<Zoom>
  <button className = "close-modal" onClick= {this.closeModal}>x</button>
  <div className = "product-details">
    <img src = {product.image} alt={product.title}></img>
    <div className ="product-details-description">
      <p>
        <strong>{product.title}</strong>
        </p>
        <p><strong>Description: </strong>{product.description}</p>
        <p><strong>Genre: </strong>{product.genre}</p>
        <p><strong>Total Episodes: </strong>{product.totalepisode}</p>
        <p><strong>Subscribers:</strong>{" "}
          {product.availableSub.map(x=>(
            <span>{" "}<button className ="button">{x}</button></span>
          ))}
      </p>
<div className ="product-price">
  <div>
    {formatCurrency(product.price)}
  </div>
  <button className= "button_primary" onClick={()=>{
    this.props.addToCart(product);
    this.closeModal();
  }}>
    Add To Cart
  </button>
</div>
    </div>
  </div>
</Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
