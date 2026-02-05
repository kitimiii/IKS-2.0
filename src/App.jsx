import { useState, useCallback } from 'react';
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
import quoteImg from './assets/slider-image2/Quote.jpg';
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
import SchreibuebungDeutsch from './assets/Images/SchreibuebungDeutsch.PNG';
import SchreibuebungArabisch from './assets/Images/SchreibuebungArabisch.PNG';

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

  // Stable callbacks for CircularGallery - defined at top level
  const handleImageClick = useCallback((imageIndex) => {
    setSelectedImage(imageIndex);
  }, []);

  const handleCurrentImageChange = useCallback((imageIndex) => {
    // Update popup content only if popup is already open
    setSelectedImage(prev => prev !== null ? imageIndex : null);
  }, []);

  // Callbacks for Moderne Kalligrafie ()
  const handleModerneImageClick = useCallback((imageIndex) => {
    setSelectedModerneImage(imageIndex);
  }, []);

  const handleModerneCurrentImageChange = useCallback((imageIndex) => {
    // Update popup content only if popup is already open
    setSelectedModerneImage(prev => prev !== null ? imageIndex : null);
  }, []);

  const handleDockItemClick = (label, index) => {
    // Reset popup states when changing pages
    setSelectedImage(null);
    setSelectedModerneImage(null);

    // For Feather quill, Qualam, Maobi - automatically navigate to Theory sub-page
    if (label === 'Feather quill' || label === 'Qualam' || label === 'Maobi') {
      setActiveItem(label);
      setActiveSubItem('theory');
      console.log(`Navigiere direkt zu: ${label} Theory`);
    } else if (label === '') {
      setActiveItem(label);
      setActiveSubItem('moderneKalligrafie');
      console.log(`Navigiere direkt zu: ${label} Moderne Kalligrafie`);
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
      icon: <img src={activeItem === 'Feather quill' ? FederBeige : FederBraun} alt="Feather quill" style={{ width: '60px', height: '60px' }} />,
      label: 'Feather quill'
    },
    {
      icon: <img src={activeItem === 'Qualam' ? QalamBeige : QalamBraun} alt="Qualam" style={{ width: '60px', height: '60px' }} />,
      label: 'Qualam'
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
      icon: <img src={activeItem === 'Maching Game' ? PuzzleBeige : PuzzleBraun} alt="Maching Game" style={{ width: '60px', height: '60px' }} />,
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
          <HeroPage
            onPlayClick={handlePlayClick}
          />
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
            9: 'Platzhalter 9',
            10: 'Platzhalter 10',
            11: 'Platzhalter 11',
            12: 'Platzhalter 12'
          };
          return popupTexts[imageNumber] || 'Platzhalter';
        };

        return (
          <PageWrapper
            pageHint="Traditional Calligraphy"
            showHint={true}
          >
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
                    fontSize: '1em',
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
            <DrawingCanvas />
          </PageWrapper>
        );
      case 'Feather quill':
        if (activeSubItem === 'practice') {
          return (
            <PracticePage
              title="Feather quill"
              subtitleText1="Pick up the pen and write the word in Feather quill script."
              subtitleText2=""
              imagePath={SchreibuebungDeutsch}
            />
          );
        }
        return (
          <TheoryPage
            title="Feather quill"
            infoContent={
              <ul>
                <li>Made from feathers of goose, swan, or turkey</li>
                <li>Standard writing tool in medieval Europe</li>
                <li>Tip needed regular trimming to stay sharp</li>
                <li>Suitable for fine lines and detailed ornamentation</li>
                <li>Used with ink made from soot or oak galls</li>
                <li>Important in monasteries and universities for manuscripts and documents.</li>
              </ul>
            }
            isVisible={activeItem === 'Feather quill' && activeSubItem !== 'practice'}
            // 3D Model settings
            modelPath="/models/Stift_platzhalter/scene.gltf"
            modelContainerWidth={400}
            modelContainerHeight={400}
            baseRotation={[0, 0, 0]}
            autoRotateSpeed={0.35}
            // InfotextBox settings 
            infoBoxHeight={400}
          />
        );
      case 'Qualam':
        if (activeSubItem === 'practice') {
          return (
            <PracticePage
              title="Qualam"
              subtitleText="Pick up the pen and write the word in Qualam script."
              subtitleText2=""
              imagePath={SchreibuebungArabisch}
            />
          );
        }
        return (
          <TheoryPage
            title="Qualam"
            infoContent={
              <ul>
                <li>Traditional reed pen used across the Middle East</li>
                <li>Especially important in the Islamic world</li>
                <li>Tip cut at an angle for clear, sharp, angular lines</li>
                <li>Ideal for geometric writing styles</li>
                <li>Most important tool in Islamic calligraphy</li>
                <li>Often used for copying the Quran</li>
                <li>Script held high cultural and spiritual importance because images were avoided</li>
              </ul>
            }
            isVisible={activeItem === 'Qualam' && activeSubItem !== 'practice'}
            // 3D Model settings
            modelPath="/models/Stift_platzhalter/scene.gltf"
            modelContainerWidth={400}
            modelContainerHeight={400}
            baseRotation={[0, 0, 0]}
            autoRotateSpeed={0.35}
            // InfotextBox settings
            infoBoxHeight={400}
          />
        );
      case 'Maobi':
        if (activeSubItem === 'practice') {
          return (
            <PracticePage
              title="Maobi"
              subtitleText="Pick up the pen and write the word in Maobi script."
              subtitleText2=""
            />
          );
        }
        return (
          <TheoryPage
            title="Maobi"
            infoContent={
              <ul>
                <li>Traditional brush used in China, Japan, and Korea</li>
                <li>Handle made of bamboo or wood</li>
                <li>Tip made from animal hair (e.g., goat, wolf, weasel)</li>
                <li>Very flexible: creates thick and thin lines in one stroke</li>
                <li>Used together with ink and an ink stone</li>
                <li>Calligraphy seen as a major art form and reflection of character</li>
              </ul>
            }
            isVisible={activeItem === 'Maobi' && activeSubItem !== 'practice'}
            // 3D Model settings
            modelPath="/models/Stift_platzhalter/scene.gltf"
            modelContainerWidth={400}
            modelContainerHeight={400}
            baseRotation={[0, 0, 0]}
            autoRotateSpeed={0.35}
            // InfotextBox settings
            infoBoxHeight={400}
          />
        );
      case 'Evolution of Script':
        if (activeSubItem === 'machingGame') {
          return (
            <PageWrapper
              pageHint="The Calligrapher"
              showHint={true}
            >
              <CalligrapherTable />
            </PageWrapper>
          );
        }

        // Popup-Texte für jedes Bild in Moderne Kalligrafie
        const getModernePopupText = (imageNumber) => {
          const popupTexts = {
            1: 'Platzhalter 1',
            2: 'Platzhalter 2',
            3: 'Platzhalter 3',
            4: 'Platzhalter 4',
            5: 'Platzhalter 5',
            6: 'Platzhalter 6',
            7: 'Platzhalter 7',
            8: 'Platzhalter 8',
            9: 'Platzhalter 9',
            10: 'Platzhalter 10',
            11: 'Platzhalter 11',
            12: 'Platzhalter 12'
          };
          return popupTexts[imageNumber] || 'Platzhalter';
        };

        // Default: Moderne Kalligrafie
        return (
          <PageWrapper
            pageHint="Modern Calligraphy"
            showHint={true}
          >
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
                    fontSize: '1em',
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
          onItemClick={handleDockItemClick}
          onSubItemClick={handleSubItemClick}
        />
      )}
    </div>
  );
}

export default App;
