import { motion } from 'framer-motion';
import React from 'react';

const HeroSection = () => {
    return (
        <section className="hero">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1>Welcome to Our Site!</h1>
                <p>Your journey starts here.</p>
            </motion.div>
        </section>
    );
};

export default HeroSection;
