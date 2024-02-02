import React from 'react'
import BasicPage from '../../../Components/BasicPage/BasicPage'
import SidePanelWithContainer from '../../../Components/SidePanel/SidePanelWithContainer';
import SidePanelInput from '../../../Components/SidePanel/SidePanelInput/SidePanelInput';
import Table, { TableRaw } from '../../../Components/Table/Table';

export default function History() {
    const tradingHistry = require('./TradingHistory.json');

    const options = [
    { value: 'BTC', label: 'BTC' },
    { value: 'ETH', label: 'ETH' },
    { value: 'DOGE', label: 'DOGE' },
    { value: 'ADA', label: 'ADA' },
    { value: 'BNB', label: 'BNB' },
    { value: 'XRP', label: 'XRP' },
    ];

    return (
        <BasicPage 
            tabs={[
                { label:"Overview", path:"/portfolio"},
                { label:"History", path:"/portfolio/history"},
                { label:"Spot Wallet", path:"/portfolio/spot-wallet"},
                { label:"Future Wallet", path:"/portfolio/future-wallet"},
                { label:"Funding Wallet", path:"/portfolio/funding-wallet"},
            ]}>
            <SidePanelWithContainer 
                line = {false}
                sidePanel={
                    <div>
                        <SidePanelInput type="dropdown" label='Coin' placeholder="" options={options}/>
                        <SidePanelInput type="dropdown" label='Trading Type'  placeholder="" options={[
                            { value: 'spot', label: 'Spot Trading' },
                            { value: 'Future', label: 'Future Trading' },
                        ]}/>
                        <SidePanelInput type="dropdown" label='Trading Action'  placeholder="" options={[
                            { value: 'buy', label: 'Buy' },
                            { value: 'sell', label: 'Sell' },
                        ]}/>
                        <SidePanelInput type="button" value="Show" style={{marginTop:"40px"}}/>
                        <SidePanelInput type="button" value="Export" />
                    </div>
                }
            >   

                <Table style={{marginTop:'0'}}>
                    <TableRaw data={['Coin', 'Date', 'Type', 'Price', 'Amount', 'Total', 'PNL']} />
                
                    { tradingHistry.Spot.map((row, index) => (
                       <TableRaw 
                            key={index} 
                            data={[
                                [row.symbol, row.Coin], 
                                row.Date, 
                                row.Type, 
                                `$ ${row.Price}`, 
                                row.Amount, 
                                `$ ${row.Price  * row.Amount}`,
                                <span 
                                    style=
                                        {{ color: ( row.PNL < 0 ) ? 
                                        '#FF0000' : ( row.PNL > 0 ) ? 
                                        '#21DB9A' : '' }}>
                                    {`${row.PNL} %`}
                                </span>
                            ]} 
                        />
                    ))}
                </Table>
            </SidePanelWithContainer>

        </BasicPage>
    )
}
