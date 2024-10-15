import clsx from "clsx";

type BackgroundGalleryProps = {
  selectedImageUrl: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const BackgroundGallery = ({
  selectedImageUrl,
  className,
  onClick,
}: BackgroundGalleryProps) => {
  return (
    <div
      className={clsx("w-full h-full", className)}
      style={{
        backgroundImage: `url('${selectedImageUrl.replaceAll("'", "\\'")}')`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      onClick={onClick}
    />
  );
};

export default BackgroundGallery;
