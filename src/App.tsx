import { BrowserRouter } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { MotionProvider } from '@/components/layout/MotionProvider';

function App() {
  return (
    <BrowserRouter>
      <MotionProvider>
        <AppShell />
      </MotionProvider>
    </BrowserRouter>
  );
}

export default App;
