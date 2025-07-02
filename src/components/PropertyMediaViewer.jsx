// src/components/PropertyMediaViewer.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const tabs = [
  { id: 'photos', label: 'Photos' },
  { id: 'video', label: 'Video' },
  { id: 'tour', label: '3D Tour' },
  { id: 'floorplan', label: 'Floor Plan PDF' },
];

export default function PropertyMediaViewer({
  photos = [],
  videoUrl = '',
  tourEmbedUrl = '',
  floorPlanUrl = '',
  listingData = {},
}) {
  const [activeTab, setActiveTab] = useState('photos');
  const [mainPhotoIndex, setMainPhotoIndex] = useState(0);
  const thumbsRef = useRef(null);
  const maxPhotos = 20;
  const slots = Array.from({ length: maxPhotos }, (_, i) => photos[i] || null);

  // Fotoğraf değişimi, delta değeri ile döngüsel
  const changePhoto = useCallback((delta) => {
    setMainPhotoIndex(prev => (prev + delta + maxPhotos) % maxPhotos);
  }, [maxPhotos]);

  // Yalnızca 'photos' sekmesindeyken yön tuşlarıyla gezinme
  useEffect(() => {
    const handlePhotoKey = (e) => {
      if (activeTab !== 'photos') return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        changePhoto(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        changePhoto(1);
      }
    };
    window.addEventListener('keydown', handlePhotoKey);
    return () => window.removeEventListener('keydown', handlePhotoKey);
  }, [activeTab, changePhoto]);

  // Küçük resimleri görünür alana kaydırma
  useEffect(() => {
    if (activeTab !== 'photos' || !thumbsRef.current) return;
    const thumb = thumbsRef.current.children[mainPhotoIndex];
    if (thumb) thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [mainPhotoIndex, activeTab]);

  // Küçük resim kaydırma butonları
  const scrollThumbnails = (dir, e) => {
    if (e) e.preventDefault();
    thumbsRef.current?.scrollBy({ left: dir * 120, behavior: 'smooth' });
  };

  // Aktif sekmeye göre içeriği render et
  const renderContent = () => {
    switch (activeTab) {
      case 'photos':
        return slots[mainPhotoIndex]
          ? <img src={slots[mainPhotoIndex]} alt={`Photo ${mainPhotoIndex + 1}`} loading="lazy" className="w-full h-full object-cover" />
          : <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-400 text-xl">
              Photo {mainPhotoIndex + 1}
            </div>;
      case 'video':
        return videoUrl && (
          <video controls className="w-full h-full object-cover">
            <source src={videoUrl} type="video/mp4" />
          </video>
        );
      case 'tour':
        return tourEmbedUrl && (
          <iframe src={tourEmbedUrl} title="3D Tour" allowFullScreen className="w-full h-full" />
        );
      case 'floorplan':
        return floorPlanUrl && (
          <iframe src={floorPlanUrl} title="Floor Plan PDF" className="w-full h-full" />
        );
      default:
        return null;
    }
  };

  // Ana alan tıklamada sadece fotoğrafta ilerle
  const onMainClick = () => {
    if (activeTab === 'photos') changePhoto(1);
  };

  // İlan verilerini al
  const {
    price, location, ilanNo, ilanTarihi, emlakTipi,
    brut, net, acikAlan, odaSayisi, binaYasi, katSayisi,
    isitma, banyoSayisi, mutfak, otopark, esyali,
    kullanimDurumu, siteIcinde, siteAdi, aidat,
    krediyeUygun, tapuDurumu, kimden, takas, aciklama,
  } = listingData;

  return (
    <div className="px-4 py-6 w-full max-w-5xl mx-auto">
      {/* Sekmeler */}
      <nav role="tablist" className="flex flex-wrap justify-center gap-6 mb-6">
        {tabs.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={activeTab === t.id}
            tabIndex={activeTab === t.id ? 0 : -1}
            onClick={() => setActiveTab(t.id)}
            className={`text-sm font-medium pb-1 ${
              activeTab === t.id
                ? 'text-red-600 border-b-2 border-red-600'
                : 'text-gray-600 hover:text-red-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* Medya Görüntüleyici */}
      <div className="w-full">
        <div
          className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-4 cursor-pointer"
          onClick={onMainClick}
        >
          {renderContent()}
          {activeTab === 'photos' && (
            <>
              <button
                onClick={e => { e.stopPropagation(); changePhoto(-1); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full shadow z-10"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={e => { e.stopPropagation(); changePhoto(1); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full shadow z-10"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {activeTab === 'photos' && (
          <div className="relative mb-6">
            <button
              onClick={e => scrollThumbnails(-1, e)}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-1 bg-white rounded-full shadow hover:bg-gray-100 z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <div ref={thumbsRef} className="flex overflow-x-auto overflow-y-hidden gap-2 px-8 scrollbar-none">
              {slots.map((src, idx) => (
                <button
                  key={idx}
                  onClick={e => { e.preventDefault(); setMainPhotoIndex(idx); }}
                  className={`flex-shrink-0 w-20 h-12 sm:w-24 sm:h-16 rounded-lg overflow-hidden border-2 ${
                    idx === mainPhotoIndex ? 'border-red-600' : 'border-gray-200'
                  }`}
                >
                  {src
                    ? <img src={src} alt={`Thumb ${idx + 1}`} loading="lazy" className="w-full h-full object-cover" />
                    : <div className="flex items-center justify-center w-full h-full text-gray-400 text-xs">
                        Photo {idx + 1}
                      </div>
                  }
                </button>
              ))}
            </div>
            <button
              onClick={e => scrollThumbnails(1, e)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1 bg-white rounded-full shadow hover:bg-gray-100 z-10"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* İlan Detayları */}
      <section className="bg-white border border-gray-300 rounded-lg overflow-hidden mb-6">
        <h2 className="bg-gray-100 px-4 py-2 font-semibold">Listing Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 text-gray-700">
          {[
            ['Price', price], ['Location', location], ['Ilan No', ilanNo], ['Ilan Tarihi', ilanTarihi],
            ['Emlak Tipi', emlakTipi], ['m² (Brüt)', brut], ['m² (Net)', net], ['Açık Alan m²', acikAlan],
            ['Oda Sayısı', odaSayisi], ['Bina Yaşı', binaYasi], ['Kat Sayısı', katSayisi], ['Isıtma', isitma],
            ['Banyo Sayısı', banyoSayisi], ['Mutfak', mutfak], ['Otopark', otopark], ['Eşyalı', esyali],
            ['Kullanım Durumu', kullanimDurumu], ['Site İçerisinde', siteIcinde], ['Site Adı', siteAdi],
            ['Aidat (TL)', aidat], ['Krediye Uygun', krediyeUygun], ['Tapu Durumu', tapuDurumu],
            ['Kimden', kimden], ['Takas', takas],
          ].map(([label, value]) => (
            <div key={label} className="flex">
              <span className="font-medium w-32 inline-block">{label}:</span>
              <span>{value ?? '—'}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Açıklama */}
      <section className="bg-white border border-gray-300 rounded-lg p-4">
        <h2 className="font-semibold mb-2">Açıklama</h2>
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{aciklama ?? 'Detaylı açıklama burada.'}</p>
      </section>
    </div>
  );
}
