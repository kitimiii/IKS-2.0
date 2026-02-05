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

    // Game items - 4 traditional calligraphy (correct) and 6 modern/typography (incorrect)
    const gameItems = [
        { id: 1, image: abcTraditional, isCorrect: true },
        { id: 2, image: handlettering, isCorrect: false, tooltip: "Hierbei handelt es sich um Handlettering, eine moderne Kunstform, welche nicht zur traditionellen Kalligraphie gehört." },
        { id: 3, image: arabCalligraphy, isCorrect: true },
        { id: 4, image: typografie, isCorrect: false, tooltip: "Hierbei handelt es sich um Typografie, die sich auf gedruckte oder digitale Schrift bezieht." },
        { id: 5, image: chineseCalligraphy, isCorrect: true },
        { id: 6, image: handlettering2, isCorrect: false, tooltip: "Dies ist modernes Handlettering, eine zeitgenössische Schriftkunst, aber keine traditionelle Kalligraphie." },
        { id: 7, image: modernCalligraphy, isCorrect: true },
        { id: 8, image: typografie2, isCorrect: false, tooltip: "Hierbei handelt es sich um Typografische Schriften, die für den Druck konzipiert sind und sich von der handgeschriebenen Kalligraphie unterscheiden." },
        { id: 9, image: handlettering3, isCorrect: false, tooltip: "Dies ist Handlettering, eine dekorative Schriftgestaltung, aber keine klassische Kalligraphie." },
        { id: 10, image: typografie3, isCorrect: false, tooltip: "Diese digitale Typografie gehört nicht zur traditionellen, handgeschriebenen Kalligraphie." },
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
    };

    const handleTryAgain = () => {
        setSelectedItems([]);
        setIsSubmitted(false);
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
                                            {item.tooltip || infoTooltipText}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Result Row - shows after submit */}
            {isSubmitted && (
                <div className="result-row">
                    <span className="result-text">{correctAnswersCount}/4 richtig</span>
                    {correctAnswersCount !== 4 && (
                        <button className="try-again-button" onClick={handleTryAgain}>
                            Try Again
                        </button>
                    )}
                </div>
            )}

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
