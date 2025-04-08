export function SettingsPage() {
  return (
    <div className="settings-container">
      <h2>Settings</h2>
      
      <div className="settings-section">
        <div className="settings-group">
          <h3>Accessibility</h3>
          <div>
            <div className="settings-row">
              <label className="settings-label">Font Size</label>
              <select className="settings-select">
                <option>Normal</option>
                <option>Large</option>
                <option>Extra Large</option>
              </select>
            </div>
            <div className="settings-row">
              <label className="settings-label">High Contrast</label>
              <input type="checkbox" className="settings-checkbox" />
            </div>
          </div>
        </div>

        <div className="settings-group">
          <h3>Notifications</h3>
          <div>
            <div className="settings-row">
              <label className="settings-label">Email Notifications</label>
              <input type="checkbox" className="settings-checkbox" defaultChecked />
            </div>
            <div className="settings-row">
              <label className="settings-label">Message Alerts</label>
              <input type="checkbox" className="settings-checkbox" defaultChecked />
            </div>
          </div>
        </div>

        <div className="settings-group">
          <h3>Privacy</h3>
          <div>
            <div className="settings-row">
              <label className="settings-label">Profile Visibility</label>
              <select className="settings-select">
                <option>Public</option>
                <option>Friends Only</option>
                <option>Private</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}