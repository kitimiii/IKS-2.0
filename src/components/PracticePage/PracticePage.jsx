import React, { useRef, useState, useEffect, useCallback } from 'react';
import PageWrapper from '../PageWrapper';
import './PracticePage.css';
import vorlage from '../../assets/nachfahren-vorlage.svg';
import SchreibuebungDeutsch from '../../assets/Images/SchreibuebungDeutsch.PNG';
import TrashBraun from '../../assets/Images/TrashBraun.PNG';

// Konfigurierbare Größen - hier kannst du später Werte ändern
const CONFIG = {
    canvasWidth: 860,        // Canvas Breite (User requested 860px)
    canvasHeight: 330,       // Canvas Höhe (User requested 330px)
    canvasPadding: 20,       // Abstand um das SVG
    buttonSize: 40,          // Button Größe
};

// Pinsel-Konfiguration (Standard: Feder)
const BRUSH = {
    baseSize: 4,
    minSize: 5,
    maxSize: 20,
    pressureSensitivity: 0.8,
};

const PracticePage = ({
    // Page title - e.g. "Feather quill", "Qalam ", "Maobi"
    title = 'Werkzeug/Schriftart',
    // Subtitle text - customizable for each page
    subtitleText = 'Nehme den Stift in die Hand und schreibe nun',
    subtitleText2 = 'das Wort in der … Schrift nach',
    // Audio controls
    onAudioClick,
    isPlaying = false,
    // Optional: Custom image path
    imagePath,
}) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [strokes, setStrokes] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const [currentStroke, setCurrentStroke] = useState([]);
    const [lastPoint, setLastPoint] = useState(null);
    const [lastTime, setLastTime] = useState(null);
    const [svgLoaded, setSvgLoaded] = useState(false);
    const svgImageRef = useRef(null);

    // SVG Bild laden
    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            svgImageRef.current = img;
            setSvgLoaded(true);
        };
        // Verwende das übergebene Bild oder das Standard-SVG
        img.src = imagePath || vorlage;
    }, [imagePath]);

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
            ctx.globalAlpha = 1;
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

    // Berechne Pinselgröße basierend auf Richtung oder Geschwindigkeit
    const calculateBrushSize = (prevPoint, currentPoint, currentTime) => {
        if (!prevPoint) return BRUSH.baseSize;

        const dx = currentPoint.x - prevPoint.x;
        const dy = currentPoint.y - prevPoint.y;

        // Für Maobi: Strichstärke basierend auf Geschwindigkeit
        if (title === 'Maobi') {
            // Langsame Bewegung = dick, schnelle Bewegung = dünn
            if (!lastTime || !currentTime) return BRUSH.baseSize;

            const distance = Math.sqrt(dx * dx + dy * dy);
            const timeDelta = currentTime - lastTime;

            // Vermeide Division durch Null
            if (timeDelta <= 0 || distance <= 0) return BRUSH.baseSize;

            // Geschwindigkeit in Pixel pro Millisekunde
            const velocity = distance / timeDelta;

            // Viel größerer Geschwindigkeitsbereich für mehr Mittelwerte
            const slowVelocity = 0.05;  // Sehr langsam = maximale Dicke
            const fastVelocity = 5.0;   // Sehr schnell = minimale Dicke

            // Normalisiere Geschwindigkeit (0 = langsam, 1 = schnell)
            let normalizedVelocity = (velocity - slowVelocity) / (fastVelocity - slowVelocity);
            normalizedVelocity = Math.max(0, Math.min(1, normalizedVelocity));

            // Sanfterer Übergang mit niedrigerem Exponenten für mehr Mittelwerte
            const exponentialFactor = Math.pow(normalizedVelocity, 0.7);

            // Invertiere für dickere Striche bei langsamer Bewegung (1 = dick, 0 = dünn)
            const thickness = 1 - exponentialFactor;

            // Interpoliere zwischen minSize und maxSize mit sanfter Kurve
            const newSize = BRUSH.minSize + (BRUSH.maxSize - BRUSH.minSize) * thickness;

            return newSize;
        } else {
            // Für andere Werkzeuge: Strichstärke basierend auf Richtung
            // Berechne den Winkel der Bewegung
            const angle = Math.atan2(dy, dx);

            // Für Feather quill: 30° Rotation wie bei einem echten Feather quill
            if (title === 'Feather quill') {
                // Feather quill wird in 30° Winkel gehalten
                const penAngle = -30 * Math.PI / 180; // 30° in Radiant

                // Berechne den Winkel relativ zur Feather quill-Orientierung
                // Die dicksten Striche entstehen senkrecht zur Schnittfläche (bei 30° + 90° = 120°)
                // Die dünnsten parallel zur Schnittfläche (bei 30°)
                const relativeAngle = angle - penAngle;

                // sin² gibt uns die Strichstärke: 0 bei 0°/180° (dünn), 1 bei 90°/270° (dick)
                const sinValue = Math.sin(relativeAngle);
                const thickness = Math.abs(sinValue);

                // Interpoliere zwischen minSize und maxSize
                const newSize = BRUSH.minSize + (BRUSH.maxSize - BRUSH.minSize) * thickness;

                return newSize;
            } else {
                // Für Qalam: Konstante Strichstärke in alle Richtungen (immer dick)
                return BRUSH.maxSize;
            }
        }
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
        const currentTime = Date.now();
        const point = { x: pos.x, y: pos.y, size: BRUSH.baseSize };
        setCurrentStroke([point]);
        setLastPoint(pos);
        setLastTime(currentTime);
        setRedoStack([]);
    };

    // Zeichnen fortsetzen
    const handleMouseMove = (e) => {
        if (!isDrawing) return;

        const pos = getMousePos(e);
        const currentTime = Date.now();
        const size = calculateBrushSize(lastPoint, pos, currentTime);

        const point = { x: pos.x, y: pos.y, size };
        setCurrentStroke(prev => [...prev, point]);
        setLastPoint(pos);
        setLastTime(currentTime);
    };

    // Zeichnen beenden
    const handleMouseUp = () => {
        if (isDrawing && currentStroke.length > 0) {
            setStrokes(prev => [...prev, currentStroke]);
            setCurrentStroke([]);
        }
        setIsDrawing(false);
        setLastPoint(null);
        setLastTime(null);
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
                        style={{
                            cursor: getCursorStyle(),
                            touchAction: 'none'
                        }}
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
                        <button
                            className="practice-control-button practice-trash-button"
                            onClick={() => {
                                setStrokes([]);
                                setRedoStack([]);
                            }}
                            disabled={strokes.length === 0}
                            style={{
                                width: '40px',
                                height: '40px',
                                padding: '2px'
                            }}
                            title="Alles löschen"
                        >
                            <img src={TrashBraun} alt="Löschen" style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
                        </button>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default PracticePage;
