import React from 'react'
// eslint-disable-next-line no-unused-vars
import LatestNews from './LatestNews'
import LatestAnnouncement from './LatestAnnoucement'


const ImportantInformation = () => {
  return (
    <div className='row mt-3'>
        {/* <div className='row-md-4'><LatestNews/></div> */}
        <div className='row-md-4'><LatestAnnouncement/></div>
    
    </div>
  )
}

export default ImportantInformation