export default function NotLoggedInArea({ navLinks }) {
  return (
    <>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map((link, index) => (
            <li key={index}>
              <a href={link.path}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
