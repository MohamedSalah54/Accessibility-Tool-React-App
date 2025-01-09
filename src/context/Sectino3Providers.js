import React from 'react';
import { DarkModeProvider } from './DarkModeContext';
import { BrightModeProvider } from './BrightModeContext';
import { ContrastProvider } from './ContrastContext';
import { LowSaturationProvider } from './LowSaturationContext';
import { HighSaturationProvider } from './HightSaturationContext';
import { MonochromeProvider } from './MonochromeContext';

const Section3Providers = ({ children }) => {
  return (
    <DarkModeProvider>
      <BrightModeProvider>
        <ContrastProvider>
          <LowSaturationProvider>
            <HighSaturationProvider>
              <MonochromeProvider>
                {children}
              </MonochromeProvider>
            </HighSaturationProvider>
          </LowSaturationProvider>
        </ContrastProvider>
      </BrightModeProvider>
    </DarkModeProvider>
  );
};

export default Section3Providers;
