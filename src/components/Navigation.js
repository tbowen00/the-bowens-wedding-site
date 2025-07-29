import React from 'react';

const Navigation = ({ onNavigate, isNavOpen, setIsNavOpen }) => {
  const sections = [
    { id: 'schedule', title: 'Schedule' },
    { id: 'menu', title: 'Menu' },
    { id: 'hotels', title: 'Hotels' },
    { id: 'photos', title: 'Photos' },
    { id: 'gallery', title: 'Gallery' },
    { id: 'games', title: 'Games' },
    { id: 'spotify', title: 'Playlist' },
    { id: 'registry', title: 'Registry' },
    { id: 'directions', title: 'Directions' },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setIsNavOpen(false);
  };

  return (
    <>
      <button className="menu-button" onClick={() => setIsNavOpen(!isNavOpen)}>
        <span></span><span></span><span></span>
      </button>
      <div className={`nav-overlay ${isNavOpen ? 'open' : ''}`} onClick={() => setIsNavOpen(false)}></div>
      <nav className={`nav-sidebar ${isNavOpen ? 'open' : ''}`}>
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} onClick={(e) => { e.preventDefault(); handleNavClick(section.id); }}>
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
