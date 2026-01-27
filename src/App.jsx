import { useState } from 'react';
import './App.css';
import Dock from './components/Dock';
import HeroPage from './pages/HeroPage';
import PageWrapper from './components/PageWrapper';
import CircularGallery from './components/CircularGallery';
import DrawingCanvas from './components/DrawingCanvas';
import TheoryPage from './components/TheoryPage';
import PracticePage from './components/PracticePage';

// React Icons
import {
  VscHome,
  VscArchive,
  VscAccount,
  VscSettingsGear,
  VscSearch,
  VscLibrary,
  VscEdit
} from 'react-icons/vsc';

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
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudioClick = () => {
    setIsPlaying(!isPlaying);
    // Hier kannst du später die Audio-Logik hinzufügen
    console.log(isPlaying ? 'Audio pausiert' : 'Audio gestartet');
  };

  const handleDockItemClick = (label, index) => {
    // For Federkiel, Qualam, Maobi - automatically navigate to Theory sub-page
    if (label === 'Federkiel' || label === 'Qualam' || label === 'Maobi') {
      setActiveItem(label);
      setActiveSubItem('theory');
      console.log(`Navigiere direkt zu: ${label} Theory`);
    } else if (label === 'Schriftwandel') {
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
    if (subItemId.includes('schriftwandel-sub-1')) {
      setActiveSubItem('moderneKalligrafie');
    } else if (subItemId.includes('schriftwandel-sub-2')) {
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
    { icon: <VscHome size={24} />, label: 'Home' },
    { icon: <VscArchive size={24} />, label: 'Definition' },
    { icon: <VscAccount size={24} />, label: 'Grundübung' },
    { icon: <VscSettingsGear size={24} />, label: 'Federkiel' },
    { icon: <VscSearch size={24} />, label: 'Qualam' },
    { icon: <VscLibrary size={24} />, label: 'Maobi' },
    { icon: <VscEdit size={24} />, label: 'Schriftwandel' },
  ];

  // Render basierend auf aktivem Item
  const renderPage = () => {
    switch (activeItem) {
      case 'Home':
        return (
          <HeroPage
            onAudioClick={handleAudioClick}
            isPlaying={isPlaying}
          />
        );
      case 'Definition':
        return (
          <PageWrapper
            pageHint="kleiner Einblick was die Page beinhaltet…"
            showHint={true}
            onAudioClick={handleAudioClick}
            isPlaying={isPlaying}
          >
            <div style={{
              height: '600px',
              width: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CircularGallery
                bend={1}
                textColor="#61554B"
                borderRadius={0.07}
                scrollSpeed={1.2}
                scrollEase={0.05}
                font="30px Sedan"
              />
            </div>
          </PageWrapper>
        );
      case 'Grundübung':
        return (
          <PageWrapper
            pageHint=""
            showHint={false}
            onAudioClick={handleAudioClick}
            isPlaying={isPlaying}
          >
            <DrawingCanvas />
          </PageWrapper>
        );
      case 'Federkiel':
        if (activeSubItem === 'practice') {
          return (
            <PracticePage
              title="Federkiel"
              subtitleText="Nehme den Stift in die Hand und schreibe nun"
              subtitleText2="das Wort in der Federkiel Schrift nach"
              onAudioClick={handleAudioClick}
              isPlaying={isPlaying}
            />
          );
        }
        return (
          <TheoryPage
            title="Federkiel"
            infoText="Das ist der Federkiel – das traditionelle Werkzeug um die westliche Kalligraphie-Schrift auszuführen."
            onAudioClick={handleAudioClick}
            isPlaying={isPlaying}
            isVisible={activeItem === 'Federkiel' && activeSubItem !== 'practice'}
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
              subtitleText="Nehme den Stift in die Hand und schreibe nun"
              subtitleText2="das Wort in der Qualam Schrift nach"
              onAudioClick={handleAudioClick}
              isPlaying={isPlaying}
            />
          );
        }
        return (
          <TheoryPage
            title="Qualam"
            infoText="Das ist der Qualam – das traditionelle Werkzeug um die arabische Kalligraphie-Schrift auszuführen."
            onAudioClick={handleAudioClick}
            isPlaying={isPlaying}
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
              subtitleText="Nehme den Stift in die Hand und schreibe nun"
              subtitleText2="das Wort in der Maobi Schrift nach"
              onAudioClick={handleAudioClick}
              isPlaying={isPlaying}
            />
          );
        }
        return (
          <TheoryPage
            title="Maobi"
            infoText="Das ist der Maobi – das traditionelle Werkzeug um die chinesische Kalligraphie-Schrift auszuführen."
            onAudioClick={handleAudioClick}
            isPlaying={isPlaying}
            isVisible={activeItem === 'Maobi' && activeSubItem !== 'practice'}
            // 3D Model settings
            modelPath="/models/Maobí_Pinsel.gltf"
            modelContainerWidth={400}
            modelContainerHeight={400}
            baseRotation={[0, 0, 0]}
            autoRotateSpeed={0.35}
            // InfotextBox settings
            infoBoxHeight={400}
          />
        );
      case 'Schriftwandel':
        if (activeSubItem === 'machingGame') {
          return (
            <PageWrapper
              pageHint="Maching Game"
              showHint={true}
              onAudioClick={handleAudioClick}
              isPlaying={isPlaying}
            >
              <div>Maching Game Placeholder</div>
            </PageWrapper>
          );
        }
        // Default: Moderne Kalligrafie
        return (
          <PageWrapper
            pageHint="Moderne Kalligraphie"
            showHint={true}
            onAudioClick={handleAudioClick}
            isPlaying={isPlaying}
          >
            <div style={{
              height: '600px',
              width: '100%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CircularGallery
                items={moderneKalligrafieItems}
                bend={1}
                textColor="#61554B"
                borderRadius={0.07}
                scrollSpeed={1.2}
                scrollEase={0.05}
                font="30px Sedan"
              />
            </div>
          </PageWrapper>
        );
      default:
        return (
          <HeroPage
            onAudioClick={handleAudioClick}
            isPlaying={isPlaying}
          />
        );
    }
  };

  return (
    <div className="app">
      {renderPage()}

      {/* Navigation Dock */}
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
    </div>
  );
}

export default App;
