import React from 'react';
import { Slide1Intro } from './slides/Slide1Intro';
import { Slide2Problem } from './slides/Slide2Problem';
import { Slide3Solution } from './slides/Slide3Solution';
import { Slide4Methodology } from './slides/Slide4Methodology';
import { Slide5TechStack } from './slides/Slide5TechStack';
import { Slide6Innovation } from './slides/Slide6Innovation';
import { Slide7Feasibility } from './slides/Slide7Feasibility';
import { Slide8Outcomes } from './slides/Slide8Outcomes';
import { Slide9GitHub } from './slides/Slide9GitHub';
import { Slide10Summary } from './slides/Slide10Summary';

export const PrintDeck: React.FC = () => {
  return (
    <div className="hidden print:block print:w-full print:m-0 print:p-0">
      <div className="print-page bg-white text-slate-900">
        <Slide1Intro />
      </div>
      <div className="print-page bg-white text-slate-900">
        <Slide2Problem />
      </div>
      <div className="print-page bg-white text-slate-900">
        <Slide3Solution />
      </div>
      <div className="print-page bg-white text-slate-900">
        <Slide4Methodology />
      </div>
      <div className="print-page bg-white text-slate-900">
        <Slide5TechStack />
      </div>
      <div className="print-page bg-white text-slate-900">
        <Slide6Innovation />
      </div>
      <div className="print-page bg-white text-slate-900">
        <Slide7Feasibility />
      </div>
      <div className="print-page bg-white text-slate-900">
        <Slide8Outcomes />
      </div>
      <div className="print-page bg-white text-slate-900">
        <Slide9GitHub />
      </div>
      <div className="print-page bg-white text-slate-900">
        <Slide10Summary />
      </div>
    </div>
  );
};
