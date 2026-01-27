import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import './InfotextBox.css';

export const InfotextBox = ({
    position = 'right',
    colors = ['#B19EEF', '#5227FF'],
    className,
    accentColor = '#5227FF',
    isVisible = false,
    // Customizable text - can be changed later
    infoText = 'Das ist die .... Werkzeug um die ... Schrift auszuführen',
    // Customizable dimensions - can be changed later
    height = 400,
    width = null // If null, uses default CSS width
}) => {
    const [open, setOpen] = useState(false);
    const panelRef = useRef(null);
    const preLayersRef = useRef(null);
    const preLayerElsRef = useRef([]);
    const openTlRef = useRef(null);
    const closeTweenRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const panel = panelRef.current;
            const preContainer = preLayersRef.current;
            if (!panel) return;

            let preLayers = [];
            if (preContainer) {
                preLayers = Array.from(preContainer.querySelectorAll('.itb-prelayer'));
            }
            preLayerElsRef.current = preLayers;

            const offscreen = position === 'left' ? -100 : 100;
            gsap.set([panel, ...preLayers], { xPercent: offscreen });
        });
        return () => ctx.revert();
    }, [position]);

    const buildOpenTimeline = useCallback(() => {
        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel) return null;

        openTlRef.current?.kill();
        if (closeTweenRef.current) {
            closeTweenRef.current.kill();
            closeTweenRef.current = null;
        }

        const textContent = panel.querySelector('.itb-text-content');

        const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
        const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

        if (textContent) {
            gsap.set(textContent, { opacity: 0, y: 20 });
        }

        const tl = gsap.timeline({ paused: true });

        layerStates.forEach((ls, i) => {
            tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
        });

        const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
        const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
        const panelDuration = 0.65;

        tl.fromTo(
            panel,
            { xPercent: panelStart },
            { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
            panelInsertTime
        );

        if (textContent) {
            const textStartRatio = 0.15;
            const textStart = panelInsertTime + panelDuration * textStartRatio;
            tl.to(
                textContent,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power4.out'
                },
                textStart
            );
        }

        openTlRef.current = tl;
        return tl;
    }, []);

    const playOpen = useCallback(() => {
        const tl = buildOpenTimeline();
        if (tl) {
            tl.play(0);
        }
    }, [buildOpenTimeline]);

    const playClose = useCallback(() => {
        openTlRef.current?.kill();
        openTlRef.current = null;

        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel) return;

        const all = [...layers, panel];
        closeTweenRef.current?.kill();
        const offscreen = position === 'left' ? -100 : 100;
        closeTweenRef.current = gsap.to(all, {
            xPercent: offscreen,
            duration: 0.32,
            ease: 'power3.in',
            overwrite: 'auto',
            onComplete: () => {
                const textContent = panel.querySelector('.itb-text-content');
                if (textContent) {
                    gsap.set(textContent, { opacity: 0, y: 20 });
                }
            }
        });
    }, [position]);

    // Auto-open/close based on isVisible prop
    useEffect(() => {
        if (isVisible && !open) {
            setOpen(true);
            // Small delay to ensure DOM is ready
            const timer = setTimeout(() => {
                playOpen();
            }, 100);
            return () => clearTimeout(timer);
        } else if (!isVisible && open) {
            setOpen(false);
            playClose();
        }
    }, [isVisible, open, playOpen, playClose]);

    // Calculate custom styles for WRAPPER (not panel)
    const wrapperStyle = {};
    if (accentColor) wrapperStyle['--itb-accent'] = accentColor;
    if (height) wrapperStyle.height = typeof height === 'number' ? `${height}px` : height;
    if (width) wrapperStyle.width = typeof width === 'number' ? `${width}px` : width;

    return (
        <div
            className={(className ? className + ' ' : '') + 'infotextbox-wrapper'}
            style={wrapperStyle}
            data-position={position}
            data-open={open || undefined}
        >
            <div ref={preLayersRef} className="itb-prelayers" aria-hidden="true">
                {(() => {
                    const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
                    let arr = [...raw];
                    if (arr.length >= 3) {
                        const mid = Math.floor(arr.length / 2);
                        arr.splice(mid, 1);
                    }
                    return arr.map((c, i) => <div key={i} className="itb-prelayer" style={{ background: c }} />);
                })()}
            </div>

            <aside
                ref={panelRef}
                className="infotextbox-panel"
                aria-hidden={!open}
            >
                <div className="itb-panel-inner">
                    <div className="itb-text-content">
                        {infoText}
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default InfotextBox;
