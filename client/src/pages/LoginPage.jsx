import { useState } from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";
import { ErrorMessage } from "../components/PageState";
import { useAuth } from "../context/AuthContext";

export function LoginPage(){
  const {login}=useAuth(), nav=useNavigate(), loc=useLocation();
  const [form,setForm]=useState({email:"",password:""}),[error,setError]=useState(""),[busy,setBusy]=useState(false);
  const change=e=>setForm(f=>({...f,[e.target.name]:e.target.value}));
  async function submit(e){e.preventDefault();setError("");setBusy(true);try{await login(form);nav(loc.state?.from?.pathname||"/dashboard",{replace:true})}catch(err){setError(err.message)}finally{setBusy(false)}}
  return <section className="auth-section"><div className="auth-card"><span className="eyebrow">Welcome back</span><h1>Log in to Claim-It</h1><p>Manage your listings and track claims from your dashboard.</p>{error&&<ErrorMessage>{error}</ErrorMessage>}<form className="auth-form" onSubmit={submit}><label>Email<input type="email" name="email" value={form.email} onChange={change} required/></label><label>Password<input type="password" name="password" value={form.password} onChange={change} minLength="6" required/></label><button className="button" disabled={busy}>{busy?"Logging in…":"Log in"}</button></form><p className="auth-footer">New to Claim-It? <Link to="/register">Create an account</Link></p></div></section>;
}
