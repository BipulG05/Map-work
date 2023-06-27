import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
    const [Cradential,setCradential] =useState({name:"",phoneNo:"",email:"",password:""})
    // const [password,setpassword] =useState("")
    let history = useHistory();
    const onChange = (e) =>{
        setCradential({...Cradential,[e.target.name]:e.target.value});
       // eslint-disable-next-line
    }
    const hanlesubmit = async (e) =>{
        e.preventDefault();
        const {name,phoneNo,email,password} = Cradential
        //35.78.198.145
        const response = await fetch("http://35.78.198.145:5000/api/auth/createuser",{
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,phoneNo,email,password}) 

      });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //redirect
            localStorage.setItem('token',json.authtoken);
            history.push("/");
            props.showAlert("Account Created Successfully","success");

        }else{
            props.showAlert("Invalide cradential","danger");
        }
    }
  return (
    <>
    <div className='container my-4 ' >
      <div className="card" > 
      <div className=' my-1 text-center'>
        <img style={{ width:'7rem',height:'2rm'}} alt='logo.png' src='logo-no-background.png'/>
      </div>
        <h2 className='my-2 mx-2 text-success text-center'>“[Cats] are blissfully unaware that they have only a finite time in which to finish their 'to do' list.”― <span className='mx-1 text-warning text-right font-italic'>Jon Edgell</span></h2>
        <form className='mx-2 ' onSubmit={hanlesubmit}>
            <div className="form-group my-4 mx-2">
              <input type="text" className="form-control" id="Name" name='name' minLength={6}  onChange={onChange} placeholder="Name" required/>
            </div>
            <div className="form-group my-4 mx-2">
              <input type="email" className="form-control " id="Email" name='email' onChange={onChange} aria-describedby="emailHelp" placeholder="Email" required/>
            </div>
            <div className="col-auto my-4 mx-2">
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text mx-1">+91</div>
                </div>
                <input type="tel" name='phoneNo' className="form-control" minLength={10} maxLength={10} id="Phone" onChange={onChange} placeholder="Phone" required/>
              </div>
            </div>
            <div className="form-group my-4 mx-2">
              <input type="password" className="form-control " id="password" minLength={6} name='password' aria-describedby="password" autoComplete="on" onChange={onChange} placeholder="Password" required/>
            </div>
            <div className="form-group my-4 mx-2">
              <button type="submit"  className="btn btn-primary">Submit</button>
            </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default Signup