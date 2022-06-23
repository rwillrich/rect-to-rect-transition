import { useState } from 'react'
import RectToRectTransition, { ContainerSize } from './RectToRectTransition.tsx'
import './App.css'

function App() {
  const [activeContainer, setActiveContainer] = useState<ContainerSize>('small')
  const smallContainer = { x: 100, y: 500, width: 200, height: 200 }
  const largeContainer = { x: 400, y: 100, width: 600, height: 600 }

  return (
    <div style={{ position: 'relative' }}>
      <div
        className='App__container'
        style={{
          left: smallContainer.x,
          top: smallContainer.y,
          width: smallContainer.width,
          height: smallContainer.height
        }} />
      <div
        className='App__container'
        style={{
          left: largeContainer.x,
          top: largeContainer.y,
          width: largeContainer.width,
          height: largeContainer.height
        }} />
      <RectToRectTransition
        activeContainer={activeContainer}
        smallContainer={smallContainer}
        smallFitRule="cover"
        largeContainer={largeContainer}
        largeFitRule="contain"
        duration={600}
        naturalSize={{ width: 400, height: 200 }}
        renderContent={(scalingFactorCompensation: number) => {
          return (
            <>
              <img
                alt="Placeholder showing it's dimensions in a light gray background."
                src='https://via.placeholder.com/400x200.png'
                className='App__image'
                onClick={() => {
                  setActiveContainer(activeContainer === "small" ? "large" : "small")
                }} />
              <div
                className='App__white-dot'
                style={{
                  transitionDuration: '600ms',
                  transitionProperty: 'transform',
                  transitionTimingFunction: 'linear',
                  transform: `scale3d(${scalingFactorCompensation}, ${scalingFactorCompensation}, 1)`
                }} />
            </>
          )
        }} />
    </div>
  );
}

export default App;
