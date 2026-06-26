/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export default function FaceGuide() {
  return (
    <div id="face-guide-overlay" className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {/* Outer corner blue highlights */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-[#0F5FEA] rounded-tl-lg"></div>
      <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-[#0F5FEA] rounded-tr-lg"></div>
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-[#0F5FEA] rounded-bl-lg"></div>
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-[#0F5FEA] rounded-br-lg"></div>

      {/* Centered Dashed Face Oval */}
      <div className="w-[180px] h-[230px] border-2 border-dashed border-[#0F5FEA] rounded-[50%/40%] opacity-80 flex items-center justify-center">
        {/* Subtle center line */}
        <div className="w-[170px] h-[220px] border border-dashed border-white/40 rounded-[50%/40%]"></div>
      </div>
    </div>
  );
}
