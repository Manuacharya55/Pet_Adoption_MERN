import { motion } from "framer-motion";

const Loader = ({ text = "Loading...", fullScreen = false }) => {
    return (
        <div
            className="loader-container"
            style={fullScreen ? { minHeight: "100vh" } : undefined}
        >
            <div className="loader-content">
                <div className="loader-paw-track">
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="loader-paw"
                            initial={{ opacity: 0.2, scale: 0.8 }}
                            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.1, 0.8] }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut",
                            }}
                        >
                            🐾
                        </motion.div>
                    ))}
                </div>
                <motion.p
                    className="loader-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    {text}
                </motion.p>
            </div>
        </div>
    );
};

export default Loader;
