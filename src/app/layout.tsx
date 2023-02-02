import { ThemeProvider } from "next-themes";
import StoreProvider from "../providers/storeprovider";

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en">
            <body>
                <StoreProvider>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </StoreProvider>
            </body>
        </html>
    );
}