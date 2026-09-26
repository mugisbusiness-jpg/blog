"use client";
import {useState} from "react";
import {browserSupabase} from "@/lib/supabase-browser";
export default function AdminLogin(){
 const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [message,setMessage]=useState("");
 async function submit(e){e.preventDefault();const supabase=browserSupabase();if(!supabase){setMessage("Supabase environment variables are not configured.");return}const {error}=await supabase.auth.signInWithPassword({email,password});if(error){setMessage(error.message);return}window.location.href="/admin"}
 return <section className="admin-auth"><div className="admin-auth-card"><img className="admin-full-logo" src="/copyraid-logo.png" alt="CopyRaid"/><span className="eyebrow">Blog administration</span><h1>Sign in</h1><p>Use an authorized CopyRaid admin account.</p><form onSubmit={submit}><label>Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Password<input type="password" required value={password} onChange={e=>setPassword(e.target.value)}/></label><button className="primary-button" type="submit">Sign in</button>{message&&<div className="form-message">{message}</div>}</form></div></section>
}
