import { useState, useEffect } from 'react';
import './CalligraphyGame.css';

// Import game images - Traditional Calligraphy (correct answers)
import abcTraditional from '../../assets/Images/abcTraditional.jpg';
import arabCalligraphy from '../../assets/Images/arab_calligraphy.jpg';
import chineseCalligraphy from '../../assets/Images/chineseCalligraphy.jpg';
import modernCalligraphy from '../../assets/Images/modern_Calligraphy.jpg';

// Import game images - Not traditional calligraphy (incorrect answers)
import handlettering from '../../assets/Images/Handlettering.jpg';
import handlettering2 from '../../assets/Images/Handlettering2.jpg';
import handlettering3 from '../../assets/Images/Handlettering3.jpg';
import typografie from '../../assets/Images/Typografie.avif';
import typografie2 from '../../assets/Images/Typografie2.png';
import typografie3 from '../../assets/Images/Typografie3.jpg';

const CalligraphyGame = ({
    // Customizable props
    instructionText = "Mark all 4 words that belong to the topic calligraphy.",
    requiredSelections = 4,
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
    const [showResultPopup, setShowResultPopup] = useState(false);

    // Game items - 4 traditional calligraphy (correct) and 6 modern/typography (incorrect)
    const gameItems = [
        { id: 1, image: abcTraditional, isCorrect: true },
        { id: 2, image: handlettering, isCorrect: false },
        { id: 3, image: arabCalligraphy, isCorrect: true },
        { id: 4, image: typografie, isCorrect: false },
        { id: 5, image: chineseCalligraphy, isCorrect: true },
        { id: 6, image: handlettering2, isCorrect: false },
        { id: 7, image: modernCalligraphy, isCorrect: true },
        { id: 8, image: typografie2, isCorrect: false },
        { id: 9, image: handlettering3, isCorrect: false },
        { id: 10, image: typografie3, isCorrect: false },
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
        if (selectedItems.length < 1) {
            // Zeige Warnung wenn nichts ausgewählt
            setShowWarning(true);
            return;
        }
        setIsSubmitted(true);
        setShowResultPopup(true);
    };

    const handleTryAgain = () => {
        setSelectedItems([]);
        setIsSubmitted(false);
        setShowResultPopup(false);
    };

    // Berechne die Anzahl der richtigen Antworten
    const correctAnswersCount = selectedItems.filter(id => {
        const item = gameItems.find(item => item.id === id);
        return item && item.isCorrect;
    }).length;

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

    const isButtonActive = selectedItems.length >= 1;

    return (
        <div className="calligraphy-game">
            {/* Instruction Text */}
            <h2 className="game-instruction">{instructionText}</h2>

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

            {/* Result Popup */}
            {showResultPopup && (
                <div className="result-popup-overlay" onClick={() => setShowResultPopup(false)}>
                    <div className="result-popup" onClick={(e) => e.stopPropagation()}>
                        <h2 className="result-title">{correctAnswersCount}/4 richtig</h2>
                        <button className="try-again-button" onClick={handleTryAgain}>
                            Try Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalligraphyGame;
