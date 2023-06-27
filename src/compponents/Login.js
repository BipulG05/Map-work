import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
    const [Cradential,setCradential] =useState({email:"",password:""})
    // const [password,setpassword] =useState("")
    
    let history = useHistory();
    const onChange = (e) =>{
        setCradential({...Cradential,[e.target.name]:e.target.value});
       // eslint-disable-next-line
    }
    const hanlesubmit = async (e) =>{
        e.preventDefault();
        //35.78.198.145
        const response = await fetch("http://35.78.198.145:5000/api/auth/login",{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:Cradential.email,password:Cradential.password}) 

      });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //redirect
            localStorage.setItem('token',json.authtoken);
            history.push("/");
            props.showAlert("Login Successfully","success");
        }else{
            props.showAlert("Invalide cradential","danger");
            // console.log("hhhhhh")
        }
    }
  return (
    <>
    <div className='container my-4 ' >
      <div className="card" >
        <div className='form-group my-1 text-center'>
          <img style={{ width:'7rem',height:'2rm'}} alt='logo.png' src='logo-no-background.png'/>
        </div>
        <h2 className='my-2 mx-2 text-center'>Login  here</h2>
        <h4 className='my-2 mx-2 text-success text-center'>“Forget your to-do list and create a to-be list. ” ―   <span className='mx-1 text-warning text-right font-italic'> Frank Sonnenberg </span></h4>
        <form className='mx-2 ' onSubmit={hanlesubmit} >
            
            <div className="form-group my-4 mx-2">
              <input type="email" className="form-control " id="email" autoComplete="on" name='email' value={Cradential.email} onChange={onChange} aria-describedby="emailHelp" placeholder="email" required/>
            </div>
            {/* <div className="col-auto my-4 mx-2">
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text mx-1">+91</div>
                </div>
                <input type="tel" className="form-control" minLength={10} maxLength={10} id="Phone" placeholder="Phone" required/>
              </div>
            </div> */}
            <div className="form-group my-4 mx-2">
              <input type="password" className="form-control" id="password" autoComplete="on" name='password' value={Cradential.password} onChange={onChange} placeholder="password" required/>
            </div>
            <div className="form-group my-4 mx-2">
              <button  type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login