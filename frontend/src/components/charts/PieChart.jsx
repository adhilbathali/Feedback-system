import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styles from './PieChart.module.css';

const SENTIMENT_COLORS = {
  Positive: '#4CAF50',
  Neutral: '#FFC107',
  Negative: '#F44336',
};

/**
 * A donut chart component to display the overall sentiment distribution.
 */
const PieChart = ({ feedbacks }) => {
  // useMemo to process data only when the feedbacks prop changes.
  const { chartData, totalFeedbacks } = useMemo(() => {
    const counts = { Positive: 0, Neutral: 0, Negative: 0 };

    feedbacks.forEach((feedback) => {
      // Capitalize first letter to match our keys, e.g., 'positive' -> 'Positive'
      const sentiment = feedback.sentiment.charAt(0).toUpperCase() + feedback.sentiment.slice(1);
      if (sentiment in counts) {
        counts[sentiment]++;
      }
    });

    const data = [
      { name: 'Positive', value: counts.Positive },
      { name: 'Neutral', value: counts.Neutral },
      { name: 'Negative', value: counts.Negative },
    ].filter(entry => entry.value > 0); // Only include sentiments with data

    const total = data.reduce((sum, entry) => sum + entry.value, 0);

    return { chartData: data, totalFeedbacks: total };
  }, [feedbacks]);

  if (totalFeedbacks === 0) {
    return (
       <div className={styles.container}>
        <h2 className={styles.title}>Overall Sentiment</h2>
        <div className={styles.noData}>No feedback data available.</div>
       </div>
    )
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Overall Sentiment</h2>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={250}>
          <RechartsPieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
              }}
            />
            <Legend iconType="circle" iconSize={10} verticalAlign="bottom" />
          </RechartsPieChart>
        </ResponsiveContainer>
        {/* Label in the center of the donut chart */}
        <div className={styles.centerLabel}>
          <span className={styles.totalCount}>{totalFeedbacks}</span>
          <span className={styles.totalLabel}>Total</span>
        </div>
      </div>
    </div>
  );
};

PieChart.propTypes = {
  /**
   * An array of feedback objects, each with a sentiment.
   */
  feedbacks: PropTypes.arrayOf(
    PropTypes.shape({
      sentiment: PropTypes.oneOf(['positive', 'neutral', 'negative']).isRequired,
    })
  ).isRequired,
};

export default PieChart;