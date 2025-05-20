import React from 'react';
import { motion } from 'framer-motion';
import { 
  Frown, MehIcon, SmileIcon, HeartIcon, HeartHandshake
} from 'lucide-react';

interface MoodSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const MoodSlider: React.FC<MoodSliderProps> = ({ value, onChange }) => {
  // Array of moods from worst to best
  const moods = [
    { icon: Frown, label: 'Very Upset', color: 'text-error-500' },
    { icon: Frown, label: 'Upset', color: 'text-warning-500' },
    { icon: MehIcon, label: 'Neutral', color: 'text-gray-500' },
    { icon: SmileIcon, label: 'Good', color: 'text-success-500' },
    { icon: HeartIcon, label: 'Great', color: 'text-primary-500' },
  ];

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Current Mood
        </label>
        <div className="flex items-center">
          {React.createElement(moods[value - 1].icon, { 
            size: 20,
            className: `${moods[value - 1].color} mr-2`
          })}
          <span className="text-sm font-medium text-gray-700">
            {moods[value - 1].label}
          </span>
        </div>
      </div>
      
      <div className="relative pt-1">
        <div className="flex h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className="transition-all duration-300 ease-in-out"
            style={{
              width: `${((value - 1) / 4) * 100}%`,
              background: `linear-gradient(to right, 
                var(--tw-gradient-stops))`,
              '--tw-gradient-from': '#ef4444',
              '--tw-gradient-to': '#ec4899',
              '--tw-gradient-stops': 'var(--tw-gradient-from), #f59e0b, #10b981, var(--tw-gradient-to)',
            }}
          ></div>
        </div>
        
        <div className="flex justify-between mt-2">
          {moods.map((mood, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center cursor-pointer" 
              onClick={() => onChange(idx + 1)}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  value === idx + 1 
                    ? `${moods[idx].color.replace('text-', 'bg-')} text-white` 
                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                }`}
              >
                {React.createElement(mood.icon, { size: 16 })}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodSlider;