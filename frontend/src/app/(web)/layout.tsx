import TopMenu from "@/components/Topmenu";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <TopMenu />
            {children}
        </>
    );
}