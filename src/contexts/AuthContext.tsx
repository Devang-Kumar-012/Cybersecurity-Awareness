import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  user: { email: string; name: string } | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = window.localStorage.getItem('cybersecure-authenticated');
    const userData = window.localStorage.getItem('cybersecure-user');
    
    if (authStatus === 'true' && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }

    // Listen for auth changes
    const handleAuthChange = () => {
      const authStatus = window.localStorage.getItem('cybersecure-authenticated');
      const userData = window.localStorage.getItem('cybersecure-user');
      
      if (authStatus === 'true' && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    window.addEventListener('cybersecure-auth-change', handleAuthChange);
    return () => window.removeEventListener('cybersecure-auth-change', handleAuthChange);
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would validate against a backend
    // For now, we'll check if user exists in localStorage
    const usersData = window.localStorage.getItem('cybersecure-users');
    const users = usersData ? JSON.parse(usersData) : [];
    
    const existingUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (existingUser) {
      const userData = { email: existingUser.email, name: existingUser.name };
      window.localStorage.setItem('cybersecure-authenticated', 'true');
      window.localStorage.setItem('cybersecure-user', JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData);
      window.dispatchEvent(new Event('cybersecure-auth-change'));
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    // In a real app, this would create a user in the backend
    const usersData = window.localStorage.getItem('cybersecure-users');
    const users = usersData ? JSON.parse(usersData) : [];
    
    // Check if user already exists
    if (users.some((u: any) => u.email === email)) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser = { email, password, name };
    users.push(newUser);
    window.localStorage.setItem('cybersecure-users', JSON.stringify(users));
    
    // Auto login after signup
    const userData = { email, name };
    window.localStorage.setItem('cybersecure-authenticated', 'true');
    window.localStorage.setItem('cybersecure-user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
    window.dispatchEvent(new Event('cybersecure-auth-change'));
  };

  const logout = () => {
    window.localStorage.removeItem('cybersecure-authenticated');
    window.localStorage.removeItem('cybersecure-user');
    setIsAuthenticated(false);
    setUser(null);
    window.dispatchEvent(new Event('cybersecure-auth-change'));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
