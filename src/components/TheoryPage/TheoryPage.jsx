import React, { useState, useEffect } from 'react';
import PageWrapper from '../PageWrapper';
import Model3DViewer from '../Model3DViewer';
import InfotextBox from '../InfotextBox';
import './TheoryPage.css';

const TheoryPage = ({
    // Page title - e.g. "Federkiel", "Qualam", "Maobi"
    title = 'Federkiel',
    // Info text for the InfotextBox - customizable
    infoText = 'Das ist die .... Werkzeug um die ... Schrift auszuführen',
    // 3D Model settings - all customizable
    modelPath = '/models/Stift_platzhalter/scene.gltf',
    modelContainerWidth = 400,
    modelContainerHeight = 400,
    baseRotation = [0, 0, 0],
    autoRotateSpeed = 0.35,
    // InfotextBox settings - all customizable
    infoBoxHeight = 400,
    infoBoxWidth = null,
    // Visibility control for animations
    isVisible = true
}) => {
    const [showInfoBox, setShowInfoBox] = useState(false);

    // Trigger InfotextBox animation when page becomes visible
    useEffect(() => {
        if (isVisible) {
            // Small delay to ensure page transition is complete
            const timer = setTimeout(() => {
                setShowInfoBox(true);
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setShowInfoBox(false);
        }
    }, [isVisible]);

    return (
        <PageWrapper
            pageHint=""
            showHint={false}
        >
            {/* H1 Title - positioned top-left like pageHint */}
            <h1 className="theory-page-title">{title}</h1>

            {/* Main content layout */}
            <div className="theory-page-content">
                {/* 3D Model Container - positioned center-left */}
                <div className="theory-model-container">
                    <Model3DViewer
                        modelPath={modelPath}
                        containerWidth={modelContainerWidth}
                        containerHeight={modelContainerHeight}
                        baseRotation={baseRotation}
                        autoRotateSpeed={autoRotateSpeed}
                    />
                </div>

                {/* InfotextBox - positioned right side */}
                <InfotextBox
                    isVisible={showInfoBox}
                    infoText={infoText}
                    height={infoBoxHeight}
                    width={infoBoxWidth}
                    position="right"
                    colors={['#E8E4E0', '#D4CEC8']}
                    accentColor="#61554B"
                />
            </div>
        </PageWrapper>
    );
};

export default TheoryPage;
