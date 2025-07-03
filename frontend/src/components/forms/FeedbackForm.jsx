import React, { useState, useEffect } from 'react';
// We'll use a simple + and X for icons to keep it dependency-free
import styles from './FeedbackForm.module.css';

const SENTIMENT_OPTIONS = {
  Positive: { label: '✅ Positive', value: 'positive' },
  Neutral: { label: '⚪ Neutral', value: 'neutral' },
  Negative: { label: '❌ Negative', value: 'negative' },
};


const FeedbackForm = ({ initialData, onSubmit, isEditing, onClose }) => {
  const [sentiment, setSentiment] = useState('Positive');
  const [description, setDescription] = useState('');
  const [strengths, setStrengths] = useState([]);
  const [currentStrength, setCurrentStrength] = useState('');
  const [improvements, setImprovements] = useState([]);
  const [currentImprovement, setCurrentImprovement] = useState('');

  if (isEditing) {
    var editingFeedback = JSON.parse(localStorage.getItem('editingFeedback'))
  }
  // Pre-populate form if initialData is provided for editing
  useEffect(() => {
    if (editingFeedback) {
      setSentiment(editingFeedback.sentiment || 'Positive');
      setDescription(editingFeedback.description || '');
      setStrengths(editingFeedback.strengths || []);
      setImprovements(editingFeedback.to_improve || []);
    }
  }, []);

  const handleAddTag = (value, setTags, setCurrentValue) => {
    if (value && !value.trim()) return; // Prevent adding empty spaces
    if (value) {
      setTags((prevTags) => [...prevTags, value]);
      setCurrentValue('');
    }
  };

  const handleRemoveTag = (index, setTags) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      sentiment,
      description,
      strengths,
      to_improve: improvements,
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <form className={styles.formCard} onSubmit={handleSubmit}>
            {/* --- Sentiment Selection --- */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Sentiment</label>
              <div className={styles.sentimentContainer}>
                {Object.values(SENTIMENT_OPTIONS).map(({ label, value }) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() => setSentiment(value)}
                    className={`${styles.sentimentButton} ${styles[value.toLowerCase()]} ${
                      sentiment === value ? styles.active : ''
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* --- Description --- */}
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Description
              </label>
              <textarea
                id="description"
                className={styles.textarea}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your feedback in detail..."
                rows="5"
                maxLength="500"
                required
              />
            </div>

            {/* --- Strengths --- */}
            <div className={styles.formGroup}>
              <label htmlFor="strengths" className={styles.label}>
                💪 Strengths
              </label>
              <div className={styles.tagInputContainer}>
                <input
                  type="text"
                  id="strengths"
                  className={styles.input}
                  value={currentStrength}
                  onChange={(e) => setCurrentStrength(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag(currentStrength, setStrengths, setCurrentStrength))}
                  placeholder="e.g., Team Player"
                />
                <button
                  type="button"
                  className={styles.addButton}
                  onClick={() => handleAddTag(currentStrength, setStrengths, setCurrentStrength)}
                >
                  +
                </button>
              </div>
              <div className={styles.tagsContainer}>
                {strengths.map((tag, index) => (
                  <div key={index} className={`${styles.tag} ${styles.strengthTag}`}>
                    {tag}
                    <button
                      type="button"
                      className={styles.removeTagButton}
                      onClick={() => handleRemoveTag(index, setStrengths)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* --- To Improve --- */}
            <div className={styles.formGroup}>
              <label htmlFor="improvements" className={styles.label}>
                📈 To Improve
              </label>
              <div className={styles.tagInputContainer}>
                <input
                  type="text"
                  id="improvements"
                  className={styles.input}
                  value={currentImprovement}
                  onChange={(e) => setCurrentImprovement(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag(currentImprovement, setImprovements, setCurrentImprovement))}
                  placeholder="e.g., Time Management"
                />
                <button
                  type="button"
                  className={styles.addButton}
                  onClick={() => handleAddTag(currentImprovement, setImprovements, setCurrentImprovement)}
                >
                  +
                </button>
              </div>
              <div className={styles.tagsContainer}>
                {improvements.map((tag, index) => (
                  <div key={index} className={`${styles.tag} ${styles.improvementTag}`}>
                    {tag}
                    <button
                      type="button"
                      className={styles.removeTagButton}
                      onClick={() => handleRemoveTag(index, setImprovements)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* --- Submit Button --- */}
            <button type="submit" className={styles.submitButton}>
              {isEditing ? 'Update Feedback' : 'Give Feedback'}
            </button>
          </form>
      </div>
    </div>    
  );
};

export default FeedbackForm;