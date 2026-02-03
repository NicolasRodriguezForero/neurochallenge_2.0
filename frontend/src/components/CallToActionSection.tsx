export function CallToActionSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 animate-fade-in-up">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Ready to challenge your brain?
        </h2>
        <p className="text-gray-700 mb-6">
          Sign up now and join a global community of cognitive athletes. Track
          your progress, unlock achievements, and become the best version of
          yourself!
        </p>
        <a
          href="#"
          className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg text-lg transition animate-fade-in"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
