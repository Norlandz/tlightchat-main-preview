import React from 'react';

// Fast refresh only works when a file only exports components. Move your component(s) to a separate file.eslint(react-refresh/only-export-components)
const TestRcomp1: React.FC = () => {
  return (
    <div>
      <div>1111</div>
    </div>
  );
};

// export const TestRcomp3: React.FC = () => { // no underscore => no error
export const Test_Rcomp3: React.FC = () => { // with underscore => error above
  return (
    <div>
      <div>3333</div>
      <TestRcomp1 />
    </div>
  );
};
