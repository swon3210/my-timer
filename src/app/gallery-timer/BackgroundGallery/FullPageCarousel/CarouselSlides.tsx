interface CarouselSlideProps {
  content: string;
  color: string;
}

export function CarouselSlide({ content, color }: CarouselSlideProps) {
  return (
    <div className={`w-full h-full flex items-center justify-center ${color}`}>
      <h2 className="text-6xl font-bold text-white">{content}</h2>
    </div>
  );
}
