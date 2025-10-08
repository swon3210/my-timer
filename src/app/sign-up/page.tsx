"use client";

import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useSignUpMutation from "@/domains/users/signUp/useSignUpMutation";

type SignUpFormValues = {
  email: string;
  showPassword: boolean;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const { formState, register, watch, setValue, setError, handleSubmit } =
    useForm<SignUpFormValues>();

  const { mutateAsync: signUp } = useSignUpMutation();

  const showPassword = watch("showPassword");

  const router = useRouter();

  const togglePasswordVisibility = () =>
    setValue("showPassword", !showPassword);

  const handleFormSubmit = handleSubmit(async (formValues) => {
    if (formValues.password !== formValues.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "비밀번호가 일치하지 않습니다",
      });
      return;
    }

    try {
      await signUp({
        email: formValues.email,
        password: formValues.password,
      });
      toast("회원가입에 성공했습니다");
      router.replace("/sign-in");
    } catch (error) {
      toast("회원가입에 실패했습니다");
      throw error;
    }
  });

  return (
    <form
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 p-4"
      onSubmit={handleFormSubmit}
    >
      <Card className="w-full max-w-md backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-gray-900">
            회원가입
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            아래 정보를 입력하여 새 계정을 만드세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              이메일
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="hello@example.com"
              className="text-gray-900"
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
            <Label htmlFor="password" className="text-gray-700">
              비밀번호
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                className="text-gray-900"
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
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                {...register("showPassword")}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-700">
              비밀번호 확인
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              className={`text-gray-900 ${
                formState.errors.confirmPassword && "border-red-500"
              }`}
              {...register("confirmPassword")}
            />
            {formState.errors.confirmPassword?.message && (
              <p className="text-red-600 text-sm mt-1">
                {formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            가입하기
          </Button>
        </CardFooter>
        <div className="text-center text-sm text-gray-600 mt-4 mb-6">
          이미 계정이 있으신가요?{" "}
          <Link href="/sign-in" className="text-orange-600 hover:underline">
            로그인
          </Link>
        </div>
      </Card>
    </form>
  );
}
