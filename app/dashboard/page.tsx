
import { auth } from "@/lib/auth";
import MonthlyActivity from "./_components/MonthlyActivity";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import NoteLimit from "./_components/NoteLimit";
import FolderLimit from "./_components/FoldersLimit";
import FolderFeed from "@/components/FolderFeed";

async function Dashboard() {

    const session = await auth()

    if (!session) { 
        redirect("/")
    }

    console.log(session.user)
    return ( <div className="px-4">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 w-full ">

            <Suspense fallback={<MonthlyLoadingSkeleton />}>
                <MonthlyActivity userId={session.user.id} />
            </Suspense>

            <Suspense fallback={<MonthlyLoadingSkeleton />}>
                <NoteLimit userId={session.user.id} plan={session.user.plan}/>
            </Suspense>

            <Suspense fallback={<MonthlyLoadingSkeleton />}>
                <FolderLimit userId={session.user.id} plan={session.user.plan}/>
            </Suspense>

        </div>
        
        <div className="pt-3 px-2 text-2xl font-bold">Your Feed</div>
        <FolderFeed />
        
        
    </div> );
}

export default Dashboard;

const MonthlyLoadingSkeleton = () => { 
    return <Card className='max-w-[600px]'>
       <CardHeader>
         <CardTitle><Skeleton className='w-24 h-5 rounded-lg'/></CardTitle>
         <CardDescription><Skeleton className='w-12 h-5 rounded-lg'/></CardDescription>
       </CardHeader>
       <CardContent>
         <Skeleton className='w-full min-h-[300px]'/>
       </CardContent>
       <CardFooter className="flex-col items-start gap-2 text-sm">
         <Skeleton className='w-32 h-5 rounded-lg'/>
        <Skeleton className='w-16 h-5 rounded-lg'/>
       </CardFooter>
    </Card>
}
