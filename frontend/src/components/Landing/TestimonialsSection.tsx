export function TestimonialsSection() {
  return (
    <section
      className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background dark:from-background dark:to-muted/10 w-full flex flex-col items-center justify-center"
      id="testimonials"
    >
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent dark:from-[var(--neon-cyan)] dark:to-[var(--neon-purple)]">
          What Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group glass-effect p-8 rounded-2xl hover:scale-105 transition-all duration-300 text-center border border-border dark:border-primary/20 dark:hover:border-primary/50 dark:hover:shadow-lg dark:hover:shadow-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="relative text-foreground/80 dark:text-foreground/90 italic mb-4 leading-relaxed">
              "NeuroChallenge made training my memory fun and competitive. I
              love the global rankings!"
            </p>
            <span className="relative font-bold text-foreground dark:text-primary">— Nicolás R.</span>
          </div>
          <div className="group glass-effect p-8 rounded-2xl hover:scale-105 transition-all duration-300 text-center border border-border dark:border-primary/20 dark:hover:border-primary/50 dark:hover:shadow-lg dark:hover:shadow-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="relative text-foreground/80 dark:text-foreground/90 italic mb-4 leading-relaxed">
              "The variety of challenges keeps me coming back every day. My
              focus has improved a lot."
            </p>
            <span className="relative font-bold text-foreground dark:text-primary">— Fabián R.</span>
          </div>
          <div className="group glass-effect p-8 rounded-2xl hover:scale-105 transition-all duration-300 text-center border border-border dark:border-primary/20 dark:hover:border-primary/50 dark:hover:shadow-lg dark:hover:shadow-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="relative text-foreground/80 dark:text-foreground/90 italic mb-4 leading-relaxed">
              "I can see my progress and compete with friends. The dashboard is
              awesome!"
            </p>
            <span className="relative font-bold text-foreground dark:text-primary">— Daniel V.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
