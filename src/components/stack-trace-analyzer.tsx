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
        <div className="max-w-5xl bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-white px-6 py-5 border-b border-gray-200">
                <div className="flex items-start gap-4">
                    <div className="bg-gray-100 p-2.5 rounded-lg border border-gray-200">
                        <AlertOctagon className="w-6 h-6 text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-gray-900 text-2xl font-semibold mb-2">
                            Stack Trace Analysis
                        </h2>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                            <p className="text-gray-700 font-mono text-sm leading-relaxed">
                                {errorMessage}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Root Cause */}
            {rootCause && (
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-start gap-3">
                        <Layers className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-gray-900 font-medium text-sm mb-1">
                                Root Cause Identified
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {rootCause}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Stack Frames */}
            <div className="p-6 space-y-2">
                {stackFrames.map((frame, index) => {
                    const isExpanded = expandedFrame === index;
                    const isHighlighted = frame.isHighlighted;

                    return (
                        <div
                            key={index}
                            className={`rounded-lg overflow-hidden border transition-all ${
                                isHighlighted
                                    ? "border-gray-900 bg-gray-50"
                                    : "border-gray-200 bg-white"
                            }`}
                        >
                            <button
                                onClick={() =>
                                    setExpandedFrame(isExpanded ? null : index)
                                }
                                className="w-full px-5 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                            >
                                <div
                                    className={`w-7 h-7 rounded-full flex items-center justify-center font-medium text-sm ${
                                        isHighlighted
                                            ? "bg-gray-900 text-white"
                                            : "bg-gray-200 text-gray-700"
                                    }`}
                                >
                                    {index + 1}
                                </div>

                                <div className="flex-1 text-left">
                                    <div className="flex items-center gap-2 mb-1">
                                        <FileCode className="w-4 h-4 text-gray-600" />
                                        <span className="font-mono font-medium text-gray-900">
                                            {frame.functionName}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs">
                                        <span className="font-mono text-gray-600">
                                            {frame.fileName}
                                        </span>
                                        <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 font-medium border border-gray-200">
                                            Line {frame.lineNumber}
                                            {frame.columnNumber &&
                                                `:${frame.columnNumber}`}
                                        </span>
                                    </div>
                                </div>

                                {isHighlighted && (
                                    <div className="bg-gray-900 text-white px-3 py-1 rounded-md text-xs font-medium">
                                        Error Origin
                                    </div>
                                )}
                            </button>

                            {isExpanded && frame.context && (
                                <div className="border-t border-gray-200 bg-gray-50 px-5 py-4">
                                    <div className="mb-2">
                                        <span className="text-gray-600 text-xs font-medium">
                                            Context
                                        </span>
                                    </div>
                                    <pre className="font-mono text-sm text-gray-900 overflow-x-auto">
                                        {frame.context}
                                    </pre>
                                </div>
                            )}
                        </div>
                    );
                })}

                {stackFrames.length === 0 && (
                    <div className="text-center py-12">
                        <Layers className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">
                            No stack trace available
                        </p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                <p className="text-gray-500 text-xs font-mono">
                    Stack Trace Analyzer
                </p>
            </div>
        </div>
    );
}