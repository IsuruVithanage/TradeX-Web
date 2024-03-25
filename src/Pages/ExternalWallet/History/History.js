import React,{useState,useEffect} from 'react'
import BasicPage from '../../../Components/BasicPage/BasicPage'
import Table, { TableRow,Coin } from '../../../Components/Table/Table';
import axios from 'axios';


export default function History() {
    const userId = 1;
    const [historyData,setHistoryData] = useState([])
    const [isLoading,setIsLoading] = useState(true)


    useEffect(()=>{
        setIsLoading(true)
        axios.get(
            "http://localhost:8006/history",
            {params:{userId:userId}}
        )
        .then((res)=>{
            setHistoryData(res.data)
            setIsLoading(false)
            console.log(res.data)
        })
        .catch((error)=>{
            console.log(error)
            setIsLoading(false)
        })

    },[])

    return (
        <BasicPage 
            isLoading = {isLoading}
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
                            <Coin>{row.coin}</Coin>,
                            row.date, 
                            row.type,
                            row.from_to, 
                            row.quantity, 
                        ]} 
                    />
                ))}
            </Table> 

        </BasicPage>
    )
}
