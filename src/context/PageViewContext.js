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
    // إزالة جميع عناصر <style> في النافذة الجديدة
    const styleTags = previewWindow.document.querySelectorAll('style');
    styleTags.forEach(tag => tag.remove());

    // إزالة جميع روابط <link> التي تحتوي على CSS في النافذة الجديدة
    const linkTags = previewWindow.document.querySelectorAll('link[rel="stylesheet"]');
    linkTags.forEach(tag => tag.remove());

    // إزالة جميع خصائص inline styles و CSS variables
    const elementsWithInlineStyles = previewWindow.document.querySelectorAll('*');
    elementsWithInlineStyles.forEach(element => {
      // إزالة جميع الأنماط المدمجة من الخاصية style
      element.removeAttribute('style');
    });
  };

  const openPreviewInNewWindow = () => {
    if (isPreviewMode) {
      // فتح نافذة جديدة
      const previewWindow = window.open('', '', 'width=800,height=600'); // تحديد الأبعاد (800x600)

      // الحصول على الـ HTML الحالي من الصفحة الأصلية
      const pageHtml = document.documentElement.innerHTML;

      // إعداد محتوى النافذة الجديدة
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

      // إزالة جميع الـ CSS من النافذة الجديدة فقط بعد تحميل المحتوى
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
