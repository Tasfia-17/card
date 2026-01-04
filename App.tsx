import React, { useState, useRef } from 'react';
import Stamp from './components/Stamp';
import { StampData, SceneryType } from './types';
import { STAMP_COLORS, BORDER_COLORS, TEXT_COLORS } from './constants/colors';

const INITIAL_STAMPS: StampData[] = [
  { id: 1, text: "It started as a tiny quiet seed", bgColor: STAMP_COLORS.PRIMARY_BLUE, borderColor: BORDER_COLORS.LIME_400, textColor: TEXT_COLORS.WHITE, scenery: 'seed', rotation: -1 },
  { id: 2, text: "Through the longest winter nights", bgColor: STAMP_COLORS.LIGHT_PINK, borderColor: BORDER_COLORS.DEEP_PURPLE_300, textColor: TEXT_COLORS.DEEP_PURPLE_700, scenery: 'mountain-night', rotation: 2, hasPlaid: true },
  { id: 3, text: "And the heavy pouring rain", bgColor: STAMP_COLORS.TEAL_A700, borderColor: BORDER_COLORS.PINK_300, textColor: TEXT_COLORS.PINK_700, scenery: 'rainy-lake', rotation: -2 },
  { id: 4, text: "You found your hidden strength", bgColor: STAMP_COLORS.AMBER_400, borderColor: BORDER_COLORS.GREEN_400, textColor: TEXT_COLORS.WHITE, scenery: 'sprout', rotation: 1 },
  { id: 5, text: "Even when the path was shrouded", bgColor: STAMP_COLORS.INDIGO_700, borderColor: BORDER_COLORS.LIME_700, textColor: TEXT_COLORS.WHITE, scenery: 'misty-forest', rotation: -1.5 },
  { id: 6, text: "By shadows of doubt", bgColor: STAMP_COLORS.DEEP_PURPLE_300, borderColor: BORDER_COLORS.LIME_700, textColor: TEXT_COLORS.WHITE, scenery: 'stormy-sea', rotation: 2, hasPlaid: true },
  { id: 7, text: "You kept moving forward", bgColor: STAMP_COLORS.TEAL_400, borderColor: BORDER_COLORS.PINK_300, textColor: TEXT_COLORS.WHITE, scenery: 'meadow-path', rotation: -1 },
  { id: 8, text: "Now the morning sun arises", bgColor: STAMP_COLORS.ORANGE_400, borderColor: BORDER_COLORS.TEAL_800, textColor: TEXT_COLORS.WHITE, scenery: 'sunrise-hills', rotation: 3 },
  { id: 9, text: "To kiss the golden fields", bgColor: STAMP_COLORS.CYAN_200, borderColor: BORDER_COLORS.PINK_300, textColor: TEXT_COLORS.BROWN_900, scenery: 'golden-field', rotation: -2 },
  { id: 10, text: "And you are finally blooming", bgColor: STAMP_COLORS.LIGHT_PINK, borderColor: BORDER_COLORS.DEEP_PURPLE_300, textColor: TEXT_COLORS.PINK_900, scenery: 'holding-flower', rotation: 0.5, hasPlaid: true }
];

