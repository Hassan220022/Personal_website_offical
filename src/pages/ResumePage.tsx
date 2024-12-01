import React from 'react';
import ProfileHeader from '../components/resume/ProfileHeader';
import PDFViewer from '../components/resume/PDFViewer';

const ResumePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <ProfileHeader />
      <PDFViewer />
    </div>
  );
};

export default ResumePage;