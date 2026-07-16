function About() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Tugbe</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Where creativity meets professionalism. We’re not just a photo platform — we’re a hub for models, photographers, and visual storytellers.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Founded in 2024 in Accra, Tugbe started with one vision: to give creators a premium space to showcase their work.
              We’ve grown from a small studio idea to a global community connecting models and photographers.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Every image tells a story. We built this platform so your story gets the stage it deserves, with tools that are fast, clean, and professional.
            </p>
            <div className="mt-8 flex gap-6">
              <div>
                <p className="text-3xl font-bold text-purple-500">5000+</p>
                <p className="text-gray-400 text-sm">Creators</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-pink-500">50K+</p>
                <p className="text-gray-400 text-sm">Photos Shared</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-500">30+</p>
                <p className="text-gray-400 text-sm">Countries</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-30"></div>
            <img
              src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop"
              alt="Photography Studio"
              className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Modeling Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Modeling Division</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We partner with professional models and agencies to bring fashion and commercial projects to life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900 border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center text-2xl">✨</div>
              <h3 className="text-xl font-semibold mb-2">Fashion Shoots</h3>
              <p className="text-gray-400">High-end editorial and runway modeling with top photographers.</p>
            </div>

            <div className="bg-gray-900 border-gray-800 rounded-xl p-6 hover:border-pink-500 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg mb-4 flex items-center justify-center text-2xl">📸</div>
              <h3 className="text-xl font-semibold mb-2">Commercial Work</h3>
              <p className="text-gray-400">Brand campaigns, product shoots, and advertising content.</p>
            </div>

            <div className="bg-gray-900 border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center text-2xl">🌍</div>
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-gray-400">Connect with clients and agencies across 30+ countries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur-2xl opacity-30"></div>
            <img
              src="https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?q=80&w=2070&auto=format&fit=crop"
              alt="Professional Studio"
              className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover"
            />
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Professional Studio</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Our Accra-based studio is equipped with industry-grade lighting, backdrops, and editing suites.
              We handle everything from concept to final delivery.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                3 Professional shooting rooms
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                Full lighting + equipment rental
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                In-house editing & retouching team
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Create With Us?</h2>
            <p className="text-gray-300 mb-8">Join thousands of creators building their portfolio on Tugbe</p>
            <a
              href="/signup"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-purple-500/30"
            >
              Start Your Journey
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;