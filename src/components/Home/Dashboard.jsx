import React, { useEffect, useState } from 'react';
import { dashboard } from '../../utilis/constants';
import axios from '../../utilis/axios'
import UserGuideChart from '../Charts/UserGuideChart';

import SalesChart from '../Charts/SalesChart';
const Dashboard = () => {
  const [data,setData] = useState({})
  const [completed,setCompleted] = useState([])
  const [dates,setDates] = useState([])
  const [cancelled,setCancelled] = useState([])
  const [started,setStarted] = useState([])



  useEffect(()=>{
    axios.get(dashboard).then((res)=>{
      console.log(res.data);
      setData(res.data)
      setCompleted(res.data.trip_completed)
      setDates(res.data.dates)
      setCancelled(res.data.cancelled)
      setStarted(res.data.started)

    })
  },[])
  return (
    <>

<div class="container-fluid">
        {/* <!--  Row 1 --> */}
        <div class="row">
          <div class="col-lg-8 d-flex align-items-strech">
            <div class="card w-100">
              <div class="card-body">
                <div class="d-sm-flex d-block align-items-center justify-content-between mb-9">
                  <div class="mb-3 mb-sm-0">
                    <h5 class="card-title fw-semibold">Booking Overview</h5>
                  </div>
                  <div>
                    {/* <select class="form-select">
                      <option value="1">March 2023</option>
                      <option value="2">April 2023</option>
                      <option value="3">May 2023</option>
                      <option value="4">June 2023</option>
                    </select> */}
                  </div>
                </div>
                <div id="chart">
                   <SalesChart completed={completed} started={started} dates={dates} cancelled={cancelled} />
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="row">
              <div class="col-lg-12">
                {/* <!-- Yearly Breakup --> */}
                <div class="card overflow-hidden">
                  <div class="card-body p-4">
                    <h5 class="card-title mb-9 fw-semibold">Users and Guide Ratio</h5>
                    <div class="row align-items-center">
                      <div class="col-8">
                        {/* <h4 class="fw-semibold mb-3">$36,358</h4> */}
                        <div class="d-flex align-items-center mb-3">
                          
                        <UserGuideChart user_count={data.total_users} guide_count={data.total_guides}/>
                        </div>
                        
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            
            </div>
          </div>
        </div>
        {/* <div class="row mt-5">
          <div class="col-lg-4 d-flex align-items-stretch">
            <div class="card w-100">
              <div class="card-body p-4">
                <div class="mb-4">
                  <h5 class="card-title fw-semibold">Recent Transactions</h5>
                </div>
                  <div>
                 <MostSelectedGuideChart guide_name={data.guide_name} guide_count={data.guide_count} />
                  </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8 d-flex align-items-stretch">
            <div class="card w-100">
              <div class="card-body p-4">
                <h5 class="card-title fw-semibold mb-4">Recent Transactions</h5>
                
              </div>
            </div>
          </div>
        </div> */}
        
        
      </div>


    </>
  )
}

export default Dashboard
