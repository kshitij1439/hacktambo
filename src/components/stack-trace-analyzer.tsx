"use client";

import { AlertOctagon, FileCode, Layers } from "lucide-react";
import { useState } from "react";

interface StackFrame {
    functionName: string;
    fileName: string;
    lineNumber: number;
    columnNumber?: number;
    isHighlighted?: boolean;
    context?: string;
}

interface StackTraceAnalyzerProps {
    errorMessage?: string;
    stackFrames?: StackFrame[];
    rootCause?: string;
}

export default function StackTraceAnalyzer({
    errorMessage = "An error occurred",
    stackFrames = [],
    rootCause,
}: StackTraceAnalyzerProps) {
    const [expandedFrame, setExpandedFrame] = useState<number | null>(0);

    return (
        <div className="max-w-5xl bg-gradient-to-br from-red-950 via-orange-950 to-yellow-950 rounded-2xl shadow-2xl overflow-hidden border-4 border-red-600">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-500 px-8 py-6">
                <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-xl shadow-lg">
                        <AlertOctagon
                            className="w-8 h-8 text-red-600"
                            strokeWidth={2.5}
                        />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-white text-3xl font-black mb-2 tracking-tight">
                            Stack Trace Analysis
                        </h2>
                        <div className="bg-red-900/50 border-2 border-red-400 rounded-lg px-4 py-3">
                            <p className="text-red-100 font-mono text-sm leading-relaxed">
                                {errorMessage}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Root Cause */}
            {rootCause && (
                <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 px-8 py-5 border-b-2 border-red-700">
                    <div className="flex items-start gap-3">
                        <Layers className="w-6 h-6 text-orange-300 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-orange-200 font-black text-sm uppercase tracking-wider mb-2">
                                Root Cause Identified
                            </h3>
                            <p className="text-orange-100 font-medium leading-relaxed">
                                {rootCause}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Stack Frames */}
            <div className="p-8 space-y-3">
                {stackFrames.map((frame, index) => {
                    const isExpanded = expandedFrame === index;
                    const isHighlighted = frame.isHighlighted;

                    return (
                        <div
                            key={index}
                            className={`rounded-xl overflow-hidden border-3 transition-all duration-300 ${
                                isHighlighted
                                    ? "border-yellow-500 bg-yellow-900/30"
                                    : "border-gray-700 bg-gray-900/50"
                            }`}
                        >
                            <button
                                onClick={() =>
                                    setExpandedFrame(isExpanded ? null : index)
                                }
                                className="w-full px-6 py-4 flex items-center gap-4 hover:bg-white/5 transition-colors"
                            >
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                                        isHighlighted
                                            ? "bg-yellow-500 text-yellow-950"
                                            : "bg-gray-700 text-gray-300"
                                    }`}
                                >
                                    {index + 1}
                                </div>

                                <div className="flex-1 text-left">
                                    <div className="flex items-center gap-2 mb-1">
                                        <FileCode
                                            className={`w-4 h-4 ${
                                                isHighlighted
                                                    ? "text-yellow-400"
                                                    : "text-gray-400"
                                            }`}
                                        />
                                        <span
                                            className={`font-mono font-bold ${
                                                isHighlighted
                                                    ? "text-yellow-200"
                                                    : "text-gray-300"
                                            }`}
                                        >
                                            {frame.functionName}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs">
                                        <span
                                            className={`font-mono ${
                                                isHighlighted
                                                    ? "text-yellow-300"
                                                    : "text-gray-400"
                                            }`}
                                        >
                                            {frame.fileName}
                                        </span>
                                        <span
                                            className={`px-2 py-1 rounded ${
                                                isHighlighted
                                                    ? "bg-yellow-500/30 text-yellow-200"
                                                    : "bg-gray-700 text-gray-400"
                                            } font-bold`}
                                        >
                                            Line {frame.lineNumber}
                                            {frame.columnNumber &&
                                                `:${frame.columnNumber}`}
                                        </span>
                                    </div>
                                </div>

                                {isHighlighted && (
                                    <div className="bg-yellow-500 text-yellow-950 px-3 py-1 rounded-full text-xs font-black uppercase">
                                        Error Origin
                                    </div>
                                )}
                            </button>

                            {isExpanded && frame.context && (
                                <div className="border-t-2 border-gray-700 bg-gray-950 px-6 py-4">
                                    <div className="mb-2">
                                        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                                            Context
                                        </span>
                                    </div>
                                    <pre className="font-mono text-sm text-gray-300 overflow-x-auto">
                                        {frame.context}
                                    </pre>
                                </div>
                            )}
                        </div>
                    );
                })}

                {stackFrames.length === 0 && (
                    <div className="text-center py-12">
                        <Layers className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 font-medium">
                            No stack trace available
                        </p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-gray-950 to-black px-8 py-4 border-t-4 border-red-900">
                <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">
                    Stack Trace Analyzer • DevDebug AI
                </p>
            </div>
        </div>
    );
}
