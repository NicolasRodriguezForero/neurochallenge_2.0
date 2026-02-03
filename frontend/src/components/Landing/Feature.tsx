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
    <div className="flex flex-row md:flex-col items-center text-center p-6 bg-white/80 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 duration-300 animate-fade-in">
      <div className="text-4xl mb-3 text-blue-600 animate-bounce-slow">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
