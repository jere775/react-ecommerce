import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";

//class component 
export default class Cart extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName:"",
      lastName:"",
      email:"",
      address:"",
      comment:"",
      //by default checkout shouldn't show
      showCheckout: false,
    };
  }
  //handle function updates the state of the component
  handleInput = (e) =>{
    this.setState({[e.target.name]: e.target.value});
  };
  createOrder = (e) => {
    e.preventDefault();
    const order = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      address: this.state.address,
      comment: this.state.comment,
      cartItems: this.props.cartItems,
    };
    this.props.createOrder(order);
  };
  render() {
    //getting cartItems form parent component
    const { cartItems } = this.props;
    return (
      <div>
        {/* first condition: cart is empty */}
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          // second condition:cart length is the number you have in the cart
          <div className="cart cart-header">
            You have {cartItems.length} in the cart{" "}
          </div>
        )}
        <div>
          {/* Card for cart product */}
          <div className="cart">
            {/* Fade Animation */}
            <Fade left cascade >
            <ul className="cart-items">
              {/* Each item converts */}
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>
                    <div>{item.title}</div>
                    {/*  */}
                    <div className="right">
                      {formatCurrency(item.price)} x {item.count}{" "}
                      {/* button to remove item from cart */}
                      <button
                        className="button"
                        onClick={() => this.props.removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            </Fade>
          </div>
          {cartItems.length !== 0 && (
            <div>
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button  
                onClick={()=> {
                  this.setState({showCheckout:true});
                }}
                className="button primary">
                  Proceed</button>
              </div>
            </div>
            {this.state.showCheckout && (
              <Fade up cascade>
              <div className="cart">
              <form onSubmit ={this.createOrder}>
                <ul className="form-container">
                  <li>
                    <label>First Name</label>
                    <input 
                    name="firstName"
                    type="text"
                     required 
                     onChange={this.handleInput}>
                     </input>
                  </li>
                  <li>
                    <label>Last Name</label>
                    <input 
                    name="lastName"
                    type="text"
                     required 
                     onChange={this.handleInput}>
                     </input>
                  </li>
                  <li>
                    <label>Email</label>
                    <input 
                    name="email"
                    type="email"
                     required 
                     onChange={this.handleInput}>
                     </input>
                  </li>
                  <li>
                    <label>Address</label>
                    <input 
                    name="address"
                    type="text"
                     required 
                     onChange={this.handleInput}>
                     </input>
                  </li>
                  <li>
                    <label>Comment</label>
                    <input 
                    name="comment"
                    type="comment"
                     required 
                     onChange={this.handleInput}>
                     </input>
                  </li>
                  <li>
                    <button className="button primary" type="submit">Checkout</button>
                  </li>
                </ul>
              </form>
              </div>
              </Fade>
            )}
             </div>
          )}
        </div>
      </div>
    );
  }
}
