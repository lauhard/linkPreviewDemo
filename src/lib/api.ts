import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
type Meta = {
    title: string | undefined,
    image: string | undefined,
    description: string | undefined,
}
export const  GET =  async (fetch: typeof globalThis.fetch, url:string) =>{
    console.log("GET", url);
    const response = await fetch(url,{mode: 'no-cors', headers: { 'Content-Type': 'text/html' }, method: 'GET'});
    const html = await response.text();
    console.log("html", html);
    const doc = new DOMParser().parseFromString(html, "text/html");

    // console.log("html", html);
    // <meta name="Description" content="Cybernetically enhanced web apps">
    // <meta name="og:image" content="https://svelte.dev/images/twitter-thumbnail.jpg">
    const image =   extractOGTagFromHTML(html, "og:image")
    const title =   extractOGTagFromHTML(html, "og:title")
    const description =   extractOGTagFromHTML(html, "og:description")
    const meta:Meta = {
        title: title,
        image: image,
        description:description
    }
    return meta
}   

 

const extractOGTagFromHTML = 
     (html:string, tag:string)=>{

        const regex = new RegExp(`<meta\\s+property="${tag}"\\s+content="([^"]*)"`, 'g');
        console.log("regex",regex);

        const match = regex.exec(html);
        console.log("match", match?.at(1));

        const x = match?.at(1);
        console.log("x", x);

        return match?.at(1);
    // const doc = new DOMParser().parseFromString(html, "text/html");

    // const ogTag = doc.querySelector(`meta[property="${tag}"]`);
    // console.log( ogTag);

    // const element: HTMLElement = doc.body
    // console.log("extractOGTagFromHTML", element.getElementsByTagName("main")[0]);
    // const x =  htmlToImage.toPng(element.getElementsByTagName("main")[0]).then(function (dataUrl) {
    // console.log("x", dataUrl)
    // }).catch(err => console.error(err));
   
    
    // 
}