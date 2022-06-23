import { useState } from 'react'
import RectToRectTransition, { ContainerSize } from './RectToRectTransition';

function App() {
  const [activeContainer, setActiveContainer] = useState<ContainerSize>('small')

  return (
    <div>
      <RectToRectTransition
        activeContainer={activeContainer}
        smallContainer={{ x: 100, y: 400, width: 100, height: 100 }}
        smallFitRule="contain"
        largeContainer={{ x: 300, y: 100, width: 400, height: 400 }}
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
