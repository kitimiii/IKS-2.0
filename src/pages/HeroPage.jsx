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
                    THE ART OF<br />BEAUTIFUL WRITING
                </h1>
                <p className="hero-subheader">
                    Put on your headphones and start the audio to dive into calligraphy.
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
