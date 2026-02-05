import React, { useState, useEffect } from 'react';
import PageWrapper from '../PageWrapper';
import Model3DViewer from '../Model3DViewer';
import './TheoryPage.css';

const TheoryPage = ({
    // Page title - e.g. "Feather quill", "Qalam ", "Maobi"
    title = 'Feather quill',
    // Info text for the InfotextBox - customizable
    infoText = 'Das ist die .... Werkzeug um die ... Schrift auszuführen',
    // Info content for InfotextBox (JSX) - takes precedence over infoText
    infoContent = null,
    // 3D Model settings - all customizable
    modelPath = '/models/Stift_platzhalter/scene.gltf',
    modelContainerWidth = 400,
    modelContainerHeight = 400,
    baseRotation = [0, 0, 0],
    autoRotateSpeed = 0.35,
    modelScale = 1,
    // InfotextBox settings - all customizable
    infoBoxHeight = 400,
    infoBoxWidth = null,
    backgroundImage = null,
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
                        modelScale={modelScale}
                    />
                </div>

                {/* Papyrus Bild mit Text - positioned right side */}
                {backgroundImage && (
                    <div 
                        className="theory-text-container"
                        style={{
                            position: 'relative',
                            width: infoBoxWidth || 450,
                            height: infoBoxHeight,
                            opacity: showInfoBox ? 1 : 0,
                            transform: showInfoBox ? 'translateX(0)' : 'translateX(100px)',
                            transition: 'all 0.8s ease-out'
                        }}
                    >
                        <img 
                            src={backgroundImage} 
                            alt="Papyrus" 
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                borderRadius: '12px'
                            }}
                        />
                        <div 
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '2em'
                            }}
                        >
                            <div style={{
                                fontSize: '1.1em',
                                color: '#61554B',
                                fontFamily: 'Sedan, serif',
                                lineHeight: 1.6,
                                textAlign: 'left'
                            }}>
                                {infoContent || infoText}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PageWrapper>
    );
};

export default TheoryPage;
