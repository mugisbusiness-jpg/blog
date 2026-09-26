import {SITE} from "@/lib/site";
export default function robots(){return{rules:[{userAgent:"*",allow:"/",disallow:["/admin","/admin/"]}],sitemap:SITE.url.replace(/\/$/,"")+"/sitemap.xml",host:SITE.url}}
