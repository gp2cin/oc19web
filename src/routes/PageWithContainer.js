import React from 'react';

export default function PageWithContainer({ Page }) {
  return (
    <div className={'container'}>
      <Page />
    </div>
  );
}
