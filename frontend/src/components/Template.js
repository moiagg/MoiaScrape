const Template = ({ id, className, children }) => (
  <div id={id} className="template">
    {/* Child Elements */}
    <div className={className}>{children}</div>
    {/* GLOBAL CSS */}
    <style global jsx>
      {`
        html,
        body > div {
          height: 100%;
        }
        body {
          height: calc(100% - 56px);
        }
        .template {
          height: 100%;
          font-family: monospace;
          margin-top: 56px;
        }
      `}
    </style>
  </div>
);
export default Template;
