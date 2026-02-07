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
            bg: "from-red-50 to-red-100/50",
            border: "border-red-300",
            icon: "bg-red-500",
            text: "text-red-900",
            badge: "bg-red-500 text-white",
        },
        high: {
            bg: "from-orange-50 to-orange-100/50",
            border: "border-orange-300",
            icon: "bg-orange-500",
            text: "text-orange-900",
            badge: "bg-orange-500 text-white",
        },
        medium: {
            bg: "from-yellow-50 to-yellow-100/50",
            border: "border-yellow-300",
            icon: "bg-yellow-500",
            text: "text-yellow-900",
            badge: "bg-yellow-500 text-white",
        },
        low: {
            bg: "from-blue-50 to-blue-100/50",
            border: "border-blue-300",
            icon: "bg-blue-500",
            text: "text-blue-900",
            badge: "bg-blue-500 text-white",
        },
    };

    const config = severityConfig[severity];

    return (
        <div
            className={`max-w-3xl rounded-2xl shadow-2xl border-2 ${config.border} bg-gradient-to-br ${config.bg} overflow-hidden backdrop-blur-sm`}
        >
            <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                        <div
                            className={`${config.icon} p-3 rounded-xl shadow-lg flex-shrink-0`}
                        >
                            <AlertCircle
                                className="w-7 h-7 text-white"
                                strokeWidth={2.5}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h2
                                    className={`text-2xl font-black ${config.text} tracking-tight`}
                                >
                                    {errorType}
                                </h2>
                                <span
                                    className={`${config.badge} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide`}
                                >
                                    {severity}
                                </span>
                            </div>
                            <p className="text-gray-700 font-mono text-sm bg-white/60 px-3 py-2 rounded-lg border border-gray-300">
                                {detectedIn}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                <div className="mb-8 p-5 bg-white/70 border-2 border-gray-300 rounded-xl shadow-inner">
                    <p className="font-mono text-sm text-gray-900 leading-relaxed break-all">
                        {errorMessage}
                    </p>
                </div>

                {/* Possible Causes */}
                {possibleCauses.length > 0 && (
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Lightbulb
                                className="w-5 h-5 text-amber-600"
                                strokeWidth={2.5}
                            />
                            <h3 className="text-lg font-black text-gray-900 uppercase tracking-wide">
                                Possible Causes
                            </h3>
                        </div>
                        <div className="space-y-3">
                            {possibleCauses.map((cause, index) => (
                                <div
                                    key={index}
                                    className="bg-white/80 border-2 border-gray-300 rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer"
                                    onClick={() =>
                                        setExpandedCause(
                                            expandedCause === index
                                                ? null
                                                : index
                                        )
                                    }
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-7 h-7 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                                            <span className="text-white font-black text-sm">
                                                {index + 1}
                                            </span>
                                        </div>
                                        <p className="text-gray-800 font-medium leading-relaxed flex-1">
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
                        <div className="flex items-center gap-2 mb-4">
                            <Zap
                                className="w-5 h-5 text-green-600"
                                strokeWidth={2.5}
                            />
                            <h3 className="text-lg font-black text-gray-900 uppercase tracking-wide">
                                Quick Fixes
                            </h3>
                        </div>
                        <div className="space-y-3">
                            {quickFixes.map((fix, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4 hover:shadow-lg transition-all duration-200 group"
                                >
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2
                                            className="w-6 h-6 text-green-600 flex-shrink-0 group-hover:scale-110 transition-transform"
                                            strokeWidth={2.5}
                                        />
                                        <p className="text-gray-900 font-medium leading-relaxed">
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
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-4">
                <p className="text-gray-300 text-xs font-mono uppercase tracking-widest">
                    DevDebug AI • Powered by Tambo
                </p>
            </div>
        </div>
    );
}
