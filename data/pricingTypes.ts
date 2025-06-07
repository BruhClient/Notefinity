export const pricingTypes = {
    Free : { 
        price : 0,
        description : "For Everyone",
        folderAmount : 10, 
        noteAmount : 50 , 
        support : true, 
        community : true , 
        aiChat : true , 
        link : "",
        
    }, 
    Pro : { 
        price : 29.99,
        description : "For a very dedicated individual",
        folderAmount : 50, 
        noteAmount : 500 , 
        support : true, 
        community : true , 
        aiChat : true , 
        originalPrice : 39.99, 
        link : "", 
    }, 


} as Record<string,Pricing>

interface Pricing { 
    price : number , 
    description : string,
    folderAmount : number , 
    noteAmount : number , 
    support : boolean , 
    community : boolean , 
    aiChat : boolean, 
    originalPrice? : number, 
    link : string


}