"use client";

import { Check, Copy, X } from "lucide-react";
import { useState } from "react";

const SCROLL_AREA_CLASSNAME =
    "p-6 overflow-x-auto " +
    "[&::-webkit-scrollbar:horizontal]:h-[10px] " +
    "[&::-webkit-scrollbar-track]:bg-slate-950/30 " +
    "[&::-webkit-scrollbar-thumb]:bg-slate-400/30 [&::-webkit-scrollbar-thumb]:rounded-full " +
    "[&::-webkit-scrollbar-thumb:hover]:bg-slate-400/50";

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
        <div className="max-w-5xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl overflow-hidden border-4 border-slate-700">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 border-b-4 border-slate-700">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-white text-xl font-black tracking-tight">
                            {title}
                        </h3>
                        <p className="text-indigo-200 text-sm font-mono mt-1">
                            {fileName}
                        </p>
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 font-bold border-2 border-white/30"
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4" />
                                Copied!
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
            <div className="grid md:grid-cols-2 divide-x-4 divide-slate-700">
                {/* Before */}
                <div className="bg-red-950/30">
                    <div className="bg-red-900/50 px-6 py-3 border-b-2 border-red-800/50">
                        <div className="flex items-center gap-2">
                            <X
                                className="w-5 h-5 text-red-400"
                                strokeWidth={3}
                            />
                            <span className="text-red-300 font-black text-sm uppercase tracking-wider">
                                Before (Broken)
                            </span>
                        </div>
                    </div>
                    <div className={SCROLL_AREA_CLASSNAME}>
                        <pre className="text-sm min-w-full w-max">
                            {beforeLines.map((line, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 hover:bg-red-900/20 transition-colors"
                                >
                                    <span className="text-red-500/60 font-mono text-xs min-w-[2rem] text-right select-none">
                                        {index + 1}
                                    </span>
                                    <code className="text-red-200 font-mono whitespace-pre">
                                        {line || " "}
                                    </code>
                                </div>
                            ))}
                        </pre>
                    </div>
                </div>

                {/* After */}
                <div className="bg-green-950/30">
                    <div className="bg-green-900/50 px-6 py-3 border-b-2 border-green-800/50">
                        <div className="flex items-center gap-2">
                            <Check
                                className="w-5 h-5 text-green-400"
                                strokeWidth={3}
                            />
                            <span className="text-green-300 font-black text-sm uppercase tracking-wider">
                                After (Fixed)
                            </span>
                        </div>
                    </div>
                    <div className={SCROLL_AREA_CLASSNAME}>
                        <pre className="text-sm min-w-full w-max">
                            {afterLines.map((line, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 hover:bg-green-900/20 transition-colors"
                                >
                                    <span className="text-green-500/60 font-mono text-xs min-w-[2rem] text-right select-none">
                                        {index + 1}
                                    </span>
                                    <code className="text-green-200 font-mono whitespace-pre">
                                        {line || " "}
                                    </code>
                                </div>
                            ))}
                        </pre>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-950 px-6 py-3 border-t-4 border-slate-700">
                <p className="text-slate-400 text-xs font-mono">
                    Language:{" "}
                    <span className="text-white font-bold">{language}</span>
                </p>
            </div>
        </div>
    );
}
