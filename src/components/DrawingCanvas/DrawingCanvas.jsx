import React, { useRef, useState, useEffect, useCallback } from 'react';
import './DrawingCanvas.css';
import vorlage from '../../assets/Images/Grundschreibübung_quer.png';
import TrashBraun from '../../assets/Images/TrashBraun.PNG';

// Konfigurierbare Größen - hier kannst du später Werte ändern
const CONFIG = {
    canvasWidth: 860,        // Canvas Breite (User requested 860px)
    canvasHeight: 330,       // Canvas Höhe (User requested 330px)
    canvasPadding: 20,       // Abstand um das SVG
    buttonSize: 40,          // Button Größe
    brushButtonWidth: 100,   // Pinsel-Button Breite
    brushButtonHeight: 40,   // Pinsel-Button Höhe
};

// Pinsel-Konfiguration
const BRUSHES = {
    feder: {
        name: 'Feather quill',
        baseSize: 2,         // Dünnere Basisstärke
        minSize: 0.5,
        maxSize: 4,
        pressureSensitivity: 0.8,
    },
    pinsel: {
        name: 'Maobi',
        baseSize: 6,         // Dickere Basisstärke
        minSize: 3,
        maxSize: 12,
        pressureSensitivity: 1.2,
    },
    qalam: {
        name: 'Qalam',
        baseSize: 2,         // Mittlere Basisstärke
        minSize: 1,
        maxSize: 8,
        pressureSensitivity: 0.8,
    }
};

