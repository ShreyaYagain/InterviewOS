import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { pdf, PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';

const PreviewPane = () => {
  const resumeState = useSelector((state) => state.resume);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const generationId = useRef(0);

  const generatePDF = async () => {
    const currentId = ++generationId.current;
    setIsGenerating(true);
    try {
      const blob = await pdf(<ResumePDF data={resumeState} />).toBlob();
      // Only update if this is still the latest generation request
      if (currentId === generationId.current) {
        if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      }
    } catch (err) {
      console.error('PDF generation error:', err);
    } finally {
      if (currentId === generationId.current) {
        setIsGenerating(false);
      }
    }
  };

  // Trigger on mount
  useEffect(() => {
    generatePDF();
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, []);

  // Trigger when Redux 'saved' fires (pulse)
  useEffect(() => {
    if (resumeState.saved) {
      generatePDF();
    }
  }, [resumeState.saved]);

  // Auto-generate every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      generatePDF();
    }, 10000);
    return () => clearInterval(interval);
  }, [resumeState]); // Dependency on resumeState to ensure we have latest data for interval

  const openPreview = () => {
    if (pdfUrl) window.open(pdfUrl, '_blank');
  };

  return (
    <div className="preview-pane">
      <div className="preview-header">
        <span className="preview-label">// pdf_preview</span>
      </div>

      <div className="preview-body">
        {pdfUrl ? (
          <iframe 
            src={pdfUrl} 
            className="pdf-iframe" 
            title="Resume Preview"
          />
        ) : (
          <div className="generating-overlay">
            <span className="spinner">// generating pdf...</span>
          </div>
        )}
        
        {isGenerating && pdfUrl && (
          <div className="mini-generating-indicator">// updating...</div>
        )}
      </div>

      <div className="preview-footer">
        {pdfUrl ? (
          <>
            <PDFDownloadLink
              document={<ResumePDF data={resumeState} />}
              fileName={`${resumeState.contact.name || 'resume'}.pdf`}
              className="download-btn"
            >
              {({ loading }) => (loading ? '[ preparing... ]' : '[ download ]')}
            </PDFDownloadLink>
            <button onClick={openPreview} className="open-preview-btn">
              [ open preview ]
            </button>
          </>
        ) : (
          <button className="download-btn" disabled>[ preparing... ]</button>
        )}
      </div>

    </div>
  );
};

export default PreviewPane;
