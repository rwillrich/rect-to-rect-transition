import { useState } from 'react'
import RectToRectTransition, { ContainerSize } from './RectToRectTransition.tsx';

function App() {
  const [activeContainer, setActiveContainer] = useState<ContainerSize>('small')
  const smallContainer = { x: 100, y: 400, width: 100, height: 100 }
  const largeContainer = { x: 300, y: 100, width: 600, height: 600 }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', backgroundColor: 'rgba(0, 0, 255, 0.2)', left: smallContainer.x, top: smallContainer.y, width: smallContainer.width, height: smallContainer.height }} />
      <div style={{ position: 'absolute', backgroundColor: 'rgba(0, 0, 255, 0.2)', left: largeContainer.x, top: largeContainer.y, width: largeContainer.width, height: largeContainer.height }} />
      <RectToRectTransition
        activeContainer={activeContainer}
        smallContainer={smallContainer}
        smallFitRule="contain"
        largeContainer={largeContainer}
        largeFitRule="contain"
        duration={1000}
        naturalSize={{ width: 400, height: 200 }}
        renderContent={() => {
          return (
            <div
              style={{ width: '100%', height: '100%', backgroundColor: 'blue' }}
              onClick={() => {
                setActiveContainer(activeContainer === "small" ? "large" : "small")
              }} />
          )
        }} />
    </div>
  );
}

export default App;
