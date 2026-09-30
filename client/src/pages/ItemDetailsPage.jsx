import { useEffect,useState } from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import { StatusBadge } from "../components/ItemCard";
import { ErrorMessage,LoadingState,SuccessMessage } from "../components/PageState";
import { formatDate } from "../constants";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

export function ItemDetailsPage(){
  const {itemId}=useParams(),{token,user,isAuthenticated}=useAuth(),nav=useNavigate();
  const[item,setItem]=useState(null),[loading,setLoading]=useState(true),[error,setError]=useState(""),[success,setSuccess]=useState(""),[busy,setBusy]=useState(false);
  useEffect(()=>{api.getItem(itemId).then(d=>setItem(d?.item||d)).catch(e=>setError(e.message)).finally(()=>setLoading(false))},[itemId]);
  const uid=user?._id||user?.id,oid=item?.owner?._id||item?.owner?.id||item?.owner,isOwner=uid&&oid&&String(uid)===String(oid);
  async function claim(){if(!isAuthenticated){nav("/login",{state:{from:{pathname:`/items/${itemId}`}}});return}setBusy(true);setError("");try{await api.createClaim({item:itemId},token);setSuccess("Your claim request has been submitted.")}catch(e){setError(e.message)}finally{setBusy(false)}}
  async function del(){if(!window.confirm("Delete this listing? This action cannot be undone."))return;try{await api.deleteItem(itemId,token);nav("/dashboard")}catch(e){setError(e.message)}}
  if(loading)return <section className="section"><div className="container"><LoadingState label="Loading item…" /></div></section>;
  if(!item)return <section className="section"><div className="container"><ErrorMessage>{error||"Item not found."}</ErrorMessage></div></section>;
  return <section className="section"><div className="container"><Link className="back-link" to={item.type==="lost"?"/lost":"/found"}>← Back to listings</Link><div className="details-layout"><div className="details-media">{item.imageUrl?<img src={item.imageUrl} alt={item.title}/>:<span>{item.type==="lost"?"?":"✓"}</span>}</div><article className="details-card"><div className="item-card-meta"><span className={`type-label type-${item.type}`}>{item.type}</span><StatusBadge status={item.status}/></div><h1>{item.title}</h1><p className="details-description">{item.description}</p><dl className="details-list"><div><dt>Category</dt><dd>{item.category}</dd></div><div><dt>Location</dt><dd>{item.location}</dd></div><div><dt>Date</dt><dd>{formatDate(item.date)}</dd></div><div><dt>Posted by</dt><dd>{item.owner?.name||"Campus community member"}</dd></div></dl>{error&&<ErrorMessage>{error}</ErrorMessage>}{success&&<SuccessMessage>{success}</SuccessMessage>}<div className="details-actions">{isOwner?<><Link className="button" to={`/items/${itemId}/edit`}>Edit listing</Link><button className="button button-danger" onClick={del}>Delete</button></>:item.status==="active"?<button className="button" onClick={claim} disabled={busy}>{busy?"Sending claim…":"Claim this item"}</button>:<span className="field-hint">This listing is no longer active.</span>}</div></article></div></div></section>;
}
