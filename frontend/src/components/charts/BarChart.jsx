import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styles from './BarChart.module.css';

const SENTIMENT_COLORS = {
  positive: '#4CAF50',
  neutral: '#FFC107',
  negative: '#F44336',
};

/**
 * A stacked bar chart component to display feedback sentiment trends over months.
 */
const BarChart = ({ feedbacks }) => {
  // useMemo ensures that the data is only processed when the feedbacks prop changes.
  const chartData = useMemo(() => {
    // Initialize a data structure to hold counts for each month.
    const monthlyCounts = {};

    feedbacks.forEach((feedback) => {
      const date = new Date(feedback.created_at);
      const month = date.toLocaleString('default', { month: 'short' });

      if (!monthlyCounts[month]) {
        monthlyCounts[month] = {
          name: month,
          date, // Store the date object for sorting
          positive: 0,
          neutral: 0,
          negative: 0,
        };
      }
      // Increment the count for the corresponding sentiment
      if (feedback.sentiment in monthlyCounts[month]) {
        monthlyCounts[month][feedback.sentiment]++;
      }
    });

    // Convert the object to an array and sort it chronologically
    return Object.values(monthlyCounts).sort((a, b) => a.date - b.date);
  }, [feedbacks]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sentiment Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart
          data={chartData}
          margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 5,
          }}
          barGap={10}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: '#E2E8F0' }} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ fill: 'rgba(239, 246, 255, 0.5)' }}
            contentStyle={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
            }}
          />
          <Legend iconType="circle" iconSize={10} />
          <Bar
            dataKey="positive"
            stackId="a"
            fill={SENTIMENT_COLORS.positive}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="neutral"
            stackId="a"
            fill={SENTIMENT_COLORS.neutral}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="negative"
            stackId="a"
            fill={SENTIMENT_COLORS.negative}
            radius={[0, 0, 4, 4]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

BarChart.propTypes = {
  /**
   * An array of feedback objects, each with a sentiment and a creation date.
   */
  feedbacks: PropTypes.arrayOf(
    PropTypes.shape({
      sentiment: PropTypes.oneOf(['positive', 'neutral', 'negative']).isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BarChart;