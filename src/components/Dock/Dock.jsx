'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';

import './Dock.css';

// Sub-Items für die speziellen Dock Items (Federkiel, Qualam, Maobi, Schriftwandel)
const subItemsConfig = {
    'Federkiel': [
        { text: 'Theory', id: 'federkiel-sub-1' },
        { text: 'Practice', id: 'federkiel-sub-2' }
    ],
    'Qualam': [
        { text: 'Theory', id: 'qualam-sub-1' },
        { text: 'Practice', id: 'qualam-sub-2' }
    ],
    'Maobi': [
        { text: 'Theory', id: 'maobi-sub-1' },
        { text: 'Practice', id: 'maobi-sub-2' }
    ],
    'Schriftwandel': [
        { text: 'Moderne Kalligrafie', id: 'schriftwandel-sub-1' },
        { text: 'Der Kalligraf', id: 'schriftwandel-sub-2' }
    ]
};

function DockSubItem({ text, onClick, baseItemSize, isActive }) {
    const subItemSize = baseItemSize / 2;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={`dock-sub-item ${isActive ? 'dock-sub-item-active' : ''}`}
            style={{
                width: subItemSize,
                height: subItemSize
            }}
            onClick={onClick}
            tabIndex={0}
            role="button"
        >
            <span className="dock-sub-item-text">{text}</span>
        </motion.div>
    );
}

function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize, isActive, subItems, activeItem, onSubItemClick, activeSubItem }) {
    const ref = useRef(null);
    const isHovered = useMotionValue(0);

    const mouseDistance = useTransform(mouseX, val => {
        const rect = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            width: baseItemSize
        };
        return val - rect.x - baseItemSize / 2;
    });

    // Wenn aktiv, bleibt die Größe auf magnification
    const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);

    // Aktive Items behalten ihre magnification Größe
    const finalSize = isActive ? magnification : targetSize;
    const size = useSpring(finalSize, spring);

    // Zeige Sub-Items nur wenn dieses Item aktiv ist und subItems vorhanden sind
    const showSubItems = isActive && subItems && subItems.length > 0;

    // Helper to check if a sub-item is active
    const isSubItemActive = (id) => {
        if (!activeSubItem) return false;

        // Schriftwandel Cases
        if (activeSubItem === 'moderneKalligrafie' && id === 'schriftwandel-sub-1') return true;
        if (activeSubItem === 'machingGame' && id === 'schriftwandel-sub-2') return true;

        // Theory/Practice Cases (Federkiel, Qualam, Maobi)
        // Check contents but exclude schriftwandel to be safe
        if (activeSubItem === 'theory' && id.includes('sub-1') && !id.includes('schriftwandel')) return true;
        if (activeSubItem === 'practice' && id.includes('sub-2') && !id.includes('schriftwandel')) return true;

        return false;
    };

    return (
        <div className="dock-item-container">
            {/* Sub-Items erscheinen oberhalb des Dock Items */}
            <AnimatePresence>
                {showSubItems && (
                    <motion.div
                        className="dock-sub-items-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {subItems.map((subItem, index) => (
                            <DockSubItem
                                key={subItem.id}
                                text={subItem.text}
                                baseItemSize={baseItemSize}
                                onClick={() => onSubItemClick && onSubItemClick(subItem.id)}
                                isActive={isSubItemActive(subItem.id)}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                ref={ref}
                style={{
                    width: size,
                    height: size
                }}
                onHoverStart={() => isHovered.set(1)}
                onHoverEnd={() => isHovered.set(0)}
                onFocus={() => isHovered.set(1)}
                onBlur={() => isHovered.set(0)}
                onClick={onClick}
                className={`dock-item ${className} ${isActive ? 'dock-item-active' : ''}`}
                tabIndex={0}
                role="button"
                aria-haspopup="true"
            >
                {Children.map(children, child => cloneElement(child, { isHovered, isActive }))}
            </motion.div>
        </div>
    );
}

function DockLabel({ children, className = '', ...rest }) {
    const { isHovered } = rest;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = isHovered.on('change', latest => {
            setIsVisible(latest === 1);
        });
        return () => unsubscribe();
    }, [isHovered]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -10 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`dock-label ${className}`}
                    role="tooltip"
                    style={{ x: '-50%' }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function DockIcon({ children, className = '', isActive }) {
    return (
        <div className={`dock-icon ${className}`} style={{ color: isActive ? '' : 'inherit' }}>
            {children}
        </div>
    );
}

export default function Dock({
    items,
    className = '',
    spring = { mass: 0.1, stiffness: 150, damping: 12 },
    magnification = 70,
    distance = 200,
    panelHeight = 68,
    dockHeight = 256,
    baseItemSize = 50,
    bend = 0,
    activeItem,
    activeSubItem,
    onItemClick,
    onSubItemClick
}) {
    const mouseX = useMotionValue(Infinity);
    const isHovered = useMotionValue(0);

    const maxHeight = useMemo(
        () => Math.max(dockHeight, magnification + magnification / 2 + 4),
        [magnification, dockHeight]
    );
    const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
    const height = useSpring(heightRow, spring);

    // Prüfe ob aktives Item Sub-Items haben sollte
    const hasActiveSubItems = subItemsConfig[activeItem] !== undefined;

    return (
        <motion.div
            style={{
                height,
                scrollbarWidth: 'none',
                transform: `perspective(1000px) rotateX(${bend * 10}deg)`
            }}
            className="dock-outer"
        >
            <motion.div
                onMouseMove={({ pageX }) => {
                    isHovered.set(1);
                    mouseX.set(pageX);
                }}
                onMouseLeave={() => {
                    isHovered.set(0);
                    mouseX.set(Infinity);
                }}
                className={`dock-panel ${className} ${hasActiveSubItems ? 'dock-panel-with-subitems' : ''}`}
                style={{ height: panelHeight }}
                role="toolbar"
                aria-label="Application dock"
            >
                {items.map((item, index) => (
                    <DockItem
                        key={index}
                        onClick={() => onItemClick && onItemClick(item.label, index)}
                        className={item.className}
                        mouseX={mouseX}
                        spring={spring}
                        distance={distance}
                        magnification={magnification}
                        baseItemSize={baseItemSize}
                        isActive={activeItem === item.label}
                        subItems={subItemsConfig[item.label]}
                        activeItem={activeItem}
                        activeSubItem={activeSubItem}
                        onSubItemClick={onSubItemClick}
                    >
                        <DockIcon isActive={activeItem === item.label}>{item.icon}</DockIcon>
                        <DockLabel>{item.label}</DockLabel>
                    </DockItem>
                ))}
            </motion.div>
        </motion.div>
    );
}
