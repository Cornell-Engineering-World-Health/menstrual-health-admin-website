import React from 'react';

export const Form = props => {
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
          onKeyDown={props.onKeyDown}
          accept={props.accept}
        />
      </label>
    </form>
  );
};