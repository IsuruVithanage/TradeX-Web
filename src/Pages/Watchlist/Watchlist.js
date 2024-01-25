// Watchlist1.jsx

import React, { useState, useEffect } from 'react';
import BasicPage from '../../Components/BasicPage/BasicPage';
import axios from 'axios';
import './Watchlist.css';
import {
  Container,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Paper,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";


const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
});

const Watchlist1 = () => {
  const Tabs = [
    { label: "Home", path: "/" },
    { label: "Watchlist", path: "/watchlist1" },
    { label: "Custom", path: "" },
    { label: "Top Gainer", path: "" },
    { label: "Top Loser", path: "" },
  ];

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <BasicPage tabs={Tabs}>
        <Container>
          <div className='coin-search'>
            <input
              type='text'
              placeholder='Search'
              className='coin-input'
              onChange={handleChange}
            />
          </div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "grey" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCoins.map((coin) => (
                  <TableRow key={coin.id}>
                    <TableCell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={coin.image}
                          alt={coin.name}
                          style={{ width: 20, height: 20, marginRight: 10 }}
                        />
                        {coin.name}
                      </div>
                    </TableCell>
                    <TableCell align="right">{coin.current_price}</TableCell>
                    <TableCell
                      align="right"
                      className={`coin-percent ${coin.price_change_percentage_24h < 0 ? 'red' : 'green'}`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                    <TableCell align="right">{coin.total_volume}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </BasicPage>
    </ThemeProvider>
  );
}

export default Watchlist1;
