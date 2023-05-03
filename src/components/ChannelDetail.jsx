import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchFromAPI } from "../utils/fecthFromAPI"
import { Box } from "@mui/material"
import { ChannelCard, Videos } from "./";

const ChannelDetail = () => {

  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState([])
  const { id } = useParams()

  useEffect(()=>{
    fetchFromAPI(`channels?part=snippet&id=${id}`)
        .then((data)=> setChannelDetail(data?.items[0]));

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
        .then((data)=> setVideos(data?.items));
  },[id])

  return (
    <Box minHeight='95vh'>
      <div style={{
        background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(206,3,184,1) 0%, rgba(0,212,255,1) 100%)',
        Zindex:10,
        height: '300px'
      }}
      />
         <ChannelCard channelDetail={channelDetail} marginTop = "-110px"/>

         <Box display="flex" p="2">
            <Box sx={{ mr: {sm: '100px'} }} />
              <Videos  videos={videos}/>
            
         </Box>
    </Box>
  )
}

export default ChannelDetail
