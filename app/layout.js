import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {SITE} from "@/lib/site";
export const metadata={
  metadataBase:new URL("https://blog.copyraid.com"),
  title:{default:"CopyRaid Blog — Copyright & Content Protection Guides",template:"%s | CopyRaid Blog"},
  description:SITE.description,
  alternates:{canonical:"/"},
  icons:{icon:"/favicon.png",shortcut:"/favicon.png",apple:"/favicon.png"},
  openGraph:{type:"website",url:SITE.url,siteName:"CopyRaid Blog",title:"CopyRaid Blog — Copyright & Content Protection Guides",description:SITE.description},
  twitter:{card:"summary_large_image",title:"CopyRaid Blog",description:SITE.description},
  robots:{index:true,follow:true}
};
export default function RootLayout({children}){
  const organization={"@context":"https://schema.org","@type":"Organization",name:"CopyRaid",url:SITE.main,logo:SITE.logo,sameAs:["https://www.instagram.com/copyraid_"]};
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organization)}}/><Header/><main>{children}</main><Footer/></body></html>
}
