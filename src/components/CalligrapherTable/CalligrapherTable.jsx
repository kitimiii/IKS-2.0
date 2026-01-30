import React from 'react';
import './CalligrapherTable.css';

// KONFIGURIERBARE WERTE - Hier kannst du Farben und Größen anpassen
const TABLE_CONFIG = {
    width: 870,                    // Tabellenbreite in px
    height: 500,                   // Tabellenhöhe in px (erhöht für mehr Länge)
    borderWidth: 2,
    borderColor: '#F9EBD5',        // Border-Farbe
    headerFill: '#B45124',         // Hintergrundfarbe der ersten Zeile
    headerTextColor: '#F9EBD5',    // Textfarbe in der ersten Zeile
    bodyTextColor: '#61554B',      // Textfarbe in den restlichen Zeilen
    column1TextColor: '#F9EBD5',   // Textfarbe in der ersten Spalte (alle Zeilen)
    borderRadius: 10,               // Radius für abgerundete Ecken
};

const CalligrapherTable = () => {
    return (
        <div className="calligrapher-table-wrapper">
            <table
                className="calligrapher-table"
                style={{
                    width: `${TABLE_CONFIG.width}px`,
                    height: `${TABLE_CONFIG.height}px`,
                    border: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                    borderRadius: `${TABLE_CONFIG.borderRadius}px`,
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: TABLE_CONFIG.headerFill }}>
                        <th style={{
                            color: TABLE_CONFIG.headerTextColor,
                            borderRight: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                        }}></th>
                        <th style={{
                            color: TABLE_CONFIG.headerTextColor,
                            borderRight: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                        }}>
                            <strong>Traditional Calligrapher</strong>
                        </th>
                        <th style={{ color: TABLE_CONFIG.headerTextColor }}>
                            <strong>Modern Calligrapher</strong>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{
                            color: TABLE_CONFIG.column1TextColor,
                            borderRight: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                            borderTop: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                        }}>
                            <strong>Role</strong>
                        </td>
                        <td style={{
                            color: TABLE_CONFIG.bodyTextColor,
                            borderRight: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                            borderTop: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                        }}>
                            Scribe, craftsman, or scholar
                        </td>
                        <td style={{
                            color: TABLE_CONFIG.bodyTextColor,
                            borderTop: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                        }}>
                            Artist, designer, craftsperson, educator
                        </td>
                    </tr>
                    <tr>
                        <td style={{
                            color: TABLE_CONFIG.column1TextColor,
                            borderRight: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                            borderTop: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                        }}>
                            <strong>Main focus</strong>
                        </td>
                        <td style={{
                            color: TABLE_CONFIG.bodyTextColor,
                            borderRight: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                            borderTop: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                        }}>
                            Preserving and reproducing texts with precision and consistency
                        </td>
                        <td style={{
                            color: TABLE_CONFIG.bodyTextColor,
                            borderTop: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                        }}>
                            Personal expression, visual impact, and design
                        </td>
                    </tr>
                    <tr>
                        <td style={{
                            color: TABLE_CONFIG.column1TextColor,
                            borderRight: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                            borderTop: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                        }}>
                            <strong>Training</strong>
                        </td>
                        <td style={{
                            color: TABLE_CONFIG.bodyTextColor,
                            borderRight: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                            borderTop: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                        }}>
                            Long, structured education, often under a master<br />
                            Strict rules for proportions, stroke order, and tool handling
                        </td>
                        <td style={{
                            color: TABLE_CONFIG.bodyTextColor,
                            borderTop: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                        }}>
                            Very diverse: self-taught, workshops, online courses, art schools
                        </td>
                    </tr>
                    <tr>
                        <td style={{
                            color: TABLE_CONFIG.column1TextColor,
                            borderRight: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                            borderTop: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                        }}>
                            <strong>Tools & materials:</strong>
                        </td>
                        <td style={{
                            color: TABLE_CONFIG.bodyTextColor,
                            borderRight: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                            borderTop: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                        }}>
                            Quill or reed pen, ink, handmade paper, guidelines
                        </td>
                        <td style={{
                            color: TABLE_CONFIG.bodyTextColor,
                            borderTop: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                        }}>
                            Dip pens, brush pens, markers, watercolor, digital tablets
                        </td>
                    </tr>
                    <tr>
                        <td style={{
                            color: TABLE_CONFIG.column1TextColor,
                            borderRight: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                            borderTop: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                        }}>
                            <strong>Fields of work</strong>
                        </td>
                        <td style={{
                            color: TABLE_CONFIG.bodyTextColor,
                            borderRight: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                            borderTop: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                        }}>
                            Religious manuscripts, official documents, books, archives<br />
                            Today often: restoration, conservation, historical research
                        </td>
                        <td style={{
                            color: TABLE_CONFIG.bodyTextColor,
                            borderTop: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                        }}>
                            Weddings, branding, logos, social media, illustration, workshops
                        </td>
                    </tr>
                    <tr>
                        <td style={{
                            color: TABLE_CONFIG.column1TextColor,
                            borderRight: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                            borderTop: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                        }}>
                            <strong>Cultural role:</strong>
                        </td>
                        <td style={{
                            color: TABLE_CONFIG.bodyTextColor,
                            borderRight: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                            borderTop: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                        }}>
                            Guardian of knowledge, tradition and written heritage<br />
                            High social and educational status in earlier societies
                        </td>
                        <td style={{
                            color: TABLE_CONFIG.bodyTextColor,
                            borderTop: `${TABLE_CONFIG.borderWidth}px solid ${TABLE_CONFIG.borderColor}`,
                        }}>
                            Creative service provider and visual storyteller<br />
                            Strong presence through DIY culture and social media
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CalligrapherTable;
