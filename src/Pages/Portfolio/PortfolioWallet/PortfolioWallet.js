import React, { useState } from 'react'
import BasicPage from '../../../Components/BasicPage/BasicPage'
import SidePanelWithContainer from '../../../Components/SidePanel/SidePanelWithContainer'
import SidePanelInput from '../../../Components/SidePanel/SidePanelInput/SidePanelInput'
import ValueBar from '../../../Components/ValueBar/ValueBar'
import Table, { TableRaw } from '../../../Components/Table/Table'
import './PortfolioWallet.css'

export default function FundingWallet() {
    let assets = {};
    const walletAssets = require('./walletAssets.json');
    const [selectedWallet, setSelectedWallet] = useState(undefined);
    const [selectedPage, setSelectedPage] = useState("Spot Wallet");
    let portfolioValue = 0;

    

    switch(selectedPage) {
        case "Spot Wallet":
            assets = walletAssets.Spot
            break;
        case "Future Wallet":
            assets = walletAssets.Future
            break;
        case "Funding Wallet":
            assets = walletAssets.Funding
            break;
        default:
            assets = walletAssets.Spot
    }
    portfolioValue = Object.values(assets).reduce((acc, asset) => acc + asset.value, 0);

    return (
        <BasicPage
            tabs={[
                { label:"Overview", path:"/portfolio"},
                { label:"History", path:"/portfolio/history"},
            ]}
            
            subPages={{
                setSelectedPage: setSelectedPage,
                path: "/portfolio/portfolio-wallet",
                labels: [ "Spot Wallet", "Future Wallet", "Funding Wallet" ]
            }}>
            
            <SidePanelWithContainer 
                style={{height:"91vh"}}
                header="Transfer"
                sidePanel = {
                    <div>
                        <SidePanelInput type="dropdown" label='Coin' options={
                            Object.keys(assets).slice(1).map(assetKey => ({
                                value: assetKey, 
                                label: assetKey
                            }))
                        } />
                        <SidePanelInput type="number" label='Quantity' />
                        <SidePanelInput type="dropdown" label='To' onChange={setSelectedWallet} 
                            options={ 
                                selectedPage === "Spot Wallet"
                                ? [
                                    { value: 'futureWallet', label: 'Future Wallet' },
                                    { value: 'fundingWallet', label: 'Funding Wallet' },
                                    ]
                                : selectedPage === "Future Wallet"
                                ? [
                                    { value: 'spotWallet', label: 'Spot Wallet' },
                                    { value: 'fundingWallet', label: 'Funding Wallet' },
                                    ]
                                : selectedPage === "Funding Wallet"
                                ? [
                                    { value: 'spotWallet', label: 'Spot Wallet' },
                                    { value: 'futureWallet', label: 'Future Wallet' },
                                    { value: 'externalWallet', label: 'External Wallet' },
                                    ]
                                : []
                            }
                        />
                        { selectedWallet === 'externalWallet' &&
                        <div className={'wallet-address-input'} >
                            <SidePanelInput type="text" label='Wallet Address'/> 
                        </div> }
                        <div className={`transfer-button ${selectedWallet === 'externalWallet' ? "down" : ""}`}>
                            <SidePanelInput type="button" value="Transfer" style={{marginTop:"40px"}}/>
                        </div>
                    </div>
                }>
                    
                <ValueBar usdBalance={assets.USD.quantity} portfolioValue={portfolioValue}/>

                <Table>
                    <TableRaw data={[
                        'Coin', 
                        'Quantity', 
                        'Market Price', 
                        'Value', 
                        'ROI'
                    ]}/>

                    { assets && Object.keys(assets).slice(1).map(key => (
                        <TableRaw 
                            key={key} 
                            data={[
                            [require('../../../Assets/Images/Coin Images.json')[key], key], 
                            assets[key].quantity, 
                            assets[key].marketPrice, 
                            assets[key].value, 
                            <span 
                                style= {{ 
                                    color: ( assets[key].roi < 0 ) ? 
                                    '#FF0000' : ( assets[key].roi > 0 ) ? 
                                    '#21DB9A' : '' 
                                }}>
                                {`${assets[key].roi} %`}
                            </span>
                            ]} 
                        />
                    ))}
                </Table>
            </SidePanelWithContainer>
        </BasicPage>
    )
}