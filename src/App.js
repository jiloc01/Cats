import { useState } from 'react';
import styled from 'styled-components'
import Loading from './Loading'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
`
const Button = styled.button`
  width: 250px;
  height: 40px;
  margin: 10px 0;
`

const ImageCat = styled.img`
  width: 1000px;
  height: 100%;
`

function App() {
  const [image, setImage] = useState('')
  const [isEnabled, setIsEnabled] = useState(true)
  const [intervalID, setIntervalID] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const startInterval = () => {
    setIntervalID(setInterval(getCat, 5000))
  }

  const stopInterval = () => {
    if(intervalID) {
      clearInterval(intervalID)
      setIntervalID(undefined)
    }
  }

  const onChangeRefrash = () => {
    if(!intervalID) {
      startInterval()
    } else {
      stopInterval()
    }
  }
  const onChangeEnabled = () => {
    if(intervalID) {
      stopInterval()
    }
    setIsEnabled(!isEnabled)
  }

  const getCat = () => {
    setIsLoading(true)
    window.fetch('https://api.thecatapi.com/v1/images/search').then(response => response.json()).then(data => setImage(data[0].url)).then(() => setIsLoading(false))
  }

  return (
    <Container>
      <div>
        <input type='checkbox' checked={isEnabled} id={'1'} onChange={onChangeEnabled}/>
        <label htmlFor={'1'}>Enabled</label>
      </div>

      <div>
        <input type='checkbox' checked={Boolean(intervalID)} id={'2'} disabled={!isEnabled} onChange={onChangeRefrash}/>
        <label htmlFor={'2'}>Auto-refrash evry 5 second</label>
      </div>

      <Button onClick={getCat} disabled={!isEnabled}>Get cat</Button>

      {isEnabled&&(image||isLoading)&&<Loading inProgress={isLoading}><ImageCat src={image} alt=''/></Loading>}
    </Container>
  );
}

export default App;
