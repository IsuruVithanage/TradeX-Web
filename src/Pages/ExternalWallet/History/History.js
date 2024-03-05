import React from 'react'
import BasicPage from '../../../Components/BasicPage/BasicPage'
import Table, { TableRow } from '../../../Components/Table/Table';

export default function History() {
    const historyData = require('./History.json');

    return (
        <BasicPage 
            sideNavBar= {false}
            tabs={[
                { label:"Dashboard", path:"/wallet/dashboard"},
                { label:"History", path:"/wallet/history"},
            ]}>

            
            <Table style={{marginTop:'0'}}>
                <TableRow data={['Coin', 'Date', 'Type',  'From / To', 'Quantity']} />

                { historyData.map((row, index) => (
                    <TableRow 
                        key={index} 
                        data={[
                            [row.Coin],
                            row.Date, 
                            row.Type,
                            row.Wallet, 
                            row.Quantity, 
                        ]} 
                    />
                ))}
            </Table> 

        </BasicPage>
    )
}
