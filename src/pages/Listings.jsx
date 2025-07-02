import React from 'react';
import { Link } from 'react-router-dom';

const dummy = [
  { id: '1', title: 'Günışığı Villaları' }
];

export default function Listings() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Tüm İlanlar</h2>
      <ul>
        {dummy.map(l => (
          <li key={l.id}>
            {l.title} — <Link to={`/edit/${l.id}`} className="text-blue-600">Düzenle</Link>
          </li>
        ))}
      </ul>
      <Link to="/dashboard" className="mt-4 inline-block text-gray-600">&larr; Geri</Link>
    </div>
  );
}
