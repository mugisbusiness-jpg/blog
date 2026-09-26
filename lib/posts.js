import {publicSupabase} from "./supabase-public";
import {starterPosts} from "./starter-posts";
function byNewest(a,b){return new Date(b.published_at||b.created_at||0)-new Date(a.published_at||a.created_at||0)}
export async function getPublishedPosts({limit,category,search}={}){
  const supabase=publicSupabase();let rows=[];
  if(supabase){
    let query=supabase.from("blog_posts").select("*").eq("status","published").order("published_at",{ascending:false});
    if(category)query=query.eq("category",category);
    if(limit)query=query.limit(limit);
    const {data,error}=await query;
    if(!error&&data?.length)rows=data;
  }
  if(!rows.length){rows=starterPosts.filter(p=>!category||p.category===category).sort(byNewest);if(limit)rows=rows.slice(0,limit)}
  if(search){const q=search.toLowerCase().trim();rows=rows.filter(p=>[p.title,p.excerpt,p.category,...(p.tags||[])].join(" ").toLowerCase().includes(q))}
  return rows;
}
export async function getPostBySlug(slug){
  const supabase=publicSupabase();
  if(supabase){const {data,error}=await supabase.from("blog_posts").select("*").eq("status","published").eq("slug",slug).maybeSingle();if(!error&&data)return data}
  return starterPosts.find(p=>p.slug===slug)||null;
}
export async function getCategories(){
  const posts=await getPublishedPosts();const map=new Map();
  posts.forEach(p=>map.set(p.category,(map.get(p.category)||0)+1));
  return [...map.entries()].map(([name,count])=>({name,count})).sort((a,b)=>a.name.localeCompare(b.name));
}
