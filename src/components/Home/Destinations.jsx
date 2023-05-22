import React, { useEffect, useState } from 'react'
import axios from '../../utilis/axios'
import { destinationDelete, destinationGet } from '../../utilis/constants'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

const Destinations = () => {
    const [destination,setDestination] = useState([])
    const navigate = useNavigate()
    const destinations=()=>{
        axios.get(destinationGet).then((res)=>{
            setDestination(res.data)
            
        })
    }
    useEffect(()=>{
        destinations();
    },[])
    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete(`${destinationDelete}/${id}`).then((res)=>{
                    destinations();
                })
                swal("Item has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Item deletion has been cancelled!");
            }
        });
    };
  return (
    <div>
        <div class="container-fluid">


<div class="card shadow mb-4">
    <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary ">Destinations</h6>
        <button className='btn btn-outline-primary float-right ' onClick={()=>{navigate('/add_destination')}}> Add Destination </button>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th>Thumbnail</th>
                        <th>Location</th>
                        <th>State,Country</th>
                        <th>Short Description</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                
                <tbody>

                    {destination.map((d)=>(
                    <tr>
                        <td><img src={`https://res.cloudinary.com/dmysmwucj/${d.thumbnail}`} class="img-thumbnail" alt="..."/></td>
                        <td>{d.location}</td>
                        <td>{d.state},{d.country}</td>
                        <td>{d.short_desc}</td>
                        <td>{d.description}</td>
                        <td>
                            <button className='btn btn-outline-info text-center mt-2' onClick={()=>{navigate(`/edit_destination/${d.id}`)}} style={{width:"7rem"}}>Edit</button>
                            <button className='btn btn-outline-danger text-center mt-2'style={{width:"7rem"}} onClick={() => handleDelete(d.id)}>Delete</button>
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

export default Destinations
