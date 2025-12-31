
import React, { useState, useRef } from 'react';
import Stamp from './components/Stamp';
import { StampData } from './types';

const INITIAL_STAMPS: StampData[] = [
  { id: 1, text: "It started as a tiny quiet seed", bgColor: "#5a6da3", borderColor: "#a8b454", textColor: "#ffffff", scenery: 'seed', rotation: -1 },
  { id: 2, text: "Through the longest winter nights", bgColor: "#fce4ec", borderColor: "#9575cd", textColor: "#5e35b1", scenery: 'mountain-night', rotation: 2, hasPlaid: true },
  { id: 3, text: "And the heavy pouring rain", bgColor: "#a7ffeb", borderColor: "#f06292", textColor: "#c2185b", scenery: 'rainy-lake', rotation: -2 },
  { id: 4, text: "You found your hidden strength", bgColor: "#ffb74d", borderColor: "#66bb6a", textColor: "#ffffff", scenery: 'sprout', rotation: 1 },
  { id: 5, text: "Even when the path was shrouded", bgColor: "#3f51b5", borderColor: "#9e9d24", textColor: "#ffffff", scenery: 'misty-forest', rotation: -1.5 },
  { id: 6, text: "By shadows of doubt", bgColor: "#9575cd", borderColor: "#9e9d24", textColor: "#ffffff", scenery: 'stormy-sea', rotation: 2, hasPlaid: true },
  { id: 7, text: "You kept moving forward", bgColor: "#4db6ac", borderColor: "#f06292", textColor: "#ffffff", scenery: 'meadow-path', rotation: -1 },
  { id: 8, text: "Now the morning sun arises", bgColor: "#ffa726", borderColor: "#00897b", textColor: "#ffffff", scenery: 'sunrise-hills', rotation: 3 },
  { id: 9, text: "To kiss the golden fields", bgColor: "#80cbc4", borderColor: "#f06292", textColor: "#004d40", scenery: 'golden-field', rotation: -2 },
  { id: 10, text: "And you are finally blooming", bgColor: "#fce4ec", borderColor: "#9575cd", textColor: "#880e4f", scenery: 'holding-flower', rotation: 0.5, hasPlaid: true }
];

const App: React.FC = () => {
  const [stamps, setStamps] = useState<StampData[]>(INITIAL_STAMPS);
  const [isEditing, setIsEditing] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const handleTextChange = (id: number, text: string) => {
    setStamps(prev => prev.map(s => s.id === id ? { ...s, text } : s));
  };

  const handleDownload = async () => {
    if (!galleryRef.current) return;
    setIsEditing(false); // Disable editing UI for capture
    
    // Small delay to ensure UI updates
    setTimeout(async () => {
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
        >
          {isEditing ? '✓ Done Editing' : '✎ Edit Messages'}
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        <button 
          onClick={handleDownload}
          className="px-4 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-full font-hand text-sm font-bold shadow-lg shadow-green-200 transition-all flex items-center gap-2"
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
