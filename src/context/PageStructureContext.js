import React, { createContext, useState, useEffect } from "react";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("sidebarMode");
    if (savedMode === "true") {
      setIsSidebarVisible(true);
    }
  }, []);

  const toggleSidebarMode = () => {
    setIsSidebarVisible((prevState) => {
      const newState = !prevState;
      localStorage.setItem("sidebarMode", newState.toString());
      return newState;
    });
  };

  return (
    <SidebarContext.Provider value={{ isSidebarVisible, toggleSidebarMode }}>
      {children}
      {isSidebarVisible && <PageStructure />}
    </SidebarContext.Provider>
  );
};

const PageStructure = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedBody, setSelectedBody] = useState("Headings");
    const [headings, setHeadings] = useState([]);
    const [links, setLinks] = useState([]);
    const [landmarks, setLandmarks] = useState([]);
  
    useEffect(() => {
      const headingsArray = ["h1", "h2", "h3", "h4", "h5", "h6"]
        .flatMap((tag, index) =>
          Array.from(document.querySelectorAll(tag)).map((heading) => ({
            tag: heading.tagName,
            text: heading.textContent.trim(),
            id: `heading-${index}`, 
          }))
        );
      setHeadings(headingsArray);
  
      const linksArray = Array.from(document.querySelectorAll("a"))
        .map((link, index) => ({
          text: link.textContent.trim(),
          href: link.getAttribute("href"),
          id: `link-${index}`, 
        }))
        .filter((link) => link.text !== "");
      setLinks(linksArray);
  
      const landmarksArray = Array.from(
        document.querySelectorAll("header, nav, main, aside, footer")
      ).map((landmark, index) => ({
        tag: landmark.tagName,
        text: landmark.textContent.trim().slice(0, 30), 
        id: `landmark-${index}`, 
      }));
      setLandmarks(landmarksArray);
    }, []);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    const renderBodyContent = () => {
      switch (selectedBody) {
        case "Headings":
          return (
            <div style={styles.container_body}>
              <h3>Headings</h3>
              {headings.length > 0 ? (
                <ul style={styles.mainList}>
                  {headings.map((heading, index) => (
                    <li key={index}>
                      <a href={`#${heading.id}`} style={styles.link}>
                        <strong>{heading.tag}:</strong> {heading.text || "No text"}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No headings found.</p>
              )}
            </div>
          );
        case "Links":
          return (
            <div style={styles.container_body}>
              <h3>Links</h3>
              {links.length > 0 ? (
                <ul style={styles.mainList}>
                  {links.map((link, index) => (
                    <li key={index}>
                      <a href={link.href} style={styles.link}>
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No links found.</p>
              )}
            </div>
          );
        case "Landmarks":
          return (
            <div style={styles.container_body}>
              <h3>Landmarks</h3>
              {landmarks.length > 0 ? (
                <ul style={styles.mainList}>
                  {landmarks.map((landmark, index) => (
                    <li key={index}>
                      <a href={`#${landmark.id}`} style={styles.link}>
                        <strong>{landmark.tag}:</strong> {landmark.text || "No text"}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No landmarks found.</p>
              )}
            </div>
          );
        default:
          return null;
      }
    };
  
    const styles = {
      container: {
        display: "flex",
        flexDirection: "row-reverse",
      },
      sidebar: {
        position: "fixed",
        right: 0,
        top: 0,
        width: "450px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f4f4f4",
        overflowY: "auto",
      },
      navbar: {
        position: "relative",
        backgroundColor: "#1a1a2e",
        height: "50px",
        width: "100%",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      btn_close_page: {
        position: "absolute",
        right: "15px",
        border: "none",
        backgroundColor: "#1a1a2e",
        color: "#fff",
        fontSize: "20px",
        fontWeight: "bold",
        cursor: "pointer",
      },
      container_btn: {
        backgroundColor: "#e8e8e8",
        display: "flex",
        justifyContent: "space-between",
      },
      button: {
        padding: "10px",
        backgroundColor: "#e8e8e8",
        fontSize: "20px",
        color: "#000",
        border: "none",
        cursor: "pointer",
        margin: "0 10px",
      },
      container_body: {
        flexGrow: 1,
        backgroundColor: "#fff",
        padding: "20px",
        border: "1px solid #ddd",
        overflowY: "auto",
      },
      mainList: {
        listStyle: "none",
        fontSize: "20px",
        padding: "0",
        margin: "0",
      },
      link: {
        textDecoration: "none",
        color: "blue",
      },
    };
  
    return (
      <div style={styles.container}>
        {isSidebarOpen && (
          <div style={styles.sidebar}>
            <div style={styles.navbar}>
              <h2>Page Structure</h2>
              <button onClick={toggleSidebar} style={styles.btn_close_page}>
                X
              </button>
            </div>
            <div style={styles.container_btn}>
              <button onClick={() => setSelectedBody("Headings")} style={styles.button}>
                Headings
              </button>
              <button onClick={() => setSelectedBody("Links")} style={styles.button}>
                Links
              </button>
              <button onClick={() => setSelectedBody("Landmarks")} style={styles.button}>
                Landmarks
              </button>
            </div>
            {renderBodyContent()}
          </div>
        )}
      </div>
    );
  };
  
  export default PageStructure;
  
