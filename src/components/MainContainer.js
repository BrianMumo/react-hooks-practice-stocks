import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetically");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((res) => res.json())
      .then((data) => setStocks(data));
  }, []);

  const addStockToPortfolio = (stock) => {
    if (!portfolio.includes(stock)) setPortfolio([...portfolio, stock]);
  };

  const removeStockFromPortfolio = (stock) => {
    setPortfolio(portfolio.filter((s) => s.id !== stock.id));
  };

  const sortedStocks = [...stocks]
    .filter((stock) => filter === "All" || stock.type === filter)
    .sort((a, b) =>
      sortBy === "Alphabetically"
        ? a.name.localeCompare(b.name)
        : a.price - b.price
    );

  return (
    <div>
      <SearchBar setSortBy={setSortBy} setFilter={setFilter} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={sortedStocks} onStockClick={addStockToPortfolio} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onStockClick={removeStockFromPortfolio} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
