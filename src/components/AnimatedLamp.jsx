import './AnimatedLamp.css';

export default function AnimatedLamp({ text = 'LOADING' }) {
  return (
    <div className="room">
      <div className="lamp">
        <div className="line"></div>
        <div className="base">
          <div className="light"></div>
        </div>
      </div>
      <div className="text">
        <span>{text}</span>
      </div>
    </div>
  );
}
