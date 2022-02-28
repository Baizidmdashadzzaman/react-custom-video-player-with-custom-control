import React,{useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";
import ReactPlayer from "react-player";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { Button, Stack } from "@mui/material";
import { Bookmark, Fullscreen, VolumeDown } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { FastRewind } from "@material-ui/icons";
import { FastForward } from "@material-ui/icons";
import { PlayArrow } from "@material-ui/icons";
import { Pause } from "@material-ui/icons";

import { Tooltip } from "@material-ui/core";

import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { VolumeUp } from "@material-ui/icons";
import { Popover } from "@material-ui/core";
import { VolumeOff } from "@material-ui/icons";
import screenfull from "screenfull";

import { Replay10 } from "@material-ui/icons";
import { Forward10 } from "@material-ui/icons";

const useStyles = makeStyles({
    plyerWraper:{
     width: "100%",
     position: "relative",
  
    },
    controlWraper:{
       position:"absolute", 
       top:0, 
       left:0, 
       right:0, 
       bottom:0,
       background:"rgba(0,0,0,0.1)", 
       display:"flex",
       flexDirection:"column",
       justifyContent:"space-between",
       zIndex:1,
       padding:"10px"
 
    },
    controlIconsCust:{
     color: "#777",
 
     fontSize: 50,
     transform: "scale(0.9)",
     "&:hover": {
       color: "#fff",
       transform: "scale(1)",
     },
    },
    bottomIcons:{
     color: "#999",
     "&:hover": {
       color: "#fff",
     },
    },
    volumeSlider:{
      width: 100,
    }
  
 })
 function ValueLabelComponent(props) {
   const { children, value } = props;
 
   return (
     <Tooltip enterTouchDelay={0} placement="top" title={value}>
       {children}
     </Tooltip>
   );
 }
 const PrettoSlider = styled (Slider)({
   color: '#52af77',
   height: 8,
   '& .MuiSlider-track': {
     border: 'none',
   },
   '& .MuiSlider-thumb': {
     height: 24,
     width: 24,
     backgroundColor: '#fff',
     border: '2px solid currentColor',
     '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
       boxShadow: 'inherit',
     },
     '&:before': {
       display: 'none',
     },
   },
   '& .MuiSlider-valueLabel': {
     lineHeight: 1.2,
     fontSize: 12,
     background: 'unset',
     padding: 0,
     width: 32,
     height: 32,
     borderRadius: '50% 50% 50% 0',
     backgroundColor: '#52af77',
     transformOrigin: 'bottom left',
     transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
     '&:before': { display: 'none' },
     '&.MuiSlider-valueLabelOpen': {
       transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
     },
     '& > *': {
       transform: 'rotate(45deg)',
     },
   },
 });

 
function PlayerControls({onPlayPause,playing,onRewind,onForward ,onAudionMute ,audiomuted,onVolumeChange,onVolumeSeekUp,volume,playbackRate,onPlaybackRateChage,onToggleFullScreen,played,onSeek,onSeekMouseDown,onSeekMouseUp,elapsedTime,totalDuration,handleRewindTime,handleFastForwardTime}) {

    const classess = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  
  return (
    <>

<div className={classess.controlWraper}>
              
              <Grid container  direction="row" alignItems="center" alignContent="center"
               justifyContent="space-between" style={{padding:'16'}}> 
                <Grid item>
                  <Typography varient="h5" style={{color:'white'}}>Video title</Typography>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" startIcon={<Bookmark/>}>Add to playlist?</Button>
                </Grid>
              </Grid>

              <Grid container  direction="row" alignItems="center" justifyContent="center" alignContent="center">
                <IconButton onClick={onRewind} className={classess.controlIconsCust} aria-label="required">
                  <FastRewind   fontSize="inherit"/>
                </IconButton> 

                <IconButton onClick={onPlayPause} className={classess.controlIconsCust} aria-label="required">
                  {playing == true?(<Pause  fontSize="inherit"/>):(<PlayArrow  fontSize="inherit"/>)}
                </IconButton>

                <IconButton onClick={onForward} className={classess.controlIconsCust} aria-label="required">
                  <FastForward   fontSize="inherit"/>
                </IconButton>

              </Grid>

              <Grid container  direction="row" alignItems="center" 
              alignContent="center" justifyContent="space-between" style={{padding:'16'}}>
                <Grid item xs={12}>
                  <PrettoSlider
                     min={0}
                     max={100}
                     value={played * 100}
                     ValueLabelComponent={ValueLabelComponent}
                     onChange={onSeek}
                     onMouseDown={onSeekMouseDown}
                     onChangeCommitted={onSeekMouseUp}
                   />
                </Grid>

              <Grid item >
                <Grid container alignItems="center" direction="row">
                   <IconButton onClick={handleRewindTime} >
                       <Replay10  className={classess.bottomIcons}/>
                   </IconButton>
                    <IconButton onClick={onPlayPause} >
                       {playing == true?(<Pause  className={classess.bottomIcons}/>):(<PlayArrow  className={classess.bottomIcons} />)}
                   </IconButton>
                   <IconButton onClick={handleFastForwardTime} >
                       <Forward10  className={classess.bottomIcons}/>
                   </IconButton>
                   <IconButton onClick={onAudionMute} >
                       {audiomuted == false?(<VolumeUp className={classess.bottomIcons} />):(<VolumeOff className={classess.bottomIcons} />)}
                   </IconButton>

                   <Slider min={0} max={100} value={volume * 100} className={classess.bottomIcons} 
                     onChange={onVolumeChange}
                     onChangeCommitted={onVolumeSeekUp}                   
                   />
                  
                   <Button variant="text" style={{color:"#fff",marginLeft: 16}}>
                       <Typography>{elapsedTime} / {totalDuration}</Typography>
                   </Button>
                   
                </Grid>

                


              </Grid>

                <Grid item>
                   <Button onClick={handleClick} varient="text" style={{color:"#fff",marginLeft: 16}} className={classess.bottomIcons}>
                       <Typography>{playbackRate}x</Typography>
                   </Button>

<Popover
  id={id}
  open={open}
  anchorEl={anchorEl}
  onClose={handleClose}
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}
  transformOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
>
  <Grid container direction="column-reverse">

  {[0.5,1,1.5,2].map(rate=>(
    <Button onClick={()=>onPlaybackRateChage(rate)} varient="text">
     <Typography color={rate === playbackRate?("success"):("default")} >{rate}</Typography>
   </Button>
  ))}

  </Grid>
  
   
</Popover>

                   <IconButton onClick={onToggleFullScreen} className={classess.bottomIcons}  >
                       <Fullscreen fontSize="large"/>
                   </IconButton>

                </Grid>

              </Grid>

            </div>


    </>
  )
}

export default PlayerControls