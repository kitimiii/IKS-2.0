import React from 'react';
import './HeroPage.css';
import background from '../assets/background.png';
import StarBorder from '../components/StarBorder';

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
                <StarBorder
                    as="button"
                    className="hero-play-button"
                    color="#B45124" // Dark brown/orange for better visibility
                    speed="4s"
                    thickness={4}
                    onClick={onPlayClick}
                >
                    Start
                </StarBorder>
            </div>
        </div>
    );
};

export default HeroPage;