const DrawingCanvas = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentBrush, setCurrentBrush] = useState('feder');
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
            ctx.globalAlpha = 0.3; // SVG etwas transparent
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
    const calculateBrushSize = (prevPoint, currentPoint, brush, currentTime) => {
        if (!prevPoint) return brush.baseSize;

        const dx = currentPoint.x - prevPoint.x;
        const dy = currentPoint.y - prevPoint.y;

        // Für Feather quill: Strichstärke basierend auf Richtung
        if (brush.name === 'Feather quill') {
            // Berechne den Winkel der Bewegung
            const angle = Math.atan2(dy, dx);

            // Vertikale Striche (±90°) = dick, Horizontale Striche (0° oder 180°) = dünn
            // Math.cos gibt 1 bei 0°, 0 bei 90°, -1 bei 180°
            // Wir nehmen den Absolutwert und invertieren für unsere Zwecke
            const horizontalness = Math.abs(Math.cos(angle)); // 1 = horizontal, 0 = vertikal

            // Interpoliere zwischen minSize (horizontal) und maxSize (vertikal)
            const newSize = brush.minSize + (brush.maxSize - brush.minSize) * (1 - horizontalness);

            return newSize;
        } else if (brush.name === 'Maobi') {
            // Für Maobi: Strichstärke basierend auf Geschwindigkeit
            // Langsame Bewegung = dick, schnelle Bewegung = dünn
            if (!lastTime || !currentTime) return brush.baseSize;

            const distance = Math.sqrt(dx * dx + dy * dy);
            const timeDelta = currentTime - lastTime;

            // Vermeide Division durch Null
            if (timeDelta <= 0 || distance <= 0) return brush.baseSize;

            // Geschwindigkeit in Pixel pro Millisekunde
            const velocity = distance / timeDelta;

            // Geschwindigkeitsschwellenwerte (anpassbar)
            const slowVelocity = 0.3;  // Langsam = unter 0.3 px/ms
            const fastVelocity = 1.0;  // Schnell = über 2.0 px/ms

            // Normalisiere Geschwindigkeit (0 = langsam/dick, 1 = schnell/dünn)
            let normalizedVelocity = (velocity - slowVelocity) / (fastVelocity - slowVelocity);
            normalizedVelocity = Math.max(0, Math.min(1, normalizedVelocity));

            // Invertiere für dickere Striche bei langsamer Bewegung
            const thickness = 1 - normalizedVelocity;

            // Interpoliere zwischen minSize (schnell) und maxSize (langsam)
            const newSize = brush.minSize + (brush.maxSize - brush.minSize) * thickness;

            return newSize;
        } else {
            // Für Qalam: ursprüngliche Logik beibehalten
            const sensitivity = brush.pressureSensitivity;
            let sizeModifier = dy * 0.05 * sensitivity;
            let newSize = brush.baseSize + sizeModifier;
            newSize = Math.max(brush.minSize, Math.min(brush.maxSize, newSize));
            return newSize;
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
        const brush = BRUSHES[currentBrush];
        const point = { x: pos.x, y: pos.y, size: brush.baseSize };
        setCurrentStroke([point]);
        setLastPoint(pos);
        setLastTime(currentTime);
        setRedoStack([]); // Redo-Stack leeren bei neuem Strich
    };

    // Zeichnen fortsetzen
    const handleMouseMove = (e) => {
        if (!isDrawing) return;

        const pos = getMousePos(e);
        const currentTime = Date.now();
        const brush = BRUSHES[currentBrush];
        const size = calculateBrushSize(lastPoint, pos, brush, currentTime);

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

    // Cursor Stil basierend auf aktuellem Pinsel
    const getCursorStyle = () => {
        const brush = BRUSHES[currentBrush];
        const size = brush.baseSize * 2;
        return `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${size * 2}" height="${size * 2}"><circle cx="${size}" cy="${size}" r="${size - 1}" fill="none" stroke="%23060010" stroke-width="1"/></svg>') ${size} ${size}, crosshair`;
    };

    return (
        <div className="drawing-canvas-wrapper">
            {/* Anleitung Text */}
            <p className="drawing-instruction">
                Nehme den Stift in die Hand und fahre die Grundstriche nach
                <br />
                um mit dem schreiben vertraut zu werden.
            </p>

            {/* Canvas Container */}
            <div
                className="canvas-container"
                style={{
                    width: CONFIG.canvasWidth + CONFIG.canvasPadding * 2,
                    height: CONFIG.canvasHeight + CONFIG.canvasPadding * 2,
                }}
            >
                <canvas
                    ref={canvasRef}
                    width={CONFIG.canvasWidth}
                    height={CONFIG.canvasHeight}
                    className="drawing-canvas"
                    style={{
                        cursor: getCursorStyle(),
                        touchAction: 'none' // Disable browser handling of gestures
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

            {/* Controls Container */}
            <div className="canvas-controls">
                {/* Pinsel Auswahl - Mitte */}
                <div className="brush-selection">
                    <button
                        className={`brush-button ${currentBrush === 'feder' ? 'active' : ''}`}
                        onClick={() => setCurrentBrush('feder')}
                        style={{
                            width: CONFIG.brushButtonWidth,
                            height: CONFIG.brushButtonHeight
                        }}
                    >
                        {BRUSHES.feder.name}
                    </button>
                    <button
                        className={`brush-button ${currentBrush === 'pinsel' ? 'active' : ''}`}
                        onClick={() => setCurrentBrush('pinsel')}
                        style={{
                            width: CONFIG.brushButtonWidth,
                            height: CONFIG.brushButtonHeight
                        }}
                    >
                        {BRUSHES.pinsel.name}
                    </button>
                    <button
                        className={`brush-button ${currentBrush === 'qalam' ? 'active' : ''}`}
                        onClick={() => setCurrentBrush('qalam')}
                        style={{
                            width: CONFIG.brushButtonWidth,
                            height: CONFIG.brushButtonHeight
                        }}
                    >
                        {BRUSHES.qalam.name}
                    </button>
                </div>

                {/* Undo/Redo Buttons - Rechts */}
                <div className="undo-redo-buttons">
                    <button
                        className="control-button undo-button"
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
                        className="control-button redo-button"
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
                        className="control-button trash-button"
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
    );
};

export default DrawingCanvas;
