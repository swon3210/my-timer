type BackgroundGalleryProps = {
  selectedImageUrl: string;
};

const BackgroundGallery = ({ selectedImageUrl }: BackgroundGalleryProps) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{
        backgroundImage: `url(${selectedImageUrl})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    />
  );
};

export default BackgroundGallery;
