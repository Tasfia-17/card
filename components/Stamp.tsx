import React, { useState } from 'react';
import { StampData } from '../types';
import { Scenery } from './Illustrations';
import { generateStampText } from '../services/aiService';

interface StampProps {
  data: StampData;
  isEditing: boolean;
  onTextChange: (id: number, text: string) => void;
  onDelete: (id: number) => void;
  onRandomize: (id: number) => void;
}

const Stamp: React.FC<StampProps> = ({ data, isEditing, onTextChange, onDelete, onRandomize }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateText = async () => {
    setIsGenerating(true);
    const prompt = `Write a short, uplifting message for a stamp with a ${data.scenery} theme. Max 10 words.`;
    const generatedText = await generateStampText(prompt);
    onTextChange(data.id, generatedText);
    setIsGenerating(false);
  };

  return (
    <div 
      className="relative p-2.5 group transition-all duration-700 animate-float h-full w-full"
      style={{ 
        '--rot': `${data.rotation || 0}deg`,
        animationDelay: `${data.id * 0.2}s`
      } as any}
    >
      {/* Outer Scalloped Border */}
      <div 
        className="absolute inset-0 stamp-mask flex items-center justify-center overflow-hidden shadow-lg" 
        style={{ backgroundColor: data.borderColor }}
      >
        <div className="absolute inset-0 polka-dots opacity-30"></div>
      </div>
      
      {/* Inner Decorative Card */}
      <div 
        className={`relative w-full h-full flex flex-col items-center justify-center p-3 overflow-hidden rounded-sm border border-black/5`}
        style={{
          backgroundColor: data.bgColor,
          backgroundImage: data.hasPlaid ? 'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 10px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 10px)' : 'none'
        }}
      >
        {/* Scenery Layer (Fills Background) */}
        <div className="absolute inset-0 z-0 pointer-events-none transition-transform duration-1000 group-hover:scale-110">
          <Scenery type={data.scenery} />
        </div>

        {/* Gloss Overlay */}
        <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-black/5"></div>

        {/* Number Badge */}
        <div className="absolute top-2 left-2 z-20 px-1.5 py-0.5 bg-white/60 backdrop-blur-sm rounded-md border border-white/40 text-[9px] font-tag font-bold text-gray-800 shadow-sm">
          STAMP #{String(data.id).padStart(2, '0')}
        </div>

        {/* Delete Button (visible in edit mode) */}
        {isEditing && (
          <button 
            onClick={() => onDelete(data.id)}
            className="absolute top-2 right-2 z-20 bg-red-500/80 hover:bg-red-600/90 text-white rounded-full p-1 shadow-md transition-all"
            aria-label={`Delete stamp ${data.id}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}

        {/* Generate Text Button (visible in edit mode) */}
        {isEditing && (
          <button
            onClick={handleGenerateText}
            className={`absolute bottom-2 left-1/2 -translate-x-1/2 z-20 bg-purple-500/80 hover:bg-purple-600/90 text-white rounded-full px-2 py-1 text-xs shadow-md transition-all flex items-center gap-1 ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Generate text with AI"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
            )}
            <span>{isGenerating ? 'Generating...' : 'AI Text'}</span>
          </button>
        )}

        {/* Randomize Button (visible in edit mode) */}
        {isEditing && (
          <button 
            onClick={() => onRandomize(data.id)}
            className="absolute top-2 right-12 z-20 bg-yellow-500/80 hover:bg-yellow-600/90 text-white rounded-full p-1 shadow-md transition-all"
            aria-label={`Randomize stamp ${data.id}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004 12v5m7-14l-4 4L8 14m0 0l-4 4m4-4H4m7 7l4-4 4 4m0 0l4 4m-4-4h4" />
            </svg>
          </button>
        )}

        {/* Text Content Layer */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {isEditing ? (
            <textarea
              className="w-full bg-white/30 hover:bg-white/50 focus:bg-white/70 rounded-lg p-3 text-center font-comic text-sm md:text-base outline-none border-2 border-transparent focus:border-white/80 transition-all resize-none overflow-hidden h-full flex items-center justify-center placeholder:text-gray-500/50"
              value={data.text}
              onChange={(e) => onTextChange(data.id, e.target.value)}
              placeholder="Write your soul message..."
              spellCheck={false}
            />
          ) : (
            <div className="p-4 bg-black/5 backdrop-blur-[1px] rounded-xl border border-white/10 max-w-[90%] shadow-sm">
              <p 
                className="font-comic text-sm md:text-base lg:text-lg leading-snug uppercase tracking-wider text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)] break-words"
                style={{ color: data.textColor }}
              >
                {data.text}
              </p>
            </div>
          )}
        </div>

        {/* Stamp "Cancellation" Mark (Bottom Right) */}
        <div className="absolute bottom-2 right-2 z-20 opacity-20 transform rotate-12">
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="6" fontWeight="bold">OFFICIAL</text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Stamp;
