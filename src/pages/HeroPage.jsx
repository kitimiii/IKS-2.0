import React from 'react';
import './HeroPage.css';
import background from '../assets/background.png';

const HeroPage = ({ onPlayClick }) => {
    return (
        <div className="hero-page" style={{ backgroundImage: `url(${background})` }}>
            {/* Content */}
            <div className="hero-content">
                <h1 className="hero-title">
                    DIE KUNST DES<br />SCHÖNSCHREIBENS
                </h1>
                <p className="hero-subheader">
                    Zieh die Kopfhörer an und starte das Audio,<br />
                    um in die Kalligraphie einzutauchen.
                </p>
                
                {/* Play Button */}
                <button className="hero-play-button" onClick={onPlayClick}>
                    Start
                </button>
            </div>
        </div>
    );
};

export default HeroPage;
