function formatDate(dateStr) {
const date = new Date(dateStr);
return Number.isNaN(date.getTime())
    ? dateStr
    : date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short'
    });
};

export const Tooltip = ({ interactionData }) => {
    if (!interactionData) {
      return null;
    }
  
    const { xPos, yPos, name, date, data, tool, demo, category, color, width } = interactionData;
    
    const flip = xPos >= width / 2;
    const transformX = flip ? 'translateX(-110%)' : 'translateX(10%)';
    return (    
      <div
        className={`tooltip${flip ? ' tooltip--flip' : ''}`}
        style={{
          left: xPos,
          top: yPos,
          transform: `translateY(-50%) ${transformX}`,
        }}
      >
        <b className="title">{name}</b>
        <hr className="tooltip__rule" />
        <div className="details" style={{ borderColor: color }}>
          <div className="row">
            <span>Date: </span>
            <b>{formatDate(date)}</b>
          </div>
          <div className="row">
            <span>Tool: </span>
            <b style={{ color: color }}>{tool}</b>
          </div>
          <div className="row">
            <span>Category: </span>
            <b style={{ color: color }}>{category}</b>
          </div>
          {/* <div className="row">
            <a href={demo} target="_blank" rel="noopener noreferrer">Demo</a>
          </div>
          <div className="row">
            <a href={data} target="_blank" rel="noopener noreferrer">Data</a>
          </div> */}
        </div>
    </div>
    );
  };