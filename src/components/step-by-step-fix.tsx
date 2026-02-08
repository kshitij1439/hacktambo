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
        <div className="max-w-4xl bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-white px-6 py-5 border-b border-gray-200">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-gray-900 text-2xl font-semibold mb-2">
                            {title}
                        </h2>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{steps.length} steps</span>
                            <span>⏱ {estimatedTime}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-gray-900 text-3xl font-semibold">
                            {completedSteps.size}/{steps.length}
                        </div>
                        <div className="text-gray-500 text-xs font-medium">
                            Complete
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-5 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-gray-900 h-full transition-all duration-500 ease-out rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Steps */}
            <div className="p-6 space-y-4">
                {steps.map((step, index) => {
                    const isCompleted = completedSteps.has(index);
                    const isCopied = copiedIndex === index;

                    return (
                        <div
                            key={index}
                            className={`border rounded-lg overflow-hidden transition-all ${
                                isCompleted
                                    ? "border-gray-900 bg-gray-50"
                                    : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                        >
                            <div className="p-5">
                                {/* Step Header */}
                                <div className="flex items-start gap-4 mb-4">
                                    <button
                                        onClick={() => toggleStep(index)}
                                        className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border transition-all ${
                                            isCompleted
                                                ? "bg-gray-900 border-gray-900"
                                                : "bg-white border-gray-300 hover:border-gray-400"
                                        }`}
                                    >
                                        {isCompleted ? (
                                            <Check className="w-5 h-5 text-white" />
                                        ) : (
                                            <Circle className="w-4 h-4 text-gray-400" />
                                        )}
                                    </button>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="bg-gray-900 text-white px-2.5 py-1 rounded-md text-xs font-medium">
                                                Step {index + 1}
                                            </span>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {step.title}
                                            </h3>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed text-sm">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Command */}
                                {step.command && (
                                    <div className="mt-4 bg-gray-900 rounded-lg p-4 border border-gray-800">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Terminal className="w-4 h-4 text-gray-400" />
                                                <span className="text-gray-400 text-xs font-medium">
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
                                                className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-md font-medium transition-colors"
                                            >
                                                {isCopied ? "✓ Copied" : "Copy"}
                                            </button>
                                        </div>
                                        <code className="text-gray-300 font-mono text-sm block">
                                            {step.command}
                                        </code>
                                    </div>
                                )}

                                {/* Code */}
                                {step.code && (
                                    <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-gray-600 text-xs font-medium">
                                                Code
                                            </span>
                                            <button
                                                onClick={() =>
                                                    copyCommand(
                                                        step.code!,
                                                        index
                                                    )
                                                }
                                                className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md font-medium transition-colors"
                                            >
                                                {isCopied ? "✓ Copied" : "Copy"}
                                            </button>
                                        </div>
                                        <pre className="text-gray-900 font-mono text-sm overflow-x-auto">
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
                <div className="bg-gray-900 px-6 py-5 border-t border-gray-800">
                    <div className="flex items-center gap-4">
                        <div className="bg-white rounded-full p-2.5">
                            <Check className="w-6 h-6 text-gray-900" />
                        </div>
                        <div>
                            <h4 className="text-white text-xl font-semibold">
                                All Done! 🎉
                            </h4>
                            <p className="text-gray-300 text-sm">
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
