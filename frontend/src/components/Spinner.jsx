import './Spinner.css';

export default function Spinner({ size = 'medium' }) {
  return <div className={`spinner spinner--${size}`} aria-hidden="true" />;
}
