import { atom, useAtom } from "jotai";
import dayjs from "dayjs";

const dateAtom = atom<Date>(dayjs().startOf("week").toDate());

const useDateAtom = () => {
  const [date, setDate] = useAtom(dateAtom);

  return { date, setDate };
};

export default useDateAtom;
