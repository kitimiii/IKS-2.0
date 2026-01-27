import React, { useRef, useState, useEffect, useCallback } from 'react';
import PageWrapper from '../PageWrapper';
import './PracticePage.css';
import vorlage from '../../assets/nachfahren-vorlage.svg';

// Konfigurierbare Größen - hier kannst du später Werte ändern
const CONFIG = {
    canvasWidth: 840,        // Canvas Breite
    canvasHeight: 360,       // Canvas Höhe
    canvasPadding: 20,       // Abstand um das SVG
    buttonSize: 40,          // Button Größe
};

// Pinsel-Konfiguration (Standard: Feder)
const BRUSH = {
    baseSize: 2,
    minSize: 0.5,
    maxSize: 4,
    pressureSensitivity: 0.8,
};

const PracticePage = ({
    // Page title - e.g. "Federkiel", "Qualam", "Maobi"
    title = 'Werkzeug/Schriftart',
    // Subtitle text - customizable for each page
    subtitleText = 'Nehme den Stift in die Hand und schreibe nun',
    subtitleText2 = 'das Wort in der … Schrift nach',
    // Audio controls
    onAudioClick,
    isPlaying = false,
}) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [strokes, setStrokes] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const [currentStroke, setCurrentStroke] = useState([]);
    const [lastPoint, setLastPoint] = useState(null);
    const [svgLoaded, setSvgLoaded] = useState(false);
    const svgImageRef = useRef(null);

    // SVG Bild laden
    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            svgImageRef.current = img;
            setSvgLoaded(true);
        };
        img.src = vorlage;
    }, []);

    // Canvas zeichnen/neu zeichnen
    const redrawCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Canvas löschen
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Weißer Hintergrund
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // SVG Bild zeichnen (zentriert)
        if (svgImageRef.current && svgLoaded) {
            const img = svgImageRef.current;
            const scale = Math.min(
                (canvas.width - CONFIG.canvasPadding * 2) / img.width,
                (canvas.height - CONFIG.canvasPadding * 2) / img.height
            );
            const x = (canvas.width - img.width * scale) / 2;
            const y = (canvas.height - img.height * scale) / 2;
            ctx.globalAlpha = 0.3;
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            ctx.globalAlpha = 1;
        }

        // Alle gespeicherten Striche zeichnen
        strokes.forEach(stroke => {
            drawStroke(ctx, stroke);
        });

        // Aktuellen Strich zeichnen
        if (currentStroke.length > 0) {
            drawStroke(ctx, currentStroke);
        }
    }, [strokes, currentStroke, svgLoaded]);

    useEffect(() => {
        redrawCanvas();
    }, [redrawCanvas]);

    // Einzelnen Strich zeichnen
    const drawStroke = (ctx, stroke) => {
        if (stroke.length < 2) return;

        ctx.strokeStyle = '#060010';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 1; i < stroke.length; i++) {
            const prev = stroke[i - 1];
            const curr = stroke[i];

            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(curr.x, curr.y);
            ctx.lineWidth = curr.size;
            ctx.stroke();
        }
    };

    // Berechne Pinselgröße basierend auf Richtung
    const calculateBrushSize = (prevPoint, currentPoint) => {
        if (!prevPoint) return BRUSH.baseSize;

        const dy = currentPoint.y - prevPoint.y;
        const sensitivity = BRUSH.pressureSensitivity;

        let sizeModifier = dy * 0.05 * sensitivity;
        let newSize = BRUSH.baseSize + sizeModifier;

        newSize = Math.max(BRUSH.minSize, Math.min(BRUSH.maxSize, newSize));

        return newSize;
    };

    // Mausposition relativ zum Canvas
    const getMousePos = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    };

    // Zeichnen starten
    const handleMouseDown = (e) => {
        setIsDrawing(true);
        const pos = getMousePos(e);
        const point = { x: pos.x, y: pos.y, size: BRUSH.baseSize };
        setCurrentStroke([point]);
        setLastPoint(pos);
        setRedoStack([]);
    };

    // Zeichnen fortsetzen
    const handleMouseMove = (e) => {
        if (!isDrawing) return;

        const pos = getMousePos(e);
        const size = calculateBrushSize(lastPoint, pos);

        const point = { x: pos.x, y: pos.y, size };
        setCurrentStroke(prev => [...prev, point]);
        setLastPoint(pos);
    };

    // Zeichnen beenden
    const handleMouseUp = () => {
        if (isDrawing && currentStroke.length > 0) {
            setStrokes(prev => [...prev, currentStroke]);
            setCurrentStroke([]);
        }
        setIsDrawing(false);
        setLastPoint(null);
    };

    // Touch Events
    const handleTouchStart = (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY });
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
    };

    const handleTouchEnd = (e) => {
        e.preventDefault();
        handleMouseUp();
    };

    // Undo - Letzten Strich entfernen
    const handleUndo = () => {
        if (strokes.length === 0) return;
        const lastStroke = strokes[strokes.length - 1];
        setRedoStack(prev => [...prev, lastStroke]);
        setStrokes(prev => prev.slice(0, -1));
    };

    // Redo - Gelöschten Strich wiederherstellen
    const handleRedo = () => {
        if (redoStack.length === 0) return;
        const strokeToRestore = redoStack[redoStack.length - 1];
        setStrokes(prev => [...prev, strokeToRestore]);
        setRedoStack(prev => prev.slice(0, -1));
    };

    // Cursor Stil
    const getCursorStyle = () => {
        const size = BRUSH.baseSize * 2;
        return `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${size * 2}" height="${size * 2}"><circle cx="${size}" cy="${size}" r="${size - 1}" fill="none" stroke="%23060010" stroke-width="1"/></svg>') ${size} ${size}, crosshair`;
    };

    return (
        <PageWrapper
            pageHint=""
            showHint={false}
            onAudioClick={onAudioClick}
            isPlaying={isPlaying}
        >
            {/* H1 Title - positioned top-left like pageHint */}
            <h1 className="practice-page-title">{title}</h1>

            <div className="practice-canvas-wrapper">
                {/* Anleitung Text */}
                <p className="practice-instruction">
                    {subtitleText}
                    <br />
                    {subtitleText2}
                </p>

                {/* Canvas Container */}
                <div
                    className="practice-canvas-container"
                    style={{
                        width: CONFIG.canvasWidth + CONFIG.canvasPadding * 2,
                        height: CONFIG.canvasHeight + CONFIG.canvasPadding * 2,
                    }}
                >
                    <canvas
                        ref={canvasRef}
                        width={CONFIG.canvasWidth}
                        height={CONFIG.canvasHeight}
                        className="practice-canvas"
                        style={{ cursor: getCursorStyle() }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    />
                </div>

                {/* Controls Container - NUR Undo/Redo Buttons */}
                <div className="practice-controls">
                    <div className="practice-undo-redo-buttons">
                        <button
                            className="practice-control-button"
                            onClick={handleUndo}
                            disabled={strokes.length === 0}
                            style={{
                                width: CONFIG.buttonSize,
                                height: CONFIG.buttonSize
                            }}
                            title="Rückgängig"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button
                            className="practice-control-button"
                            onClick={handleRedo}
                            disabled={redoStack.length === 0}
                            style={{
                                width: CONFIG.buttonSize,
                                height: CONFIG.buttonSize
                            }}
                            title="Wiederherstellen"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default PracticePage;
