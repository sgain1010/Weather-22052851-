import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import VoiceButton from './VoiceButton';
import { OverlayTrigger } from 'react-bootstrap';
import { renderTooltip } from './RenderTooltip';

const SearchBarUI = ({ handleChange, state, fetchDetails }) => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form className="search-container" onSubmit={fetchDetails}>
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={state.city}
              onChange={(e) => handleChange(e.target.value)}
            />
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip({ message: "Search" })}
            >
              <button
                type="submit"
                aria-label="submit"
                className="search-button"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </OverlayTrigger>
            <VoiceButton />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBarUI;
