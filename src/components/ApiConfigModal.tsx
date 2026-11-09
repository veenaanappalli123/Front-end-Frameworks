import { useState } from "react";
import { X, KeyRound } from "lucide-react";
import { storage } from "../utils/storage";

type ApiConfigModalProps = {
  onClose: () => void;
  onSave: () => void;
};

function ApiConfigModal({ onClose, onSave }: ApiConfigModalProps) {
  const [apiKey, setApiKey] = useState(storage.getApiKey());
  const [visible, setVisible] = useState(false);

  const handleSave = () => {
    storage.setApiKey(apiKey);
    onSave();
    onClose();
  };

  return (
    <div
      className="modal-overlay active"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        className="modal-dialog api-config-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="api-config-title"
      >
        <button
          className="modal-close-btn"
          type="button"
          onClick={onClose}
          aria-label="Close API settings"
        >
          <X />
        </button>

        <div className="modal-content-details">
          <h2 id="api-config-title">
            <KeyRound size={20} /> TMDB API Configuration
          </h2>

          <p>
            Enter your TMDB API v3 key to load live movie data.
          </p>

          <label htmlFor="tmdb-api-key">API key</label>

          <input
            id="tmdb-api-key"
            type={visible ? "text" : "password"}
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            placeholder="Enter your TMDB API key"
            className="search-input"
          />

          <label>
            <input
              type="checkbox"
              checked={visible}
              onChange={(event) => setVisible(event.target.checked)}
            />
            Show API key
          </label>

          <div className="modal-footer-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={handleSave}
            >
              Save API Key
            </button>

            <button
              type="button"
              className="btn-icon-label"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiConfigModal;
