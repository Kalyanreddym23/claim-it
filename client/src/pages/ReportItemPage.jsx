import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { ItemForm } from "../components/ItemForm";
import { ErrorMessage } from "../components/PageState";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

export function ReportItemPage({type}){
  const {token}=useAuth(),nav=useNavigate();const[error,setError]=useState(""),[busy,setBusy]=useState(false);
  async function submit(values){setBusy(true);setError("");try{const d=await api.createItem(values,token),i=d?.item||d;nav(i?`/items/${i._id}`:"/dashboard")}catch(e){setError(e.message)}finally{setBusy(false)}}
  return <section className="section"><div className="container narrow-container"><Link className="back-link" to="/dashboard">← Dashboard</Link><span className="eyebrow">{type==="lost"?"Report lost item":"Report found item"}</span><h1>{type==="lost"?"Tell campus what you lost":"Help return a found item"}</h1><p className="section-copy">Add enough detail for another student to identify the item.</p>{error&&<ErrorMessage>{error}</ErrorMessage>}<ItemForm type={type} onSubmit={submit} isSubmitting={busy} submitLabel={`Publish ${type} listing`}/></div></section>;
}
