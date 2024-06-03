/* eslint-disable react/no-unescaped-entities */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/schemas/authSchema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {useRouter} from "next/navigation"

function RegisterPage() {
  type registerSchema = z.infer<typeof registerSchema>;

  const form = useForm<registerSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name:"",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter()
  const { handleSubmit, control, reset } = form;

  const onSubmit = async (values: registerSchema) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(res.ok){
      router.push("/auth/login")
    }
    const resJSON = await res.json();
    reset()
    
  };
  return (
    <section className="flex justify-center items-center h-[calc(100hv - 4rem)] ">
      <Card className="container mx-auto border-none shadow-xl rounded-lg bg-white text-black w-full max-w-md p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold my-4">
            Register Page
          </CardTitle>
          <CardDescription className="font-medium text-gray-700">
            We're glad you're here! Please register on our page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormItem>
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <>
                      <FormLabel className="block text-sm font-medium text-gray-700">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="string"
                          placeholder="Enter your name"
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
                      <FormLabel className="block text-sm font-medium text-gray-700">
                        Password
                      </FormLabel>
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
                <FormField
                  control={control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <>
                      <FormLabel className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm your password"
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
                <Button
                  type="submit"
                  className="w-full py-3 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Register
                </Button>
              </FormItem>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center mt-4">
          <CardDescription className="text-gray-600 text-sm">
            By registering, you agree to our{" "}
            <a href="/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="/terms-of-service"
              className="text-blue-600 hover:underline"
            >
              Terms of Service
            </a>
            . Your information is safe with us.
          </CardDescription>
        </CardFooter>
      </Card>
    </section>
  );
}

export default RegisterPage;
