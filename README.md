# react-video-js-player
React wrapper for VideoJS. [Live Demo](https://karan101292.github.io/react-video-js-player/)

## Install
```
npm install --save react-video-js-player
```

## Usage
```javascript
import React, { Component } from 'react';
import VideoPlayer from 'react-video-js-player';

class VideoApp extends Component {
    player = {}
    state = {
        video: {
            src: "http://www.example.com/path/to/video.mp4",
            poster: "http://www.example.com/path/to/video_poster.jpg"
        }
    }

    onPlayerReady(player){
        console.log("Player is ready: ", player);
        this.player = player;
    }

    onVideoPlay(duration){
        console.log("Video played at: ", duration);
    }

    onVideoPause(duration){
        console.log("Video paused at: ", duration);
    }

    onVideoTimeUpdate(duration){
        console.log("Time updated: ", duration);
    }

    onVideoSeeking(duration){
        console.log("Video seeking: ", duration);
    }

    onVideoSeeked(from, to){
        console.log(`Video seeked from ${from} to ${to}`);
    }

    onVideoEnd(){
        console.log("Video ended");
    }

    render() {
        return (
            <div>
                <VideoPlayer
                    controls={true}
                    src={this.state.video.src}
                    poster={this.state.video.poster}
                    width="720"
                    height="420"
                    onReady={this.onPlayerReady.bind(this)}
                    onPlay={this.onVideoPlay.bind(this)}
                    onPause={this.onVideoPause.bind(this)}
                    onTimeUpdate={this.onVideoTimeUpdate.bind(this)}
                    onSeeking={this.onVideoSeeking.bind(this)}
                    onSeeked={this.onVideoSeeked.bind(this)}
                    onEnd={this.onVideoEnd.bind(this)}
                />
            </div>
        );
    }
}
export default VideoApp;
```

### VideoJS APIs support:
> onReady will return <code>videojs</code> instance. Which means you can use all the APIs provided by VideoJS.<br/>[List of VideoJS APIs](https://docs.videojs.com/docs/api/player.html)

### VideoJS plugins support:
> Since most of the VideoJS plugins needs <code>videojs</code> instance to get initialized, it is very easy to integrate any of the available plugins by making use of <code>videojs</code> instance returnd by onReady event.<br/>[List of VideoJS plugins](https://videojs.com/plugins/) 

### Available Props:
<table> 
  <thead> 
    <tr>
      <th>Prop Name</th>
      <th>Prop Type</th>
      <th>Default Value</th>
      <th>Description</th>
    </tr> 
  </thead> 
  <tbody>
    <tr>
      <td>src</td>
      <td><code>string</code></td>
      <td><code>""</code></td>
      <td>Video file path</td>
    </tr>
    <tr>
      <td>poster</td>
      <td><code>string</code></td>
      <td><code>""</code></td>
      <td>Video poster file path</td>
    </tr>
    <tr>
      <td>width</td>
      <td><code>string | number</code></td>
      <td><code>auto</code></td>
      <td>Video player width</td>
    </tr>
    <tr>
      <td>height</td>
      <td><code>string | number</code></td>
      <td><code>auto</code></td>
      <td>Video player height</td>
    </tr>
    <tr>
      <td>controls</td>
      <td><code>boolean</code></td>
      <td><code>true</code></td>
      <td>Video player control bar toggle</td>
    </tr>
    <tr>
      <td>autoplay</td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
      <td>Video will start playing automatically if <code>true</code></td>
    </tr>
    <tr>
      <td>preload</td>
      <td><code>string</code></td>
      <td><code>auto</code></td>
      <td>video tag preload attribute</td>
    </tr>
    <tr>
      <td>playbackRates</td>
      <td><code>array</code></td>
      <td><code>[0.5, 1, 1.5, 2]</code></td>
      <td>Video speed control</td>
    </tr>
    <tr>
      <td>hideControls</td>
      <td><code>array</code></td>
      <td><code>[]</code></td>
      <td>List of controls to hide. <code>['play','volume','seekbar','timer','playbackrates','fullscreen']</code></td>
    </tr>
    <tr>
      <td>bigPlayButton</td>
      <td><code>boolean</code></td>
      <td><code>true</code></td>
      <td>Big play button visibility toggle</td>
    </tr> 
    <tr>
      <td>bigPlayButtonCentered</td>
      <td><code>boolean</code></td>
      <td><code>true</code></td>
      <td>Big play button center position toggle</td>
    </tr> 
    <tr>
      <td>className</td>
      <td><code>string</code></td>
      <td><code>""</code></td>
      <td>Video player wrapper class. It can be used for custom player skin.</td>
    </tr>
  </tbody> 
</table>

### Video tracking props:
<table> 
  <thead> 
    <tr>
      <th>Method Name</th>
      <th>Description</th>
    </tr> 
  </thead> 
  <tbody>
    <tr>
      <td>onReady</td>
      <td>It will fire when video player is ready to be used. It returns <code>videojs</code> instance.</td>
    </tr>
    <tr>
      <td>onPlay</td>
      <td>It will fire when video starts playing anytime. It returns current time of the video</td>
    </tr>
    <tr>
      <td>onPause</td>
      <td>It will fire when video is paused. It returns current time of the video</td>
    </tr>
    <tr>
      <td>onTimeUpdate</td>
      <td>It keeps firing while video is in playing state. It returns current time of the video</td>
    </tr>
    <tr>
      <td>onSeeking</td>
      <td>It will fire when video is beeing seeked using seekbar. It returns current time of the video</td>
    </tr>
    <tr>
      <td>onSeeked</td>
      <td>It will fire after seeking is done. It returns seek start time and seek end time for the video.</td>
    </tr>
    <tr>
      <td>onEnd</td>
      <td>It will fire when video is finished playing.</td>
    </tr>
  </tbody>
</table>
