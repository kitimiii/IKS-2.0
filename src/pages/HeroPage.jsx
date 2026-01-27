import React from 'react';
import './HeroPage.css';
import AudioPlayButton from '../components/AudioPlayButton';
import background from '../assets/background.png';

const HeroPage = ({ onAudioClick, isPlaying }) => {
    return (
        <div className="hero-page" style={{ backgroundImage: `url(${background})` }}>
            {/* Audio Play Button */}
            <AudioPlayButton onClick={onAudioClick} isPlaying={isPlaying} />

            {/* Content */}
            <div className="hero-content">
                <h1 className="hero-title">
                    DIE KUNST DES<br />SCHÖNSCHREIBENS
                </h1>
                <p className="hero-subheader">
                    Zieh die Kopfhörer an und starte das Audio,<br />
                    um in die Kalligraphie einzutauchen.
                </p>
            </div>
        </div>
    );
};

export default HeroPage;
