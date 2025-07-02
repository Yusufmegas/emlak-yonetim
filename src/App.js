// src/App.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Listings from './pages/Listings';
import EditListing from './pages/EditListing';

export default function App() {
  return (
    <>
      <nav className="bg-gray-800 text-white p-4">
        <Link to="/" className="mr-4">Ana Sayfa</Link>
        <Link to="/dashboard" className="mr-4">Dashboard</Link>
        <Link to="/listings">İlanlar</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/edit/:id" element={<EditListing />} />
      </Routes>
    </>
  );
}
