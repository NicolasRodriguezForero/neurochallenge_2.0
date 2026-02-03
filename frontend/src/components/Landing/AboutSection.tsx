export function AboutSection() {
  return (
    <section
      className="py-20 px-4 bg-gradient-to-bl from-white via-gray-200 to-blue-200 backdrop-blur-sm animate-fade-in-up w-full flex flex-col items-center justify-center "
      id="about"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          About NeuroChallenge
        </h2>
        <p className="text-gray-700 text-lg mb-4">
          NeuroChallenge is more than just a test platform. It is a
          comprehensive tool to help you discover, train, and improve your mind
          in a fun and competitive way. Whether you want to boost your memory,
          sharpen your reflexes, or climb the global rankings, NeuroChallenge is
          your playground for cognitive growth.
        </p>
      </div>
    </section>
  );
}
