import React, { useEffect, useState } from 'react'
import axios from '../../utilis/axios'
import { blockUnblockUser, userGet, userSearch } from '../../utilis/constants'
import swal from 'sweetalert'

const UserList = () => {
    const [users,setUsers] =useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(2);
    useEffect(() => {
       user_details();
    }, []);

const user_details=()=>{
    axios.get(userGet).then((res) => {
        setUsers(res.data);
        
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
                axios.patch(`${blockUnblockUser}/${id}`,{'status':status},{
                    headers: { "Content-Type": "application/json" }
                }).then((res)=>{
                    console.log(res.data);
                    user_details();
                })
                swal('Done' ,{
                    icon: "success",
                });
            } else {
                swal("Cancelled!");
            }
        });
    }
    const handleSearch = () => {
        if (searchQuery===''){
            user_details();
        }else{
            axios.get(`${userSearch}/${searchQuery}`).then((res)=>{
                console.log(res.data);
                setUsers(res.data)
            })
        }
    
        
      };

      const indexOfLastUser = currentPage * usersPerPage;
      const indexOfFirstUser = indexOfLastUser - usersPerPage;
      const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    
      const paginate = pageNumber => setCurrentPage(pageNumber);

 
  return (
    <>
        <div class="container-fluid">


<div class="card shadow mb-4">
    <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Users</h6>
    </div>
    <div class="card-body">
        <div class="table-responsive">
        <div className='container mb-3'>
            <div className="row">
                <div className="col-md-2">
                    <input type="text" className='form-control'value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)} />
                </div>
                <div className="col-md-1 ml-1">
                    <button className='btn btn-primary 'onClick={handleSearch}>Search</button>
                </div>
               
            </div>
        </div>
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th>Profile Picture</th>
                        <th>Name</th>
                        {/* <th>Username</th> */}
                        <th>Email</th>
                        <th>Phone</th>
                        <th></th>
                        
                    </tr>
                </thead>
                
                <tbody>

                    {currentUsers.map((u)=>(
                        <tr>
                        <td>
                            <div class="text-center">
                                <img src={`https://res.cloudinary.com/dmysmwucj/${u.profile_pic}`} style={{width:'3rem',height:"3rem"}} class="rounded" alt="..."/>
                            </div>
                        </td>
                        <td>{u.firstname}&nbsp;{u.lastname}</td>
                        {/* <td>{u.username}</td> */}
                        <td>{u.email}</td>
                        <td>{u.phone}</td>
                    
                        <td>
                        {u.is_blocked ? (
                            <button className='btn btn-outline-danger 'style={{width:"6rem"}} onClick={()=>handleBlockUser(u.id,u.is_blocked)}>Unblock</button>
                            ) : (
                                <button className='btn btn-outline-danger ' style={{width:"6rem"}} onClick={()=>handleBlockUser(u.id)}>Block</button>
                            )}

                        </td>
                    </tr>
                    ))}
                    
                    


                </tbody>
            </table>
            <ul className="pagination text-center mt-2" >
                {usersPerPage < users.length && (
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
                  </li>
                )}
                {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                  </li>
                ))}
                {usersPerPage < users.length && (
                  <li className={`page-item ${currentPage === Math.ceil(users.length / usersPerPage) ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
                  </li>
                )}
              </ul>
        </div>
    </div>
</div>

</div> 
    </>
  )
}

export default UserList
