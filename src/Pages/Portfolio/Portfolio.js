import React, { useState, useEffect } from "react";
import { showMessage } from "../../Components/Message/Message";
import { getUser } from "../../Storage/SecureLs";
import Table, { TableRow, Coin } from "../../Components/Table/Table";
import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import SidePanelWithContainer from "../../Components/Layouts/SidePanel/SidePanelWithContainer";
import LineChart from "../../Components/Charts/LineChart/LineChar";
import BarChart from "../../Components/Charts/BarChart/BarChart";
import ValueBar from "../../Components/ValueBar/ValueBar";
import axios from "axios";

export default function Portfolio() {
  const [assets, setAssets] = useState([]);
  const [usdBalance, setUsdBalance] = useState(null);
  const [portfolioValue, setPortfolioValue] = useState(null);
  const [percentages, setPercentages] = useState([]);
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const backendApiEndpoint = "http://localhost:8011/portfolio/asset/overview";
  const user = getUser();
  const userId = user && user.id;

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(backendApiEndpoint, { params: { userId } })

      .then((res) => {
        console.log(res.data);
        setAssets(res.data.assets);
        setPercentages(res.data.percentages);
        setInitialData(res.data.historyData);
        setPortfolioValue(res.data.portfolioValue);
        setUsdBalance(res.data.usdBalance);
        setIsLoading(false);
      })

      .catch((error) => {
        setIsLoading(false);
        setPortfolioValue(0);
        setUsdBalance(0);
        console.log("error getting assets");

        error.response
          ? showMessage(error.response.status, error.response.data.message)
          : showMessage("error", "Database connection failed..!");
      });
  }, [userId]);

  return (
    <BasicPage
      isLoading={isLoading}
      tabs={[
        { label: "Overview", path: "/portfolio" },
        { label: "Trading Wallet", path: "/portfolio/tradingWallet" },
        { label: "Funding Wallet", path: "/portfolio/fundingWallet" },
        { label: "History", path: "/portfolio/history" },
      ]}
    >
      <SidePanelWithContainer
        style={{ height: "75vh" }}
        header="Composition"
        sidePanel={<BarChart bars={percentages} />}
      >
        <ValueBar
          usdBalance={usdBalance}
          value={portfolioValue}
          type="portfolio"
        />
        <LineChart data={initialData} lineType={2}></LineChart>
      </SidePanelWithContainer>

      <Table style={{ marginTop: "1vh" }} emptyMessage="No Assets to show">
        <TableRow
          data={[
            "Coin",
            "Trading Balance",
            "Funding Balance",
            "Total Balance",
            "market Price",
            "Value",
          ]}
        />

        {assets &&
          assets.map((asset) => (
            <TableRow
              key={asset.symbol}
              data={[
                <Coin>{asset.symbol}</Coin>,
                asset.tradingBalance,
                asset.fundingBalance,
                asset.totalBalance,
                asset.marketPrice,
                "$ " +
                  asset.value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }),
              ]}
            />
          ))}
      </Table>
    </BasicPage>
  );
}
