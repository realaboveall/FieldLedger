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

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            product_name: "",
            amount: 0,
            goingfrom: "",
            goingto: ""
        },
    });

    const onSubmit = async (values) => {
        try {
            await uploadDetails(values);
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
    };

    return (
        <div>
            <div className="text-4xl font-bold mb-3">Product Details Form</div>
            <div className="flex">
                <div className="w-[40%] mt-3 border-2 rounded-lg px-10 mr-10">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-xl py-10">
                            <FormField
                                control={form.control}
                                name="product_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Product Name" type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enter Amount</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Amount" type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="goingfrom"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address of Going From</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Enter Address" className="resize-none" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="goingto"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Going To</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Going To" className="resize-none" {...field} />
                                        </FormControl>
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
