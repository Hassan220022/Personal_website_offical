import React from 'react';
import { motion } from 'framer-motion';
import ProfileHeader from '../components/resume/ProfileHeader';
import PDFViewer from '../components/resume/PDFViewer';

const ResumePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Resume
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Download my latest resume or view it below. Feel free to reach out for any opportunities or collaborations.
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-6 sm:space-y-8">
          <ProfileHeader />
          <PDFViewer />
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-12 pt-8 border-t border-border"
        >
          <p className="text-xs sm:text-sm text-muted-foreground">
            This resume is regularly updated. For the most current version, please download the PDF.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResumePage;