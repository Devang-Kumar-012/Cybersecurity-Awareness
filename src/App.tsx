import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { MotionProvider } from '@/components/layout/MotionProvider';
import { LoginPage } from '@/app/pages/LoginPage';
import { SignupPage } from '@/app/pages/SignupPage';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MotionProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            } />
          </Routes>
        </MotionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}


export default App; 