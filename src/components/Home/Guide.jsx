import React, { useEffect, useState } from 'react'
import axios from '../../utilis/axios'
import { acceptGuidePost, blockUnblockGuide, guideGet } from '../../utilis/constants'

import swal from 'sweetalert'
const Guide = () => {
    const [guides,setGuide] =useState([])
    useEffect(()=>{
        guide_data()
    },[])
    const guide_data=()=>{
        axios.get(guideGet).then((res)=>{
            setGuide(res.data)
        })
    }
    const AcceptGuide=(id)=>{
        swal({
            title: "Are you sure?",
            // text: "Once deleted, you will not be able to recover this item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.put(`${acceptGuidePost}/${id}`,{
                    headers:{"Content-Type": "application/json"},
                }).then((res)=>{
                    guide_data();
                   
                })
               
                swal('Done' ,{
                    icon: "success",
                });
            } else {
                swal("Cancelled!");
            }
        });

    }
    const handleBlockUser=(id,status)=>{
        swal({
            title: "Are you sure?",
            // text: "Once deleted, you will not be able to recover this item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.patch(`${blockUnblockGuide}/${id}`,{'status':status},{
                    headers: { "Content-Type": "application/json" }
                }).then((res)=>{
                    console.log(res.data);
                    guide_data();
                })
                swal('Done' ,{
                    icon: "success",
                });
            } else {
                swal("Cancelled!");
            }
        });
    }
return (
    <div>
        <div class="container-fluid">


<div class="card shadow mb-4">
    <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Guide</h6>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th>Profile Picture</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Location,State,Country</th>
                        <th>Pincode</th>
                        <th>Pricing</th>
                        <th>Languages Known</th>
                        <th></th>
                    </tr>
                </thead>
                
                <tbody>

                    {guides.map((g)=>(
                         <tr>
                         <td><img src={`https://res.cloudinary.com/dmysmwucj/${g.image}`} class="img-thumbnail" alt="..."/></td>
                         <td>{g.firstname}&nbsp;{g.lastname}</td>
                         <td>{g.username}</td>
                         <td>{g.email}</td>
                         <td>{g.phone}</td>
                         <td>{g.place}&nbsp;{g.state}&nbsp;{g.country}</td>
                         <td>{g.pincode}</td>
                         <td>{g.pricing}</td>
                         <td>{g.languages_known}</td>
                         <td >          
                            {g.is_accepted?<button className='btn btn-outline-secondary' disabled onClick={()=>{AcceptGuide(g.id)}}> Accepted</button>:
                            
                                    <button className='btn btn-outline-secondary' onClick={()=>{AcceptGuide(g.id)}}> Accept</button>
                            }
                            
</td>
<td>                       {g.is_blocked ? (
                            <button className='btn btn-outline-danger 'style={{width:"6rem"}} onClick={()=>handleBlockUser(g.id,g.is_blocked)}>Unblock</button>
                            ) : (
                                <button className='btn btn-outline-danger ' style={{width:"6rem"}} onClick={()=>handleBlockUser(g.id)}>Block</button>
                            )}
</td>
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

export default Guide
