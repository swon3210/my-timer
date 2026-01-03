import { EmptyState } from "@/components/ui/empty-state";
import { ClipboardList } from "lucide-react";

export default function EmptyTransactionList() {
  return (
    <EmptyState
      icon={<ClipboardList className="h-12 w-12" />}
      title="거래 내역이 없습니다"
      description="새로운 거래 내역을 추가해보세요"
    />
  );
}
