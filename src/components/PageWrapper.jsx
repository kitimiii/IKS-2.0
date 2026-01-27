import React from 'react';
import './PageWrapper.css';
import AudioPlayButton from './AudioPlayButton';
import background from '../assets/background.png';

const PageWrapper = ({
    children,
    pageHint,
    showHint = true,
    onAudioClick,
    isPlaying = false
}) => {
    return (
        <div className="page-wrapper" style={{ backgroundImage: `url(${background})` }}>
            {/* Page hint - nur anzeigen wenn showHint true ist */}
            {showHint && pageHint && (
                <div className="page-hint">
                    {pageHint}
                </div>
            )}

            {/* Audio Play Button */}
            <AudioPlayButton onClick={onAudioClick} isPlaying={isPlaying} />

            {/* Page Content */}
            <div className="page-content">
                {children}
            </div>
        </div>
    );
};

export default PageWrapper;
