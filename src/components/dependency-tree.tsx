"use client";

import {
    AlertTriangle,
    ChevronDown,
    ChevronRight,
    Package,
} from "lucide-react";
import { useState } from "react";

interface DependencyNode {
    name: string;
    version: string;
    hasIssue?: boolean;
    issueDescription?: string;
    children?: DependencyNode[];
}

interface DependencyTreeProps {
    title?: string;
    rootPackage?: string;
    dependencies?: DependencyNode[];
    problemDescription?: string;
}

function TreeNode({
    node,
    depth = 0,
}: {
    node: DependencyNode;
    depth?: number;
}) {
    const [isExpanded, setIsExpanded] = useState(depth < 2);

    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className="select-none">
            <div
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                    node.hasIssue
                        ? "bg-red-100 border-2 border-red-400 hover:bg-red-200"
                        : "bg-gray-50 border-2 border-gray-300 hover:bg-gray-100"
                }`}
                style={{ marginLeft: `${depth * 2}rem` }}
            >
                {hasChildren && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex-shrink-0"
                    >
                        {isExpanded ? (
                            <ChevronDown
                                className="w-5 h-5 text-gray-600"
                                strokeWidth={3}
                            />
                        ) : (
                            <ChevronRight
                                className="w-5 h-5 text-gray-600"
                                strokeWidth={3}
                            />
                        )}
                    </button>
                )}

                {!hasChildren && <div className="w-5" />}

                <div
                    className={`p-2 rounded-lg ${
                        node.hasIssue ? "bg-red-500" : "bg-blue-500"
                    }`}
                >
                    <Package className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-gray-900 truncate">
                            {node.name}
                        </span>
                        <span className="font-mono text-sm text-gray-600 bg-white px-2 py-1 rounded border border-gray-300">
                            {node.version}
                        </span>
                        {node.hasIssue && (
                            <div className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full">
                                <AlertTriangle
                                    className="w-4 h-4"
                                    strokeWidth={2.5}
                                />
                                <span className="text-xs font-bold uppercase">
                                    Issue
                                </span>
                            </div>
                        )}
                    </div>
                    {node.issueDescription && (
                        <p className="text-sm text-red-800 mt-1 font-medium">
                            {node.issueDescription}
                        </p>
                    )}
                </div>
            </div>

            {isExpanded && hasChildren && (
                <div className="mt-2 space-y-2">
                    {node.children!.map((child, index) => (
                        <TreeNode key={index} node={child} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function DependencyTree({
    title = "Dependency Analysis",
    rootPackage = "your-app",
    dependencies = [],
    problemDescription,
}: DependencyTreeProps) {
    const issueCount = dependencies.filter((d) => d.hasIssue).length;

    return (
        <div className="max-w-4xl bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-2xl overflow-hidden border-4 border-blue-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-white text-3xl font-black mb-2 tracking-tight">
                            {title}
                        </h2>
                        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                            <Package
                                className="w-5 h-5 text-white"
                                strokeWidth={2.5}
                            />
                            <span className="text-white font-mono font-bold">
                                {rootPackage}
                            </span>
                        </div>
                    </div>
                    {issueCount > 0 && (
                        <div className="bg-red-500 px-6 py-3 rounded-xl text-center">
                            <div className="text-white text-4xl font-black">
                                {issueCount}
                            </div>
                            <div className="text-red-100 text-xs font-bold uppercase">
                                Issues Found
                            </div>
                        </div>
                    )}
                </div>

                {problemDescription && (
                    <div className="mt-4 bg-red-900/30 border-2 border-red-400 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-6 h-6 text-red-300 flex-shrink-0 mt-1" />
                            <p className="text-red-100 font-medium leading-relaxed">
                                {problemDescription}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Tree */}
            <div className="p-8">
                <div className="space-y-3">
                    {dependencies.map((dep, index) => (
                        <TreeNode key={index} node={dep} />
                    ))}
                </div>

                {dependencies.length === 0 && (
                    <div className="text-center py-12">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">
                            No dependencies to show
                        </p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-4 border-t-4 border-gray-700">
                <p className="text-gray-400 text-xs font-mono uppercase tracking-widest">
                    Dependency Tree Analyzer • DevDebug AI
                </p>
            </div>
        </div>
    );
}
