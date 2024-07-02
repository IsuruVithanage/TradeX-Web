import React,{useState,useEffect} from 'react'
import { getUser } from '../../../Storage/SecureLs';
import notificationManager from '../../Alert/notificationManager';
import BasicPage from '../../../Components/Layouts/BasicPage/BasicPage'
import Table, { TableRow,Coin } from '../../../Components/Table/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function History() {
    const navigate = useNavigate();
    const user = getUser();
    const walletId = user && user.walletId;
    const [historyData,setHistoryData] = useState([])
    const [isLoading,setIsLoading] = useState(true)


    useEffect(()=>{
        setIsLoading(true)

        const getHistoryData = () => {
            axios.get(
                "http://localhost:8006/history",{
                params:{walletId},
                withCredentials: true,
            })
            .then((res)=>{
                setHistoryData(res.data)
                setIsLoading(false)
                console.log(res.data)
            })
            .catch((error)=>{
                console.log(error)
                setIsLoading(false)
            });
        }   
        if(!walletId){
            navigate('/wallet');
         }else{
            getHistoryData();
        }

        notificationManager.onAppNotification(() => {
            getHistoryData();
        });

        return () => {
            notificationManager.onAppNotification(() => {});
        };
    },[walletId])

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
                            new Date (row.date).toLocaleDateString(), 
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
