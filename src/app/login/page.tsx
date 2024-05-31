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
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to login</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormItem>
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </>
                )}
              />
            </FormItem>
            <FormItem>
              <FormDescription>
                <a href="/forgot-password">Forgot your password?</a>
              </FormDescription>
            </FormItem>
            <FormItem>
              <Button type="submit">Login</Button>
            </FormItem>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <CardDescription>
          Don't have an account? <a href="/register">Register</a>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

export default LoginPage;
