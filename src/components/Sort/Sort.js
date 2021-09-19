import React, { useState, useEffect } from "react";
import "./style.css";
import { BsSearch } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { TiArrowUnsorted } from "react-icons/ti";
import axios from "axios";
import { services } from "../Utils/Utils";
import FilteredItem from "../FilteredItem/FilteredItem";
import Pagination from "../Pagination/Pagination";

function Sort() {
  const [text, setText] = useState([]);
  const [list, setList] = useState([]);
  const [activeControl, setActiveControl] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cardsPerPage] = useState(6);
  const [lastSearches] = useState([]);

  // mounting api data when starting
  useEffect(() => {
    axios(services.apiUrl).then((res) => setList(res.data.slice(0,100)));
    setLoading(false)
  }, []);

  const onChangeHandler = (e) => {
    setText(e.target.value);
  };

  // button clicking results in showing results
  const showResults = () => {
    setFilteredList(
      list.filter((item) =>
        item.title
          .toString()
          .toLowerCase()
          .includes(text.toString().toLowerCase())
      )
    );

    setActiveControl(true);
    setCurrentPage(1);
    lastSearches.push(text);
  };

  // get current cards
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredList.slice(indexOfFirstCard, indexOfLastCard);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // resfresh site
  const refresh = () => {
    window.location.reload();
  };

  console.log(lastSearches);

  return (
    <div className="container sort-wrapper">
      <div className="row sort-main">
        <div onClick={refresh} className="logo col-2">
          <span>
            <TiArrowUnsorted className="logo-icon" />
            SORT!
          </span>
        </div>
        <div className="sort-input-area col-8">
          <div className="form-group input-group ">
            <input
              list="datalistOptions"
              className="input form-control"
              onChange={onChangeHandler}
              type="search"
              name="text"
              value={text}
              placeholder="Search something!"
            />
            {/* last text values */}
            <datalist id="datalistOptions">
              {lastSearches.map((item, index) => {
                return <option key={index} value={item} />;
              })}
            </datalist>
            <BsSearch className="icon" />
          </div>

          <button onClick={showResults} className="button">
            SEARCH
          </button>
        </div>
      </div>

      {/* filtered part */}

      <div className="row ">
        <div className="col-9 mx-auto">
          {(!text.length || text.length) && !activeControl ? (
            list.map((item) => (
              <FilteredItem
              loading={loading}
                text={text}
                filteredList={filteredList}
                key={item.id}
                item={item}
              />
            ))
          ) : filteredList.length ? (
            currentCards.map((item) => (
              <FilteredItem
              loading={loading}
                text={text}
                filteredList={filteredList}
                key={item.id}
                item={item}
              />
            ))
          ) : activeControl ? (
            <div className="error">
              <div className="error-icon-wrap">
                <BiErrorCircle className="error-icon " />
              </div>{" "}
              <div className="error-explain">
                No results were found for your search{" "}
                <span>"{lastSearches[lastSearches.length - 1]}"</span>.
              </div>
            </div>
          ) : null}
        </div>

        {filteredList.length > 6 ? (
          <div className="d-flex justify-content-center mt-4">
            <Pagination
              className="col-8"
              paginate={paginate}
              cardsPerPage={cardsPerPage}
              totalCards={filteredList.length}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Sort;
