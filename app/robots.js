const BASE_URL="https://blog.copyraid.com";

export default function robots(){
  return {
    rules:[
      {
        userAgent:"*",
        allow:"/",
        disallow:["/admin","/admin/"]
      }
    ],
    sitemap:BASE_URL+"/sitemap.xml",
    host:BASE_URL
  };
}
