import React, { useState, useCallback, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, Download, Printer, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from '../ui/Slider';
import { Tooltip } from '../ui/Tooltip';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer: React.FC = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const handlePrint = useCallback(() => {
    window.open('https://raw.githubusercontent.com/Hassan220022/cv_mikawi/main/mikawi_CV.pdf', '_blank');
  }, []);

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = 'https://raw.githubusercontent.com/Hassan220022/cv_mikawi/main/mikawi_CV.pdf';
    link.download = 'Hassan_Mikawi_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        if (e.key === '=') {
          e.preventDefault();
          setScale(prev => Math.min(prev + 0.1, 2));
        } else if (e.key === '-') {
          e.preventDefault();
          setScale(prev => Math.max(prev - 0.1, 0.5));
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="flex flex-col items-center bg-card rounded-lg shadow-md p-4">
      <div className="w-full flex justify-end mb-4">
        <Tooltip content="Download CV">
          <button
            onClick={handleDownload}
            className="p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Download CV"
          >
            <Download className="w-5 h-5" />
          </button>
        </Tooltip>
      </div>

      <div className="relative w-full overflow-hidden rounded-lg">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          src="https://raw.githubusercontent.com/Hassan220022/cv_mikawi/main/PNG/mikawi_CV.png"
          alt="Hassan Mikawi CV"
          className="w-full h-auto object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default PDFViewer;