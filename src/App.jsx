import { useState, useEffect } from 'react';

function PhotoGallery() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const API_URL = "http://127.0.0.1:8000/api/models/";

  useEffect(() => {
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
  };

  const allImages = getAllImages(selectedModel);

  const nextPhoto = () => {
    if (!allImages.length) return;
    setPhotoIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevPhoto = () => {
    if (!allImages.length) return;
    setPhotoIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (!selectedModel) return;
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'Escape') setSelectedModel(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedModel, photoIndex]);

  if (loading) {
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">📸 Models Gallery</h2>

        <input
          type="text"
          placeholder="Search by name: Queen, Diana..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 mb-8 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredModels.map((model) => {
            const imgs = getAllImages(model);
            const cover = imgs[0]?.image;

            return (
              <div
                key={model.id}
                className="group relative bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => openGallery(model, 0)}
              >
                <div className="relative h-[28rem] flex items-center justify-center">
                  {cover? (
                    <img
                      src={cover}
                      alt={model.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-gray-400">No image</div>
                  )}

                  {/* Removed badge - no more number sitting on photo */}

                  {/* Bottom gradient only on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

                  {/* Text that slides up on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20 pointer-events-none">
                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="text-white text-xl font-bold mb-1">{model.name}</h3>
                      <p className="text-gray-300 text-sm">{imgs.length} photo{imgs.length!== 1? 's' : ''}</p>
                    </div>
                  </div>

                  {/* Top button - appears on hover */}
                  <div className="absolute top-4 left-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75 z-20 pointer-events-auto">
                    <span className="text-white text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      View Gallery →
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

        {/* Gallery Modal - unchanged */}
        {selectedModel && allImages.length > 0 && (
          <div
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedModel(null)}
          >
            <div
              className="relative flex-col items-center max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full flex items-center justify-center">
                <img
                  src={allImages[photoIndex]?.image}
                  alt={`${selectedModel.name} ${photoIndex + 1}`}
                  className="max-w-full max-h- object-contain"
                />

                <div className="absolute top-4 right-4 text-white text-sm font-semibold bg-black bg-opacity-70 px-3 py-1 rounded-full backdrop-blur-sm">
                  {photoIndex + 1} / {allImages.length}
                </div>

                {allImages.length > 1 && (
                  <>
                    <button onClick={prevPhoto} className="absolute left-4 text-white text-5xl hover:text-gray-300 px-4 py-8 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full transition select-none">‹</button>
                    <button onClick={nextPhoto} className="absolute right-4 text-white text-5xl hover:text-gray-300 px-4 py-8 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full transition select-none">›</button>
                  </>
                )}

                <button className="absolute -top-10 right-0 text-white text-4xl hover:text-gray-300" onClick={() => setSelectedModel(null)}>×</button>
              </div>

              {allImages.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto max-w-full p-2 w-full justify-center">
                  {allImages.map((img, idx) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPhotoIndex(idx);
                      }}
                      className={`w-16 h-16 flex-shrink-0 border-2 rounded overflow-hidden ${
                        idx === photoIndex? 'border-blue-500 scale-110' : 'border-gray-600 hover:border-gray-300'
                      } transition-all`}
                    >
                      <img src={img.image} alt={`thumb ${idx}`} className="w-full h-full object-cover pointer-events-none" />
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-4 text-white text-center px-4">
                <h3 className="text-2xl font-bold mb-2">{selectedModel.name}</h3>
                <p className="text-sm text-gray-300 whitespace-pre-line max-w-2xl mx-auto">{selectedModel.profile}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotoGallery;