import React,{useState ,useRef} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";
import ReactPlayer from "react-player";
import { makeStyles } from "@material-ui/styles";
import PlayerControls from "./components/PlayerControls";
import screenfull from "screenfull";


const useStyles = makeStyles({
   plyerWraper:{
    width: "100%",
    position: "relative",
 
   },
})

const format = (seconds) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};

let count = 0;

function App() {
  const classess = useStyles();
  const [playing ,setPlaying] = useState(false);
  const [audiomuted ,setAudioMuted] = useState(false);
  const [videourl ,setVideoUrl] = useState('https://www.youtube.com/watch?v=deTCTMTPMeg');
  const [volume ,setVolume] = useState(0.5);
  const [playbackRate ,setPlaybackRate] = useState(1.0);
  const [played ,setPlayed] = useState(0);
  const [seeking ,setSeeking] = useState(false);
  
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);

  const handlePlayPause =()=>{
    setPlaying(!playing);
  }
  const handleAudionMute =()=>{
    setAudioMuted(!audiomuted);
  }
  const handleRewind =()=>{
    // playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10)
    setVideoUrl('https://www.youtube.com/watch?v=deTCTMTPMeg')
  }
  const handleFastForward =()=>{
    // playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10)
    setVideoUrl('https://www.youtube.com/watch?v=gmORPvApSDo')
  }

  const handleOnVolumeChange =(e,newValue)=>{
    setVolume(parseFloat(newValue / 100))
    setAudioMuted( newValue === 0? true : false )
  }
  const handleOnVolumeSeekDown =(e,newValue)=>{
    setVolume(parseFloat(newValue / 100))
    setAudioMuted( newValue === 0? true : false )
  }
  const handleOnPlaybackRateChage =(rate)=>{
    setPlaybackRate(rate)
  }
  const toggleFullScreen =()=>{
    screenfull.toggle(playerContainerRef.current)
  }
  
  const handleProgress =(changeState)=>{
    if(!seeking)
    {
      setPlayed(changeState.played)
    }
  }
  const handleOnSeek =(e,newValue)=>{
    setPlayed(parseFloat(newValue / 100))
  }
  const handleOnSeekMouseDown =(e)=>{
    setSeeking(true)
  }
  const handleOnSeekMouseUp =(e,newValue)=>{
    setSeeking(false)
    playerRef.current.seekTo(newValue / 100)
  }

  const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00'
  const duration= playerRef.current ? playerRef.current.getDuration() : '00:00'
  const elapsedTime = format(currentTime )
  const totalDuration= format(duration)

  const onEnded =()=>{
    setVideoUrl('https://www.youtube.com/watch?v=gmORPvApSDo')
  } 
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
            <Typography varient="h6"> React video player</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      
      <Container maxWidth="sm">
        <div ref={playerContainerRef} className={classess.plyerWraper}>
          <ReactPlayer 
            ref={playerRef}
            url={videourl} 
            muted={audiomuted}
            playing={playing}
            width="100%"
            volume={volume}
            playbackRate={playbackRate}
            onProgress ={handleProgress}
            onEnded={onEnded}
          />
          <PlayerControls 
            onPlayPause={handlePlayPause}
            onRewind={handleRewind}
            onForward={handleFastForward}
            onAudionMute={handleAudionMute}
            onVolumeChange={handleOnVolumeChange}
            onVolumeSeekUp={handleOnVolumeSeekDown}
            onPlaybackRateChage={handleOnPlaybackRateChage}
            playing={playing}
            audiomuted={audiomuted}
            volume={volume}
            playbackRate={playbackRate}
            onToggleFullScreen ={toggleFullScreen}
            played={played}
            onSeek={handleOnSeek}
            onSeekMouseDown={handleOnSeekMouseDown}
            onSeekMouseUp={handleOnSeekMouseUp}
            elapsedTime={elapsedTime}
            totalDuration={totalDuration}
         />
        </div>
         
      </Container>
    </>
  );
}

export default App;
