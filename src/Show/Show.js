import React from 'react';
import './Show.css';
const Show = ({ data }) => {
    return (
      <div className="center col-sm-4">
        {data.map(obj => {
          const { id, title, publishedDate } = obj;
          return (
            <div className='card' key={id}>
              <span className='child'>{title}</span>
              <span className='child font-size-12'>{publishedDate}</span>
            </div>
          );
        })}
      </div>
    );
  };
  export default Show;