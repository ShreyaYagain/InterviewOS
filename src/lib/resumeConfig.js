export const RESUME_SECTIONS = [
  {
    id: 'contact',
    label: 'Contact',
    type: 'object',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
      { name: 'jobTitle', label: 'Job Title', type: 'text', placeholder: 'Software Engineer' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
      { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+91 98765 43210' },
      { name: 'address', label: 'Address', type: 'text', placeholder: 'Bangalore, India' },
      { name: 'linkedin', label: 'LinkedIn', type: 'url', placeholder: 'linkedin.com/in/johndoe' },
      { name: 'github', label: 'GitHub', type: 'url', placeholder: 'github.com/johndoe' },
      { name: 'blogs', label: 'Blog', type: 'url', placeholder: 'dev.to/johndoe' },
      { name: 'twitter', label: 'Twitter', type: 'url', placeholder: 'twitter.com/johndoe' },
      { name: 'portfolio', label: 'Portfolio', type: 'url', placeholder: 'johndoe.dev' },
    ]
  },
  {
    id: 'summary',
    label: 'Summary',
    type: 'textarea',
    placeholder: 'Write a 2-3 sentence professional summary...'
  },
  {
    id: 'experience',
    label: 'Experience',
    type: 'array',
    fields: [
      { name: 'company', label: 'Company', type: 'text', placeholder: 'Google' },
      { name: 'role', label: 'Role', type: 'text', placeholder: 'Senior Engineer' },
      { name: 'startDate', label: 'Start Date', type: 'text', placeholder: 'Jun 2021' },
      { name: 'endDate', label: 'End Date', type: 'text', placeholder: 'Present' },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'Bangalore, India' },
      { name: 'description', label: 'Description', type: 'bullets', placeholder: 'Add bullet points...' },
    ]
  },
  {
    id: 'education',
    label: 'Education',
    type: 'array',
    fields: [
      { name: 'institution', label: 'Institution', type: 'text', placeholder: 'SRM Institute of Science and Technology' },
      { name: 'degree', label: 'Degree', type: 'text', placeholder: 'B.Tech Computer Science' },
      { name: 'startDate', label: 'Start Date', type: 'text', placeholder: 'Aug 2021' },
      { name: 'endDate', label: 'End Date', type: 'text', placeholder: 'May 2025' },
      { name: 'gpa', label: 'GPA', type: 'text', placeholder: '8.9 / 10' },
    ]
  },
  {
    id: 'projects',
    label: 'Projects',
    type: 'array',
    fields: [
      { name: 'name', label: 'Project Name', type: 'text', placeholder: 'InterviewOS' },
      { name: 'tech', label: 'Tech Stack', type: 'text', placeholder: 'Next.js, Supabase, NVIDIA NIM' },
      { name: 'link', label: 'Link', type: 'url', placeholder: 'github.com/you/project' },
      { name: 'description', label: 'Description', type: 'bullets', placeholder: 'Add bullet points...' },
    ]
  },
  {
    id: 'skills',
    label: 'Skills',
    type: 'textarea',
    placeholder: 'Languages: Python, JavaScript, Go\nFrameworks: React, Next.js, FastAPI\nTools: Git, Docker, AWS'
  },
  {
    id: 'certificates',
    label: 'Certificates',
    type: 'array',
    fields: [
      { name: 'name', label: 'Certificate Name', type: 'text', placeholder: 'AWS Solutions Architect' },
      { name: 'issuer', label: 'Issued By', type: 'text', placeholder: 'Amazon Web Services' },
      { name: 'date', label: 'Date', type: 'text', placeholder: 'Mar 2024' },
      { name: 'link', label: 'Credential Link', type: 'url', placeholder: 'credly.com/badges/...' },
    ]
  },
  {
    id: 'languages',
    label: 'Languages',
    type: 'array',
    fields: [
      { name: 'language', label: 'Language', type: 'text', placeholder: 'English' },
      { name: 'proficiency', label: 'Proficiency', type: 'select', 
        options: ['Native', 'Fluent', 'Professional', 'Intermediate', 'Basic'] },
    ]
  }
]
