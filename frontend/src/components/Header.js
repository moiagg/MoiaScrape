const Header = ({ children, className }) => (
  <div className={className}>
    {children}
    <style jsx>{`
    // CSS HERE
    `}</style>
  </div>
);
export default Header