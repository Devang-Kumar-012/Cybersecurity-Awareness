import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { MotionProvider } from '@/components/layout/MotionProvider';
import { LoginPage } from '@/app/pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <MotionProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<AppShell />} />
        </Routes>
      </MotionProvider>
    </BrowserRouter>
  );
}

export default App;