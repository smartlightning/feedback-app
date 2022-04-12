import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FeedbackData from '../data/FeedbackData';
const FeedbackContest = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(FeedbackData);
  const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false });

  //delete Feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      /* delete all the items in the feedback array that aren't equal to the selected id */
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };
  //   Update Feedback item

  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };

  // add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    // Add new feedback to existing feedback
    setFeedback([newFeedback, ...feedback]);
  };

  // update item
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };
  return (
    <FeedbackContest.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
      }}>
      {children}{' '}
    </FeedbackContest.Provider>
  );
};

export default FeedbackContest;
