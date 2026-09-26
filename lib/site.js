export const SITE={
  name:"CopyRaid Blog",
  brand:"CopyRaid",
  description:"Practical copyright, content protection, creator rights, brand protection, and digital enforcement guides from CopyRaid.",
  url:process.env.NEXT_PUBLIC_SITE_URL||"https://blog.copyraid.com",
  main:"https://copyraid.com",
  help:"https://help.copyraid.com",
  logo:"https://raw.githubusercontent.com/mugisbusiness-jpg/copyraid/main/assets/copyraid-logo.png",
  favicon:"https://raw.githubusercontent.com/mugisbusiness-jpg/copyraid/main/assets/favicon.png"
};
export function absoluteUrl(path=""){const root=SITE.url.replace(/\/$/,"");return path?root+(path.startsWith("/")?path:"/"+path):root}
export function readingTime(markdown=""){const words=markdown.trim().split(/\s+/).filter(Boolean).length;return Math.max(1,Math.ceil(words/220))}
