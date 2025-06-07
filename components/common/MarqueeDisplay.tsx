import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { ColorNames, colors } from "@/data/constants";
import { Globe } from "lucide-react";
const reviews = [
  {
    name : "H1 Chemistry",
    color: "Peach Fizz",
    createdAt : "5 days ago",
    sharable : false
    
  },
  {
    name : "H2 Mathematics",
    color: "Blush Petal",
    createdAt : "10 days ago",
    sharable : false
    
  },
  {
    name : "H1 Geography",
    color: "Icy Blue",
    createdAt : "4 days ago",
    sharable : true
    
  },
  {
    name : "H2 History",
    color: "Lemon Cream",
    createdAt : "3 days ago",
    sharable : false
    
  },
  {
    name : "H2 Physics",
    color: "Sunshine Glow",
    createdAt : "27 days ago",
    sharable : false
    
  },
  {
    name : "H1 Ecomomics",
    color: "Sky Mist",
    createdAt : "60 days ago",
    sharable : true
    
  },
  {
    name : "H2 Further Mathematics",
    color: "Mint Whisper",
    createdAt : "47 days ago",
    sharable : false
    
  },
  {
    name : "H2 Computing",
    color: "Seafoam Silk",
    createdAt : "332 days ago",
    sharable : true
    
  },
  {
    name : "H2 Literature",
    color: "Lavender Bloom",
    createdAt : "33 days ago",
    sharable : false
    
  },
  {
    name : "H1 Translation",
    color: "Butterlight",
    createdAt : "402 days ago",
    sharable : false
    
  },
  {
    name : "H2 French",
    color: "Sunshine Glow",
    createdAt : "80 days ago",
    sharable : true
    
  },
  
] as { 
    name : string , 
    color : ColorNames , 
    sharable : boolean , 
    createdAt : string , 

}[];

const firstRow = reviews.slice(0, reviews.length / 3);
const secondRow = reviews.slice(reviews.length / 3);
const thirdRow = reviews.slice(reviews.length / 1.5);

export function MarqueeDisplay() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden opacity-45">
      <Marquee className="[--duration:20s]">
        {firstRow.map((review) => (
          <FolderCard  {...review} key={review.name} />
        ))}
      </Marquee>
      <Marquee reverse className="[--duration:20s]">
        {secondRow.map((review) => (
          <FolderCard {...review} key={review.name}/>
        ))}
      </Marquee>
      <Marquee reverse className="[--duration:20s]">
        {thirdRow.map((review) => (
          <FolderCard {...review} key={review.name}/>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}


const FolderCard = ({name,createdAt,color,sharable} : {name : string,createdAt : string,color : string,sharable : boolean})  => { 
    //@ts-ignore
    const colorCode = colors[color]

    return <Card className="border-black" >
       
            <CardContent className="flex flex-col gap-4" >

              <div className="flex justify-between items-start gap-3 flex-wrap">
                <div className="flex gap-5 h-full items-center">
                    <div className={`w-3 h-12 rounded-lg`} style={{background : colorCode}} />
                    <div className="flex flex-col gap-1">
                      <CardTitle className="lg:text-2xl text-xl break-all">
                        {name}
                      </CardTitle>
                      <CardDescription >
                        {createdAt}
                      </CardDescription>
                  </div>
                </div>
                
                {sharable && <Globe  size={15}/>}
                

              </div>
              

              
              
            </CardContent>
            
            
    </Card>
}