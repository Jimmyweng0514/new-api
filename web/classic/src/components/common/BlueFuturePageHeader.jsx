import React from 'react';

const BlueFuturePageHeader = ({ title, description, action }) => (
  <div className='bluefuture-card mb-4 flex flex-col justify-between gap-3 p-4 md:flex-row md:items-center'>
    <div>
      <h1 className='m-0 text-xl font-semibold text-semi-color-text-0'>
        {title}
      </h1>
      {description && (
        <p className='m-0 mt-2 max-w-3xl text-sm leading-6 text-semi-color-text-2'>
          {description}
        </p>
      )}
    </div>
    {action}
  </div>
);

export default BlueFuturePageHeader;
