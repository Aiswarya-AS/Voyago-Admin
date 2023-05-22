import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import UserList from './UserList'
import { Link, useNavigate } from 'react-router-dom'
import Guide from './Guide'
import Destinations from './Destinations'
import Booking from './Booking'
import Cookies from 'js-cookie'
import axios from '../../utilis/axios'
import { adminWalletGet } from '../../utilis/constants'
const Navbar = () => {
    const navigate = useNavigate()
    const [status,setstatus]  = useState('')
    const [wallet,setWallet] = useState('')
    const handleLogout=()=>{
        Cookies.remove('admin_jwt')
        navigate('/')
    }
    const token=Cookies.get('admin_jwt')
    const handleClick=(s)=>{
        
        setstatus(s)
    }
    useEffect(()=>{
        axios.get(adminWalletGet).then((res)=>{
            console.log(res.data,'wallet');
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
        <div class="sidebar-brand-text mx-3"> Admin <sup>2</sup></div>
    </a>

    {/* <!-- Divider --> */}
    <hr class="sidebar-divider my-0"/>

    {/* <!-- Nav Item - Dashboard --> */}
    <li class="nav-item">
        <Link class="nav-link">
            
            <span onClick={() => handleClick('Dashboard')}>Dashboard</span></Link>
    </li>

    {/* <!-- Divider --> */}
    <hr class="sidebar-divider"/>

    {/* <!-- Heading --> */}
    <div class="sidebar-heading">
        App Managment
    </div>

    {/* <!-- Nav Item - Pages Collapse Menu --> */}
    <li class="nav-item">
        <Link class="nav-link collapsed" href="#">
            <span onClick={() => handleClick('UserList')}>User Management</span>
        </Link>
    </li>
    {/* <li class="nav-item">
        <Link class="nav-link collapsed" href='#' >
            <span onClick={() => handleClick('Requests')} >Guide Requests</span>
        </Link>
    </li> */}
    <li class="nav-item">
        <a class="nav-link collapsed" href="#" >
            <span onClick={() => handleClick('Destination')}>Destination Managment</span>
        </a>
    </li>
    <li class="nav-item">
        <Link class="nav-link collapsed" href="#" >
            <span onClick={() => handleClick('Guide')}>Guide Managment</span>
        </Link>
    </li>
    <li class="nav-item">
        <Link class="nav-link collapsed" href="#" >
            <span onClick={() => handleClick('Booking')}>Booking Managment</span>
        </Link>
    </li>
   

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
            

            {(() => {
        switch (status) {
          case 'Dashboard':
            return <Dashboard/>
          case 'UserList':
            return <UserList/>
        case 'Guide':
            return <Guide/>
        case 'Destination':
            return <Destinations/>
        // case 'Requests':
        //     return <Requests/>
        case 'Booking':
            return <Booking/>
          default:
            return <Dashboard/>
        }
      })()}


          
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

export default Navbar
