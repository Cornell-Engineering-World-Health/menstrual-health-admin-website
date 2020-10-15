import React from 'react';

export const TextForm = props => {
  return (
    <form
      className={props.className}
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <label>
        <input
          name={props.name}
          type={props.type}
          value={props.value}
          onChange={props.handleChange}
          placeholder={props.placeholder}
        />
      </label>
    </form>
  );
};