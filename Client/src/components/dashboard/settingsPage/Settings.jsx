import React from "react";
import "./Settings.css";

const Settings = () => {
  return (
    <div className="settings-page">
      {/* Sidebar */}
      <aside className="settings-sidebar">
        <div className="brand">CANOVA</div>

        <div className="profile-card">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="profile-img"
          />
          <div>
            <h4>Your name</h4>
            <p>yourname@gmail.com</p>
          </div>
        </div>

        <ul className="menu">
          <li className="menu-item">
            <span>👤</span> My Profile
          </li>
          <li className="menu-item active">
            <span>⚙️</span> Settings
          </li>
          <li className="menu-item logout">
            <span>⏻</span> Log Out
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="settings-content">
        <h1>Settings</h1>
        <hr />

        <div className="section">
          <h3>Preferences</h3>

          <div className="row">
            <span>Theme</span>
            <select>
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>

          <div className="row">
            <span>Language</span>
            <select>
              <option>Eng</option>
              <option>Hindi</option>
            </select>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
