"use client";

import { BookOpen, ExternalLink, Search } from "lucide-react";

interface DocumentationSnippetProps {
    title?: string;
    source?: string;
    sourceUrl?: string;
    snippet?: string;
    relevance?: string;
    relatedTopics?: string[];
}

export default function DocumentationSnippet({
    title = "Documentation",
    source = "Official Docs",
    sourceUrl = "#",
    snippet = "No documentation available",
    relevance = "Highly relevant to your error",
    relatedTopics = [],
}: DocumentationSnippetProps) {
    return (
        <div className="max-w-3xl bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-white px-6 py-5 border-b border-gray-200">
                <div className="flex items-start gap-4">
                    <div className="bg-gray-100 p-2.5 rounded-lg border border-gray-200">
                        <BookOpen className="w-6 h-6 text-gray-700" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-gray-900 text-xl font-semibold mb-1">
                            {title}
                        </h2>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-gray-600 text-sm">
                                From: {source}
                            </span>
                            <a
                                href={sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md transition-colors text-xs font-medium border border-gray-200"
                            >
                                View Source
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Relevance Badge */}
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700 text-sm font-medium">
                        {relevance}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                    <div className="prose prose-sm max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {snippet}
                        </p>
                    </div>
                </div>

                {/* Related Topics */}
                {relatedTopics.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-gray-900 font-medium text-sm mb-3">
                            Related Topics
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {relatedTopics.map((topic, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-900 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                <p className="text-gray-500 text-xs font-mono">
                    Documentation Helper
                </p>
            </div>
        </div>
    );
}
