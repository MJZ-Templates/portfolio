// pages/network-error.tsx
import React from 'react';

const NetworkErrorPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>네트워크 에러</h1>
      <p>서버가 현재 원활하지 않습니다. 잠시 후 다시 시도해 주세요.</p>
    </div>
  );
};

export default NetworkErrorPage;
