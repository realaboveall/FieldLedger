import { useUser } from '@/auth/UserContext';
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

function PreviousTransactions() {
    const { retrieveData } = useUser();
    const [products, setProducts] = useState([]); 

    useEffect(() => {
        console.log(products);
    }, [products]);

    useEffect(() => {
        async function retrieve() {
            try {
                const result = await retrieveData();
                setProducts(result); 
            } catch (error) {
                console.error("Error retrieving data:", error);
            }
        }
        retrieve();
    }, []);

    return (
        <div>
            <Table>
                <TableCaption>List of products.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead>To</TableHead>
                        <TableHead>Created At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.$id}>
                            <TableCell className="font-medium">{product.product_name}</TableCell>
                            <TableCell>{product.amount} kg</TableCell>
                            <TableCell>{product.goingfrom}</TableCell>
                            <TableCell>{product.goingto}</TableCell>
                            <TableCell>{new Date(product.$createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    {/* <TableRow>
                        <TableCell colSpan={4}>Total Amount</TableCell>
                        <TableCell className="text-right">
                            {products.reduce((sum, p) => sum + p.amount, 0)}
                        </TableCell>
                    </TableRow> */}
                </TableFooter>
            </Table>
        </div>
    );
}

export default PreviousTransactions;
