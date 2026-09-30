import { useEffect,useState } from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import { ItemForm } from "../components/ItemForm";
import { ErrorMessage,LoadingState } from "../components/PageState";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

export function EditItemPage(){
  const {itemId}=useParams(),{token}=useAuth(),nav=useNavigate();const[item,setItem]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState(""),[busy,setBusy]=useState(false);
  useEffect(()=>{api.getItem(itemId).then(d=>setItem(d?.item||d)).catch(e=>setError(e.message)).finally(()=>setLoading(false))},[itemId]);
  async function submit(values){setBusy(true);setError("");try{await api.updateItem(itemId,values,token);nav(`/items/${itemId}`)}catch(e){setError(e.message)}finally{setBusy(false)}}
  return <section className="section"><div className="container narrow-container"><Link className="back-link" to={`/items/${itemId}`}>← Item details</Link><span className="eyebrow">Edit listing</span><h1>Update item</h1>{error&&<ErrorMessage>{error}</ErrorMessage>}{loading?<LoadingState label="Loading item…" />:item?<ItemForm item={item} onSubmit={submit} isSubmitting={busy} submitLabel="Save changes"/>:<ErrorMessage>Item not found.</ErrorMessage>}</div></section>;
}
