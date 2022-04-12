import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/shared/Card';

const AboutPage = () => {
  return (
    <Card>
      <div className='about'>
        <h1>About This Project</h1>
        <p>Leave product feedback in this react app</p>
        <p>Version: 1.0.0</p>
        <p>
          <Link to='/'> Back to Home</Link>
        </p>
      </div>
    </Card>
  );
};

export default AboutPage;
