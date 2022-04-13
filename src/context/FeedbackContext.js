import { createContext, useState, useEffect } from 'react';
import FeedbackData from '../data/FeedbackData';
const FeedbackContest = createContext();

export const FeedbackProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(FeedbackData);
  const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false });

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`);
    const data = await response.json();
    setFeedback(data);
    setLoading(false);
  };

  //delete Feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`/feedback/${id}`, {
        method: 'DELETE',
      });
      /* delete all the items in the feedback array that aren't equal to the selected id */
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };
  //   Update Feedback item

  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updItem),
    });
    const data = await response.json();
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  // add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();
    // Add new feedback to existing feedback
    setFeedback([data, ...feedback]);
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
        loading,
      }}>
      {children}{' '}
    </FeedbackContest.Provider>
  );
};

export default FeedbackContest;
