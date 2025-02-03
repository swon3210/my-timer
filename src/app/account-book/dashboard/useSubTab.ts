import useLocationAtom from "@/app/_atom/useLocationAtom";

type SubTab = "weekly" | "monthly" | "yearly";

const useSubTab = () => {
  const { location, setLocation } = useLocationAtom();

  const subTab = (location.searchParams?.get("subTab") as SubTab) ?? "weekly";

  const setSubTab = (subTab: SubTab) => {
    setLocation((prev) => {
      const searchParams = new URLSearchParams(prev.searchParams);
      searchParams.set("subTab", subTab);

      return {
        ...prev,
        searchParams,
      };
    });
  };

  return {
    subTab,
    setSubTab,
  };
};

export default useSubTab;
