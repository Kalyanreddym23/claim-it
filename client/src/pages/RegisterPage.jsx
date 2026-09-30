import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { ErrorMessage } from "../components/PageState";
import { useAuth } from "../context/AuthContext";

export function RegisterPage(){
  const {register}=useAuth(),nav=useNavigate();
  const [form,setForm]=useState({name:"",email:"",password:"",confirmPassword:""}),[error,setError]=useState(""),[busy,setBusy]=useState(false);
  const change=e=>setForm(f=>({...f,[e.target.name]:e.target.value}));
  async function submit(e){e.preventDefault();setError("");if(form.password!==form.confirmPassword){setError("Passwords do not match.");return}setBusy(true);try{await register({name:form.name,email:form.email,password:form.password});nav("/dashboard",{replace:true})}catch(err){setError(err.message)}finally{setBusy(false)}}
  return <section className="auth-section"><div className="auth-card"><span className="eyebrow">Join your campus</span><h1>Create your account</h1><p>Register to report items and manage claims.</p>{error&&<ErrorMessage>{error}</ErrorMessage>}<form className="auth-form" onSubmit={submit}><label>Name<input name="name" value={form.name} onChange={change} maxLength="80" required/></label><label>Email<input type="email" name="email" value={form.email} onChange={change} required/></label><label>Password<input type="password" name="password" value={form.password} onChange={change} minLength="6" required/></label><label>Confirm password<input type="password" name="confirmPassword" value={form.confirmPassword} onChange={change} minLength="6" required/></label><button className="button" disabled={busy}>{busy?"Creating account…":"Create account"}</button></form><p className="auth-footer">Already have an account? <Link to="/login">Log in</Link></p></div></section>;
}
