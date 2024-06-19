import { useState, useRef, useEffect } from 'react';
import './App.css';
import SvgComponent from './SvgComponent';

export default function App() {
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(50);
  const [IWidth, setIWidth] = useState(500);
  const [IHeight, setIHeight] = useState(500);
  const [uploadedSVG, setUploadedSVG] = useState(null);
  const svgContainerRef = useRef(null);

  const handleXChange = (event) => setX(event.target.value);
  const handleYChange = (event) => setY(event.target.value);
  const handleWidthChange = (event) => setWidth(event.target.value);
  const handleHeightChange = (event) => setHeight(event.target.value);
  const handleIWidthChange = (event) => setIWidth(event.target.value);
  const handleIHeightChange = (event) => setIHeight(event.target.value);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedSVG(e.target.result);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid SVG file.");
    }
  };

  useEffect(() => {
    if (svgContainerRef.current) {
      const svgElement = svgContainerRef.current.querySelector('svg');
      if (svgElement) {
        svgElement.setAttribute('width', `${IWidth}px`);
        svgElement.setAttribute('height', `${IHeight}px`);
        svgElement.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);
      }
    }
  }, [uploadedSVG, IWidth, IHeight,x,y,width,height]);

  return (
    <>
      <div className="absolute right-0">
       <div className='border-2 border-gray-400 mt-10 mr-10 p-10 relative rounded-lg'>
        <p className='absolute left-1 top-1  font-semibold '>Width of Container</p>
        <p>Width</p>
       <input
          className="border-2 border-gray-400 rounded-full px-1"
          type="number"
          value={IWidth}
          onChange={handleIWidthChange}
        />
        <p>Height</p>
        <input
          className="border-2 border-gray-400 rounded-full px-1"
          type="number"
          value={IHeight}
          onChange={handleIHeightChange}
        />
       </div>
        <p>X: {x}</p>
        <input
          type="range"
          min="-100"
          max="100"
          value={x}
          onChange={handleXChange}
        />
        <p>Y: {y}</p>
        <input
          type="range"
          min="-100"
          max="100"
          value={y}
          onChange={handleYChange}
        />
        <p>Width: {width}</p>
        <input
          type="range"
          min="1"
          max="1000"
          value={width}
          onChange={handleWidthChange}
        />
        <p>Height: {height}</p>
        <input
          type="range"
          min="1"
          max="1000"
          value={height}
          onChange={handleHeightChange}
        />
        <br />
        <input
          type="file"
          accept=".svg"
          onChange={handleFileUpload}
        />
      </div>
      {uploadedSVG ? (
        <div
          ref={svgContainerRef}
          className="uploaded-svg"
          dangerouslySetInnerHTML={{ __html: uploadedSVG }}
          style={{
            border: "2px solid red",
            overflow: "hidden",
          }}
        />
      ) : (
     <div className=' w-full flex justify-center  border-2  h-screen border-red-600 items-center font-semibold text-4xl mr-40' >Upload file</div>
      )}
    </>
  );
}
