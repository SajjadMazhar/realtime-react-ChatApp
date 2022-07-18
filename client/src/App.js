import './App.css';
import {
  BrowserRouter, Route, Routes
} from 'react-router-dom'
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import ChatState from './components/context/ChatState';

function App() {
  return (
    <ChatState>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Join/>} />
          <Route path='/chat' element={<Chat/>} />
        </Routes>
      </BrowserRouter>
    </ChatState>
  );
}

export default App;
