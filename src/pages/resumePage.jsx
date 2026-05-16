import React, { useState, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store, saveResume, resetSaved } from '../lib/resumeStore';
import FormPane from '../components/resume/FormPane';
import PreviewPane from '../components/resume/PreviewPane';
import Tilt from 'react-parallax-tilt';

const ResumePageContent = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('contact');
  const [isSaving, setIsSaving] = useState(false);

  // Sync tab with URL hash/params if needed
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const tab = params.get('tab');
    if (tab) setActiveTab(tab);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Simple way to update URL without full reload in this custom router
    const [base] = window.location.hash.split('?');
    window.location.hash = `${base}?tab=${tab}`;
  };

  const handleManualSave = () => {
    setIsSaving(true);
    dispatch(saveResume());
    setTimeout(() => {
      dispatch(resetSaved());
      setIsSaving(false);
    }, 800);
  };

  return (
    <div className="resume-page-wrapper">
      {/* Hero Banner */}
      <div className="resume-hero animate-fade-in-up">
        <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02}>
          <div className="hero-content">
            <span className="hero-label">// resume_generator</span>
            <h1 className="hero-title">build your resume in minutes</h1>
            <p className="hero-subtitle">fill the form → live pdf preview → download. no login.</p>
          </div>
        </Tilt>
      </div>

      <div className="resume-main-header">
        <div className="header-left">
          <span className="header-label">// resume_generator</span>
          <h2 className="header-title">resume generator</h2>
          <p className="header-subtitle">build your resume. download as pdf. no account needed.</p>
        </div>
        <div className="header-right">
          <button 
            className="save-action-btn" 
            onClick={handleManualSave}
            disabled={isSaving}
          >
            {isSaving ? '[ saving... ]' : '[ save ]'}
          </button>
        </div>
      </div>

      <div className="resume-grid">
        <div className="grid-col preview-col animate-fade-in-left">
          <PreviewPane />
        </div>
        <div className="grid-col form-col animate-fade-in-right">
          <FormPane activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      </div>
    </div>
  );
};

const ResumePage = () => (
  <Provider store={store}>
    <ResumePageContent />
  </Provider>
);

export default ResumePage;
