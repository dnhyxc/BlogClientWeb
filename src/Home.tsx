import React from 'react';
import { Button } from 'antd';
import './Home.css';

interface IProps {}

const Home: React.FC<IProps> = () => {
  return (
    <div className="Home">
      <Button type="primary">Home Page</Button>
    </div>
  );
};

export default Home;
