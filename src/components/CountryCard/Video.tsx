import React from 'react';
import ReactPlayer from 'react-player';
import { IVideoProps } from './IVideoProps';
import { useWindowWidth } from '../../controller/utils';

const Video: React.FC<IVideoProps> = (props: IVideoProps) => {
  const windowWidth = useWindowWidth();
  const width = (windowWidth > 900) ? 900 : windowWidth;
  const height = (width / 16) * 9;

  return (
    <>
      {props.url && (
      <ReactPlayer
        playing={false}
        width={`${width}px`}
        height={`${height}px`}
        controls
        url={props.url}
      />
      )}
    </>
  );
};

export default Video;
