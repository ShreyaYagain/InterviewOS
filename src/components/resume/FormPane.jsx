import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RESUME_SECTIONS } from '../../lib/resumeConfig';
import { updateContact, updateSummary, updateSkills, addEntry, updateEntry, deleteEntry, moveEntry } from '../../lib/resumeStore';
import { HiOutlineTrash, HiChevronUp, HiChevronDown, HiPlus } from 'react-icons/hi';

const FormPane = ({ activeTab, onTabChange }) => {
  const dispatch = useDispatch();
  const resumeState = useSelector((state) => state.resume);
  const currentSection = RESUME_SECTIONS.find(s => s.id === activeTab);

  if (!currentSection) return null;

  const renderField = (field, value, onChange) => {
    if (field.type === 'select') {
      return (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="resume-input"
        >
          <option value="" disabled>{field.placeholder || 'Select...'}</option>
          {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      );
    }
    
    if (field.type === 'bullets' || field.type === 'textarea') {
      return (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="resume-input min-h-[120px]"
        />
      );
    }

    return (
      <input
        type={field.type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className="resume-input"
      />
    );
  };

  return (
    <div className="form-pane">
      {/* Tab Navigation */}
      <div className="tab-nav-wrapper">
        <div className="tab-nav">
          {RESUME_SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => onTabChange(s.id)}
              className={`tab-button ${activeTab === s.id ? 'active' : ''}`}
            >
              {s.label.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="section-content animate-fade-in">
        {currentSection.type === 'object' && (
          <div className="grid grid-cols-2 gap-4">
            {currentSection.fields.map(f => (
              <div key={f.name} className="field-group">
                <label className="field-label">{f.label}</label>
                {renderField(f, resumeState[currentSection.id][f.name], (val) => 
                  dispatch(updateContact({ [f.name]: val }))
                )}
              </div>
            ))}
          </div>
        )}

        {currentSection.type === 'textarea' && (
          <div className="field-group">
            <label className="field-label">{currentSection.label}</label>
            {renderField(
              { type: 'textarea', placeholder: currentSection.placeholder },
              resumeState[currentSection.id].text,
              (val) => {
                if (currentSection.id === 'summary') dispatch(updateSummary(val));
                else if (currentSection.id === 'skills') dispatch(updateSkills(val));
              }
            )}
          </div>
        )}

        {currentSection.type === 'array' && (
          <div className="array-section">
            <div className="entries-list">
              {resumeState[currentSection.id].length === 0 ? (
                <div className="empty-state">// no entries yet</div>
              ) : (
                resumeState[currentSection.id].map((entry, idx) => (
                  <div key={idx} className="entry-card">
                    <details className="entry-details">
                      <summary className="entry-summary">
                        <span className="entry-title">
                          {entry[currentSection.fields[0].name] || `new ${currentSection.id.slice(0, -1)}`}
                        </span>
                        <div className="entry-controls">
                          <button 
                            disabled={idx === 0} 
                            onClick={(e) => { e.preventDefault(); dispatch(moveEntry({ section: currentSection.id, index: idx, direction: 'up' })) }}
                          >
                            <HiChevronUp />
                          </button>
                          <button 
                            disabled={idx === resumeState[currentSection.id].length - 1} 
                            onClick={(e) => { e.preventDefault(); dispatch(moveEntry({ section: currentSection.id, index: idx, direction: 'down' })) }}
                          >
                            <HiChevronDown />
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={(e) => { e.preventDefault(); dispatch(deleteEntry({ section: currentSection.id, index: idx })) }}
                          >
                            <HiOutlineTrash />
                          </button>
                        </div>
                      </summary>
                      <div className="entry-fields grid grid-cols-2 gap-4 mt-4 px-4 pb-4">
                        {currentSection.fields.map(f => (
                          <div key={f.name} className={`field-group ${f.type === 'bullets' ? 'col-span-2' : ''}`}>
                            <label className="field-label">{f.label}</label>
                            {renderField(f, entry[f.name], (val) => 
                              dispatch(updateEntry({ section: currentSection.id, index: idx, entry: { [f.name]: val } }))
                            )}
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                ))
              )}
            </div>
            <button 
              className="add-entry-btn"
              onClick={() => dispatch(addEntry({ section: currentSection.id, entry: {} }))}
            >
              <HiPlus className="mr-2" /> add entry
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default FormPane;
