import React from 'react';
import './AudioPlayButton.css';

const AudioPlayButton = ({ onClick, isPlaying = false }) => {
    return (
        <button
            className="audio-play-button"
            onClick={onClick}
            aria-label={isPlaying ? "Audio pausieren" : "Audio abspielen"}
        >
            {isPlaying ? (
                /* Pause Icon */
                <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="#61554B"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect x="15" y="12" width="10" height="36" rx="2" />
                    <rect x="35" y="12" width="10" height="36" rx="2" />
                </svg>
            ) : (
                /* Play Icon */
                <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="#61554B"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <polygon points="20,10 50,30 20,50" />
                </svg>
            )}
        </button>
    );
};

export default AudioPlayButton;
