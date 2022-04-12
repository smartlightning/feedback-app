import './App.css';
import Header from './components/Header';

import { useState } from 'react';
import FeedbackData from './data/FeedbackData';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);
  const deleteFeedback = (id) => {
    if(window.confirm('Are you sure you want to delete?')) {
      /* delete all the items in the feedback array that aren't equal to the selected id */
      setFeedback(feedback.filter((item)=> item.id !==id)
   )}
  };
  return (
    <>
      <Header />
      <div className='container'>
        <FeedbackStats feedback= {feedback} />
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
      </div>
    </>
  );
}

export default App;
