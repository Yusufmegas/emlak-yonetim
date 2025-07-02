import React from 'react';
import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Emlak Yönetim Paneli</h1>
      <Link to="/dashboard" className="text-blue-600 underline">
        Yönetim Paneline Git
      </Link>
    </div>
  );
}
