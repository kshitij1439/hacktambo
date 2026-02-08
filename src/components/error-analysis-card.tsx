"use client";

import { AlertCircle, CheckCircle2, Lightbulb, Zap } from "lucide-react";
import { useState } from "react";

interface ErrorAnalysisCardProps {
    errorType?: string;
    severity?: "critical" | "high" | "medium" | "low";
    errorMessage?: string;
    possibleCauses?: string[];
    quickFixes?: string[];
    detectedIn?: string;
}

export default function ErrorAnalysisCard({
    errorType = "Unknown Error",
    severity = "medium",
    errorMessage = "An error occurred",
    possibleCauses = [],
    quickFixes = [],
    detectedIn = "Unknown file",
}: ErrorAnalysisCardProps) {
    const [expandedCause, setExpandedCause] = useState<number | null>(null);

    const severityConfig = {
        critical: {
            bg: "bg-gray-900",
            border: "border-gray-900",
            badge: "bg-gray-900 text-white",
        },
        high: {
            bg: "bg-gray-800",
            border: "border-gray-800",
            badge: "bg-gray-800 text-white",
        },
        medium: {
            bg: "bg-gray-700",
            border: "border-gray-700",
            badge: "bg-gray-700 text-white",
        },
        low: {
            bg: "bg-gray-600",
            border: "border-gray-600",
            badge: "bg-gray-600 text-white",
        },
    };

    const config = severityConfig[severity];

    return (
        <div className="max-w-3xl rounded-lg shadow-sm border border-gray-200 bg-white overflow-hidden">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                        <div
                            className={`${config.bg} p-2.5 rounded-lg flex-shrink-0`}
                        >
                            <AlertCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {errorType}
                                </h2>
                                <span
                                    className={`${config.badge} px-2.5 py-1 rounded-md text-xs font-medium`}
                                >
                                    {severity}
                                </span>
                            </div>
                            <p className="text-gray-600 font-mono text-sm bg-gray-50 px-3 py-2 rounded-md border border-gray-200">
                                {detectedIn}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="font-mono text-sm text-gray-900 leading-relaxed break-all">
                        {errorMessage}
                    </p>
                </div>

                {/* Possible Causes */}
                {possibleCauses.length > 0 && (
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="w-4 h-4 text-gray-700" />
                            <h3 className="text-sm font-medium text-gray-900">
                                Possible Causes
                            </h3>
                        </div>
                        <div className="space-y-2">
                            {possibleCauses.map((cause, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors cursor-pointer"
                                    onClick={() =>
                                        setExpandedCause(
                                            expandedCause === index
                                                ? null
                                                : index
                                        )
                                    }
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-medium text-xs">
                                                {index + 1}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 text-sm leading-relaxed flex-1">
                                            {cause}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quick Fixes */}
                {quickFixes.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Zap className="w-4 h-4 text-gray-700" />
                            <h3 className="text-sm font-medium text-gray-900">
                                Quick Fixes
                            </h3>
                        </div>
                        <div className="space-y-2">
                            {quickFixes.map((fix, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors group"
                                >
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-gray-700 flex-shrink-0 group-hover:text-gray-900 transition-colors" />
                                        <p className="text-gray-700 text-sm leading-relaxed">
                                            {fix}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                <p className="text-gray-500 text-xs font-mono">DevDebug AI</p>
            </div>
        </div>
    );
}
