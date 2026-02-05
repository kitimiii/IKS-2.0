import { useState, useCallback, useRef, useEffect } from 'react';
import './App.css';
import Dock from './components/Dock';
import HeroPage from './pages/HeroPage';
import PageWrapper from './components/PageWrapper';
import CircularGallery from './components/CircularGallery';
import DrawingCanvas from './components/DrawingCanvas';
import TheoryPage from './components/TheoryPage';
import PracticePage from './components/PracticePage';
import CalligrapherTable from './components/CalligrapherTable';
import CalligraphyGame from './components/CalligraphyGame';

// Audio files
import introAudio from './assets/Audios/Intro.mov';
import definitionAudio from './assets/Audios/Definiton.mov';
import grunduebungAudio from './assets/Audios/Grundübung.mov';
import federkielAudio from './assets/Audios/Federkiel.mov';
import federkiel2Audio from './assets/Audios/Federkiel2.mov';

import qalamAudio from './assets/Audios/Qalam.mov';
import qalam2Audio from './assets/Audios/Qalam2.mov';
import maobiAudio from './assets/Audios/Maobi.mov';
import maobi2Audio from './assets/Audios/Maobi2.mov';
import modernAudio from './assets/Audios/modern.mov';
import modernVStraditionellAudio from './assets/Audios/modernVStraditionell.mov';

// Dock Icon Bilder
import HausBraun from './assets/Images/HausBraun.PNG';
import PergamentBraun from './assets/Images/PergamentBraun.PNG';
import ÜbungBraun from './assets/Images/ÜbungBraun.PNG';
import FederBraun from './assets/Images/FederBraun.PNG';
import QalamBraun from './assets/Images/QalamBraun.PNG';
import MaobiBraun from './assets/Images/MaobiBraun.PNG';
import PaperBraun from './assets/Images/PaperBraun.PNG';
import PuzzleBraun from './assets/Images/PuzzleBraun.PNG';

import HausBeige from './assets/Images/HausBeige.PNG';
import PergamentBeige from './assets/Images/PergamentBeige.PNG';
import ÜbungBeige from './assets/Images/ÜbungBeige.PNG';
import FederBeige from './assets/Images/FederBeige.PNG';
import QalamBeige from './assets/Images/QalamBeige.PNG';
import MaobiBeige from './assets/Images/MaobiBeige.PNG';
import PaperBeige from './assets/Images/PaperBeige.PNG';
import PuzzleBeige from './assets/Images/PuzzleBeige.PNG';

// Bilder für Moderne Kalligrafie
import quoteImg from './assets/Images/modern_Calligraphy.jpg';
import brushImg from './assets/slider-image2/brush.jpg';
import courseImg from './assets/slider-image2/course.png';
import einladungImg from './assets/slider-image2/einladung.jpg';
import givingbirthImg from './assets/slider-image2/givingbirth.jpg';
import gothicsImg from './assets/slider-image2/gothics.png';
import ipadImg from './assets/slider-image2/ipad.jpg';
import kitImg from './assets/slider-image2/kit.jpg';
import loveImg from './assets/slider-image2/love.jpg';
import procreacteImg from './assets/slider-image2/procreacte.jpg';
import wandImg from './assets/slider-image2/wand.jpg';
import zitatImg from './assets/slider-image2/zitat.jpg';

// Bilder für Practice-Seiten
import SchreibuebungDeutsch from './assets/Images/SchreibuebungDeutsch.png';
import SchreibuebungArabisch from './assets/Images/SchreibuebungArabisch.png';
import SchreibuebungChinesisch from './assets/Images/Schreibübung_chinesisch.svg';

// Bilder für The Calligrapher Seite
import traditionalImg from './assets/Images/traditional.png';
import modernImg from './assets/Images/modern.png';

// Hintergrundbild für Federkiel Theory
import papyrusImg from './assets/Images/Papyrus.png';

const moderneKalligrafieItems = [
  { image: quoteImg, text: 'text' },
  { image: brushImg, text: 'text' },
  { image: courseImg, text: 'text' },
  { image: einladungImg, text: 'text' },
  { image: givingbirthImg, text: 'text' },
  { image: gothicsImg, text: 'text' },
  { image: ipadImg, text: 'text' },
  { image: kitImg, text: 'text' },
  { image: loveImg, text: 'text' },
  { image: procreacteImg, text: 'text' },
  { image: wandImg, text: 'text' },
  { image: zitatImg, text: 'text' }
];

