import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    return (
      <div className="filter">
        {/* show amount of products on page */}
        <div className="filter-result">{this.props.count} Products</div>
        <div className="filter-sort">
          {/* creates a space between the order and input box */}
          Price:{" "}
          {/* just passes sort/sub from the parent component APP.js */}
          {/* select box with options and handler*/}
          <select value={this.props.sort} onChange={this.props.sortProducts}>
            {/* Filter by price */}
            <option>Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>
        {/* second filter by Sub */}
        <div className="filter-sub">
          Subscribers:{" "}
          {/* list of all Sub's */}
          <select value={this.props.sub} onChange={this.props.filterProducts}>
            <option value="">ALL</option>
            <option value="Netflix">Netflix</option>
            <option value="Funimation">Funimation</option>
            <option value="Hulu">Hulu</option>
            <option value="Crunchyroll">Crunchyroll</option>
          </select>
          
        </div>
      </div>
      
    );
  }
}
