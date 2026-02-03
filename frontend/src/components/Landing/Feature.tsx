export function Feature({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group relative glass-effect rounded-2xl p-8 hover:scale-105 transition-all duration-300 animate-fade-in-up border border-border dark:border-primary/20 dark:hover:border-primary/50 dark:hover:shadow-lg dark:hover:shadow-primary/20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 filter grayscale-0 group-hover:drop-shadow-lg">
          {icon}
        </div>
        <h3 className="font-bold text-xl mb-3 text-foreground dark:text-primary">
          {title}
        </h3>
        <p className="text-foreground/70 dark:text-foreground/80 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
