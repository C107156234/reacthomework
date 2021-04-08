import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Comment from './App1.js';
import reportWebVitals from './reportWebVitals';

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'https://placekitten.com/g/64/64',
  },
};


ReactDOM.render(
  <React.StrictMode>
    <Comment
    date={comment.date}
    text={comment.text}
    author={comment.author}
  />,
  </React.StrictMode>,
  document.getElementById('root')
);