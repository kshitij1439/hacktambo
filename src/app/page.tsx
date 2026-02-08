import { ApiKeyCheck } from "@/components/ApiKeyCheck";
import Image from "next/image";

const KeyFilesSection = () => (
    <div className="bg-white px-8 py-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">How it works</h2>
        <ul className="space-y-3 text-gray-600 text-sm">
            <li>
                📄 <code className="font-mono">src/app/chat/page.tsx</code> –
                Main DevDebug AI interface
            </li>
            <li>
                📄 <code className="font-mono">src/lib/tambo.ts</code> – Tambo
                component & tool registration
            </li>
            <li>
                📄 <code className="font-mono">src/components/</code> –
                Generative UI components
            </li>
            <li>
                📄 <code className="font-mono">README.md</code> – Project
                overview & architecture
            </li>
        </ul>

        <div className="flex gap-4 flex-wrap mt-6">
            <a
                href="https://docs.tambo.co"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-md border hover:bg-gray-50"
            >
                Tambo Docs
            </a>
            <a
                href="https://tambo.co/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-md border hover:bg-gray-50"
            >
                Tambo Dashboard
            </a>
        </div>
    </div>
);

export default function Home() {
    return (
        <div className="min-h-screen p-8 flex items-center justify-center font-[family-name:var(--font-geist-sans)] bg-gray-50">
            <main className="max-w-3xl w-full space-y-10">
                {/* Hero Section */}
                <div className="flex flex-col items-center text-center space-y-4">
                    <a
                        href="https://tambo.co"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            src="/Octo-Icon.svg"
                            alt="Tambo AI Logo"
                            width={72}
                            height={72}
                        />
                    </a>

                    <h1 className="text-4xl font-bold">DevDebug AI</h1>

                    <p className="text-gray-600 max-w-xl">
                        An intelligent debugging assistant powered by Tambo that
                        adapts its UI based on your error—showing code diffs,
                        stack traces, dependency trees, and step-by-step fixes
                        in real time.
                    </p>
                </div>

                {/* CTA Section */}
                <div className="bg-white px-8 py-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">
                        Start Debugging
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Paste an error and get a context-aware debugging
                        interface instead of a static chat response.
                    </p>

                    <ApiKeyCheck>
                        <a
                            href="/chat"
                            className="inline-block px-6 py-3 rounded-md font-medium text-lg bg-[#7FFFC3] hover:bg-[#72e6b0] text-gray-800"
                        >
                            Open DevDebug AI →
                        </a>
                    </ApiKeyCheck>
                </div>

                {/* How it works */}
                <KeyFilesSection />
            </main>
        </div>
    );
}
