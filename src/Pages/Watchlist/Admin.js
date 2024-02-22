import React from "react";
import BasicPage from "../../Components/BasicPage/BasicPage";
import "./Admin.css";
import "./ViewAll.css";

export default function Admin() {
  const getVerifiedCellStyle = (isVerified) => {
    return isVerified ? { color: "#21DB9A" } : { color: "red" };
  };

  return (
    <BasicPage
      tabs={[
        { label: "All", path: "/watchlist" },
        { label: "Custom", path: "/watchlist/customize" },
        { label: "CoinPage", path: "/watchlist/CoinPage" },
        { label: "Dashboard", path: "/watchlist/AdDashboard" },
        { label: "ViewAll", path: "/watchlist/ViewAll" },
        { label: "Users", path: "/watchlist/Users" },
        { label: "Admin", path: "/watchlist/Admin" },
      ]}
    >
      <div>
        <div className="info">
          <table className="info-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>NIC</th>
                <th>Contact</th>
                <th>Age</th>
                <th>Verified</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td>Nimal Rathnayaka</td>
                  <td>01.01.2023</td>
                  <td>123456789V</td>
                  <td>9876543210</td>
                  <td>25</td>
                  <td style={getVerifiedCellStyle(true)}>Yes</td>
                  <td></td>
                </tr>
              ))}
              {[...Array(5)].map((_, index) => (
                <tr key={index + 5}>
                  <td>Kamal Silva</td>
                  <td>02.01.2023</td>
                  <td>987654321C</td>
                  <td>8765432109</td>
                  <td>30</td>
                  <td style={getVerifiedCellStyle(false)}>No</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BasicPage>
  );
}
