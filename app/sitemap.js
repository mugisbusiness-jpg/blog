import {getCategories,getPublishedPosts} from "@/lib/posts";

const BASE_URL="https://blog.copyraid.com";

function url(path=""){
  return BASE_URL+(path.startsWith("/")?path:"/"+path);
}

export default async function sitemap(){
  const [posts,categories]=await Promise.all([getPublishedPosts(),getCategories()]);
  return [
    {
      url:BASE_URL,
      lastModified:new Date(),
      changeFrequency:"daily",
      priority:1
    },
    ...categories.map(c=>({
      url:url("/category/"+encodeURIComponent(c.name)),
      lastModified:new Date(),
      changeFrequency:"weekly",
      priority:0.7
    })),
    ...posts.map(p=>({
      url:url("/blog/"+p.slug),
      lastModified:new Date(p.updated_at||p.published_at),
      changeFrequency:"monthly",
      priority:0.8
    }))
  ];
}
