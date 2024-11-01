import React from "react";
import "./dailysummary.css";
import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import Input from "../../Components/Input/Input";
import Modal from "antd/es/modal/Modal";
import {useState, useEffect} from "react";

import symbols from "../../Assets/Images/Coin Images.json";
import axios from "axios";
import SummaryReport from "./SummaryReport";
import ReactDOM from "react-dom";
import jsPDF from "jspdf";
import Table, {TableRow, Coin} from "../../Components/Table/Table";
import {getUser} from "../../Storage/SecureLs";
import html2canvas from "html2canvas";

function Dailysummary() {
    // create the tabs
    const user = getUser();
    const Tabs = [
        {label: "Daily", path: "/summary/daily"},
        {label: "Monthly", path: "/summary/monthly"},
    ];
    // imported
    const label = {inputProps: {"aria-label": "Switch demo"}};

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isCoinSelected, setIsCoinSelected] = useState(false);
    const [tradingHistory, setTradingHistory] = useState([]);
    // create state variable for each toggle
    const [showTopGainers, setShowTopGainers] = useState(false);
    const [showTopLosses, setShowTopLosses] = useState(false);
    const [showTrendingCoin, setShowTrendingCoin] = useState(false);
    const [showTradingHistory, setShowTradingHistory] = useState(false);
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
        return [{coin: "ETH", action: "Sell", price: 2000, date: "2024-01-02"}];
    };

    const fetchTradingHistory = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8005/order/getAllOrdersByIdAndCato/Buy/${user.id}`
            );
            const data = response.data ? response.data : [];
            setTradingHistory(data);
            console.log("Trading history:", data);
        } catch (error) {
            console.error("Error fetching trading history:", error);
            setTradingHistory([]);
        }
    };

    useEffect(() => {
        if (showTradingHistory) {
            console.log("Fetching trading history...");
            fetchTradingHistory();
        }
    }, [showTradingHistory]);

    useEffect(() => {
        console.log("Updated tradingHistory in Dailysummary:", tradingHistory);
    }, [tradingHistory]);

    // set as default
    useEffect(() => {
        if (isDefaultToggle) {
            localStorage.setItem("showTopGainers", showTopGainers);
            localStorage.setItem("showTopLosses", showTopLosses);
            localStorage.setItem("showTrendingCoin", showTrendingCoin);
            localStorage.setItem("showTradingHistory", showTradingHistory);
        }
    }, [
        isDefaultToggle,
        showTopGainers,
        showTopLosses,
        showTrendingCoin,
        showTradingHistory,
    ]);

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
                tradingHistory={tradingHistory}
                showTradingHistory={showTradingHistory}
            />
        );
    };

    useEffect(() => {
        const savedToggles = JSON.parse(localStorage.getItem("savedToggles"));
        if (savedToggles) {
            setShowTopGainers(savedToggles.showTopGainers);
            setShowTopLosses(savedToggles.showTopLosses);
            setShowTrendingCoin(savedToggles.showTrendingCoin);
            setShowTradingHistory(savedToggles.showTradingHistory);
            setIsDefaultEnabled(true);
        }
    }, []);

    //generate pdf

    const generatePDF = async () => {
        const reportElement = document.createElement("div");
        reportElement.style.position = "fixed";
        reportElement.style.left = "-9999px";
        document.body.appendChild(reportElement);

        // Create a new link element for the print styles
        const printStyleLink = document.createElement("link");
        printStyleLink.rel = "stylesheet";
        printStyleLink.href = "SummaryReport.css";
        printStyleLink.media = "print";
        document.head.appendChild(printStyleLink);

        ReactDOM.render(
            <SummaryReport
                coins={coins}
                showTopGainers={showTopGainers}
                showTopLosses={showTopLosses}
                showTrendingCoin={showTrendingCoin}
                selectedCoins={selectedCoins}
                tradingHistory={tradingHistory || []}
                showTradingHistory={showTradingHistory}
            />,
            reportElement,
            async () => {
                // Wait for a moment to ensure all charts are rendered
                await new Promise((resolve) => setTimeout(resolve, 3000));

                // Force a repaint to apply print styles
                window.dispatchEvent(new Event("beforeprint"));
                const canvas = await html2canvas(reportElement, {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    logging: true,
                    onclone: (clonedDoc) => {
                        clonedDoc.querySelector("body").classList.add("print-preview");
                        const style = clonedDoc.createElement("style");
                        style.textContent = `
              .tables {
              
                flex-direction: row !important;
                justify-content: space-between !important;
                
              }
              .top-gainers, .top-losers {
                width: 48% !important;
                margin-bottom: 0 !important;
              }

            `;
                        clonedDoc.head.appendChild(style);
                    },
                });

                window.dispatchEvent(new Event("afterprint"));

                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", "a4");
                pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // A4 size

                const pdfBlob = pdf.output("blob");
                const pdfUrl = URL.createObjectURL(pdfBlob);
                window.open(pdfUrl);

                document.body.removeChild(reportElement);
                document.head.removeChild(printStyleLink);
            }
        );
        setPreviewContent(
            <SummaryReport
                coins={coins}
                showTopGainers={showTopGainers}
                showTopLosses={showTopLosses}
                showTrendingCoin={showTrendingCoin}
                selectedCoins={selectedCoins}
                tradingSuggestions={tradingSuggestions}
                showTradingHistory={showTradingHistory}
            />
        );
    };

    //2 preview

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
                                        <span style={{marginLeft: "4rem"}}>Customize Coins</span>
                                    </div>
                                    <div
                                        className="coin-button"
                                        style={{display: "inline-block", marginLeft: "5rem"}}
                                    >
                                        <Input
                                            type="button"
                                            value="Add Coin"
                                            outlined
                                            green
                                            style={{width: "150px", marginLeft: "15%"}}
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
                                        <div style={{width: "550px", paddingTop: "25px"}}>
                                            <div>
                                                <Input
                                                    type="search"
                                                    placeholder="Search"
                                                    onChange={(e) => setSearch(e.target.value)}
                                                />
                                            </div>

                                            <Table
                                                hover={true}
                                                style={{height: "65vh", overflowY: "auto"}}
                                                tableTop={
                                                    <h2 style={{textAlign: "center"}}>Select Coin</h2>
                                                }
                                            >
                                                <TableRow data={["Coin", "Price", "Select"]}/>
                                                {filteredCoins.map((coin) => (
                                                    <TableRow
                                                        key={coin.symbol}
                                                        onClick={() => handleRowClick(coin)}
                                                        data={[
                                                            <Coin>{coin.symbol}</Coin>,
                                                            formatCurrency(coin.lastPrice),
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
                                                            />,
                                                        ]}
                                                    />
                                                ))}
                                            </Table>
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

                                    {user.role === "Trader" &&
                                        <div className="data">
                                            <div className="tog-name">
                                                <span>Trading History</span>
                                            </div>
                                            <div className="tog4">
                                                <Input
                                                    type="toggle"
                                                    id=""
                                                    checked={showTradingHistory}
                                                    onChange={() =>
                                                        setShowTradingHistory(!showTradingHistory)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    }

                                    <div className="default">
                                        <div className="defaultname" style={{marginLeft: "3rem"}}>
                                            <span>Set this features as default</span>
                                        </div>
                                        <div className="tog5" style={{marginRight: "21.5rem"}}>
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
                                style={{width: "87px"}}
                                onClick={generatePreview}
                            />
                            <Input
                                type="button"
                                value="Download"
                                className="download-button"
                                onClick={generatePDF}
                                style={{width: "87px", marginLeft: "28%"}}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {" "}
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