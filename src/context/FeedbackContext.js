import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FeedbackData from '../data/FeedbackData';
const FeedbackContest = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(FeedbackData);
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      /* delete all the items in the feedback array that aren't equal to the selected id */
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    // Add new feedback to existing feedback
    setFeedback([newFeedback, ...feedback]);
  };
  return (
    <FeedbackContest.Provider value={{ feedback, deleteFeedback, addFeedback }}>
      {children}{' '}
    </FeedbackContest.Provider>
  );
};

export default FeedbackContest;
