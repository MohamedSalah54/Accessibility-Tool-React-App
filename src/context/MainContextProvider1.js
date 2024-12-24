// MainContextProvider3.js
import React from "react";
import { ScreenReaderProvider } from "./ScreenReaderContext";
import { PagePreviewProvider } from "./PageViewContext";
import { KeyboardNavigationProvider } from "./keyboardNavigationContext";
import { SmartNavigateProvider } from "./SmartNavigateContext";
import { VoiceCommandsProvider } from "./VoiceCommandsContext";
import { EnlargeProvider } from "./EnlargeContext";
import { DarkModeProvider } from "./DarkModeContext";
import { BrightModeProvider } from "./BrightModeContext";
import { ContrastProvider } from "./ContrastContext";
import { LowSaturationProvider } from "./LowSaturationContext";
import { MonochromeProvider } from "./MonochromeContext";
import { HighSaturationProvider } from "./HightSaturationContext";
import { ImageDescriptionProvider } from "./ImageDescriptionContext";
import { MagnifierProvider } from "./MagnifierContext";
import { ReadableFontProvider } from "./ReadableContext";
import { HighlightHeadersProvider } from "./HighlightHeadersContext";
import { HighlightLinksProvider } from "./HighlightLinksContext";
import { MagnifierTextProvider } from "./MagnifierText";
import { BlinksBlockingProvider } from "./BlinksBlockingContext";
import { AudioProvider } from "./MuteMediaContext";
import { ReadFocusProvider } from "./ReadFocusContext";
import { ReadingGuideProvider } from "./ReadGuideContext";


// دمج جميع الـ Contexts في `MainContextProvider3`
export const MainContextProvider1 = ({ children }) => {
    return (
        <ScreenReaderProvider>
            <PagePreviewProvider>
                <BrightModeProvider>
                    <KeyboardNavigationProvider>
                        <SmartNavigateProvider>
                            <VoiceCommandsProvider>
                                <EnlargeProvider>
                                    <DarkModeProvider>
                                        <BrightModeProvider>
                                            <ContrastProvider>
                                                <LowSaturationProvider>
                                                    <MonochromeProvider>
                                                        <HighSaturationProvider>
                                                            <ImageDescriptionProvider>
                                                                <MagnifierProvider>
                                                                    <ReadableFontProvider>
                                                                        <HighlightHeadersProvider>
                                                                            <HighlightLinksProvider>
                                                                                <MagnifierTextProvider>
                                                                                    <BlinksBlockingProvider>
                                                                                        <AudioProvider>
                                                                                            <ReadFocusProvider>
                                                                                                <ReadingGuideProvider>
                                                                                                    <PagePreviewProvider>
                                                                                                        {children}
                                                                                                    </PagePreviewProvider>
                                                                                                </ReadingGuideProvider>
                                                                                            </ReadFocusProvider>
                                                                                        </AudioProvider>
                                                                                    </BlinksBlockingProvider>
                                                                                </MagnifierTextProvider>
                                                                            </HighlightLinksProvider>
                                                                        </HighlightHeadersProvider>
                                                                    </ReadableFontProvider>
                                                                </MagnifierProvider>
                                                            </ImageDescriptionProvider>
                                                        </HighSaturationProvider>
                                                    </MonochromeProvider>
                                                </LowSaturationProvider>
                                            </ContrastProvider>
                                        </BrightModeProvider>
                                    </DarkModeProvider>
                                </EnlargeProvider>
                            </VoiceCommandsProvider>
                        </SmartNavigateProvider>
                    </KeyboardNavigationProvider>
                </BrightModeProvider>
            </PagePreviewProvider>
        </ScreenReaderProvider>
    );
};

export default MainContextProvider1;
