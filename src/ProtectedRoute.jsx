// ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@/auth/UserContext';
import { Spinner } from '@/components/ui/shadcn-io/spinner/index';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useUser();

    useEffect(()=>{console.log(user)},[user])

    if (loading && !user) {
        return (
            <div className='h-[100vh] w-full flex justify-center items-center '>
                <Spinner variant="circle" size={50}/>
            </div>
        );
    }

    if (!user && !loading) {
        return (<Navigate to="/login" replace />);
    }
    return children;
};

export default ProtectedRoute;