const App: React.FC = () => {
  const [stamps, setStamps] = useState<StampData[]>(INITIAL_STAMPS);
  const [isEditing, setIsEditing] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const handleTextChange = (id: number, text: string) => {
    setStamps(prev => prev.map(s => s.id === id ? { ...s, text } : s));
  };

  const getRandomColor = (colors: Record<string, string>) => {
    const colorValues = Object.values(colors);
    return colorValues[Math.floor(Math.random() * colorValues.length)];
  };

  const getRandomScenery = (): SceneryType => {
    const sceneryTypes: SceneryType[] = [
      'seed', 'mountain-night', 'rainy-lake', 'sprout', 'misty-forest',
      'stormy-sea', 'meadow-path', 'sunrise-hills', 'golden-field', 'holding-flower'
    ];
    return sceneryTypes[Math.floor(Math.random() * sceneryTypes.length)];
  };

  const handleAddStamp = () => {
    const newId = Math.max(...stamps.map(s => s.id)) + 1;
    const newStamp: StampData = {
      id: newId,
      text: "New Stamp! Edit me!",
      bgColor: getRandomColor(STAMP_COLORS),
      borderColor: getRandomColor(BORDER_COLORS),
      textColor: getRandomColor(TEXT_COLORS),
      scenery: getRandomScenery(),
      rotation: Math.random() * 6 - 3, // Random rotation between -3 and 3 degrees
      hasPlaid: Math.random() > 0.5, // 50% chance of having plaid
    };
    setStamps(prev => [...prev, newStamp]);
  };

  const handleDownload = async () => {
    if (!galleryRef.current) return;
    setIsEditing(false); // Disable editing UI for capture
    
    // Small delay to ensure UI updates
    setTimeout(async () => {
      // html2canvas is loaded globally via CDN in index.html
      const canvas = await (window as any).html2canvas(galleryRef.current, {
        backgroundColor: '#fdf6e3',
        scale: 2, // Higher quality
        useCORS: true
      });
      const link = document.createElement('a');
      link.download = 'my-stamp-gallery.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }, 100);
  };

  return (
    <div className="min-h-screen paper-texture pb-20 p-4 md:p-10 flex flex-col items-center">
      
      {/* Control Panel */}
      <div className="fixed bottom-6 z-50 bg-white/80 backdrop-blur-md border border-white/50 px-6 py-3 rounded-full shadow-2xl flex items-center gap-4">
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-1.5 rounded-full font-hand text-sm font-bold transition-all ${isEditing ? 'bg-pink-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          aria-label={isEditing ? 'Done Editing' : 'Edit Messages'}
        >
          {isEditing ? '✓ Done Editing' : '✎ Edit Messages'}
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        <button 
          onClick={handleAddStamp}
          className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-hand text-sm font-bold shadow-lg shadow-blue-200 transition-all flex items-center gap-2"
          aria-label="Add New Stamp"
        >
          <span>➕</span> Add New Stamp
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        <button 
          onClick={handleDownload}
          className="px-4 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-full font-hand text-sm font-bold shadow-lg shadow-green-200 transition-all flex items-center gap-2"
          aria-label="Download Gallery"
        >
          <span>📥</span> Download Gallery
        </button>
      </div>

      {/* Main Art Container */}
      <div 
        ref={galleryRef}
        className="max-w-5xl w-full bg-[#fdf6e3] rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] p-10 md:p-16 border-[12px] border-double border-[#e8dfc5] relative"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 items-start">
          
          {/* Item 1 - Wide */}
          <div className="col-span-2 aspect-[16/8]">
            <Stamp data={stamps[0]} isEditing={isEditing} onTextChange={handleTextChange} />
          </div>

          {/* Item 2 - Tall */}
          <div className="col-span-1 row-span-2 aspect-[3/5]">
            <Stamp data={stamps[1]} isEditing={isEditing} onTextChange={handleTextChange} />
          </div>

          {/* Item 3 */}
          <div className="col-span-1 aspect-[1/1]">
            <Stamp data={stamps[2]} isEditing={isEditing} onTextChange={handleTextChange} />
          </div>

          {/* Item 4 */}
          <div className="col-span-1 aspect-[3/4]">
            <Stamp data={stamps[3]} isEditing={isEditing} onTextChange={handleTextChange} />
          </div>

          {/* Item 5 - Wide */}
          <div className="col-span-2 aspect-[16/7]">
            <Stamp data={stamps[4]} isEditing={isEditing} onTextChange={handleTextChange} />
          </div>

          {/* Item 6 */}
          <div className="col-span-1 aspect-[1/1]">
            <Stamp data={stamps[5]} isEditing={isEditing} onTextChange={handleTextChange} />
          </div>

          {/* Item 7 */}
          <div className="col-span-1 aspect-[4/3]">
            <Stamp data={stamps[6]} isEditing={isEditing} onTextChange={handleTextChange} />
          </div>

          {/* Item 8 */}
          <div className="col-span-1 aspect-[3/4]">
            <Stamp data={stamps[7]} isEditing={isEditing} onTextChange={handleTextChange} />
          </div>

          {/* Item 9 */}
          <div className="col-span-1 aspect-[3/5]">
            <Stamp data={stamps[8]} isEditing={isEditing} onTextChange={handleTextChange} />
          </div>

          {/* Item 10 - Large Focus */}
          <div className="col-span-2 aspect-[4/5] lg:col-span-2">
            <Stamp data={stamps[9]} isEditing={isEditing} onTextChange={handleTextChange} />
          </div>
          
        </div>
      </div>

      <div className="mt-12 text-center text-gray-400 font-hand">
        Hand-crafted with love &bull; Interactive Digital Edition
      </div>
    </div>
  );
};

export default App;
