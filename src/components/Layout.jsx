import Header from "./Header";

function Layout({ children }) {
  return (
    <>
      <Header></Header>
      <main id="main">
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
