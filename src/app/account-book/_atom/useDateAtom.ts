import { atom, useAtom } from "jotai";

const dateAtom = atom<Date>(new Date());

const useDateAtom = () => {
  const [date, setDate] = useAtom(dateAtom);

  return { date, setDate };
};

export default useDateAtom;
