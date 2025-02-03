import { useAtom } from "jotai";
import { atomWithLocation } from "jotai-location";

const locationAtom = atomWithLocation();

const useLocationAtom = () => {
  const [location, setLocation] = useAtom(locationAtom);

  return {
    location,
    setLocation,
  };
};

export default useLocationAtom;
