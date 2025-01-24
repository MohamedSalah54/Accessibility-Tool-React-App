import React, { createContext, useState, useContext } from 'react';

const PagePreviewContext = createContext();

export const usePagePreview = () => {
  return useContext(PagePreviewContext);
};

export const PagePreviewProvider = ({ children }) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const togglePreviewMode = () => {
    setIsPreviewMode((prevMode) => !prevMode);
  };

  const removeAllCSSFromWindow = (previewWindow) => {
    const styleTags = previewWindow.document.querySelectorAll('style');
    styleTags.forEach(tag => tag.remove());

    const linkTags = previewWindow.document.querySelectorAll('link[rel="stylesheet"]');
    linkTags.forEach(tag => tag.remove());

    const elementsWithInlineStyles = previewWindow.document.querySelectorAll('*');
    elementsWithInlineStyles.forEach(element => {
      element.removeAttribute('style');
    });
  };

  const openPreviewInNewWindow = () => {
    if (isPreviewMode) {
      const previewWindow = window.open('', '', 'width=800,height=600'); 

      const pageHtml = document.documentElement.innerHTML;

      previewWindow.document.open();
      previewWindow.document.write(`
        <html>
          <head>
            <title>Preview</title>
          </head>
          <body>
            ${pageHtml}  <!-- إدخال HTML فقط -->
          </body>
        </html>
      `);
      previewWindow.document.close();

      previewWindow.onload = () => {
        removeAllCSSFromWindow(previewWindow);
      };
    }
  };

  return (
    <PagePreviewContext.Provider value={{ isPreviewMode, togglePreviewMode, openPreviewInNewWindow }}>
      {children}
    </PagePreviewContext.Provider>
  );
};
