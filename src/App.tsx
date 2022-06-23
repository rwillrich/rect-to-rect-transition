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
        smallFitRule="cover"
        largeContainer={largeContainer}
        largeFitRule="contain"
        duration={1000}
        naturalSize={{ width: 400, height: 200 }}
        renderContent={(contentScalingFactor: number) => {
          return (
            <div
              style={{ width: '100%', height: '100%', backgroundColor: 'blue' }}
              onClick={() => {
                setActiveContainer(activeContainer === "small" ? "large" : "small")
              }}>
              <div style={{
                position: 'absolute',
                left: '200px',
                top: '100px',
                width: 0,
                height: 0,
                backgroundColor: 'white',
                border: '8px solid white',
                borderRadius: '8px',
                boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.5)',
                transitionDuration: '1000ms',
                transitionProperty: 'transform',
                transitionTimingFunction: 'linear',
                transform: `scale3d(${contentScalingFactor}, ${contentScalingFactor}, 1)`
              }} />
            </div>
          )
        }} />
    </div>
  );
}

export default App;
