'use client'
import React from 'react'
import { ConfigProvider } from 'antd';
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { usePathname } from 'next/navigation';

export default function LayoutComponent({children}) {
    const path = usePathname();
  return (
        <ConfigProvider
          theme={{
              token: {
                  // Verde Token
                  colorPrimary: '#09A603',
                  borderRadius: 2,

                  // Alias Token
                  colorBgContainer: '#f6ffed',
              },
              }}
        >
           {!path.includes('/admin') ? (
            <>
                <Navbar />
                {children}
                <Footer />
            </>
            ) : (
                <>{children}</>
            )}
          
        </ConfigProvider>
  )
}
