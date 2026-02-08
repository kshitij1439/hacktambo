"use client";

import { Check, Copy, X } from "lucide-react";
import { useState } from "react";

interface CodeDiffViewerProps {
    title?: string;
    beforeCode?: string;
    afterCode?: string;
    language?: string;
    fileName?: string;
}

export default function CodeDiffViewer({
    title = "Code Fix",
    beforeCode = "",
    afterCode = "",
    language = "javascript",
    fileName = "example.js",
}: CodeDiffViewerProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(afterCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const beforeLines = beforeCode.split("\n");
    const afterLines = afterCode.split("\n");

    return (
        <div className="max-w-5xl bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-white px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-gray-900 text-lg font-semibold">
                            {title}
                        </h3>
                        <p className="text-gray-500 text-sm font-mono mt-1">
                            {fileName}
                        </p>
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4" />
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4" />
                                Copy Fix
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Code Comparison */}
            <div className="grid md:grid-cols-2 divide-x divide-gray-200">
                {/* Before */}
                <div className="bg-gray-50">
                    <div className="bg-white px-6 py-3 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <X className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-700 font-medium text-sm">
                                Before
                            </span>
                        </div>
                    </div>
                    <div className="p-6 overflow-x-auto">
                        <pre className="text-sm">
                            {beforeLines.map((line, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 hover:bg-gray-100 transition-colors"
                                >
                                    <span className="text-gray-400 font-mono text-xs min-w-[2rem] text-right select-none">
                                        {index + 1}
                                    </span>
                                    <code className="text-gray-700 font-mono">
                                        {line || " "}
                                    </code>
                                </div>
                            ))}
                        </pre>
                    </div>
                </div>

                {/* After */}
                <div className="bg-white">
                    <div className="bg-white px-6 py-3 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-700 font-medium text-sm">
                                After
                            </span>
                        </div>
                    </div>
                    <div className="p-6 overflow-x-auto">
                        <pre className="text-sm">
                            {afterLines.map((line, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-gray-400 font-mono text-xs min-w-[2rem] text-right select-none">
                                        {index + 1}
                                    </span>
                                    <code className="text-gray-900 font-mono">
                                        {line || " "}
                                    </code>
                                </div>
                            ))}
                        </pre>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                <p className="text-gray-500 text-xs font-mono">
                    Language:{" "}
                    <span className="text-gray-900 font-medium">
                        {language}
                    </span>
                </p>
            </div>
        </div>
    );
}
