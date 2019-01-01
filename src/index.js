import React, { Component } from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';


class VideoPlayer extends Component {
    playerId = `video-player-${(new Date) * 1}`
    player = {};
    componentDidMount() {
        this.init_player();
        this.init_player_events();
    }

    componentWillUnmount() {
        if (this.player) this.player.dispose();
    }

    init_player() {
        const { props } = this;
        const playerOptions = {};
        playerOptions.controls = props.controls;
        playerOptions.autoplay = props.autoplay;
        playerOptions.preload = props.preload;
        playerOptions.width = props.width;
        playerOptions.height = props.height;
        if (!props.hidePlaybackRates) playerOptions.playbackRates = props.playbackRates;
        this.player = videojs(document.querySelector(`#${this.playerId}`), playerOptions);
    }

    init_player_events() {
        const { props } = this;
        let currentTime = 0;
        let previousTime = 0;
        let position = 0;

        this.player.ready(() => {
            this.player.src(props.src)
            this.player.poster(props.poster)
            props.onReady(this.player);
        });
        this.player.on('play', () => {
            props.onPlay(this.player.currentTime());
        });
        this.player.on('pause', () => {
            props.onPause(this.player.currentTime());
        });
        this.player.on('timeupdate', (e) => {
            props.onTimeUpdate(this.player.currentTime());
            previousTime = currentTime;
            currentTime = this.player.currentTime();
            if (previousTime < currentTime) {
                position = previousTime;
                previousTime = currentTime;
            }
        });
        this.player.on('seeking', () => {
            this.player.off('timeupdate', () => { });
            this.player.one('seeked', () => { });
            props.onSeeking(this.player.currentTime());
        });

        this.player.on('seeked', () => {
            let completeTime = Math.floor(this.player.currentTime());
            props.onSeeked(position, completeTime);
        });
        this.player.on('ended', () => {
            props.onEnd();
        });
    }

    render() {
        return (
            <video id={this.playerId} className={`video-js ${this.props.className}`}></video>
        )
    }
}

VideoPlayer.propTypes = {
    src: PropTypes.string,
    poster: PropTypes.string,
    controls: PropTypes.bool,
    autoplay: PropTypes.bool,
    preload: PropTypes.oneOf(['auto', 'none', 'metadata']),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onReady: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    onSeeking: PropTypes.func,
    onSeeked: PropTypes.func,
    onEnd: PropTypes.func,
    playbackRates: PropTypes.arrayOf(PropTypes.number),
    hidePlaybackRates: PropTypes.bool,
    className: PropTypes.string
}

VideoPlayer.defaultProps = {
    src: "",
    poster: "",
    controls: true,
    autoplay: false,
    preload: 'auto',
    playbackRates: [0.5, 1, 1.5, 2],
    hidePlaybackRates: false,
    className: "",
    onReady: () => { },
    onPlay: () => { },
    onPause: () => { },
    onTimeUpdate: () => { },
    onSeeking: () => { },
    onSeeked: () => { },
    onEnd: () => { }
}


export default VideoPlayer;