import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewGrievance from './pages/NewGrievance';
import GrievanceHistory from './pages/GrievanceHistory';
import SecretMessagesPage from './pages/SecretMessagesPage';
import GrievanceDetail from './pages/GrievanceDetail';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 text-gray-800 font-sans">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="new" element={<NewGrievance />} />
          <Route path="history" element={<GrievanceHistory />} />
          <Route path="messages" element={<SecretMessagesPage />} />
          <Route path="grievance/:id" element={<GrievanceDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;