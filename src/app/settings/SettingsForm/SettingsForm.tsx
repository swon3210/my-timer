"use client";

import { Eye, Timer } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { ForwardedRef, forwardRef, useEffect } from "react";
import { AppSettings, appSettingsSchema } from "@/lib/types";
import { useSaveAppSettingsMutation } from "@/lib/mutations";
import { debounce } from "lodash";
import { useSettingsSuspenseQuery } from "@/domains/users/useSettingsQuery";

const SettingItem = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center justify-between py-4">
    <div className="flex items-center space-x-3">
      {icon}
      <span className="text-base font-medium">{title}</span>
    </div>
    {children}
  </div>
);

const _InputSettingItem = (
  {
    icon,
    title,
    ...inputProps
  }: {
    icon: React.ReactNode;
    title: string;
  } & React.InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <div className="flex justify-between items-center py-4 gap-3">
      <div className="flex items-center space-x-3 mb-2">
        {icon}
        <Label htmlFor={title.toLowerCase()} className="text-base font-medium">
          {title}
        </Label>
      </div>
      <Input
        ref={ref}
        id={title.toLowerCase()}
        className="mt-1 basis-24"
        {...inputProps}
      />
    </div>
  );
};

const InputSettingItem = forwardRef(_InputSettingItem);

type SettingsFormValues = AppSettings;

export default function SettingsForm() {
  const { data: appSettings } = useSettingsSuspenseQuery();

  const { mutateAsync: saveAppSettings } = useSaveAppSettingsMutation();

  const { control, register, watch } = useForm<SettingsFormValues>({
    defaultValues: appSettings,
  });

  useEffect(() => {
    const debouncedSaveAppSettings = debounce(saveAppSettings, 300);

    const subscription = watch((value) => {
      const { data: newAppSettings } = appSettingsSchema.safeParse(value);

      if (!newAppSettings) {
        return;
      }

      debouncedSaveAppSettings(newAppSettings);
    });

    return () => subscription.unsubscribe();
  }, [watch, saveAppSettings]);

  return (
    <form className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      <SettingItem
        icon={<Eye className="h-6 w-6 text-primary" />}
        title="타이머 노출"
      >
        <Controller
          name="shouldExposeTimer"
          control={control}
          render={({ field }) => (
            <Switch
              id="shouldExposeTimer"
              checked={field.value}
              onCheckedChange={(value) => field.onChange(value)}
            />
          )}
        />
      </SettingItem>

      <Separator />

      <InputSettingItem
        icon={<Timer className="h-6 w-6 text-primary" />}
        title="기준시간 (초)"
        type="number"
        placeholder="초 단위로 입력해주세요"
        min={1}
        max={60}
        {...register("tickSeconds", {
          valueAsNumber: true,
        })}
      />

      {/* <Separator />

      <SettingItem
        icon={<Music className="h-6 w-6 text-primary" />}
        title="배경음악"
      >
        <Controller
          name="selectedBGM"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="음악을 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">전체 공개</SelectItem>
                <SelectItem value="friends">친구만</SelectItem>
                <SelectItem value="private">비공개</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </SettingItem>

      <Separator />

      <SettingItem
        icon={<Music4 className="h-6 w-6 text-primary" />}
        title="음성"
      >
        <Controller
          name="selectedVoice"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="음성을 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">전체 공개</SelectItem>
                <SelectItem value="friends">친구만</SelectItem>
                <SelectItem value="private">비공개</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </SettingItem>

      <Separator /> /*}

      {/* <SettingItem
          icon={<Lock className="h-6 w-6 text-primary" />}
          title="보안"
        >
          <Button variant="ghost" size="sm" className="font-normal">
            비밀번호 변경
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </SettingItem> */}
    </form>
  );
}
