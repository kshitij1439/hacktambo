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
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors border ${
                    node.hasIssue
                        ? "bg-gray-50 border-gray-900 hover:bg-gray-100"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
                style={{ marginLeft: `${depth * 2}rem` }}
            >
                {hasChildren && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex-shrink-0"
                    >
                        {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                        ) : (
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                        )}
                    </button>
                )}

                {!hasChildren && <div className="w-4" />}

                <div
                    className={`p-2 rounded-md ${
                        node.hasIssue ? "bg-gray-900" : "bg-gray-200"
                    }`}
                >
                    <Package className={`w-4 h-4 ${node.hasIssue ? "text-white" : "text-gray-700"}`} />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-900 truncate">
                            {node.name}
                        </span>
                        <span className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded border border-gray-200">
                            {node.version}
                        </span>
                        {node.hasIssue && (
                            <div className="flex items-center gap-1 bg-gray-900 text-white px-2 py-1 rounded-md">
                                <AlertTriangle className="w-3 h-3" />
                                <span className="text-xs font-medium">
                                    Issue
                                </span>
                            </div>
                        )}
                    </div>
                    {node.issueDescription && (
                        <p className="text-sm text-gray-700 mt-1">
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
        <div className="max-w-4xl bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-white px-6 py-5 border-b border-gray-200">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-gray-900 text-2xl font-semibold mb-2">
                            {title}
                        </h2>
                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md border border-gray-200">
                            <Package className="w-4 h-4 text-gray-700" />
                            <span className="text-gray-900 font-mono text-sm">
                                {rootPackage}
                            </span>
                        </div>
                    </div>
                    {issueCount > 0 && (
                        <div className="bg-gray-900 px-5 py-3 rounded-lg text-center">
                            <div className="text-white text-3xl font-semibold">
                                {issueCount}
                            </div>
                            <div className="text-gray-300 text-xs font-medium">
                                Issues Found
                            </div>
                        </div>
                    )}
                </div>

                {problemDescription && (
                    <div className="mt-4 bg-gray-50 border border-gray-300 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {problemDescription}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Tree */}
            <div className="p-6">
                <div className="space-y-2">
                    {dependencies.map((dep, index) => (
                        <TreeNode key={index} node={dep} />
                    ))}
                </div>

                {dependencies.length === 0 && (
                    <div className="text-center py-12">
                        <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">
                            No dependencies to show
                        </p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                <p className="text-gray-500 text-xs font-mono">
                    Dependency Tree Analyzer
                </p>
            </div>
        </div>
    );
}