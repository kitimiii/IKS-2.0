import { useState, useEffect } from 'react';
import './CalligraphyGame.css';

// Import game images
import arabicYes from '../../assets/game-image/arabic.yes.png';
import kalliNot from '../../assets/game-image/kalli.not.png';

const CalligraphyGame = ({
    // Customizable props
    instructionText = "Markiere alle Wörter die man zur Kalligraphie unterordnet",
    requiredSelections = 7,
    submitButtonPosition = { left: '50%', transform: 'translateX(-50%)' }, // Veränderbar
    correctOpacity = 0.3, // Transparenz für richtige Antworten
    incorrectOpacity = 0.3, // Transparenz für falsche Antworten
    infoTooltipDelay = 5000, // 5 Sekunden bis Tooltip verschwindet
    infoTooltipText = "Dieses Wort gehört nicht zur traditionellen Kalligraphie, da es sich um moderne digitale Schrift handelt." // Platzhalter
}) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [hoveredInfoId, setHoveredInfoId] = useState(null);

    // Game items - 5x arabic.yes (correct) and 5x kalli.not (incorrect)
    const gameItems = [
        { id: 1, image: arabicYes, isCorrect: true },
        { id: 2, image: kalliNot, isCorrect: false },
        { id: 3, image: arabicYes, isCorrect: true },
        { id: 4, image: kalliNot, isCorrect: false },
        { id: 5, image: arabicYes, isCorrect: true },
        { id: 6, image: kalliNot, isCorrect: false },
        { id: 7, image: arabicYes, isCorrect: true },
        { id: 8, image: kalliNot, isCorrect: false },
        { id: 9, image: arabicYes, isCorrect: true },
        { id: 10, image: kalliNot, isCorrect: false },
    ];

    const handleItemClick = (id) => {
        if (isSubmitted) return; // Keine Änderungen nach Submit

        if (selectedItems.includes(id)) {
            // Deselect
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            // Select (nur wenn noch nicht 7 ausgewählt)
            if (selectedItems.length < requiredSelections) {
                setSelectedItems([...selectedItems, id]);
            }
        }
    };

    const handleSubmit = () => {
        if (selectedItems.length < requiredSelections) {
            // Zeige Warnung
            setShowWarning(true);
            return;
        }
        setIsSubmitted(true);
    };

    // Auto-hide warning after delay
    useEffect(() => {
        if (showWarning) {
            const timer = setTimeout(() => {
                setShowWarning(false);
            }, infoTooltipDelay);
            return () => clearTimeout(timer);
        }
    }, [showWarning, infoTooltipDelay]);

    // Auto-hide info tooltip after delay
    useEffect(() => {
        if (hoveredInfoId !== null) {
            const timer = setTimeout(() => {
                setHoveredInfoId(null);
            }, infoTooltipDelay);
            return () => clearTimeout(timer);
        }
    }, [hoveredInfoId, infoTooltipDelay]);

    const isButtonActive = selectedItems.length === requiredSelections;

    return (
        <div className="calligraphy-game">
            {/* Instruction Text */}
            <h2 className="game-instruction">{instructionText}</h2>

            {/* Counter Box */}
            <div className="counter-box">
                <span className="counter-text">
                    {selectedItems.length}/{requiredSelections}
                </span>
            </div>

            {/* Game Grid */}
            <div className="game-grid">
                {gameItems.map((item) => {
                    const isSelected = selectedItems.includes(item.id);
                    const showResult = isSubmitted && isSelected;
                    const isCorrectSelection = showResult && item.isCorrect;
                    const isIncorrectSelection = showResult && !item.isCorrect;

                    return (
                        <div
                            key={item.id}
                            className={`game-item ${isSelected ? 'selected' : ''} ${isCorrectSelection ? 'correct' : ''
                                } ${isIncorrectSelection ? 'incorrect' : ''}`}
                            onClick={() => handleItemClick(item.id)}
                            style={{
                                cursor: isSubmitted ? 'default' : 'pointer',
                            }}
                        >
                            <img
                                src={item.image}
                                alt={`Calligraphy item ${item.id}`}
                                className="game-image"
                            />

                            {/* Overlay for correct/incorrect */}
                            {isCorrectSelection && (
                                <div
                                    className="result-overlay correct-overlay"
                                    style={{ opacity: correctOpacity }}
                                />
                            )}
                            {isIncorrectSelection && (
                                <div
                                    className="result-overlay incorrect-overlay"
                                    style={{ opacity: incorrectOpacity }}
                                />
                            )}

                            {/* Info Icon for incorrect selections */}
                            {isIncorrectSelection && (
                                <div className="info-icon-container">
                                    <div
                                        className="info-icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setHoveredInfoId(item.id);
                                        }}
                                    >
                                        i
                                    </div>

                                    {/* Info Tooltip */}
                                    {hoveredInfoId === item.id && (
                                        <div className="info-tooltip">
                                            {infoTooltipText}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Submit Button */}
            <div className="submit-button-container" style={submitButtonPosition}>
                {/* Warning Message */}
                {showWarning && (
                    <div className="warning-message">
                        Bitte wähle zuvor {requiredSelections} Schriften aus
                    </div>
                )}

                <button
                    className={`submit-button ${isButtonActive ? 'active' : 'inactive'}`}
                    onClick={handleSubmit}
                    disabled={!isButtonActive || isSubmitted}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default CalligraphyGame;
