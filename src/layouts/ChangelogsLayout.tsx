import { createContext, ReactElement, useEffect, useRef, useState } from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import TableOfContents from "../components/sidebar/TableOfContents";
import { ChangelogRoot } from "../features/changelogs/changelog.types";

export const ChangelogsContext = createContext(null);


export default function ChangelogsLayout(page: ReactElement) {
    const pageRef = useRef(page);
    const [changelogs, setChangelogs] = useState<ChangelogRoot[]>([]);

    useEffect(() => {
        console.log('RENDER');
    }, [page])


    return (
        <ChangelogsContext.Provider value={{
            changelogs,
            setChangelogs
          }}>
            <main className="flex flex-col h-screen">
                <Header />

                <div className="flex flex-1 overflow-hidden">
                    <div className="flex bg-gray-100 w-32 p-4">
                        <TableOfContents page={page} />
                    </div>
                    <div className="flex flex-1 flex-col">
                        <div className="flex flex-1 bg-blue-300 overflow-y-auto paragraph px-4">
                            {page}
                        </div>
                    </div>
                </div>

                <Footer />
            </main></ChangelogsContext.Provider>)
}