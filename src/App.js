import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Sidebar from './components/sidebar/Sidebar';
import { AccessibilityProvider } from './context/AccessMode';
import { ColorProvider } from './context/ColorContext';
import { CursorProvider } from './context/CursorContext'; 
import { FontProvider } from './context/FontContext';
import { DarkModeProvider } from './context/DarkModeContext';
import { BrightModeProvider } from './context/BrightModeContext'
import { MonochromeProvider } from './context/MonochromeContext';
import { LowSaturationProvider } from './context/LowSaturationContext';
import { HighSaturationProvider } from './context/HightSaturationContext';
import { ContrastProvider } from './context/ContrastContext';
import { AudioProvider } from './context/MuteMediaContext';
import { MagnifierProvider } from './context/MagnifierContext';
import { ReadableFontProvider } from './context/ReadableContext';
import { HighlightLinksProvider } from './context/HighlightLinksContext';
import { HighlightHeadersProvider } from './context/HighlightHeadersContext';
import { EnlargeProvider } from './context/EnlargeContext';
import { MagnifierTextProvider } from './context/MagnifierText';
import { ReadFocusProvider } from './context/ReadFocusContext';
import { ReadingGuideProvider } from './context/ReadGuideContext';
import { KeyboardProvider } from './context/VertualKeyboardContext';
import { SidebarProvider } from './context/PageStructureContext';
import { BlinksBlockingProvider } from './context/BlinksBlockingContext';
import { VoiceCommandsProvider } from './context/VoiceCommandsContext';
import { PagePreviewProvider } from './context/PageViewContext';
import { ImageDescriptionProvider } from './context/ImageDescriptionContext';
import { AddCaptionProvider } from './context/AddCaptionContext';
import { ScreenReaderProvider } from './context/ScreenReaderContext';
import { KeyboardNavigationProvider } from './context/keyboardNavigationContext';
import Slider from './components/slider/Slider';
import { SmartNavigateProvider } from './context/SmartNavigateContext';
import { TextReaderProvider } from './context/TextReaderContext';
function App() {

  return (
    <AccessibilityProvider>
      <ColorProvider>
        <CursorProvider>
          <FontProvider>
            <AudioProvider>
              <MagnifierProvider>
                <ReadableFontProvider>
                  <HighlightLinksProvider>
                    <HighlightHeadersProvider>
                      <EnlargeProvider>
                        <MagnifierTextProvider>
                          <ReadFocusProvider>
                            <ReadingGuideProvider>
                              <KeyboardProvider>
                                <SidebarProvider>
                                  <VoiceCommandsProvider >
                                    <BlinksBlockingProvider>
                                      <PagePreviewProvider>
                                        <ImageDescriptionProvider>
                                          <AddCaptionProvider>
                                            <ScreenReaderProvider>
                                              <KeyboardNavigationProvider>
                                                <SmartNavigateProvider>
                                                  <TextReaderProvider>
                                                    <MonochromeProvider>
                                                      <DarkModeProvider>
                                                        <BrightModeProvider>
                                                          <LowSaturationProvider>
                                                            <HighSaturationProvider>
                                                              <ContrastProvider>
                                                                <Router>
                                                                  <Navbar />
                                                                  <Sidebar />
                                                                  <Slider />
                                                                  <Routes>
                                                                    <Route path="/" element={<Home />} />
                                                                  </Routes>
                                                                </Router>
                                                              </ContrastProvider>
                                                            </HighSaturationProvider>
                                                          </LowSaturationProvider>
                                                        </BrightModeProvider>
                                                      </DarkModeProvider>
                                                    </MonochromeProvider>
                                                  </TextReaderProvider>
                                                </SmartNavigateProvider>
                                              </KeyboardNavigationProvider>
                                            </ScreenReaderProvider>
                                          </AddCaptionProvider>
                                        </ImageDescriptionProvider>
                                      </PagePreviewProvider>
                                    </BlinksBlockingProvider>
                                  </VoiceCommandsProvider>
                                </SidebarProvider>
                              </KeyboardProvider>
                            </ReadingGuideProvider>
                          </ReadFocusProvider>
                        </MagnifierTextProvider>
                      </EnlargeProvider>
                    </HighlightHeadersProvider>
                  </HighlightLinksProvider>
                </ReadableFontProvider>
              </MagnifierProvider>
            </AudioProvider>
          </FontProvider>
        </CursorProvider>
      </ColorProvider>
    </AccessibilityProvider>

  );
}

export default App;
