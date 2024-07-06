import Header from "./Header";

function Layout({ children }) {
  return (
    <>
      <a href="#main" className="skip-to-main-link">
        Skip to main content
      </a>
      <Header></Header>
      <main id="main" tabIndex={"-1"}>
        <div className="panes">
          <div className="container">
            <div className="panes-content">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Layout;
