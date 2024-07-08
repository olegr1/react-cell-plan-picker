function Layout({ children }) {
  return (
    <div className="panes">
      <div className="container">
        <div className="panes-content">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
