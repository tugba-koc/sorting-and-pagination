import React from "react";
import "./style.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function FilteredItem({ item, filteredList, text,   loading }) {
  if(loading){
    return <div><AiOutlineLoading3Quarters className="loading-icon"/></div>
  }
  return (
    <div className="cart col-12 col-lg-4 ">
      <div className="cart-one">
        <div>
          <img className="cart-image" src={item.thumbnailUrl} alt="" />
        </div>
        <div className="cart-text">
          <p>{item.title}</p>
        </div>
        <div className="cart-id">
          <p>{item.id} TL indirimli!</p>
        </div>
      </div>
    </div>
  );
}

export default FilteredItem;
