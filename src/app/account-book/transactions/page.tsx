"use client";

import { useState } from "react";
import { TransactionFilter, TransactionSort } from "@/types/transaction";
import TransactionList from "./_components/TransactionList";
import TransactionFilterComponent from "./_components/TransactionFilter";
import { Transaction } from "@/domains/account-book/transactions/types";
import useTransactionFormModal from "./_components/TransactionFormModal/useTransactionFormModal";
import useTransactionDeleteModal from "./_components/TransactionDeleteModal/useTransactionDeleteModal";
import useAddTransactionMutation from "@/domains/account-book/transactions/useAddTransactionMutation";
import useUpdateTransactionMutation from "@/domains/account-book/transactions/useUpdateTransactionMutation";
import { isEmpty } from "@/utils/text";
import AddTransactionByChatButton from "./_components/AddTransactionByChatButton";
import { Filter, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeader } from "@/components/ui/section";
import dayjs from "dayjs";
import AddTransactionByImageButton from "./_components/AddTransactionByImageButton";

export default function TransactionsPage() {
  // 상태 관리
  const [filter, setFilter] = useState<TransactionFilter>({});
  const [sort, setSort] = useState<TransactionSort>({
    field: "date",
    direction: "desc",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { openTransactionFormModal } = useTransactionFormModal();
  const { openTransactionDeleteModal } = useTransactionDeleteModal();

  const { mutateAsync: addTransaction } = useAddTransactionMutation();
  const { mutateAsync: updateTransaction } = useUpdateTransactionMutation();

  // 거래 내역 수정 처리
  const handleEditTransaction = async (transaction: Transaction) => {
    const transactionFormValues = await openTransactionFormModal({
      defaultValues: transaction,
    });

    if (!transactionFormValues) {
      return;
    }

    await updateTransaction({
      id: transaction.id,
      transaction: {
        ...transactionFormValues,
        paymentMethod: isEmpty(transactionFormValues.paymentMethod)
          ? undefined
          : transactionFormValues.paymentMethod,
      },
    });
  };
  // 거래 내역 삭제 처리
  const handleDeleteTransaction = (id: string) => {
    openTransactionDeleteModal(id);
  };

  // 필터 초기화
  const handleResetFilter = () => {
    setFilter({});
    setSort({
      field: "date",
      direction: "desc",
    });
  };

  // 새 거래 내역 추가
  const handleAddTransaction = async (transaction?: Transaction) => {
    const transactionFormValues = await openTransactionFormModal({
      defaultValues: {
        date: transaction?.date ?? dayjs().format("YYYY-MM-DD"),
        amount: 0,
        categoryId: "",
        description: "",
        type: "EXPENSE",
        paymentMethod: undefined,
      },
    });

    if (!transactionFormValues) {
      return;
    }

    await addTransaction({
      transaction: {
        ...transactionFormValues,
        paymentMethod: isEmpty(transactionFormValues.paymentMethod)
          ? undefined
          : transactionFormValues.paymentMethod,
      },
    });
  };

  return (
    <div className="min-h-screen bg-muted">
      <PageHeader
        title="거래 내역"
        subtitle="수입과 지출을 관리하고 분석하세요"
        border
        rightSlot={
          <div className="flex items-center gap-2">
            <AddTransactionByImageButton />
            <AddTransactionByChatButton />
            <Button type="button" size="icon" onClick={() => handleAddTransaction()}>
              <Pen className="h-4 w-4" />
            </Button>
          </div>
        }
      />

      <Container className="py-6">
        {/* 모바일 필터 토글 */}
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full justify-between"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-label">필터 & 정렬</span>
            </div>
            <svg
              className={`w-5 h-5 text-muted-foreground transform transition-transform ${
                isFilterOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 데스크톱 필터 사이드바 */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-6">
              <TransactionFilterComponent
                filter={filter}
                sort={sort}
                onFilterChange={setFilter}
                onSortChange={setSort}
                onReset={handleResetFilter}
              />
            </div>
          </div>

          {/* 모바일 필터 (토글) */}
          {isFilterOpen && (
            <div className="lg:hidden col-span-1 mb-4">
              <div className="animate-slide-down">
                <TransactionFilterComponent
                  filter={filter}
                  sort={sort}
                  onFilterChange={setFilter}
                  onSortChange={setSort}
                  onReset={handleResetFilter}
                />
              </div>
            </div>
          )}

          {/* 거래 내역 목록 */}
          <div className="lg:col-span-3">
            <Card className="p-4 md:p-6">
              <Section spacing="none">
                <SectionHeader title="거래 내역" spacing="default" />
                <TransactionList
                  filter={filter}
                  sort={sort}
                  onEdit={handleEditTransaction}
                  onDelete={handleDeleteTransaction}
                  onAddTransaction={handleAddTransaction}
                />
              </Section>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
