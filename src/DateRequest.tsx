import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Coffee, Sparkles } from 'lucide-react';

export default function DateRequest() {
    const [noCount, setNoCount] = useState(0);
    const [yesPressed, setYesPressed] = useState(false);
    const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

    const handleNoClick = () => {
        setNoCount(noCount + 1);
    };

    // Evasive logic starts after 5 clicks (6th click practically impossible)
    const handleNoHover = () => {
        if (noCount >= 5) {
            const newX = Math.random() * 300 - 150; // Random offset between -150 and 150
            const newY = Math.random() * 300 - 150; // Random offset between -150 and 150
            setNoPosition({ x: newX, y: newY });
        }
    };

    const NO_PHRASES = [
        "No",
        "Are you sure?",
        "Think about the snacks!",
        "I'll bring chocolate!",
        "We can just watch movies!",
        "Please Mahee 🥺",
        "Okay, you're too fast..." // Fallback if she somehow clicks it while it jumps
    ];

    const getNoButtonText = () => {
        return NO_PHRASES[Math.min(noCount, NO_PHRASES.length - 1)];
    };

    // Generate random hearts for the success screen
    const floatingHearts = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}vw`,
        animationDuration: Math.random() * 3 + 3, // Between 3-6s
        delay: Math.random() * 2,                 // Between 0-2s
        size: Math.random() * 24 + 16,            // Between 16-40px
    }));

    if (yesPressed) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="fixed inset-0 bg-pink-50 flex flex-col items-center justify-center overflow-hidden"
            >
                {/* Floating Hearts background animation */}
                {floatingHearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        initial={{ y: '100vh', opacity: 0 }}
                        animate={{
                            y: '-20vh',
                            opacity: [0, 1, 0.8, 0],
                            x: ['-20px', '20px', '-10px']
                        }}
                        transition={{
                            duration: heart.animationDuration,
                            delay: heart.delay,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute text-rose-300"
                        style={{ left: heart.left }}
                    >
                        <Heart fill="currentColor" size={heart.size} opacity={0.6} />
                    </motion.div>
                ))}

                <motion.div
                    initial={{ scale: 0.8, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
                    className="relative z-10 flex flex-col items-center p-8 bg-white/70 backdrop-blur-md rounded-[3rem] shadow-2xl max-w-lg text-center"
                >
                    <div className="flex gap-4 mb-6">
                        <Coffee className="text-rose-400" size={56} strokeWidth={1.5} />
                        <Heart className="text-rose-500 fill-rose-500 animate-pulse" size={56} />
                    </div>
                    <h1 className="text-4xl font-extrabold text-rose-600 mb-4 font-serif">
                        Yay! I knew you'd say yes! ❤️
                    </h1>
                    <p className="text-xl text-rose-800 leading-relaxed font-medium">
                        Check your phone, I'm sending some comfort food your way right now. Rest up and stay cozy!
                    </p>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4 overflow-hidden relative selection:bg-rose-200">

            {/* Subtle background decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute top-10 left-10 text-rose-200"
                >
                    <Sparkles size={64} />
                </motion.div>
                <div className="absolute bottom-20 right-10 text-rose-200 opacity-50">
                    <Heart fill="currentColor" size={100} />
                </div>
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.4 }}
                className="z-10 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-pink-100 flex flex-col items-center max-w-md w-full"
            >
                <div className="mb-8 relative overflow-hidden rounded-3xl shadow-sm">
                    {/* Cute aesthetic placeholder GIF of a cozy cat */}
                    <img
                        src="https://media.tenor.com/7T2vjJb4p0MAAAAi/cat-blanket.gif"
                        alt="Cozy cat in blanket"
                        className="w-56 h-56 object-cover"
                    />
                </div>

                <h1 className="text-3xl md:text-3xl font-bold text-center text-rose-600 mb-4 font-serif leading-tight">
                    Hey Mahee, I have a question...
                </h1>

                <p className="text-lg text-center text-rose-800/80 mb-10 font-medium">
                    Will you go on a date with me once you're feeling better?
                </p>

                {/* Action Buttons Area */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full min-h-[160px] relative">
                    <motion.button
                        onClick={() => setYesPressed(true)}
                        className="bg-rose-400 hover:bg-rose-500 text-white font-bold rounded-full shadow-lg transition-colors flex z-10"
                        style={{
                            // Grow font and padding drastically with each "No" click
                            fontSize: noCount * 8 + 16,
                            padding: `${noCount * 6 + 12}px ${noCount * 10 + 24}px`
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Yes! 💕
                    </motion.button>

                    <motion.button
                        onClick={handleNoClick}
                        onMouseEnter={handleNoHover}
                        animate={{
                            x: noPosition.x,
                            y: noPosition.y
                        }}
                        transition={{ type: "spring", bounce: 0.6 }}
                        // Keep No button standard size with soft colors
                        className="bg-pink-100 hover:bg-pink-200 text-pink-700 font-semibold py-3 px-6 rounded-full shadow-sm whitespace-nowrap absolute right-auto md:relative md:ml-4 z-20"
                        whileTap={{ scale: 0.9 }}
                    >
                        {getNoButtonText()}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
