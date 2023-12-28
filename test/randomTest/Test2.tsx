import React from 'react';

                                                                                                                                                      
const TestRcomp1: React.FC = () => {
  return (
    <div>
      <div>1111</div>
    </div>
  );
};

                                                                           
export const Test_Rcomp3: React.FC = () => {                                  
  return (
    <div>
      <div>3333</div>
      <TestRcomp1 />
    </div>
  );
};
