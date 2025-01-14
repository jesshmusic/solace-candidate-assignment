/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

interface SearchProps {
  searchTerm: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

const SearchComponent: React.FC<SearchProps> = ({
  searchTerm,
  onChange,
  onClick,
}) => {
  return (
    <div css={containerStyle}>
      <p css={headerStyle}>Search</p>
      <p>
        Searching for:{" "}
        <span id="search-term" css={spanStyle}>
          {searchTerm}
        </span>
      </p>
      <input
        css={inputStyle}
        onChange={onChange}
        placeholder="Search..."
        value={searchTerm}
      />
      <button css={buttonStyle} onClick={onClick}>
        Reset Search
      </button>
    </div>
  );
};

// Emotion CSS styles
const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
`;

const headerStyle = css`
  font-size: 1.5rem;
  margin-bottom: 5px;
`;

const spanStyle = css`
  font-weight: bold;
`;

const inputStyle = css`
  border: 1px solid black;
  padding: 5px;
  margin-top: 10px;
  font-size: 1rem;
  width: 200px;
  border-radius: 4px;
`;

const buttonStyle = css`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export default SearchComponent;
