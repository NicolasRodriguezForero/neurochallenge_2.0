export function TestimonialsSection() {
  return (
    <section
      className="pt-20 pb-8 px-4 bg-gradient-to-br from-green-200 via-gray-200 to-white animate-fade-in-up w-full flex flex-col items-center justify-center"
      id="testimonials"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center drop-shadow-sm">
          What Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl shadow bg-white/90 text-center animate-fade-in">
            <p className="text-gray-700 italic mb-2">
              “NeuroChallenge made training my memory fun and competitive. I
              love the global rankings!”
            </p>
            <span className="font-bold text-gray-800">— Nicolás R.</span>
          </div>
          <div className="p-6 rounded-xl shadow bg-white/90 text-center animate-fade-in">
            <p className="text-gray-700 italic mb-2">
              “The variety of challenges keeps me coming back every day. My
              focus has improved a lot.”
            </p>
            <span className="font-bold text-gray-800">— Fabián R.</span>
          </div>
          <div className="p-6 rounded-xl shadow bg-white/90 text-center animate-fade-in">
            <p className="text-gray-700 italic mb-2">
              “I can see my progress and compete with friends. The dashboard is
              awesome!”
            </p>
            <span className="font-bold text-gray-800">— Daniel V.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
