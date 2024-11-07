import "./CustomButton.css";

export const CustomButton = ({ title, style }) => {
  return <button className={`button ${style}`}>{title}</button>;
};
