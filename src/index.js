import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Controls from './Controls.json';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

class VideoPlayer extends Component {
    playerId = `video-player-${(new Date) * 1}`
    player = {};
    componentDidMount() {
        this.init_player(this.props);
        this.init_player_events(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.set_controls_visibility(this.player, nextProps.hideControls);
        if (this.props.src !== nextProps.src) {
            this.init_player(nextProps);
        }
    }

    componentWillUnmount() {
        if (this.player) this.player.dispose();
    }

    init_player(props) {
        const playerOptions = this.generate_player_options(props);
        this.player = videojs(document.querySelector(`#${this.playerId}`), playerOptions);
        this.player.src(props.src)
        this.player.poster(props.poster)
        this.set_controls_visibility(this.player, props.hideControls);
    }

    generate_player_options(props) {
        const playerOptions = {};
        playerOptions.autoplay = props.autoplay;
        playerOptions.bigPlayButton = props.bigPlayButton;
        playerOptions.controls = props.controls;
        playerOptions.height = props.height;
        playerOptions.preload = props.preload;
        playerOptions.width = props.width;
        playerOptions.withCredentials = props.withCredentials;
        const hidePlaybackRates = props.hidePlaybackRates || props.hideControls.includes('playbackrates');
        if (!hidePlaybackRates) playerOptions.playbackRates = props.playbackRates;
        return playerOptions;
    }

    set_controls_visibility(player, hidden_controls) {
        Object.keys(Controls).map(x => { player.controlBar[Controls[x]].show() })
        hidden_controls.map(x => { player.controlBar[Controls[x]].hide() });
    }

    init_player_events(props) {
        let currentTime = 0;
        let previousTime = 0;
        let position = 0;

        this.player.ready(() => {
            props.onReady(this.player);
            window.player = this.player;
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
            <video id={this.playerId} className={`video-js ${this.props.bigPlayButtonCentered ? 'vjs-big-play-centered' : ''} ${this.props.className}`}></video>
        )
    }
}

VideoPlayer.propTypes = {
    autoplay: PropTypes.bool,
    bigPlayButton: PropTypes.bool,
    bigPlayButtonCentered: PropTypes.bool,
    className: PropTypes.string,
    controls: PropTypes.bool,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hideControls: PropTypes.arrayOf(PropTypes.string),
    hidePlaybackRates: PropTypes.bool,
    onEnd: PropTypes.func,
    onPause: PropTypes.func,
    onPlay: PropTypes.func,
    onReady: PropTypes.func,
    onSeeked: PropTypes.func,
    onSeeking: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    playbackRates: PropTypes.arrayOf(PropTypes.number),
    poster: PropTypes.string,
    preload: PropTypes.oneOf(['auto', 'none', 'metadata']),
    src: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    withCredentials: PropTypes.bool
}

VideoPlayer.defaultProps = {
    autoplay: false,
    bigPlayButton: true,
    bigPlayButtonCentered: true,
    className: "",
    controls: true,
    hideControls: [],
    hidePlaybackRates: false,
    onEnd: () => { },
    onPause: () => { },
    onPlay: () => { },
    onReady: () => { },
    onSeeked: () => { },
    onSeeking: () => { },
    onTimeUpdate: () => { },
    playbackRates: [0.5, 1, 1.5, 2],
    poster: "",
    preload: 'auto',
    src: "",
    withCredentials: false
}

export default VideoPlayer;