import React, { useEffect, useState } from 'react'
import axios from '../../utilis/axios'
import { orderItemsGet } from '../../utilis/constants'

const Booking = () => {
    
const [orderData,setOrderData] = useState([])
    useEffect(()=>{
        axios.get(orderItemsGet).then((res)=>{
            console.log((res.data));
            setOrderData(res.data)
        })
    },[])
  return (
    <div>
        <div class="container-fluid">


<div class="card shadow mb-4">
    <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Booking</h6>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th>Guide Name</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Total peoples</th>
                        <th>Amount</th>
                        <th>Payment Mode</th>
                        <th>user</th>
                        <th>Status</th>
                        <th>Journey Status</th>
                    </tr>
                </thead>
                
                <tbody>
                  {orderData.map((o)=>(
                    <tr>
                        <td>{o.guide_name}</td>
                        <td>{o.location},{o.state},{o.country}</td>
                        <td>{o.date}</td>
                        <td>{o.total_peoples}</td>
                        <td>{o.total_amount}</td>
                        <td>{o.payment_mode}</td>
                        <td>{o.user}</td>
                        <td>{o.status}</td>
                        <td>{o.journey_status}</td>
                    </tr>
                  ))}
                    
                </tbody>
            </table>
        </div>
    </div>
</div>

</div> 
    </div>
  )
}

export default Booking
