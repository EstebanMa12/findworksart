/* eslint-disable react/no-unescaped-entities */
"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {loginSchema} from "@/schemas/authSchema";
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to login</CardDescription>
      </CardHeader>
      <CardContent>
        <Form>
          <FormItem>
            <FormField>
              <FormLabel>
                <Label>Email</Label>
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" />
              </FormControl>
            </FormField>
          </FormItem>
          <FormItem>
            <FormField>
              <FormLabel>
                <Label>Password</Label>
              </FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" />
              </FormControl>
            </FormField>
          </FormItem>
          <FormItem>
            <FormDescription>
              <FormMessage>Forgot your password?</FormMessage>
            </FormDescription>
          </FormItem>
          <FormItem>
            <Button type="submit">Login</Button>
          </FormItem>
        </Form>
      </CardContent>
      <CardFooter>
        <CardDescription>
          {" "}
          Don't have an account? <a href="/register">Register</a>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

export default LoginPage;
