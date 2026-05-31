import { Home } from './pages/Home';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Home />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
