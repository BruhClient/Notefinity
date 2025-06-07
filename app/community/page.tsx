import React, { Suspense } from 'react'
import SemanticSearchBar from './_components/SemanticSearchBar'
import CommunitySearchFeed from './_components/CommunitySearchFeed'

const CommunityPage = () => {
  return (
    <div className='px-3 py-10'>

      <Suspense>
         <SemanticSearchBar />
      </Suspense>
     
      <Suspense>
        <CommunitySearchFeed />
      </Suspense>
      
     
    </div>
  )
}

export default CommunityPage
