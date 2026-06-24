import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [slideIndex, setSlideIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  // pan/drag states
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const imgContainerRef = useRef(null);

  const API_URL = `${import.meta.env.VITE_API_URL}/api/models/`;

  // 4 landscape ad images - replace with your studio photos later
  const adSlides = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?q=80&w=2070&auto=format&fit=crop"
  ];

  // fetch function we can reuse
  const fetchModels = () => {
    fetch(API_URL)
.then(res => res.json())
.then(data => {
        setModels(data);
        setLoading(false);
      })
.catch(err => {
        console.log("API error:", err);
        setLoading(false);
      });
  };

  // Initial load
  useEffect(() => {
    fetchModels();
  }, []);

  // Auto refresh every 10 seconds so new photos appear
  useEffect(() => {
    const refreshTimer = setInterval(fetchModels, 10000);
    return () => clearInterval(refreshTimer);
  }, []);

  // Auto transition ad slides every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % adSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredModels = models.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const getAllImages = (model) => {
    if (!model) return [];
    const imgs = [];
    if (model.main_image) imgs.push({ id: 'main', image: model.main_image });
    if (model.photos) imgs.push(...model.photos);
    return imgs;
  };

  const openGallery = (model, index = 0) => {
    setSelectedModel(model);
    setPhotoIndex(index);
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  // close gallery + refresh data immediately
  const closeGallery = () => {
    setSelectedModel(null);
    fetchModels();
  };

  const allImages = getAllImages(selectedModel);

  const nextPhoto = () => {
    if (!allImages.length) return;
    setPhotoIndex((prev) => (prev + 1) % allImages.length);
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  const prevPhoto = () => {
    if (!allImages.length) return;
    setPhotoIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  // zoom functions
  const zoomIn = () => setZoom(prev => Math.min(prev + 0.5, 3));
  const zoomOut = () => {
    setZoom(prev => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) {
        setPanX(0);
        setPanY(0);
      }
      return newZoom;
    });
  };

  // double click to zoom
  const handleDoubleClick = () => {
    setZoom(prev => {
      const newZoom = prev === 1? 2 : 1;
      if (newZoom === 1) {
        setPanX(0);
        setPanY(0);
      }
      return newZoom;
    });
  };

  // drag to pan when zoomed
  const handleMouseDown = (e) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setStartPos({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || zoom <= 1) return;
    e.preventDefault();
    setPanX(e.clientX - startPos.x);
    setPanY(e.clientY - startPos.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch events for mobile
  const handleTouchStart = (e) => {
    if (zoom <= 1) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setStartPos({ x: touch.clientX - panX, y: touch.clientY - panY });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || zoom <= 1) return;
    const touch = e.touches[0];
    setPanX(touch.clientX - startPos.x);
    setPanY(touch.clientY - startPos.y);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (!selectedModel) return;
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'Escape') closeGallery();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-') zoomOut();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedModel, photoIndex, zoom]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading models...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Landscape Ad Slider - FIXED: h-[70vh] back */}
      <section className="relative w-full h-[70vh] max-h-[600px] overflow-hidden">
        {adSlides.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === slideIndex? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt={`Ad ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
          </div>
        ))}

        {/* Slide dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {adSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlideIndex(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === slideIndex? 'w-12 bg-white' : 'w-6 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Search + All Models Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Browse All Talent</h2>

          <div className="max-w-md mx-auto mb-12">
            <input
              type="text"
              placeholder="Search by name: Queen, Diana..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-6 py-3 bg-gray-900 border-gray-800 rounded-lg focus:outline-none focus:border-purple-500 transition-colors text-white placeholder-gray-500"
            />
          </div>

          {/* CARD GRID - NO CROP, AUTO HEIGHT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredModels.map((model) => {
              const imgs = getAllImages(model);
              const cover = imgs[0]?.image;

              return (
                <div
                  key={model.id}
                  className="group relative bg-gray-900 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer border-gray-800 hover:border-purple-500"
                  onClick={() => openGallery(model, 0)}
                >
                  {/* IMAGE WRAPPER - height auto, width 100% */}
                  <div className="relative w-full overflow-hidden">
                    {cover? (
                      <img
                        src={cover}
                        alt={model.name}
                        className="w-full h-auto object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        style={{ aspectRatio: '3/4' }}
                      />
                    ) : (
                      <div className="w-full aspect-[3/4] bg-gray-800 flex items-center justify-center text-gray-400">No image</div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="text-white text-xl font-bold mb-1">{model.name}</h3>
                      <p className="text-gray-300 text-sm">{imgs.length} photo{imgs.length!== 1? 's' : ''}</p>
                    </div>

                    <div className="absolute top-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                      <span className="text-white text-xs font-medium bg-purple-600 px-3 py-1 rounded-full">
                        View →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredModels.length === 0 && (
            <p className="text-center text-gray-400 mt-10">No models found</p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Work With Us?</h2>
            <p className="text-gray-300 mb-8">Book our studio or join our talent network today</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-purple-500/30"
              >
                Book Studio
              </Link>
              <Link
                to="/about"
                className="border border-gray-700 hover:border-purple-500 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Modal - HEAD TOE STANDARD VIEW */}
      {selectedModel && allImages.length > 0 && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto p-4"
          onClick={closeGallery}
        >
          <div
            className="relative max-w-5xl w-full mx-auto my-8"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close button */}
            <button
              className="fixed top-4 right-4 text-white text-4xl hover:text-purple-400 z-10"
              onClick={closeGallery}
            >
              ×
            </button>

            {/* Zoom Controls */}
            <div className="fixed top-4 left-4 flex gap-2 z-10">
              <button
                onClick={(e) => { e.stopPropagation(); zoomOut(); }}
                className="bg-black/70 hover:bg-black/90 text-white w-10 h-10 rounded-full text-xl font-bold backdrop-blur-sm"
              >
                -
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); zoomIn(); }}
                className="bg-black/70 hover:bg-black/90 text-white w-10 h-10 rounded-full text-xl font-bold backdrop-blur-sm"
              >
                +
              </button>
            </div>

            {/* Image - STANDARD: h-90vh shows head to toe */}
            <div
              ref={imgContainerRef}
              className="relative w-full h- bg-black flex items-center justify-center mb-4 overflow-auto rounded-lg"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ cursor: zoom > 1? (isDragging? 'grabbing' : 'grab') : 'zoom-in' }}
            >
              <img
                src={allImages[photoIndex]?.image}
                alt={`${selectedModel.name} ${photoIndex + 1}`}
                onDoubleClick={handleDoubleClick}
                className="max-h-full w-auto object-contain rounded-lg transition-transform duration-100 select-none"
                style={{
                  transform: `scale(${zoom}) translate(${panX / zoom}px, ${panY / zoom}px)`,
                  transformOrigin: 'center center'
                }}
                draggable={false}
              />

              <div className="absolute top-4 right-20 text-white text-sm font-semibold bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm">
                {photoIndex + 1} / {allImages.length}
              </div>

              {allImages.length > 1 && (
                <>
                  <button onClick={prevPhoto} className="absolute left-4 text-white text-5xl hover:text-purple-400 px-4 py-8 bg-black/30 hover:bg-black/50 rounded-full transition select-none">‹</button>
                  <button onClick={nextPhoto} className="absolute right-4 text-white text-5xl hover:text-purple-400 px-4 py-8 bg-black/30 hover:bg-black/50 rounded-full transition select-none">›</button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 mb-6 overflow-x-auto max-w-full p-2 justify-center">
                {allImages.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhotoIndex(idx);
                      setZoom(1);
                      setPanX(0);
                      setPanY(0);
                    }}
                    className={`w-16 h-16 flex-shrink-0 border-2 rounded overflow-hidden ${
                      idx === photoIndex? 'border-purple-500 scale-110' : 'border-gray-700 hover:border-gray-500'
                    } transition-all`}
                  >
                    <img src={img.image} alt={`thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Text */}
            <div className="text-white text-center pb-12">
              <h3 className="text-2xl font-bold mb-2">{selectedModel.name}</h3>
              <p className="text-sm text-gray-300 whitespace-pre-line max-w-2xl mx-auto">
                {selectedModel.profile}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;