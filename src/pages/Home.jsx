import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { fetchModels, toAbsoluteMediaUrl } from '../api/api';

const fallbackYear = new Date().getFullYear();

const staticFallbackModels = [
  {
    id: 'fallback-1',
    name: 'Featured Talent',
    profile: 'Temporary fallback while live portfolio data reconnects.',
    main_image: '/photos/afr6.avif',
    photos: []
  },
  {
    id: 'fallback-2',
    name: 'Studio Highlight',
    profile: 'Curated highlight from the agency lookbook.',
    main_image: '/photos/afri7.avif',
    photos: []
  }
];

/*const staticModels = [
  {
    id: 1,
    name: 'Queen',
    profile: 'Top editorial model with runway and campaign experience.',
    main_image: '/photos/afr6.avif',
    photos: [
      { id: 'queen-1', image: '/photos/afr3.webp' },
      { id: 'queen-2', image: '/photos/afr4.webp' }
    ]
  },
  {
    id: 2,
    name: 'Diana',
    profile: 'Luxury commercial talent for premium fashion brands.',
    main_image: '/photos/afri7.avif',
    photos: [{ id: 'diana-1', image: '/photos/afri8.webp' }]
  },
  {
    id: 3,
    name: 'Ama',
    profile: 'Creative lifestyle model for polished editorial storytelling.',
    main_image: '/photos/afr.webp',
    photos: [{ id: 'ama-1', image: '/photos/afri2.jpeg' }]
  }
];*/

const adSlides = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?q=80&w=1400&auto=format&fit=crop'
];

function formatYear(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallbackYear;
  return date.getFullYear();
}

function normalizeModelImages(models) {
  if (!Array.isArray(models)) return [];
  return models.map((model) => ({
    ...model,
    main_image: toAbsoluteMediaUrl(model.main_image),
    photos: Array.isArray(model.photos)
      ? model.photos.map((photo) => ({
          ...photo,
          image: toAbsoluteMediaUrl(photo.image)
        }))
      : []
  }));
}

