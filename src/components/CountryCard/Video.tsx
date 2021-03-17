import React from 'react';
import ReactPlayer from 'react-player';
import { IVideoProps } from './IVideoProps';

const Video: React.FC<IVideoProps> = (props: IVideoProps) => (
  <>
    {props.url && (
    <ReactPlayer
      playing={false}
      width="100%"
      height="400px"
      controls
      url={props.url}
    />
    )}
  </>
);

export default Video;
