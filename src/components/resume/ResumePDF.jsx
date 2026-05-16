import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 36,
    paddingLeft: 48,
    paddingRight: 48,
    fontFamily: 'Times-Roman',
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  header: {
    marginBottom: 12,
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontFamily: 'Times-Bold',
    marginBottom: 4,
  },
  titleLocation: {
    fontSize: 11,
    color: '#333333',
    marginBottom: 4,
  },
  contactLine: {
    fontSize: 10,
    color: '#333333',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  divider: {
    borderBottomWidth: 0.75,
    borderBottomColor: '#000000',
    marginTop: 6,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
    marginBottom: 4,
  },
  entry: {
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  boldText: {
    fontSize: 11,
    fontFamily: 'Times-Bold',
  },
  normalText: {
    fontSize: 11,
    fontFamily: 'Times-Roman',
  },
  italicText: {
    fontSize: 10,
    fontFamily: 'Times-Italic',
  },
  rightText: {
    fontSize: 10,
    textAlign: 'right',
  },
  bullet: {
    fontSize: 10,
    marginLeft: 12,
    marginBottom: 1,
    lineHeight: 1.4,
  },
  skillRow: {
    marginBottom: 4,
    lineHeight: 1.5,
  },
  blueLink: {
    color: '#0000EE',
    textDecoration: 'underline',
  }
});

const ResumePDF = ({ data }) => {
  const { contact, summary, experience, education, projects, skills, certificates, languages } = data;

  const capitalizeName = (name) => {
    if (!name) return '';
    return name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  };

  const renderContactLine = () => {
    const parts = [
      contact.phone,
      contact.email,
      contact.linkedin,
      contact.github,
      contact.portfolio
    ].filter(Boolean);
    return parts.join('  |  ');
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER SECTION */}
        <View style={styles.header}>
          <Text style={styles.name}>{capitalizeName(contact.name)}</Text>
          {(contact.jobTitle || contact.address) && (
            <Text style={styles.titleLocation}>
              {[contact.jobTitle, contact.address].filter(Boolean).join(' | ')}
            </Text>
          )}
          <Text style={styles.contactLine}>{renderContactLine()}</Text>
        </View>

        {/* SUMMARY SECTION */}
        {summary.text && (
          <View style={{ marginBottom: 10 }}>
            {summary.text.length > 100 && (
              <>
                <View style={styles.divider} />
                <Text style={styles.sectionTitle}>Summary</Text>
              </>
            )}
            <Text style={[styles.normalText, { fontSize: 10, lineHeight: 1.5 }]}>{summary.text}</Text>
          </View>
        )}

        {/* EDUCATION SECTION */}
        {education.length > 0 && (
          <View>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={styles.entry}>
                <View style={styles.row}>
                  <Text style={styles.boldText}>{edu.institution}</Text>
                  <Text style={styles.rightText}>{edu.startDate} – {edu.endDate}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.italicText}>
                    {edu.degree}{edu.gpa ? ` (CGPA: ${edu.gpa})` : ''}
                  </Text>
                  <Text style={styles.italicText}>{edu.location || ''}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* EXPERIENCE SECTION */}
        {experience.length > 0 && (
          <View>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp, i) => (
              <View key={i} style={styles.entry}>
                <View style={styles.row}>
                  <Text style={styles.boldText}>
                    {exp.role} <Text style={styles.normalText}>| {exp.company}</Text>
                  </Text>
                  <Text style={styles.rightText}>{exp.startDate} – {exp.endDate}</Text>
                </View>
                {exp.location && (
                  <View style={styles.row}>
                    <Text style={styles.italicText}></Text>
                    <Text style={styles.italicText}>{exp.location}</Text>
                  </View>
                )}
                {exp.description && exp.description.split('\n').map((line, j) => (
                  <Text key={j} style={styles.bullet}>– {line.trim()}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* PROJECTS SECTION */}
        {projects.length > 0 && (
          <View>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj, i) => (
              <View key={i} style={styles.entry}>
                <View style={styles.row}>
                  <Text style={styles.boldText}>
                    {proj.name} <Text style={[styles.normalText, { fontSize: 10 }]}>| {proj.tech}</Text>
                    {proj.link && (
                      <Text style={[styles.normalText, { fontSize: 10 }]}> | <Link style={styles.blueLink} src={proj.link}>{proj.link}</Link></Text>
                    )}
                  </Text>
                  <Text style={styles.rightText}>{proj.startDate ? proj.startDate.split(' ').pop() : ''}</Text>
                </View>
                {proj.description && proj.description.split('\n').map((line, j) => (
                  <Text key={j} style={styles.bullet}>– {line.trim()}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* SKILLS SECTION */}
        {skills.text && (
          <View>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Skills</Text>
            {skills.text.split('\n').map((line, i) => {
              if (line.includes(':')) {
                const [label, content] = line.split(':');
                return (
                  <Text key={i} style={styles.skillRow}>
                    <Text style={styles.boldText}>{label}: </Text>
                    <Text style={[styles.normalText, { fontSize: 10 }]}>{content}</Text>
                  </Text>
                );
              }
              return <Text key={i} style={[styles.normalText, { fontSize: 10, marginBottom: 4 }]}>{line}</Text>;
            })}
          </View>
        )}

        {/* CERTIFICATES SECTION */}
        {certificates.length > 0 && (
          <View>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Certificates</Text>
            {certificates.map((cert, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <View style={styles.row}>
                  <Text style={{ fontSize: 10 }}>
                    <Text style={{ fontFamily: 'Times-Bold' }}>{cert.name}</Text> | {cert.issuer}
                  </Text>
                  <Text style={styles.rightText}>{cert.date}</Text>
                </View>
                {cert.link && (
                  <Link style={[styles.blueLink, { fontSize: 9 }]} src={cert.link}>{cert.link}</Link>
                )}
              </View>
            ))}
          </View>
        )}

        {/* LANGUAGES SECTION */}
        {languages.length > 0 && (
          <View>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Languages</Text>
            <Text style={[styles.normalText, { fontSize: 10 }]}>
              {languages.map(l => `${l.language} (${l.proficiency})`).join(', ')}
            </Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;
