import React from "react";
import "./dailysummary.css";
import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import Input from "../../Components/Input/Input";
import Modal from "antd/es/modal/Modal";
import { useState, useEffect } from "react";

import symbols from "../../Assets/Images/Coin Images.json";
import axios from "axios";
import SummaryReport from "./SummaryReport";
import ReactDOM from "react-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TrendingCoinChart from "./TrendingCoinChart";

function Dailysummary() {
  // create the tabs
  const Tabs = [
    { label: "Daily", path: "/summary/daily" },
    { label: "Monthly", path: "/summary/monthly" },
  ];
  // imported
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCoinSelected, setIsCoinSelected] = useState(false);

  // create state variable for each toggle
  const [showTopGainers, setShowTopGainers] = useState(false);
  const [showTopLosses, setShowTopLosses] = useState(false);
  const [showTrendingCoin, setShowTrendingCoin] = useState(false);

  const [isDefaultToggle, setIsDefaultToggle] = useState(false);

  //const [tradingHistory, setTradingHistory] = useState([]);
  const [tradingSuggestions, setTradingSuggestions] = useState([]);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [isDefaultEnabled, setIsDefaultEnabled] = useState(false);
  const [previewContent, setPreviewContent] = useState(null);

  // coin table
  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `https://api.binance.com/api/v3/ticker/24hr?symbols=${symbols.coinsList}`
      )
      .then((res) => {
        if (Array.isArray(res.data)) {
          const data = res.data
            .map((coin) => {
              coin.symbol = coin.symbol.slice(0, -4);
              return coin;
            })
            .sort((a, b) => b.quoteVolume - a.quoteVolume);
          setCoins(data);
        } else {
          console.error("API response is not an array:", res.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const handleRowClick = (selectedCoin) => {
    const coinDetails = {
      name: symbols[selectedCoin.symbol]?.name,
      price: formatCurrency(selectedCoin.lastPrice),
      symbol: selectedCoin.symbol,
      priceChange: selectedCoin.priceChange,
      marketcap: formatCurrency(selectedCoin.quoteVolume),
    };

    // for pdf use
    //   setCustomizedCoins([...customizedCoins, coinDetails]);
    // setIsDeleteModalOpen(false);
  };

  const handleCoinSelect = (coin) => {
    const isCoinSelected = selectedCoins.some((c) => c.symbol === coin.symbol);

    if (isCoinSelected) {
      setSelectedCoins(selectedCoins.filter((c) => c.symbol !== coin.symbol));
    } else if (selectedCoins.length < 5) {
      setSelectedCoins([...selectedCoins, coin]);
    } else {
      alert("You can select up to 5 coins.");
    }
  };

  const handleOkClick = () => {
    if (selectedCoins.length > 0) {
      setIsDeleteModalOpen(false);
    } else {
      alert("Please select at least one coin.");
    }
  };

  const formatCurrency = (amount) => {
    const amountString = parseFloat(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 20,
    });
    return "$ " + amountString;
  };

  const filteredCoins = coins.filter((coin) =>
    symbols[coin.symbol]?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const fetchTradingSuggestions = async () => {
    // Replace with your actual API call
    return [{ coin: "ETH", action: "Sell", price: 2000, date: "2024-01-02" }];
  };

  // set as default
  useEffect(() => {
    if (isDefaultToggle) {
      localStorage.setItem("showTopGainers", showTopGainers);
      localStorage.setItem("showTopLosses", showTopLosses);
      localStorage.setItem("showTrendingCoin", showTrendingCoin);
    }
  }, [isDefaultToggle, showTopGainers, showTopLosses, showTrendingCoin]);

  // Generate preview
  const generatePreview = () => {
    setPreviewContent(
      <SummaryReport
        coins={coins}
        showTopGainers={showTopGainers}
        showTopLosses={showTopLosses}
        showTrendingCoin={showTrendingCoin}
        selectedCoins={selectedCoins}
        tradingSuggestions={tradingSuggestions}
      />
    );
  };

  useEffect(() => {
    const savedToggles = JSON.parse(localStorage.getItem("savedToggles"));
    if (savedToggles) {
      setShowTopGainers(savedToggles.showTopGainers);
      setShowTopLosses(savedToggles.showTopLosses);
      setShowTrendingCoin(savedToggles.showTrendingCoin);
      setIsDefaultEnabled(true);
    }
  }, []);

  //generate pdf

  const generatePDF = async () => {
    const reportElement = document.createElement("div");
    reportElement.style.position = "absolute";
    reportElement.style.left = "-9999px";
    document.body.appendChild(reportElement);

    // Render the SummaryReport component inside the hidden div
    ReactDOM.render(
      <SummaryReport
        coins={coins}
        showTopGainers={showTopGainers}
        showTopLosses={showTopLosses}
        showTrendingCoin={showTrendingCoin}
        selectedCoins={selectedCoins}
        tradingSuggestions={tradingSuggestions}
      />,
      reportElement,
      async () => {
        // Wait for a moment to ensure all charts are rendered
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const canvas = await html2canvas(reportElement, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // Legal size

        const pdfBlob = pdf.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl);

        document.body.removeChild(reportElement);
      }
    );

    //2 preview
    setPreviewContent(
      <SummaryReport
        coins={coins}
        showTopGainers={showTopGainers}
        showTopLosses={showTopLosses}
        showTrendingCoin={showTrendingCoin}
        selectedCoins={selectedCoins}
        tradingSuggestions={tradingSuggestions}
      />
    );
  };

  // Handle default toggle change
  const handleDefaultToggleChange = () => {
    if (!isDefaultEnabled) {
      const currentToggles = {
        showTopGainers,
        showTopLosses,
        showTrendingCoin,
      };
      localStorage.setItem("savedToggles", JSON.stringify(currentToggles));
    } else {
      localStorage.removeItem("savedToggles");
      setShowTopGainers(false);
      setShowTopLosses(false);
      setShowTrendingCoin(false);
    }
    setIsDefaultEnabled(!isDefaultEnabled);
  };

  return (
    // daily summary front end
    <BasicPage tabs={Tabs}>
      <div className="daily-summary">
        <div className="heading">Generate Daily Summary</div>
        <div className="page-content">
          <div className="left-side">
            <div className="add-items">
              <div className="add-coins">
                <div>
                  <div
                    className="tog-name"
                    style={{
                      display: "inline-block",
                      marginLeft: "1rem",
                      marginTop: "2rem",
                    }}
                  >
                    <span style={{ marginLeft: "4rem" }}>Customize Coins</span>
                  </div>
                  <div
                    className="coin-button"
                    style={{ display: "inline-block", marginLeft: "5rem" }}
                  >
                    <Input
                      type="button"
                      value="Add Coin"
                      outlined
                      green
                      style={{ width: "150px", marginLeft: "15%" }}
                      onClick={() => setIsDeleteModalOpen(true)}
                    />
                  </div>
                  <Modal
                    open={isDeleteModalOpen}
                    close={() => setIsDeleteModalOpen(false)}
                    onOk={handleOkClick}
                    okText="OK"
                    onCancel={() => setIsDeleteModalOpen(false)}
                  >
                    <div style={{ width: "450px" }}>
                      <h2>Select Coin</h2>
                      <div>
                        <Input
                          type="search"
                          placeholder="Search"
                          style={{
                            width: "400px",
                            float: "right",
                            marginRight: "50px",
                          }}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>

                      <table className="watchlist-table-modal">
                        <thead
                          style={{
                            color: "#dbdbdb",
                            fontSize: "18px",
                            marginBottom: "20px",
                          }}
                        >
                          <tr>
                            <td>Coin</td>
                            <td>Price</td>
                            <td>Select</td>
                          </tr>
                        </thead>
                        <tbody style={{ marginLeft: "1rem" }}>
                          {filteredCoins.map((coin) => (
                            <tr
                              key={coin.id}
                              onClick={() => handleRowClick(coin)}
                            >
                              <td
                                style={{
                                  marginLeft: "100px",
                                  marginBottom: "50px",
                                }}
                              >
                                <img
                                  className="coin-image-add"
                                  src={symbols[coin.symbol].img}
                                  alt={coin.symbol}
                                />
                                <span className="coin-symbol-add">
                                  {coin.symbol.toUpperCase()}
                                </span>
                              </td>

                              <td className="coin-price-add">
                                {formatCurrency(coin.lastPrice)}
                              </td>
                              <td>
                                <input
                                  type="checkbox"
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    textAlign: "right",
                                  }}
                                  onChange={() => handleCoinSelect(coin)}
                                  checked={selectedCoins.some(
                                    (c) => c.symbol === coin.symbol
                                  )}
                                ></input>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Modal>
                </div>
                <div className="chart-table">
                  <div className="data">
                    <div className="tog-name">
                      <span>Top Gainers</span>
                    </div>
                    <div className="tog1">
                      <Input
                        type="toggle"
                        id="topGainers"
                        checked={showTopGainers}
                        onChange={() => setShowTopGainers(!showTopGainers)}
                      />
                    </div>
                  </div>

                  <div className="data">
                    <div className="tog-name">
                      <span>Top Losers</span>
                    </div>
                    <div className="tog2">
                      <Input
                        type="toggle"
                        id="topLosses"
                        checked={showTopLosses}
                        onChange={() => setShowTopLosses(!showTopLosses)}
                      />
                    </div>
                  </div>

                  <div className="data">
                    <div className="tog-name">
                      <span>Trending Coin</span>
                    </div>
                    <div className="tog3">
                      <Input
                        type="toggle"
                        id=""
                        checked={showTrendingCoin}
                        onChange={() => setShowTrendingCoin(!showTrendingCoin)}
                      />
                    </div>
                  </div>

                  <div className="data">
                    <div className="tog-name">
                      <span>Trading History</span>
                    </div>
                    <div className="tog4">
                      <Input type="toggle" id="" />
                    </div>
                  </div>

                  <div className="default">
                    <div className="defaultname" style={{ marginLeft: "3rem" }}>
                      <span>Set this features as default</span>
                    </div>
                    <div className="tog5" style={{ marginRight: "21.5rem" }}>
                      <Input
                        type="toggle"
                        id="setDefault"
                        checked={isDefaultEnabled}
                        onChange={handleDefaultToggleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="box-container"></div>
            </div>
          </div>

          {/* right side */}
          <div className="right-side">
            <div className="template">
              <div className="preview-scroll">{previewContent}</div>
            </div>
            <div className="buttons">
              <Input
                type="button"
                value="Generate"
                className="generate-button"
                style={{ width: "87px" }}
                onClick={generatePreview}
              />
              <Input
                type="button"
                value="Download"
                className="download-button"
                onClick={generatePDF}
                style={{ width: "87px", marginLeft: "28%" }}
              />
            </div>
          </div>
        </div>
      </div>{" "}
      <Modal
        open={isPreviewModalOpen}
        onCancel={() => setIsPreviewModalOpen(false)}
        width="80%"
        footer={null}
      >
        <SummaryReport
          coins={coins}
          showTopGainers={true}
          showTopLosses={true}
          showTrendingCoin={true}
          /// customizedCoins={[]}
          tradingHistory={[]}
          tradingSuggestions={[]}
          selectedCoins={selectedCoins}
        />
      </Modal>
    </BasicPage>
  );
}

export default Dailysummary;
