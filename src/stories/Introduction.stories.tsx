import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const IntroductionPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-heading-1">My Timer 디자인 시스템</h1>
        <p className="text-body-lg text-muted-foreground">
          신혼부부를 위한 <strong>갤러리 서비스</strong>와{" "}
          <strong>가계부 서비스</strong>의 일관된 UI/UX를 위한 디자인 시스템입니다.
        </p>
      </div>

      {/* Goals */}
      <section className="space-y-4">
        <h2 className="text-heading-2">🎯 목표</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <h3 className="text-heading-5 mb-2">일관성</h3>
            <p className="text-body-sm text-muted-foreground">
              두 서비스 간의 통일된 시각적 경험
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-heading-5 mb-2">재사용성</h3>
            <p className="text-body-sm text-muted-foreground">
              컴포넌트와 스타일의 재사용을 통한 개발 효율 향상
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-heading-5 mb-2">확장성</h3>
            <p className="text-body-sm text-muted-foreground">
              새로운 기능 추가 시 쉽게 확장 가능한 구조
            </p>
          </Card>
        </div>
      </section>

      {/* Semantic Colors */}
      <section className="space-y-6">
        <h2 className="text-heading-2">🎨 시맨틱 색상 체계</h2>

        <Card className="p-6">
          <h3 className="text-heading-4 mb-4">상태 및 피드백 색상</h3>
          <p className="text-body-sm text-muted-foreground mb-4">
            일관된 사용자 경험을 위한 시맨틱 색상 체계입니다.
          </p>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-label w-24">Success:</span>
              <Button variant="success" size="sm">성공</Button>
              <Badge variant="success">완료</Badge>
              <Badge variant="soft-success">진행중</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-label w-24">Warning:</span>
              <Button variant="warning" size="sm">경고</Button>
              <Badge variant="warning">주의</Badge>
              <Badge variant="soft-warning">확인 필요</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-label w-24">Destructive:</span>
              <Button variant="destructive" size="sm">삭제</Button>
              <Badge variant="destructive">오류</Badge>
              <Badge variant="soft-destructive">위험</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-label w-24">Info:</span>
              <Button variant="info" size="sm">정보</Button>
              <Badge variant="info">안내</Badge>
              <Badge variant="soft-info">참고</Badge>
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-sm">
                <span>진행률 예시</span>
                <span>75%</span>
              </div>
              <Progress variant="default" value={75} />
            </div>
          </div>
        </Card>
      </section>

      {/* Quick Start */}
      <section className="space-y-4">
        <h2 className="text-heading-2">🚀 빠른 시작</h2>
        <Card className="p-6">
          <h3 className="text-heading-5 mb-4">컴포넌트 임포트</h3>
          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm font-mono">
{`// UI 컴포넌트
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// 레이아웃 컴포넌트
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { Section, SectionHeader } from "@/components/ui/section"
import { EmptyState } from "@/components/ui/empty-state"
import { StatCard } from "@/components/ui/stat-card"
import { FormField, FormActions } from "@/components/ui/form-field"`}
            </pre>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-heading-5 mb-4">타이포그래피 사용</h3>
          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm font-mono">
{`<h1 className="text-heading-1">페이지 제목</h1>
<p className="text-body text-muted-foreground">설명</p>
<span className="text-caption">날짜</span>`}
            </pre>
          </div>
        </Card>
      </section>

      {/* Structure */}
      <section className="space-y-4">
        <h2 className="text-heading-2">📁 구조</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <h3 className="text-heading-5 mb-3">Foundations (기초)</h3>
            <ul className="space-y-2 text-body-sm">
              <li>• Colors - 컬러 팔레트 및 색상 토큰</li>
              <li>• Typography - 타이포그래피 스타일</li>
              <li>• Spacing & Sizing - 간격, border-radius, shadow</li>
            </ul>
          </Card>
          <Card className="p-6">
            <h3 className="text-heading-5 mb-3">Components (컴포넌트)</h3>
            <ul className="space-y-2 text-body-sm">
              <li>• Button, Card, Badge, Input, Progress</li>
              <li>• Container, PageHeader, Section</li>
              <li>• EmptyState, StatCard, FormField</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
};

const meta: Meta = {
  title: "Overview/Introduction",
  component: IntroductionPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      page: null,
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

