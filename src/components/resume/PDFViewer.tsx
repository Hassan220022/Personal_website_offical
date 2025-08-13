import React, { useCallback, useState } from 'react';
import { Download, AlertCircle, Maximize2, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';
import { Tooltip } from '../ui/Tooltip';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const PDFViewer: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1.0);

  const pdfUrl = 'https://raw.githubusercontent.com/Hassan220022/cv_mikawi/main/mikawi_CV.pdf';

  const handleDownload = useCallback(async () => {
    try {
      setDownloading(true);
      const response = await fetch(pdfUrl);

      if (!response.ok) {
        throw new Error('Failed to download CV');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Hassan_Mikawi_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback to direct link
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'Hassan_Mikawi_CV.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setDownloading(false);
    }
  }, [pdfUrl]);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPdfLoading(false);
    setPdfError(false);
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error('PDF load error:', error);
    setPdfLoading(false);
    setPdfError(true);
  }, []);

  const retryPdfLoad = useCallback(() => {
    setPdfLoading(true);
    setPdfError(false);
    setPageNumber(1);
    setNumPages(null);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  const goToPrevPage = useCallback(() => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setPageNumber(prev => Math.min(prev + 1, numPages || 1));
  }, [numPages]);

  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(prev + 0.2, 2.0));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  }, []);

  return (
    <div className="flex flex-col items-center bg-card rounded-lg shadow-md p-4 sm:p-6">
      {/* Header with controls */}
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-foreground">Resume</h2>
        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          {!pdfError && numPages && (
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <Tooltip content="Zoom Out">
                <button
                  onClick={zoomOut}
                  disabled={scale <= 0.5}
                  className="p-1.5 rounded hover:bg-accent transition-colors disabled:opacity-50"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </Tooltip>
              <span className="text-xs font-medium px-2 min-w-[3rem] text-center">
                {Math.round(scale * 100)}%
              </span>
              <Tooltip content="Zoom In">
                <button
                  onClick={zoomIn}
                  disabled={scale >= 2.0}
                  className="p-1.5 rounded hover:bg-accent transition-colors disabled:opacity-50"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </Tooltip>
            </div>
          )}

          {/* Fullscreen Toggle */}
          <Tooltip content={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </Tooltip>

          {/* Download Button */}
          <Tooltip content="Download PDF">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              aria-label="Download CV as PDF"
            >
              <Download className="w-4 h-4" />
              {downloading ? 'Downloading...' : 'Download'}
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Loading State */}
      <AnimatePresence>
        {pdfLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm rounded-lg z-10"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">Loading PDF...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      <AnimatePresence>
        {pdfError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-destructive mb-2">Failed to Load PDF</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Unable to display the PDF. You can still download it or try refreshing.
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={retryPdfLoad}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Retry
                </button>
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors disabled:opacity-50"
                >
                  {downloading ? 'Downloading...' : 'Download PDF'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Viewer */}
      {!pdfError && (
        <div className={`relative bg-white transition-all duration-300 w-full ${
          isFullscreen ? 'fixed inset-0 z-50 p-8' : 'rounded-lg'
        }`}>
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={null}
            error={null}
            className="flex flex-col items-center"
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              className="shadow-lg"
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>

          {/* Page Navigation */}
          {numPages && numPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-4 p-2 bg-muted rounded-lg">
              <Tooltip content="Previous Page">
                <button
                  onClick={goToPrevPage}
                  disabled={pageNumber <= 1}
                  className="p-2 rounded hover:bg-accent transition-colors disabled:opacity-50"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </Tooltip>
              
              <span className="text-sm font-medium px-3">
                Page {pageNumber} of {numPages}
              </span>
              
              <Tooltip content="Next Page">
                <button
                  onClick={goToNextPage}
                  disabled={pageNumber >= numPages}
                  className="p-2 rounded hover:bg-accent transition-colors disabled:opacity-50"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </Tooltip>
            </div>
          )}
        </div>
      )}

      {/* Additional Info */}
      <div className="mt-4 text-center">
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span>Last updated: {new Date().toLocaleDateString()}</span>
          {numPages && (
            <span className="px-2 py-1 bg-muted rounded-full">
              {numPages} page{numPages > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Use zoom controls for better readability or download the PDF for offline access
        </p>
      </div>
    </div>
  );
};

export default PDFViewer;