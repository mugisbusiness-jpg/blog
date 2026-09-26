export default function manifest(){
  return {
    name:"CopyRaid Blog",
    short_name:"CopyRaid",
    description:"Copyright, content protection, creator rights and digital enforcement guides from CopyRaid.",
    start_url:"/",
    display:"standalone",
    background_color:"#ffffff",
    theme_color:"#ffffff",
    icons:[
      {
        src:"/favicon.png",
        sizes:"512x512",
        type:"image/png"
      }
    ]
  };
}
