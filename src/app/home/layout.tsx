import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "My Timer",
  description: "나의 타이머 어플리케이션",
};

const CategoriesPageNavigationButton = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <Link href="/categories" className={className}>
      <Image
        src="/categories-icon.png"
        alt="카테고리 아이콘"
        width={32}
        height={32}
      />
    </Link>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-full">
      {/* <div className="fixed top-0 left-0 w-full flex justify-center items-center">
        <div className="w-full max-w-[1024px] flex justify-end">
          <CategoriesPageNavigationButton />
        </div>
      </div> */}
      <CategoriesPageNavigationButton className="fixed top-0 right-0 p-3" />
      {children}
    </main>
  );
}
