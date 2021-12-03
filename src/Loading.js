import styled, { keyframes } from 'styled-components'
import spinner from './res/loading.png'

const Container = styled.div`
    position: relative;
    diplay: flex;
    flex-direction: column;
    flex-grow: 1;
    min-width: 100px;
    min-height: 100px;
`

const Content = styled.div`
    diplay: flex;
    flex-direction: column;
    flex-grow: 1;
`
const rotation = keyframes`
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
`

const Spinner = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
`
const Image = styled.img`
    animation: ${rotation} 1s infinite linear;
`

function Loading(props) {
    return (
        <Container>
            <Content>
                {props.children}
            </Content>

            {props.inProgress&&<Spinner>
                <Image src={spinner} alt='...'/>
            </Spinner>}
        </Container>
    )
}

export default Loading