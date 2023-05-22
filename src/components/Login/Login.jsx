import React from 'react'
import '../../assets/css/sb-admin-2.css'
import '../../assets/css/sb-admin-2.min.css'
import { useForm } from "react-hook-form";
import axios from '../../utilis/axios'
import { loginPost } from '../../utilis/constants';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();

      const onSubmit = (data) => {
        axios.post(loginPost,data,{headers: { "Content-Type": "application/json" },}).then((res)=>{
            if (res.data.status === 'true'){
                toast.success('Logged in successfully!!!',{
                    position:'top-center',
                    style: {
                      borderRadius: '10px',
                      background: '#333',
                      color: '#fff',
                    }
                  })
                  Cookies.set("admin_jwt",String(res.data.admin_jwt))
                  navigate('/admin_home')
            }else{
                toast.error('Email Or Password is incorrect',{
                    position:'top-center',
                    style: {
                      borderRadius: '10px',
                      background: '#333',
                      color: '#fff',
                    }
                  })
            }
        })
      };
  return (
    <div>
      <div class="container">


<div class="row justify-content-center mt-5">

    <div class="col-xl-10 col-lg-12 col-md-9 mt-5">

        <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
               
                <div class="row">
                    <div class="col-lg-6 d-none d-lg-block bg-register-image"></div>
                    <div class="col-lg-6">
                        <div class="p-5">
                            <div class="text-center">
                                <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                            </div>
                            <form class="user" onSubmit={handleSubmit(onSubmit)}>
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-user"
                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                        placeholder="Enter Email Address..."
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                              value: /\S+@\S+\.\S+/,
                                              message: "Invalid email format"
                                            }
                                          })}
                                          />
                                          {errors.email && <p className='text-danger  pt-1 px-2  'style={{fontSize:".7rem"}}>{errors.email.message}</p>}
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control form-control-user"
                                        id="exampleInputPassword" placeholder="Password"
                                        {...register('password',{
                                            required:"Password is Required"
                                        }
                                        )}
                                        />
                                        {errors.password && <p className='text-danger pt-1 px-2'style={{fontSize:".7rem"}}>Password is required</p> }
                                </div>
                                {/* <div class="form-group">
                                    <div class="custom-control custom-checkbox small">
                                        <input type="checkbox" class="custom-control-input" id="customCheck"/>
                                        <label class="custom-control-label" for="customCheck">Remember
                                            Me</label>
                                    </div>
                                </div> */}
                                <button type='submit' class="btn btn-primary btn-user btn-block">
                                    Login
                                </button>
                                <hr/>
                                {/* <a href="index.html" class="btn btn-google btn-user btn-block">
                                    <i class="fab fa-google fa-fw"></i> Login with Google
                                </a> */}
                                {/* <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                    <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                </a> */}
                            </form>
                            <hr/>
                            {/* <div class="text-center">
                                <a class="small" href="forgot-password.html">Forgot Password?</a>
                            </div> */}
                            {/* <div class="text-center">
                                <a class="small" href="register.html">Create an Account!</a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</div>

</div>
    </div>
  )
}

export default Login
