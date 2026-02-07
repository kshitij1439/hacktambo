"use client";

import { Check, ChevronRight, Circle, Terminal } from "lucide-react";
import { useState } from "react";

interface Step {
    title: string;
    description: string;
    command?: string;
    code?: string;
}

interface StepByStepFixProps {
    title?: string;
    steps?: Step[];
    estimatedTime?: string;
}

export default function StepByStepFix({
    title = "Fix Walkthrough",
    steps = [],
    estimatedTime = "5 min",
}: StepByStepFixProps) {
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(
        new Set()
    );
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const toggleStep = (index: number) => {
        const newCompleted = new Set(completedSteps);
        if (newCompleted.has(index)) {
            newCompleted.delete(index);
        } else {
            newCompleted.add(index);
        }
        setCompletedSteps(newCompleted);
    };

    const copyCommand = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const progress = (completedSteps.size / steps.length) * 100;

    return (
        <div className="max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-cyan-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 px-8 py-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-white text-3xl font-black mb-2 tracking-tight">
                            {title}
                        </h2>
                        <div className="flex items-center gap-4">
                            <span className="text-cyan-100 font-bold text-sm">
                                {steps.length} steps
                            </span>
                            <span className="text-cyan-100 font-bold text-sm">
                                ⏱ {estimatedTime}
                            </span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-white text-4xl font-black">
                            {completedSteps.size}/{steps.length}
                        </div>
                        <div className="text-cyan-100 text-xs font-bold uppercase tracking-wider">
                            Complete
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6 bg-white/20 rounded-full h-3 overflow-hidden">
                    <div
                        className="bg-white h-full transition-all duration-500 ease-out rounded-full shadow-lg"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Steps */}
            <div className="p-8 space-y-6">
                {steps.map((step, index) => {
                    const isCompleted = completedSteps.has(index);
                    const isCopied = copiedIndex === index;

                    return (
                        <div
                            key={index}
                            className={`border-3 rounded-2xl overflow-hidden transition-all duration-300 ${
                                isCompleted
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-300 bg-white hover:border-cyan-400"
                            }`}
                        >
                            <div className="p-6">
                                {/* Step Header */}
                                <div className="flex items-start gap-4 mb-4">
                                    <button
                                        onClick={() => toggleStep(index)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-3 transition-all duration-300 shadow-lg ${
                                            isCompleted
                                                ? "bg-green-500 border-green-600"
                                                : "bg-white border-gray-300 hover:border-cyan-500"
                                        }`}
                                    >
                                        {isCompleted ? (
                                            <Check
                                                className="w-6 h-6 text-white"
                                                strokeWidth={3}
                                            />
                                        ) : (
                                            <Circle className="w-5 h-5 text-gray-400" />
                                        )}
                                    </button>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-black uppercase">
                                                Step {index + 1}
                                            </span>
                                            <h3 className="text-xl font-black text-gray-900">
                                                {step.title}
                                            </h3>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed font-medium">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Command */}
                                {step.command && (
                                    <div className="mt-4 bg-gray-900 rounded-xl p-4 border-2 border-gray-700">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Terminal className="w-4 h-4 text-green-400" />
                                                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                                                    Terminal
                                                </span>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    copyCommand(
                                                        step.command!,
                                                        index
                                                    )
                                                }
                                                className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded font-bold transition-colors"
                                            >
                                                {isCopied ? "✓ Copied" : "Copy"}
                                            </button>
                                        </div>
                                        <code className="text-green-400 font-mono text-sm block">
                                            {step.command}
                                        </code>
                                    </div>
                                )}

                                {/* Code */}
                                {step.code && (
                                    <div className="mt-4 bg-indigo-950 rounded-xl p-4 border-2 border-indigo-800">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-indigo-300 text-xs font-bold uppercase tracking-wider">
                                                Code
                                            </span>
                                            <button
                                                onClick={() =>
                                                    copyCommand(
                                                        step.code!,
                                                        index
                                                    )
                                                }
                                                className="text-xs bg-indigo-700 hover:bg-indigo-600 text-white px-3 py-1 rounded font-bold transition-colors"
                                            >
                                                {isCopied ? "✓ Copied" : "Copy"}
                                            </button>
                                        </div>
                                        <pre className="text-indigo-200 font-mono text-sm overflow-x-auto">
                                            {step.code}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            {completedSteps.size === steps.length && steps.length > 0 && (
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-6 border-t-4 border-green-600">
                    <div className="flex items-center gap-4">
                        <div className="bg-white rounded-full p-3">
                            <Check
                                className="w-8 h-8 text-green-600"
                                strokeWidth={3}
                            />
                        </div>
                        <div>
                            <h4 className="text-white text-2xl font-black">
                                All Done! 🎉
                            </h4>
                            <p className="text-green-100 font-medium">
                                Your issue should now be resolved. Test your
                                application!
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