function App() {
  const [activeItem, setActiveItem] = useState('Home');
  const [activeSubItem, setActiveSubItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Now stores image number (1-12) instead of boolean
  const [selectedModerneImage, setSelectedModerneImage] = useState(null);
  const introAudioRef = useRef(null);
  const definitionAudioRef = useRef(null);
  const grunduebungAudioRef = useRef(null);
  const federkielAudioRef = useRef(null);
  const federkiel2AudioRef = useRef(null);

  const qalamAudioRef = useRef(null);
  const qalam2AudioRef = useRef(null);
  const maobiAudioRef = useRef(null);
  const maobi2AudioRef = useRef(null);
  const modernAudioRef = useRef(null);
  const modernVStraditionellAudioRef = useRef(null);

  // Stable callbacks for CircularGallery - defined at top level
  const handleImageClick = useCallback((imageIndex) => {
    setSelectedImage(imageIndex);
  }, []);

  const handleCurrentImageChange = useCallback((imageIndex) => {
    // Update popup content only if popup is already open
    setSelectedImage(prev => prev !== null ? imageIndex : null);
  }, []);

  // Callbacks for Moderne Kalligrafie (Evolution of Script)
  const handleModerneImageClick = useCallback((imageIndex) => {
    setSelectedModerneImage(imageIndex);
  }, []);

  const handleModerneCurrentImageChange = useCallback((imageIndex) => {
    // Update popup content only if popup is already open
    setSelectedModerneImage(prev => prev !== null ? imageIndex : null);
  }, []);

  // Auto-play audio based on active page
  useEffect(() => {
    // Home page - Intro audio (loops)
    if (activeItem === 'Home' && introAudioRef.current) {
      introAudioRef.current.play().catch(error => {
        console.log('Auto-play prevented by browser:', error);
      });
    } else if (introAudioRef.current) {
      introAudioRef.current.pause();
      introAudioRef.current.currentTime = 0;
    }

    // Definition page
    if (activeItem === 'Definition' && definitionAudioRef.current) {
      definitionAudioRef.current.play().catch(error => {
        console.log('Auto-play prevented by browser:', error);
      });
    } else if (definitionAudioRef.current) {
      definitionAudioRef.current.pause();
      definitionAudioRef.current.currentTime = 0;
    }

    // Basic exercise page
    if (activeItem === 'Basic exercise' && grunduebungAudioRef.current) {
      grunduebungAudioRef.current.play().catch(error => {
        console.log('Auto-play prevented by browser:', error);
      });
    } else if (grunduebungAudioRef.current) {
      grunduebungAudioRef.current.pause();
      grunduebungAudioRef.current.currentTime = 0;
    }

    // Feather quill theory page
    if (activeItem === 'Quill pen' && activeSubItem !== 'practice' && federkielAudioRef.current) {
      federkielAudioRef.current.play().catch(error => {
        console.log('Auto-play prevented by browser:', error);
      });
    } else if (federkielAudioRef.current) {
      federkielAudioRef.current.pause();
      federkielAudioRef.current.currentTime = 0;
    }

    // Feather quill practice page
    if (activeItem === 'Quill pen' && activeSubItem === 'practice' && federkiel2AudioRef.current) {
      federkiel2AudioRef.current.play().catch(error => {
        console.log('Auto-play prevented by browser:', error);
      });
    } else if (federkiel2AudioRef.current) {
      federkiel2AudioRef.current.pause();
      federkiel2AudioRef.current.currentTime = 0;
    }

    // Qalam theory page
    if (activeItem === 'Qalam ' && activeSubItem !== 'practice' && qalamAudioRef.current) {
      qalamAudioRef.current.play().catch(error => {
        console.log('Auto-play prevented by browser:', error);
      });
    } else if (qalamAudioRef.current) {
      qalamAudioRef.current.pause();
      qalamAudioRef.current.currentTime = 0;
    }

    // Qalam practice page
    if (activeItem === 'Qalam ' && activeSubItem === 'practice' && qalam2AudioRef.current) {
      qalam2AudioRef.current.play().catch(error => {
        console.log('Auto-play prevented by browser:', error);
      });
    } else if (qalam2AudioRef.current) {
      qalam2AudioRef.current.pause();
      qalam2AudioRef.current.currentTime = 0;
    }

    // Maobi theory page
    if (activeItem === 'Maobi' && activeSubItem !== 'practice' && maobiAudioRef.current) {
      maobiAudioRef.current.play().catch(error => {
        console.log('Auto-play prevented by browser:', error);
      });
    } else if (maobiAudioRef.current) {
      maobiAudioRef.current.pause();
      maobiAudioRef.current.currentTime = 0;
    }

    // Maobi practice page
    if (activeItem === 'Maobi' && activeSubItem === 'practice' && maobi2AudioRef.current) {
      maobi2AudioRef.current.play().catch(error => {
        console.log('Auto-play prevented by browser:', error);
      });
    } else if (maobi2AudioRef.current) {
      maobi2AudioRef.current.pause();
      maobi2AudioRef.current.currentTime = 0;
    }

    // Evolution of Script - The Calligrapher
    if (activeItem === 'Evolution of Script' && activeSubItem === 'machingGame' && modernVStraditionellAudioRef.current) {
      modernVStraditionellAudioRef.current.play().catch(error => {
        console.log('Auto-play prevented by browser:', error);
      });
    } else if (modernVStraditionellAudioRef.current) {
      modernVStraditionellAudioRef.current.pause();
      modernVStraditionellAudioRef.current.currentTime = 0;
    }

    // Evolution of Script - Modern Calligraphy
    if (activeItem === 'Evolution of Script' && activeSubItem !== 'machingGame' && modernAudioRef.current) {
      modernAudioRef.current.play().catch(error => {
        console.log('Auto-play prevented by browser:', error);
      });
    } else if (modernAudioRef.current) {
      modernAudioRef.current.pause();
      modernAudioRef.current.currentTime = 0;
    }
  }, [activeItem, activeSubItem]);

  const handleIntroAudioEnded = () => {
    // Replay after 5 seconds for Home page
    setTimeout(() => {
      if (introAudioRef.current && activeItem === 'Home') {
        introAudioRef.current.currentTime = 0;
        introAudioRef.current.play().catch(error => {
          console.log('Replay prevented:', error);
        });
      }
    }, 5000);
  };

  const handleDefinitionAudioEnded = () => {
    // Do nothing - audio plays only once
    console.log('Definition audio ended');
  };

  const handleGrunduebungAudioEnded = () => {
    // Do nothing - audio plays only once
    console.log('Basic exercise audio ended');
  };

  const handleFederkielAudioEnded = () => {
    // Do nothing - audio plays only once
    console.log('Federkiel audio ended');
  };

  const handleFederkiel2AudioEnded = () => {
    // Do nothing - audio plays only once
    console.log('Federkiel2 audio ended');
  };

  const handleQalamAudioEnded = () => {
    // Do nothing - audio plays only once
    console.log('Qalam audio ended');
  };

  const handleQalam2AudioEnded = () => {
    // Do nothing - audio plays only once
    console.log('Qalam2 audio ended');
  };

  const handleMaobiAudioEnded = () => {
    // Do nothing - audio plays only once
    console.log('Maobi audio ended');
  };

  const handleMaobi2AudioEnded = () => {
    // Do nothing - audio plays only once
    console.log('Maobi2 audio ended');
  };

  const handleModernAudioEnded = () => {
    console.log('Modern Calligraphy audio ended');
  };

  const handleModernVStraditionellAudioEnded = () => {
    console.log('The Calligrapher audio ended');
  };

  const handleDockItemClick = (label, index) => {
    // Reset popup states when changing pages
    setSelectedImage(null);
    setSelectedModerneImage(null);

    // For Federkiel, Qalam , Maobi - automatically navigate to Theory sub-page
    if (label === 'Feather quill' || label === 'Qalam ' || label === 'Maobi') {
      setActiveItem(label);
      setActiveSubItem('theory');
      console.log(`Navigiere direkt zu: ${label} Theory`);
    } else if (label === 'Evolution of Script') {
      setActiveItem(label);
      setActiveSubItem('moderneKalligrafie');
      console.log(`Navigiere direkt zu: ${label} Modern Calligraphy`);
    } else {
      setActiveItem(label);
      setActiveSubItem(null);
      console.log(`Navigiere zu: ${label}`);
    }
  };

  const handleSubItemClick = (subItemId) => {
    console.log(`Sub-Item geklickt: ${subItemId}`);
    // Handle sub-item navigation
    if (subItemId.includes('Evolution of Script-sub-1')) {
      setActiveSubItem('moderneKalligrafie');
    } else if (subItemId.includes('Evolution of Script-sub-2')) {
      setActiveSubItem('machingGame');
    } else if (subItemId.includes('sub-1')) {
      // General theory for other items
      setActiveSubItem('theory');
    } else if (subItemId.includes('sub-2')) {
      // General practice for other items
      setActiveSubItem('practice');
    }
  };

  const dockItems = [
    {
      icon: <img src={activeItem === 'Home' ? HausBeige : HausBraun} alt="Home" style={{ width: '60px', height: '60px' }} />,
      label: 'Home'
    },
    {
      icon: <img src={activeItem === 'Definition' ? PergamentBeige : PergamentBraun} alt="Definition" style={{ width: '60px', height: '60px' }} />,
      label: 'Definition'
    },
    {
      icon: <img src={activeItem === 'Basic exercise' ? ÜbungBeige : ÜbungBraun} alt="Basic exercise" style={{ width: '60px', height: '60px' }} />,
      label: 'Basic exercise'
    },
    {
      icon: <img src={activeItem === 'Quill pen' ? FederBeige : FederBraun} alt="Quill pen" style={{ width: '60px', height: '60px' }} />,
      label: 'Quill pen'
    },
    {
      icon: <img src={activeItem === 'Qalam ' ? QalamBeige : QalamBraun} alt="Qalam " style={{ width: '60px', height: '60px' }} />,
      label: 'Qalam '
    },
    {
      icon: <img src={activeItem === 'Maobi' ? MaobiBeige : MaobiBraun} alt="Maobi" style={{ width: '60px', height: '60px' }} />,
      label: 'Maobi'
    },
    {
      icon: <img src={activeItem === 'Evolution of Script' ? PaperBeige : PaperBraun} alt="Evolution of Script" style={{ width: '60px', height: '60px' }} />,
      label: 'Evolution of Script'
    },
    {
      icon: <img src={activeItem === 'Maching Game' ? PuzzleBeige : PuzzleBraun} alt="Puzzle" style={{ width: '60px', height: '60px' }} />,
      label: 'Maching Game'
    },
  ];

  const handlePlayClick = () => {
    setActiveItem('Definition');
    setActiveSubItem(null);
    console.log('Navigiere zur Definition Seite');
  };

  // Render basierend auf aktivem Item
  const renderPage = () => {
    switch (activeItem) {
      case 'Home':
        return (
          <>
            {/* Audio Element for Home */}
            <audio
              ref={introAudioRef}
              src={introAudio}
              onEnded={handleIntroAudioEnded}
            />
            <HeroPage
              onPlayClick={handlePlayClick}
            />
          </>
        );
      case 'Definition':
        // Popup-Texte für jedes Bild
        const getPopupText = (imageNumber) => {
          const popupTexts = {
            1: 'Platzhalter 1',
            2: 'Platzhalter 2',
            3: 'Platzhalter 3',
            4: 'Platzhalter 4',
            5: 'Platzhalter 5',
            6: 'Platzhalter 6',
            7: 'Platzhalter 7',
            8: 'Platzhalter 8',
            9: 'Passage from the Quran Say: Intercession belongs to God alone. His is the dominion of the heavens and the earth, and to Him you will be returned. Arabic calligraphy',
            10: 'Clouds drift across the golden fields; the autumn wind blows among the flowers. Japanese calligraphy',
            11: 'Platzhalter 11',
            12: 'Platzhalter 12'
          };
          return popupTexts[imageNumber] || 'Platzhalter';
        };

        return (
          <PageWrapper
            pageHint="Traditional calligraphy"
            showHint={true}
          >
            {/* Audio Element for Definition */}
            <audio
              ref={definitionAudioRef}
              src={definitionAudio}
              onEnded={handleDefinitionAudioEnded}
            />

            <div style={{
              height: '600px',
              width: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'translateY(-40px)' // Moved up to avoid Dock collision
            }}>
              <div style={{ width: '100%', height: '100%' }}>
                <CircularGallery
                  bend={1}
                  textColor="#61554B"
                  borderRadius={0.07}
                  scrollSpeed={1.2}
                  scrollEase={0.05}
                  font="30px Sedan"
                  onImageClick={handleImageClick}
                  onCurrentImageChange={handleCurrentImageChange}
                />
              </div>

              {selectedImage && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '300px',
                    height: '100px',
                    background: 'rgba(249, 235, 213, 0.95)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '15px',
                    borderRadius: '10px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                    zIndex: 1000,
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedImage(null)}
                >
                  {/* X Button zum Schließen */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(null);
                    }}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      background: '#61554B',
                      color: '#F9EBD5',
                      border: 'none',
                      borderRadius: '50%',
                      width: '25px',
                      height: '25px',
                      fontSize: '1.2em',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      lineHeight: 1,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#F9EBD5';
                      e.target.style.color = '#61554B';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#61554B';
                      e.target.style.color = '#F9EBD5';
                    }}
                  >
                    ×
                  </button>

                  <p style={{
                    fontFamily: 'Sedan, serif',
                    fontSize: '0.7em',
                    color: '#61554B',
                    textAlign: 'center',
                    margin: 0
                  }}>
                    {getPopupText(selectedImage)}
                  </p>
                </div>
              )}
            </div>
          </PageWrapper>
        );
      case 'Basic exercise':
        return (
          <PageWrapper
            pageHint=""
            showHint={false}
          >
            {/* Audio Element for Basic exercise */}
            <audio
              ref={grunduebungAudioRef}
              src={grunduebungAudio}
              onEnded={handleGrunduebungAudioEnded}
            />

            <DrawingCanvas />
          </PageWrapper>
        );
      case 'Quill pen':
        if (activeSubItem === 'practice') {
          return (
            <>
              {/* Audio Element for Federkiel Practice */}
              <audio
                ref={federkiel2AudioRef}
                src={federkiel2Audio}
                onEnded={handleFederkiel2AudioEnded}
              />
              <PracticePage
                title="Quill pen"
                subtitleText="Pick up the pen and write the word in Quill pen script."
                subtitleText2=""
                imagePath={SchreibuebungDeutsch}
              />
            </>
          );
        }
        return (
          <TheoryPage
            title="Quill pen"
            infoContent={
              <>
                {/* Audio Element for Federkiel */}
                <audio
                  ref={federkielAudioRef}
                  src={federkielAudio}
                  onEnded={handleFederkielAudioEnded}
                />
                <ul>
                  <li>Made from feathers of goose, swan, or turkey</li>
                  <li>Standard writing tool in medieval Europe</li>
                  <li>Tip needed regular trimming to stay sharp</li>
                  <li>Suitable for fine lines and detailed ornamentation</li>
                  <li>Used with ink made from soot or oak galls</li>
                  <li>Important in monasteries and universities for <br /> manuscripts and documents.</li>
                </ul>
              </>
            }
            isVisible={activeItem === 'Quill pen' && activeSubItem !== 'practice'}
            // 3D Model settings
            modelPath="/models/Featherquill_3D/scene.gltf"
            modelContainerWidth={500}
            modelContainerHeight={500}
            baseRotation={[0, 0, 0]}
            autoRotateSpeed={0.35}
            modelScale={0.4}
            // InfotextBox settings 
            infoBoxHeight={500}
            infoBoxWidth={800}
            backgroundImage={papyrusImg}
          />
        );
      case 'Qalam ':
        if (activeSubItem === 'practice') {
          return (
            <>
              <PracticePage
                title="Qalam "
                subtitleText="Pick up the pen and write the word in Qalam script."
                subtitleText2=""
                imagePath={SchreibuebungArabisch}
              />
              {/* Audio Element for Qalam Practice */}
              <audio
                ref={qalam2AudioRef}
                src={qalam2Audio}
                onEnded={handleQalam2AudioEnded}
              />
            </>
          );
        }
        return (
          <TheoryPage
            title="Qalam "
            infoContent={
              <>
                <ul>
                  <li>Traditional reed pen used across the Middle East</li>
                  <li>Especially important in the Islamic world</li>
                  <li>Tip cut at an angle for clear, sharp, angular lines</li>
                  <li>Ideal for geometric writing styles</li>
                  <li>Most important tool in Islamic calligraphy</li>
                  <li>Often used for copying the Quran</li>
                  <li>Script held high cultural and spiritual importance <br /> because images were avoided</li>
                </ul>
                {/* Audio Element for Qalam Theory */}
                <audio
                  ref={qalamAudioRef}
                  src={qalamAudio}
                  onEnded={handleQalamAudioEnded}
                />
              </>
            }
            isVisible={activeItem === 'Qalam ' && activeSubItem !== 'practice'}
            // 3D Model settings
            modelPath="/models/Qalam_3D/scene.gltf"
            modelContainerWidth={500}
            modelContainerHeight={500}
            baseRotation={[0, 0, 0]}
            autoRotateSpeed={0.35}
            modelScale={0.09}
            // InfotextBox settings
            infoBoxHeight={500}
            infoBoxWidth={800}
            backgroundImage={papyrusImg}
          />
        );
      case 'Maobi':
        if (activeSubItem === 'practice') {
          return (
            <>
              {/* Audio Element for Maobi Practice */}
              <audio
                ref={maobi2AudioRef}
                src={maobi2Audio}
                onEnded={handleMaobi2AudioEnded}
              />
              <PracticePage
                title="Maobi"
                subtitleText="Pick up the brush and write the word in Maobi script."
                subtitleText2=""
                imagePath={SchreibuebungChinesisch}
              />
            </>
          );
        }
        return (
          <TheoryPage
            title="Maobi"
            infoContent={
              <>
                {/* Audio Element for Maobi Theory */}
                <audio
                  ref={maobiAudioRef}
                  src={maobiAudio}
                  onEnded={handleMaobiAudioEnded}
                />
                <ul>
                  <li>Traditional brush used in China, Japan, and Korea</li>
                  <li>Handle made of bamboo or wood</li>
                  <li>Tip made from animal hair (e.g., goat, wolf, weasel)</li>
                  <li>Very flexible: creates thick and thin lines in one stroke</li>
                  <li>Used together with ink and an ink stone</li>
                  <li>Calligraphy seen as a major art form and reflection <br />of character</li>
                </ul>
              </>
            }
            isVisible={activeItem === 'Maobi' && activeSubItem !== 'practice'}
            // 3D Model settings
            modelPath="/models/Maobi_3D/scene.gltf"
            modelContainerWidth={400}
            modelContainerHeight={500}
            baseRotation={[0, 0, 0]}
            autoRotateSpeed={0.35}
            modelScale={0.09}
            // InfotextBox settings
            infoBoxHeight={500}
            infoBoxWidth={800}
            backgroundImage={papyrusImg}
          />
        );
      case 'Evolution of Script':
        if (activeSubItem === 'machingGame') {
          return (
            <PageWrapper
              pageHint="The Calligrapher"
              showHint={true}
            >
              {/* Audio Element for The Calligrapher */}
              <audio
                ref={modernVStraditionellAudioRef}
                src={modernVStraditionellAudio}
                onEnded={handleModernVStraditionellAudioEnded}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px',
                height: '100%',
                gap: '20px'
              }}>
                <img
                  src={traditionalImg}
                  alt="Traditional Calligraphy"
                  style={{
                    maxWidth: '45%',
                    maxHeight: '75vh',
                    objectFit: 'contain',
                    borderRadius: '10px',
                    //boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <img
                  src={modernImg}
                  alt="Modern Calligraphy"
                  style={{
                    maxWidth: '45%',
                    maxHeight: '75vh',
                    objectFit: 'contain',
                    borderRadius: '10px',
                    //boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </div>
            </PageWrapper>
          );
        }

        // Popup-Texte für jedes Bild in Moderne Kalligrafie
        const getModernePopupText = (imageNumber) => {
          const popupTexts = {
            1: ' This is an example of modern calligraphy. The letters are written in fluid, continuous strokes with clear contrast between thick downstrokes and thin upstrokes.',
            2: 'This is brush lettering, created with brush pens that produce thick and thin strokes depending on pressure.',
            3: 'Participants at a Japanese calligraphy workshop sit around a table as they use brushes and ink to practice writing Kanji characters on paper.',
            4: 'Cards being handwritten with elegant calligraphy using a pointed pen and ink.',
            5: 'Flowing, elegant calligraphy letters drawn by hand, showcasing artistic strokes and stylized curves.',
            6: 'A digital tablet screen, showing beautifully crafted calligraphic lettering being drawn by hand in a digital art app.',
            7: 'A digital iPad screen showing hand drawn calligraphy letters being created within a visible grid.',
            8: 'A neatly arranged set of basic pointed calligraphy tools displayed together as a complete beginner’s calligraphy supplies bundle.',
            9: 'A clear acrylic decorative sign with elegant Arabic calligraphy embellished with subtle floral or ornamental accents, styled as a wedding keepsake.',
            10: 'A group of people at a calligraphy workshop practicing the Unziale script with broad nib pens and ink on paper.',
            11: 'A man drawing on a large wall covered with bold, artistic calligraphic lettering.',
            12: 'A calligraphic handwritten love letter with the quote: “Love that is not madness is not love.” '
          };
          return popupTexts[imageNumber] || 'Platzhalter';
        };

        // Default: Moderne Kalligrafie
        return (
          <PageWrapper
            pageHint="Modern Calligraphy"
            showHint={true}
          >
            {/* Audio Element for Modern Calligraphy */}
            <audio
              ref={modernAudioRef}
              src={modernAudio}
              onEnded={handleModernAudioEnded}
            />
            <div style={{
              height: '600px',
              width: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'translateY(-40px)' // Moved up to avoid Dock collision
            }}>
              <div style={{ width: '100%', height: '100%' }}>
                <CircularGallery
                  items={moderneKalligrafieItems}
                  bend={1}
                  textColor="#61554B"
                  borderRadius={0.07}
                  scrollSpeed={1.2}
                  scrollEase={0.05}
                  font="30px Sedan"
                  onImageClick={handleModerneImageClick}
                  onCurrentImageChange={handleModerneCurrentImageChange}
                />
              </div>

              {selectedModerneImage && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '300px',
                    height: '100px',
                    background: 'rgba(249, 235, 213, 0.95)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '15px',
                    borderRadius: '10px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                    zIndex: 1000,
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedModerneImage(null)}
                >
                  {/* X Button zum Schließen */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedModerneImage(null);
                    }}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      background: '#61554B',
                      color: '#F9EBD5',
                      border: 'none',
                      borderRadius: '50%',
                      width: '25px',
                      height: '25px',
                      fontSize: '1.2em',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      lineHeight: 1,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#F9EBD5';
                      e.target.style.color = '#61554B';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#61554B';
                      e.target.style.color = '#F9EBD5';
                    }}
                  >
                    ×
                  </button>

                  <p style={{
                    fontFamily: 'Sedan, serif',
                    fontSize: '0.9em',
                    color: '#61554B',
                    textAlign: 'center',
                    margin: 0
                  }}>
                    {getModernePopupText(selectedModerneImage)}
                  </p>
                </div>
              )}
            </div>
          </PageWrapper>
        );
      case 'Maching Game':
        return (
          <PageWrapper
            pageHint=""
            showHint={false}
          >
            <CalligraphyGame />
          </PageWrapper>
        );
      default:
        return (
          <HeroPage
            onPlayClick={handlePlayClick}
          />
        );
    }
  };

  return (
    <div className="app">
      {renderPage()}

      {/* Navigation Dock - nur anzeigen wenn nicht auf der Home Page */}
      {activeItem !== 'Home' && (
        <Dock
          items={dockItems}
          panelHeight={70}
          baseItemSize={50}
          magnification={80}
          bend={1}
          activeItem={activeItem}
          activeSubItem={activeSubItem}
          onItemClick={handleDockItemClick}
          onSubItemClick={handleSubItemClick}
        />
      )}
    </div>
  );
}

export default App;
