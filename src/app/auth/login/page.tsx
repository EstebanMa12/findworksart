/* eslint-disable react/no-unescaped-entities */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schemas/authSchema";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Link from "next/link"
function LoginPage() {
  type LoginSchema = z.infer<typeof loginSchema>;

  const router = useRouter()
  const [error, setError] = useState(null as String | null)

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (values: LoginSchema) => {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false
    })
    if (res?.error){
      setError(res.error)
    }else{
      router.push("/search")
      router.refresh()
    }
  };
  return (
    <section className="h-[calc(100vh-2rem)] flex justify-center items-center p-6 ">
      <Card className="container mx-auto border-none shadow-xl rounded-lg bg-white text-black w-full  max-w-md p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold my-4">Login</CardTitle>
          <CardDescription className="font-medium text-gray-700">
            Enter your credentials to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {
                error &&(
                  <p className="bg-red-500 text-md text-white p-3 rounded text-center">{error}</p>
                )
              }
              <FormItem>
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <>
                      <FormLabel className="block text-sm font-medium text-gray-700">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 mt-1 text-xs" />
                    </>
                  )}
                />
              </FormItem>
              <FormItem>
                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 mt-1 text-xs" />
                    </>
                  )}
                />
              </FormItem>
              <FormItem>
                <FormDescription className="mt-4 text-end hover:underline font-medium hover:text-blue-600">
                  <Link href="/forgot-password">Forgot your password?</Link>
                </FormDescription>
              </FormItem>
              <FormItem>
                <Button
                  type="submit"
                  className="w-full py-3 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Login
                </Button>
              </FormItem>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <CardDescription>
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="hover:underline text-blue-600 font-medium"
            >
              Register
            </Link>
          </CardDescription>
        </CardFooter>
      </Card>
    </section>
  );
}

export default LoginPage;
