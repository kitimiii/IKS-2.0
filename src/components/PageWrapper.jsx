import React from 'react';
import './PageWrapper.css';
import background from '../assets/background.png';

const PageWrapper = ({
    children,
    pageHint,
    showHint = true
}) => {
    return (
        <div className="page-wrapper" style={{ backgroundImage: `url(${background})` }}>
            {/* Page hint - nur anzeigen wenn showHint true ist */}
            {showHint && pageHint && (
                <div className="page-hint">
                    {pageHint}
                </div>
            )}

            {/* Page Content */}
            <div className="page-content">
                {children}
            </div>
        </div>
    );
};

export default PageWrapper;
