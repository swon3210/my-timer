"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";

type SignInFormValues = {
  email: string;
  showPassword: boolean;
  password: string;
};

const requestSignIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post("/api/auth/sign-in", { email, password });

  return response.data;
};

export default function SignInPage() {
  const { register, watch, setValue, handleSubmit } =
    useForm<SignInFormValues>();

  const showPassword = watch("showPassword");

  const router = useRouter();

  const togglePasswordVisibility = () =>
    setValue("showPassword", !showPassword);

  const handleFormSubmit = handleSubmit(async (formValues) => {
    try {
      await requestSignIn({
        email: formValues.email,
        password: formValues.password,
      });
      toast("로그인에 성공했습니다", {
        style: {
          textAlign: "center",
        },
      });
      router.replace("/home");
    } catch (error) {
      toast("로그인에 실패했습니다", {
        style: {
          textAlign: "center",
        },
      });
      throw error;
    }
  });

  return (
    <form
      className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center p-4"
      onSubmit={handleFormSubmit}
    >
      <Card className="w-full max-w-lg shadow-xl backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgb(249, 115, 22)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            로그인
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            계정에 로그인하여 시작하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              이메일
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="w-full"
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "올바른 이메일 주소를 입력해주세요",
                },
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              비밀번호
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full pr-10"
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                  minLength: {
                    value: 6,
                    message: "비밀번호는 6자 이상이어야 합니다",
                  },
                  maxLength: {
                    value: 20,
                    message: "비밀번호는 20자 이하여야 합니다",
                  },
                })}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={togglePasswordVisibility}
                aria-label={
                  showPassword ? "비밀번호 숨기기" : "비밀번호 보이기"
                }
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4 text-gray-500" />
                ) : (
                  <EyeIcon className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            로그인
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-4">
            계정이 없으신가요?{" "}
            <Link
              href="/sign-up"
              className="text-orange-600 hover:text-orange-700 hover:underline"
            >
              회원가입
            </Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
}
