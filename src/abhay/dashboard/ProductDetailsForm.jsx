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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Chatbox from "@/ChatBox";
import { useUser } from "@/auth/UserContext";

// ✅ Validation schema
const formSchema = z.object({
    product_name: z.string().min(1, "Product name is required"),
    amount: z.coerce.number(),
    goingfrom: z.string().min(1, "Address is required"),
    goingto: z.string().min(1, "Address is required"),
});

export default function ProductDetailsForm() {
    const { uploadDetails } = useUser();

    const formSchema = z.object({
        product_name: z.string()
            .min(1, "Product name is required")
            .max(100, "Product name must be less than 100 characters"),

        product_description: z.string()
            .min(1, "Product description is required")
            .max(500, "Description must be less than 500 characters"),

        product_condition: z.string()
            .min(1, "Product condition is required")
            .max(300, "Condition details must be less than 300 characters"),

        product_amount: z.coerce.number()
            .min(1, "Amount must be at least 1 Kg")
            .max(10000, "Amount cannot exceed 10,000 Kg"),

        product_going_from: z.string()
            .min(1, "Starting location is required")
            .max(200, "Address is too long"),

        product_going_to: z.string()
            .min(1, "Destination is required")
            .max(200, "Address is too long"),

        product_extra_description: z.string()
            .max(300, "Extra details must be less than 300 characters")
            .optional()
    });



    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    
    function onSubmit(values) {
        try {
            console.log(values);
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            );
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }

    return (
        <div>
            <div className="text-4xl font-bold mb-3">Product Details Form</div>
            <div className="flex">
                <div className="w-[40%] mt-3 border-2 rounded-lg px-10 mr-10">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                            <FormField
                                control={form.control}
                                name="product_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Name of the Product" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>Enter the Name of the Product</FormDescription>
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
                                        <FormDescription>Enter Description of the product such as it's type</FormDescription>
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
                                        <FormDescription>Enter some details about the Product's Condition such as temperature</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="product_amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Amount of Product"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>Enter the amount of Product in Kg</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="product_going_from"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Going from</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter the Address"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>Address of the place the Product is departing from</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="product_going_to"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Going To</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter the Address"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>Enter the address of the place the Product is going to</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="product_extra_description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Any other Details</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter Extra Description"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>You can enter some details about the Product and how to handle it</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
                <div className="w-[40%] mt-3 border-2 rounded-lg flex justify-center items-center h-[80vh]">
                    <Chatbox />
                </div>
            </div>
        </div>
    );
}
