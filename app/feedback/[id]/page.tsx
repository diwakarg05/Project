"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const formSchema = z.object({
  technicalScore: z.coerce.number().min(1).max(5),
  communicationScore: z.coerce.number().min(1).max(5),
  problemSolvingScore: z.coerce.number().min(1).max(5),
  recommendation: z.enum(["hire", "consider", "reject"]),
  comments: z.string().min(10, {
    message: "Comments must be at least 10 characters",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function FeedbackPage() {
  const { id } = useParams();
  const interviewId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      technicalScore: 3,
      communicationScore: 3,
      problemSolvingScore: 3,
      recommendation: "consider",
      comments: "",
    },
  });

  function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(true);
      
      // In a real app, you would make an API call to save the feedback
      console.log("Feedback submitted:", values);
    }, 1500);
  }

  const handleConfirmation = () => {
    toast.success("Feedback submitted successfully");
    router.push("/dashboard");
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Submit Feedback</h1>
        <p className="text-muted-foreground">Provide detailed feedback for the interview</p>
      </div>
      
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Interview Evaluation</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="technicalScore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technical Skills</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={5}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Rate from 1 to 5
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="communicationScore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Communication</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={5}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Rate from 1 to 5
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="problemSolvingScore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Problem Solving</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={5}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Rate from 1 to 5
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="recommendation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recommendation</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="hire" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Hire - Strong candidate that should move forward
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="consider" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Consider - Has potential but some concerns
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="reject" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Reject - Not a good fit for this role
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed Feedback</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide detailed comments about the candidate's performance..."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Include specific examples and areas for improvement
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </form>
          </Form>
          
          <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Feedback Submitted</AlertDialogTitle>
                <AlertDialogDescription>
                  Your feedback has been submitted successfully. The candidate will not see this feedback directly.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={handleConfirmation}>
                  Return to Dashboard
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </MainLayout>
  );
}