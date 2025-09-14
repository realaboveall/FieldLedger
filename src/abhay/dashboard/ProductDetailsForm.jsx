import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
import {Input} from "@/abhay/dashboard/Inputnew"
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Chatbox from "@/ChatBox";
import { useUser } from "@/auth/UserContext";
import { functions } from "@/auth/appwriteConfig";
import { ExecutionMethod } from "appwrite";
import { useState } from "react";

// ✅ Schema with validations and warnings
const formSchema = z.object({
  product_name: z.string().min(1, "Product name is required"),
  product_description: z.string().min(1, "Product description is required"),
  product_condition: z.string().min(1, "Product condition is required"),
  product_amount: z.coerce.number().min(1, "Amount must be at least 1 Kg"),
  product_going_from: z.string().min(1, "Starting location is required"),
  product_going_to: z.string().min(1, "Destination is required"),
  product_extra_description: z.string().optional(),
});

export default function ProductDetailsForm() {
  const { uploadDetails } = useUser();
  const [cid, setCid] = useState(null);
  const [qr, setQr] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values) {
    try {
      console.log("📤 Submitting form:", values);

      // 🔹 1. Send to backend function for Pinata
      const execution = await functions.createExecution({
        functionId: import.meta.env.VITE_APPWRITE_CHATGPT_FUNCTION_ID,
        body: JSON.stringify({
          mode: "form_register",
          product: {
            name: values.product_name,
            description: values.product_description,
            condition: values.product_condition,
            amount: values.product_amount,
            origin: values.product_going_from,
            destination: values.product_going_to,
            extra: values.product_extra_description,
          },
        }),
        async: false,
        path: `/`,
        method: ExecutionMethod.POST,
        headers: { "Content-Type": "application/json" },
      });

      const outer = JSON.parse(execution.responseBody || "{}");
      const inner = JSON.parse(outer.response || "{}");

      if (inner.cid) {
        setCid(inner.cid);
        setQr(inner.qrDataUrl);
        toast.success(`✅ Product stored on Pinata. CID: ${inner.cid}`);

        // 🔹 2. Save to Appwrite DB with CID included
        await uploadDetails({
          ...values,
          cid: inner.cid,
        });
      } else {
        toast.error(inner.reply?.content || "❌ Failed to store on Pinata");
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }
  return (
    <div className="">
      <div className="text-4xl font-bold mb-3 ">Product Details Form</div>
      <div className="flex">
        {/* Left side: Form */}
        <div className="w-[60%] mt-3 h-[80vh] overflow-y-scroll border-2 rounded-lg px-10 mr-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 max-w-3xl mx-auto py-10">
              <FormField
                control={form.control}
                name="product_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Name of the Product" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Potato">Potato</SelectItem>
                        <SelectItem value="Tomato">Tomato</SelectItem>
                        <SelectItem value="Onion">Onion</SelectItem>
                        <SelectItem value="Capsicum">Capsicum</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Enter the Name of the Product
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="product_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Type/variety of the product
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="product_condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Condition</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Details"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Condition (temperature, handling, etc.)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="product_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (Kg)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Amount of Product"
                        type="number"
                        {...field}
                      />
                      {/* <Textarea
                        placeholder="Amount of Product"
                        className="resize-none"
                        type="number"
                        {...field}
                      /> */}
                    </FormControl>
                    <FormDescription>Enter amount in kilograms</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="product_going_from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the Address"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Where is it departing from?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="product_going_to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the Address"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Where is it going?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="product_extra_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Any Other Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Extra Description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Optional extra details</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>

              {cid && (
                <div className="mt-6 p-4 border rounded-lg bg-gray-100">
                  <p className="font-semibold">✅ Stored on Pinata</p>
                  <p>
                    <strong>CID:</strong> {cid}
                  </p>
                  {qr && (
                    <img src={qr} alt="QR Code" className="w-32 h-32 mt-2" />
                  )}
                </div>
              )}
            </form>
          </Form>
        </div>

        {/* Right side: Chatbox */}
        <div className="w-[40%] mt-3 border-2 rounded-lg flex justify-center items-center h-[75vh] p-6 py-6">
          <Chatbox />
        </div>
      </div>
    </div>
  );
}
