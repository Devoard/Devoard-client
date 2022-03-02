import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Layout from './components/Layout';
import Alert from './pages/Alert';
import Chat from './pages/Chat';
import Scrap from './pages/Scrap';
import MyProject from './pages/MyProject';
import MyPage from './pages/MyPage';
import Devoard from './pages/Devoard';
import DevoardDetail from './pages/DevoardDetail';
import Write from './pages/Write';
import Callback from './pages/Callback';
import Survey from './pages/Survey';
import NotFound from './pages/NotFound';

const App = () => {
  const { loggedIn } = useSelector(state => state.user);

  return (
      <div className="App">
        <ThemeProvider
          theme={{
            palette: {
              orange: '#FFB200',
              gray: 'gray'
            }
          }}
        >
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/chat/list" element={<Chat />} />
              <Route path="/alert" element={<Alert />} />
              <Route path="/scrap" element={<Scrap />} />
              <Route path="/my_project" element={<MyProject />} />
              <Route path="/my_page" element={<MyPage />} />
              <Route path="/devoard" element={<Devoard />} />
              {loggedIn ? <Route path="/write" element={<Write />} /> : ""}
              {loggedIn ? <Route path="/write/:id" element={<Write />} /> : ""}
              {loggedIn ? <Route path="/survey" element={<Survey />} /> : ""}
              <Route path="/callback" element={<Callback />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/devoard/detail/:id" element={<DevoardDetail />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </div>
  );
}

export default App;