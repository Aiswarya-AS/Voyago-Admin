import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from '../../utilis/axios'
import { addDestinationPost, adminWalletGet, editDestinationGet, updateDestinationPost } from '../../utilis/constants'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast'
const EditDestination = () => {
    const params = useParams()
    const [destination,setDestination]  = useState('')
    const navigate = useNavigate()
    const [wallet,setWallet] = useState('')
    const handleLogout=()=>{
        Cookies.remove('admin_jwt')
        navigate('/')
    }
    const {register,handleSubmit,reset,setValue,formState: { errors }} =useForm();


    useEffect(()=>{
        axios.get(`${editDestinationGet}/${params.id}`).then((res)=>{
            setDestination(res.data)
            setValue('state',res.data.state)
            setValue('country',res.data.country)
            setValue('location',res.data.location)
            setValue('short_desc',res.data.short_desc)
            setValue('description',res.data.description)
        })
    },[])




    const onSubmit=(data)=>{
        axios.put(`${updateDestinationPost}/${params.id}`,data,{
            headers: { "Content-Type": "application/json" }
        }).then((res)=>{
            toast.success('Updated succesfullyy')
        })
    }


    useEffect(()=>{
        axios.get(adminWalletGet).then((res)=>{
            
            setWallet(res.data)
        })
    },[])
  return (
    <>
     <div id="wrapper">

{/* <!-- Sidebar --> */}
<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

    {/* <!-- Sidebar - Brand --> */}
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3"> <Link to='/admin_home' style={{color:"white",textDecoration:"none"}}>Admin </Link> <sup>2</sup></div>
    </a>

    {/* <!-- Divider --> */}
    <hr class="sidebar-divider my-0"/>

    {/* <!-- Nav Item - Dashboard --> */}
    
   

</ul>
{/* <!-- End of Sidebar --> */}

{/* <!-- Content Wrapper --> */}
<div id="content-wrapper" class="d-flex flex-column">

    {/* <!-- Main Content --> */}
    <div id="content">

        {/* <!-- Topbar --> */}
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            {/* <!-- Sidebar Toggle (Topbar) --> */}
            <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                <i class="fa fa-bars"></i>
            </button>

          

            {/* <!-- Topbar Navbar --> */}
            <ul class="navbar-nav ml-auto">

                {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                <li class="nav-item dropdown no-arrow d-sm-none">
                    <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-search fa-fw"></i>
                    </a>
                    {/* <!-- Dropdown - Messages --> */}
                    <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                        aria-labelledby="searchDropdown">
                        <form class="form-inline mr-auto w-100 navbar-search">
                            <div class="input-group">
                                <input type="text" class="form-control bg-light border-0 small"
                                    placeholder="Search for..." aria-label="Search"
                                    aria-describedby="basic-addon2"/>
                                <div class="input-group-append ">
                                    <button class="btn btn-primary" type="button">
                                        <i class="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>

                <div>
                   <h5 className='mr-2 mt-1'>Revenue:{wallet.total_revenue}</h5>
                </div>
                <div>
                    <button className='btn btn-danger' onClick={handleLogout}>Logout </button>
                </div>

              
                

                

               
                

            </ul>

        </nav>
        {/* <!-- End of Topbar --> */}

        {/* <!-- Begin Page Content --> */}
        <div class="container-fluid">

            {/* <!-- Page Heading --> */}
            <h4 className='text-center text-dark text-uppercase font-weight-bold'>Edit Destination</h4>
            <div className='container-fluid' style={{maxWidth:"60rem"}}>
            <div class="card">
                <div class="card-body">
                <form enctype="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                    <div className='row'>
                        <div class="mb-3 col-md-6">
                        <label for="exampleInputEmail1" class="form-label">State</label>
                        <input type="text" class="form-control" {...register('state',{ required: 'State is required' })}  id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        {errors.state && <span className='small text-danger'>{errors.state.message}</span>}

                        </div>

                        <div class="mb-3 col-md-6">
                        <label for="exampleInputEmail1" class="form-label">Country</label>
                        <input type="text" class="form-control" {...register('country',{ required: 'Country  is required' })} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        {errors.country && <span className='small text-danger'>{errors.country.message}</span>}

                        </div>
                    </div>

                    <div className='row'>
                        <div class="mb-3 col-md-6">
                        <label for="exampleInputEmail1" class="form-label">Location</label>
                        <input type="text" class="form-control"{...register('location',{ required: 'Location is required' })} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        {errors.location && <span className='small text-danger'>{errors.location.message}</span>}

                        </div>

                        <div class="mb-3 col-md-6">
                            <label for="exampleInputEmail1" class="form-label">Image</label>
                            <input type="file" class="form-control" {...register('image',{ required: 'Image is required' })} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            {errors.image && <span className='small text-danger'>{errors.image.message}</span>}

                        </div>
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Short Description</label>
                      <textarea type="text" class="form-control" rows='2' {...register('short_desc',{ required: 'Short Description is required' })} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                      {errors.short_desc && <span className='small text-danger'>{errors.short_desc.message}</span>}

                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">Description</label>
                      <textarea type="text" class="form-control" rows='4' {...register('description',{ required: 'Description is required' })} id="exampleInputPassword1"/>
                      {errors.description && <span className='small text-danger'>{errors.description.message}</span>}

                    </div>
                   
                    <button type="submit" class="btn btn-primary">Save</button>
                    
                  </form>
                </div>
              </div>
            </div>
              


          
        </div>
        {/* <!-- /.container-fluid --> */}

    </div>
    {/* <!-- End of Main Content --> */}

    {/* <!-- Footer --> */}
    <footer class="sticky-footer bg-white">
        <div class="container my-auto">
            <div class="copyright text-center my-auto">
                <span>Copyright &copy; Your Website 2020</span>
            </div>
        </div>
    </footer>
    {/* <!-- End of Footer --> */}

</div>
{/* <!-- End of Content Wrapper --> */}

</div>
{/* <!-- End of Page Wrapper --> */}

{/* <!-- Scroll to Top Button--> */}
<a class="scroll-to-top rounded" href="#page-top">
<i class="fas fa-angle-up"></i>
</a>

{/* <!-- Logout Modal--> */}
<div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
aria-hidden="true">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>
        </div>
        <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
        <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <a class="btn btn-primary" href="login.html">Logout</a>
        </div>
    </div>
</div>
</div>
    </>
  )
}

export default EditDestination
