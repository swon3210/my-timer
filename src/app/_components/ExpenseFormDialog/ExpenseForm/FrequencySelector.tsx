import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Frequency } from "@/domains/account-book/transactions/types";
import { cn } from "@/lib/utils";

type FrequencySelectorProps = {
  selectedFrequency: Frequency | undefined;
  onFrequencyChange: (frequency: Frequency | undefined) => void;
};

function FrequencySelector({
  selectedFrequency,
  onFrequencyChange,
}: FrequencySelectorProps) {
  return (
    <Select
      value={selectedFrequency}
      onValueChange={(value) =>
        onFrequencyChange(value as Frequency | undefined)
      }
    >
      <SelectTrigger
        className={cn("w-full", !selectedFrequency && "text-gray-500")}
      >
        <SelectValue placeholder="주기 (Optional)" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="WEEKLY">주 마다</SelectItem>
        <SelectItem value="MONTHLY">월 마다</SelectItem>
        <SelectItem value="YEARLY">년 마다</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default FrequencySelector;