function Home() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [slideIndex, setSlideIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const imgContainerRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchModels();
        if (!mounted) return;
        if (Array.isArray(data) && data.length) {
          setModels(normalizeModelImages(data));
        } else {
          setModels(normalizeModelImages(staticFallbackModels));
          setError('Live backend returned no photos. Showing local fallback gallery.');
        }
      } catch (fetchError) {
        if (mounted) {
          const message = fetchError?.message || 'Unable to fetch model list.';
          setError(`Unable to load models from the backend: ${message}. Showing local fallback gallery.`);
          setModels(normalizeModelImages(staticFallbackModels));
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % adSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const filteredModels = useMemo(
    () => models.filter((model) => model.name.toLowerCase().includes(search.toLowerCase())),
    [models, search]
  );

  const totalPhotos = useMemo(
    () =>
      models.reduce((sum, model) => {
        const count = (model.photos?.length || 0) + (model.main_image ? 1 : 0);
        return sum + count;
      }, 0),
    [models]
  );

  const getAllImages = useCallback((model) => {
    if (!model) return [];
    const images = [];
    if (model.main_image) images.push({ id: 'main', image: model.main_image });
    if (Array.isArray(model.photos) && model.photos.length) images.push(...model.photos);
    return images;
  }, []);

  const allImages = useMemo(() => getAllImages(selectedModel), [selectedModel, getAllImages]);

  const openGallery = useCallback((model, index = 0) => {
    setSelectedModel(model);
    setPhotoIndex(index);
    setZoom(1);
    setPanX(0);
    setPanY(0);
  }, []);

  const closeGallery = useCallback(() => setSelectedModel(null), []);

  const nextPhoto = useCallback(() => {
    if (!allImages.length) return;
    setPhotoIndex((prev) => (prev + 1) % allImages.length);
    setZoom(1);
    setPanX(0);
    setPanY(0);
  }, [allImages.length]);

  const prevPhoto = useCallback(() => {
    if (!allImages.length) return;
    setPhotoIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    setZoom(1);
    setPanX(0);
    setPanY(0);
  }, [allImages.length]);

  const zoomIn = useCallback(() => setZoom((prev) => Math.min(prev + 0.5, 3)), []);
  const zoomOut = useCallback(() => {
    setZoom((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) {
        setPanX(0);
        setPanY(0);
      }
      return next;
    });
  }, []);

  const handleDoubleClick = useCallback(() => {
    setZoom((prev) => {
      const next = prev === 1 ? 2 : 1;
      if (next === 1) {
        setPanX(0);
        setPanY(0);
      }
      return next;
    });
  }, []);

  const handleMouseDown = useCallback(
    (event) => {
      if (zoom <= 1) return;
      event.preventDefault();
      setIsDragging(true);
      setStartPos({ x: event.clientX - panX, y: event.clientY - panY });
    },
    [zoom, panX, panY]
  );

  const handleMouseMove = useCallback(
    (event) => {
      if (!isDragging || zoom <= 1) return;
      event.preventDefault();
      setPanX(event.clientX - startPos.x);
      setPanY(event.clientY - startPos.y);
    },
    [isDragging, zoom, startPos]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleTouchStart = useCallback(
    (event) => {
      if (zoom <= 1) return;
      const touch = event.touches[0];
      setIsDragging(true);
      setStartPos({ x: touch.clientX - panX, y: touch.clientY - panY });
    },
    [zoom, panX, panY]
  );

  const handleTouchMove = useCallback(
    (event) => {
      if (!isDragging || zoom <= 1) return;
      const touch = event.touches[0];
      setPanX(touch.clientX - startPos.x);
      setPanY(touch.clientY - startPos.y);
    },
    [isDragging, zoom, startPos]
  );

  const handleTouchEnd = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    const handleKey = (event) => {
      if (!selectedModel) return;
      if (event.key === 'ArrowRight') nextPhoto();
      if (event.key === 'ArrowLeft') prevPhoto();
      if (event.key === 'Escape') closeGallery();
      if (event.key === '+' || event.key === '=') zoomIn();
      if (event.key === '-') zoomOut();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedModel, nextPhoto, prevPhoto, closeGallery, zoomIn, zoomOut]);

  return (
    <div className="min-h-screen bg-[#020205] text-white">
      <section className="relative h-[78vh] max-h-205 overflow-hidden">
        {adSlides.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === slideIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt={`Scene ${idx + 1}`}
              className="h-full w-full object-cover"
              loading={idx === 0 ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={idx === 0 ? 'high' : 'low'}
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/80" />
          </div>
        ))}

        <div className="absolute inset-0 bg-linear-to-br from-black/70 via-transparent to-black/95" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.5em] text-pink-200/90 shadow-[0_20px_80px_rgba(255,255,255,0.05)]">
              Creative modeling & luxury campaigns
            </span>
            <h1 className="mt-8 text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
              A fashion portfolio that feels editorial, modern, and unforgettable.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
              Discover premium runway and commercial talent powered directly from your Django Cloudinary backend.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-fuchsia-500 via-purple-600 to-pink-500 px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-xl shadow-fuchsia-500/30 transition duration-200 hover:-translate-y-0.5"
              >
                Book Talent
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition duration-200 hover:border-pink-500 hover:bg-white/10"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {adSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlideIndex(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === slideIndex ? 'w-12 bg-white' : 'w-6 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      <section className="relative -mt-24 px-4 pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl rounded-4xl border border-white/10 bg-[#07070d]/95 px-6 py-10 shadow-[0_50px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.28em] text-pink-300/80">Featured runway & editorial talent</p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Browse models, portfolios, and premium campaign-ready talent.</h2>
              <p className="max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
                Your Django backend powers the most relevant fashion profiles, delivered in a luxurious browsing experience.
              </p>
            </div>
            <div className="rounded-4xl border border-white/10 bg-[#0a0a11]/95 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.25)]">
              <label className="text-xs uppercase tracking-[0.3em] text-gray-400">Search models</label>
              <input
                type="text"
                placeholder="Search names, styles or campaign briefs"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="mt-4 w-full rounded-3xl border border-white/10 bg-[#09090f] px-5 py-4 text-white placeholder:text-gray-500 focus:border-fuchsia-500 focus:outline-none"
              />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/5 px-5 py-4">
                  <p className="text-2xl font-semibold text-white">{models.length}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em] text-gray-400">Live models</p>
                </div>
                <div className="rounded-3xl bg-white/5 px-5 py-4">
                  <p className="text-2xl font-semibold text-white">{totalPhotos}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em] text-gray-400">Images available</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            {error && (
              <div className="mb-6 rounded-3xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
              </div>
            )}
            {loading ? (
              <div className="rounded-4xl border border-white/10 bg-[#09090f]/90 p-10 text-center text-gray-300 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
                Loading the latest models from your backend...
              </div>
            ) : (
              <>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredModels.map((model) => {
                    const imgs = getAllImages(model);
                    const cover = imgs[0]?.image;
                    return (
                      <button
                        key={model.id}
                        onClick={() => openGallery(model, 0)}
                        className="group overflow-hidden rounded-4xl border border-white/10 bg-[#0c0c13]/90 text-left shadow-[0_30px_80px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_35px_90px_rgba(168,85,247,0.18)]"
                      >
                        <div className="relative overflow-hidden">
                          {cover ? (
                            <img
                              src={cover}
                              alt={model.name}
                              className="h-72 w-full object-cover object-top transition duration-500 group-hover:scale-105"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <div className="flex h-72 items-center justify-center bg-gray-900 text-gray-500">No image</div>
                          )}
                          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                          <div className="absolute left-4 bottom-4 right-4">
                            <p className="text-sm uppercase tracking-[0.25em] text-pink-300">Model</p>
                            <h3 className="mt-2 text-xl font-semibold text-white">{model.name}</h3>
                          </div>
                        </div>
                        <div className="space-y-3 px-5 py-5">
                          <p className="text-sm leading-6 text-gray-300 min-h-18">{model.profile || 'Profile details coming soon.'}</p>
                          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-gray-400">
                            <span>{imgs.length} image{imgs.length !== 1 ? 's' : ''}</span>
                            <span>{formatYear(model.created_at)}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {filteredModels.length === 0 && (
                  <p className="mt-8 text-center text-gray-400">No models matched your search.</p>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl rounded-4xl border border-white/10 bg-[#08080f]/95 px-8 py-12 shadow-[0_50px_120px_rgba(0,0,0,0.24)] backdrop-blur-xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-pink-300/80">Luxury creative direction</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to launch your next fashion campaign?</h2>
              <p className="mt-4 max-w-xl text-gray-400">Work with our studio to cast premium models, book editorial talent, and build striking brand imagery that stands out globally.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/contact" className="rounded-full bg-linear-to-r from-fuchsia-500 via-purple-600 to-pink-500 px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-xl shadow-fuchsia-500/25 transition duration-200 hover:-translate-y-0.5">Book a session</Link>
              <Link to="/about" className="rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition duration-200 hover:border-pink-500 hover:bg-white/10">Learn more</Link>
            </div>
          </div>
        </div>
      </section>

      {selectedModel && allImages.length > 0 && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 p-4 backdrop-blur-sm" onClick={closeGallery}>
          <div className="relative mx-auto flex max-w-5xl flex-col gap-6 rounded-4xl bg-[#030305]/95 p-6 shadow-[0_60px_140px_rgba(0,0,0,0.55)]" onClick={(event) => event.stopPropagation()}>
            <button onClick={closeGallery} className="absolute right-6 top-6 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-3xl text-white transition hover:bg-white/10">×</button>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-pink-300/80">{selectedModel.name}</p>
                <h3 className="mt-2 text-3xl font-semibold text-white">Model portfolio</h3>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={zoomOut} className="rounded-full bg-white/10 px-4 py-2 text-white transition hover:bg-white/20">-</button>
                <button onClick={zoomIn} className="rounded-full bg-white/10 px-4 py-2 text-white transition hover:bg-white/20">+</button>
              </div>
            </div>

            <div className="relative h-[70vh] overflow-hidden rounded-4xl bg-black">
              <div
                ref={imgContainerRef}
                className="absolute inset-0 flex items-center justify-center overflow-hidden"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in' }}
              >
                <img
                  src={allImages[photoIndex]?.image}
                  alt={`${selectedModel.name} ${photoIndex + 1}`}
                  onDoubleClick={handleDoubleClick}
                  className="max-h-full w-auto object-contain transition-transform duration-200"
                  loading="eager"
                  decoding="async"
                  style={{ transform: `scale(${zoom}) translate(${panX / zoom}px, ${panY / zoom}px)`, transformOrigin: 'center center' }}
                  draggable={false}
                />
              </div>

              <div className="absolute left-6 top-6 rounded-full bg-black/60 px-4 py-2 text-sm text-white backdrop-blur-sm">{photoIndex + 1} / {allImages.length}</div>
              {allImages.length > 1 && (
                <> 
                  <button onClick={prevPhoto} className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-4 py-3 text-3xl text-white transition hover:bg-white/10">‹</button>
                  <button onClick={nextPhoto} className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-4 py-3 text-3xl text-white transition hover:bg-white/10">›</button>
                </>
              )}
            </div>

            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-3">
                {allImages.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={(event) => {
                      event.stopPropagation();
                      setPhotoIndex(idx);
                      setZoom(1);
                      setPanX(0);
                      setPanY(0);
                    }}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-3xl border-2 ${idx === photoIndex ? 'border-fuchsia-500' : 'border-white/10'} transition-all`}
                  >
                    <img src={img.image} alt={`thumb-${idx}`} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            )}

            <div className="rounded-4xl border border-white/10 bg-white/5 p-6 text-gray-300">
              <p className="text-sm uppercase tracking-[0.28em] text-pink-300/80">About the profile</p>
              <p className="mt-3 text-base leading-7 text-gray-200">{selectedModel.profile || 'This talent is available for editorial, runway, and luxury campaigns. Contact us to book the model for your next project.'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
