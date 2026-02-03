export function AboutSection() {
  return (
    <section
      className="py-24 px-4 bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-muted/10 w-full flex flex-col items-center justify-center"
      id="about"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:from-[var(--neon-purple)] dark:to-[var(--neon-pink)]">
          About NeuroChallenge
        </h2>
        <p className="text-foreground/80 dark:text-foreground/90 text-lg md:text-xl leading-relaxed">
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
