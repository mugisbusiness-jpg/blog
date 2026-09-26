import PostCard from "@/components/PostCard";
import {getCategories,getPublishedPosts} from "@/lib/posts";
export const revalidate=300;
export default async function Home({searchParams}){
  const q=searchParams?.q||"";
  const posts=await getPublishedPosts({search:q});
  const categories=await getCategories();
  const featured=posts.find(p=>p.featured)||posts[0];
  const rest=featured?posts.filter(p=>p.slug!==featured.slug):posts;
  return <>
    <section className="hero"><div className="container hero-inner"><div className="eyebrow">CopyRaid Editorial</div><h1>Protect your work.<br/>Understand your rights.</h1><p>Clear, practical guides for creators and brands dealing with copied content, ownership evidence, infringement reports and digital rights.</p><form className="search-form" action="/" method="get"><input name="q" defaultValue={q} placeholder="Search copyright, DMCA, Instagram, evidence…" aria-label="Search blog"/><button type="submit">Search</button></form></div></section>
    <section className="container section">{q&&<div className="section-heading"><div><span className="eyebrow">Search</span><h2>Results for “{q}”</h2></div></div>}{!q&&featured&&<PostCard post={featured} large/>}</section>
    <section className="container section"><div className="section-heading"><div><span className="eyebrow">{q?"Matching articles":"Latest"}</span><h2>{q?posts.length+" articles":"Latest from CopyRaid"}</h2></div></div><div className="post-grid">{(q?posts:rest).map(post=><PostCard key={post.slug} post={post}/>)}</div>{!posts.length&&<div className="empty-state"><h3>No articles found</h3><p>Try a broader search term.</p></div>}</section>
    <section className="category-strip"><div className="container"><div className="section-heading"><div><span className="eyebrow">Browse topics</span><h2>Explore the library</h2></div></div><div className="category-grid">{categories.map(c=><a key={c.name} href={"/category/"+encodeURIComponent(c.name)}><strong>{c.name}</strong><span>{c.count} article{c.count===1?"":"s"} →</span></a>)}</div></div></section>
    <section className="cta-section"><div className="container cta-box"><div><span className="eyebrow">Need action, not just information?</span><h2>Found your content being used without permission?</h2><p>Organize your evidence and start a CopyRaid protection workflow.</p></div><a href="https://copyraid.com/report" className="primary-button">Start a case</a></div></section>
  </>
}
