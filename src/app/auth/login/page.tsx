/* eslint-disable react/no-unescaped-entities */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schemas/authSchema";
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
import { Label } from "@/components/ui/label";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

function LoginPage() {

  type LoginSchema = z.infer<typeof loginSchema>;

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = (values:LoginSchema) => {
    console.log(values);
  };
  return (
    <section className="flex justify-center items-center h-[calc(100hv - 1rem)] ">
      <Card className = "container mx-auto border-none shadow-xl rounded-lg bg-white text-black w-full max-w-md p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold my-4">Login</CardTitle>
          <CardDescription className="font-medium text-gray-700">Enter your credentials to login</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormItem>
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <>
                      <FormLabel className="block text-sm font-medium text-gray-700">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 mt-1 text-xs"/>
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
                <FormDescription className= "mt-4 text-end hover:underline font-medium hover:text-blue-600">
                  <a href="/forgot-password">Forgot your password?</a>
                </FormDescription>
              </FormItem>
              <FormItem>
                <Button  type="submit" 
                className="w-full py-3 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Login</Button>
              </FormItem>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <CardDescription>
            Don't have an account? <a href="/auth/register" className="hover:underline text-blue-600 font-medium">Register</a>
          </CardDescription>
        </CardFooter>
      </Card>
    </section>
  );
}

export default LoginPage;
