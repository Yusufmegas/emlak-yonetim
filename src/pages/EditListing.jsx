import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PropertyMediaViewer from '../components/PropertyMediaViewer';

export default function EditListing() {
  const { id } = useParams();
  // Örnek veri; gerçek API’yle değiştireceksiniz
  const listing = {
    photos: [], videoUrl: '', tourEmbedUrl: '', floorPlanUrl: '',
    price:'', location:'', ilanNo:'', ilanTarihi:'', emlakTipi:'',
    brut:'', net:'', acikAlan:'', odaSayisi:'', binaYasi:'', katSayisi:'',
    isitma:'', banyoSayisi:'', mutfak:'', otopark:'', esyali:'',
    kullanimDurumu:'', siteIcinde:'', siteAdi:'', aidat:'', krediyeUygun:'',
    tapuDurumu:'', kimden:'', takas:'', aciklama:''
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">İlan Düzenle: {id}</h2>
      <PropertyMediaViewer {...listing} />
      <Link to="/listings" className="mt-4 inline-block text-gray-600">&larr; Tüm İlanlar</Link>
    </div>
  );
}
