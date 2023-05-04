import React from "react";
import { CountryDropdown } from "react-country-region-selector";

const Input = ({
  name,
  placeholder = "",
  label = "",
  type,
  required,
  isDisabled,
  ...rest
}) => {
  return (
    <div className="bg-white border border-black transition duration-150 ease-in-out focus-within:border-orange rounded-md mb-2">
      <label
        htmlFor={name}
        className="text-xs font-light placeholder-black px-2 pt-1.5"
      >
        {label}
        {required ? <span className="text-red">*</span> : null}
      </label>
      <input
        type={type}
        className="bg-white w-full px-2 pb-1.5 text-black outline-none text-base font-light rounded-md disabled:opacity-25 focus:outline-none"
        name={name}
        placeholder={placeholder}
        disabled={isDisabled}
        {...rest}
      />
    </div>
  );
};

const ImageInput = ({ name, label }) => {
  return (
    <div className="bg-white border transition duration-150 ease-in-out focus-within:border-orange border-black rounded-md mb-2">
      <label
        htmlFor={name}
        className="text-xs font-light placeholder-black px-2 pt-1.5"
      >
        {label}
      </label>
      <input
        type="file"
        className="bg-white w-full px-2 pt-1 pb-2 text-black outline-none text-base font-light rounded-md"
        name="image1"
      />
      <input
        type="file"
        className="bg-white w-full px-2 pb-2 text-black outline-none text-base font-light rounded-md"
        name="image2"
      />
      <input
        type="file"
        className="bg-white w-full px-2 pb-2 text-black outline-none text-base font-light rounded-md"
        name="image3"
      />
    </div>
  );
};

const TextAreaInput = ({ name, label, required, value, onChange }) => {
  return (
    <div className="bg-white border transition duration-150 ease-in-out focus-within:border-orange border-black rounded-md mb-2">
      <label
        htmlFor={name}
        className="text-xs font-light placeholder-black px-2 pt-1.5"
      >
        {label}
        {required ? <span className="text-red">*</span> : null}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        rows="5"
        className="bg-white text-base font-light w-full focus:outline-none px-2"
      />
    </div>
  );
};

const AccomInput = ({
  name,
  label,
  firstOption,
  secondOption,
  onChange,
  required,
}) => {
  return (
    <div className="bg-white border transition duration-150 ease-in-out focus-within:border-orange border-black rounded-md mb-2">
      <label
        htmlFor={name}
        className="text-xs font-light placeholder-black px-2 pt-1.5"
      >
        {label}
        {required ? <span className="text-red">*</span> : null}
      </label>
      <select
        id={name}
        onChange={onChange}
        className="bg-white focus:outline-none mb-2 text-base font-light placeholder-black w-full px-1"
      >
        <option value={true}>{firstOption}</option>
        <option value={false}>{secondOption}</option>
      </select>
    </div>
  );
};
const SessionSelect = ({
  name,
  label,
  values,
  selectedValue,
  callback,
  required,
}) => {
  return (
    <div className="bg-white border transition duration-150 ease-in-out focus-within:border-orange border-black rounded-md mb-2">
      <label
        htmlFor={name}
        className="text-xs font-light placeholder-black px-2 pt-1.5"
      >
        {label}
        {required ? <span className="text-red">*</span> : null}
      </label>
      <select
        id={name}
        onChange={({ target: { value } }) => callback(value)}
        defaultValue={selectedValue}
        className="bg-white focus:outline-none mb-2 text-base font-light placeholder-black w-full px-1"
      >
        {values.map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
};

const CountryInput = ({ name, label, required, disabled, value, onChange }) => {
  return (
    <div className="bg-white border transition duration-150 ease-in-out focus-within:border-orange border-black rounded-md mb-2">
      <label
        htmlFor={name}
        className="text-xs font-light placeholder-black px-2 pt-1.5"
      >
        {label}
        {required ? <span className="text-red">*</span> : null}
      </label>
      <CountryDropdown
        name={name}
        disabled={disabled}
        value={value}
        className="bg-white focus:outline-none mb-2 text-base font-light placeholder-black w-full px-1"
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
export { CountryInput, SessionSelect, AccomInput, ImageInput, TextAreaInput };
