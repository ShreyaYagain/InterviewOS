import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  contact: {
    name: '', jobTitle: '', email: '', phone: '',
    address: '', linkedin: '', github: '',
    blogs: '', twitter: '', portfolio: ''
  },
  summary: { text: '' },
  education: [],
  experience: [],
  projects: [],
  skills: { text: '' },
  certificates: [],
  languages: [],
  saved: false
};

// Load from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('resumeState');
    if (serializedState === null) return initialState;
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState: loadState(),
  reducers: {
    updateContact: (state, action) => {
      state.contact = { ...state.contact, ...action.payload };
    },
    updateSummary: (state, action) => {
      state.summary.text = action.payload;
    },
    updateSkills: (state, action) => {
      state.skills.text = action.payload;
    },
    addEntry: (state, action) => {
      const { section, entry } = action.payload;
      state[section].push(entry);
    },
    updateEntry: (state, action) => {
      const { section, index, entry } = action.payload;
      state[section][index] = { ...state[section][index], ...entry };
    },
    deleteEntry: (state, action) => {
      const { section, index } = action.payload;
      state[section].splice(index, 1);
    },
    moveEntry: (state, action) => {
      const { section, index, direction } = action.payload;
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex >= 0 && targetIndex < state[section].length) {
        const [removed] = state[section].splice(index, 1);
        state[section].splice(targetIndex, 0, removed);
      }
    },
    saveResume: (state) => {
      state.saved = true;
    },
    resetSaved: (state) => {
      state.saved = false;
    }
  }
});

export const {
  updateContact, updateSummary, updateSkills,
  addEntry, updateEntry, deleteEntry, moveEntry,
  saveResume, resetSaved
} = resumeSlice.actions;

export const store = configureStore({
  reducer: {
    resume: resumeSlice.reducer
  }
});

// Persistence Middleware (Debounced)
let saveTimeout;
store.subscribe(() => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    localStorage.setItem('resumeState', JSON.stringify(store.getState().resume));
  }, 2500);
});

// Auto-save pulse every 10s
setInterval(() => {
  store.dispatch(saveResume());
  setTimeout(() => store.dispatch(resetSaved()), 100);
}, 10000);
