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
        <div className="max-w-3xl bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-2xl shadow-2xl overflow-hidden border-4 border-purple-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 px-8 py-6">
                <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-xl shadow-lg">
                        <BookOpen
                            className="w-8 h-8 text-purple-600"
                            strokeWidth={2.5}
                        />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-white text-2xl font-black mb-1 tracking-tight">
                            {title}
                        </h2>
                        <div className="flex items-center gap-2">
                            <span className="text-purple-100 text-sm font-bold">
                                From: {source}
                            </span>
                            <a
                                href={sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg transition-all text-xs font-bold"
                            >
                                View Source
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Relevance Badge */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-8 py-3 border-b-2 border-purple-300">
                <div className="flex items-center gap-2">
                    <Search
                        className="w-4 h-4 text-purple-700"
                        strokeWidth={2.5}
                    />
                    <span className="text-purple-900 font-bold text-sm">
                        {relevance}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-8">
                <div className="bg-white border-2 border-purple-300 rounded-xl p-6 shadow-inner">
                    <div className="prose prose-sm max-w-none">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">
                            {snippet}
                        </p>
                    </div>
                </div>

                {/* Related Topics */}
                {relatedTopics.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-gray-900 font-black text-sm uppercase tracking-wider mb-3">
                            Related Topics
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {relatedTopics.map((topic, index) => (
                                <span
                                    key={index}
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:shadow-lg transition-all cursor-pointer"
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-purple-900 to-pink-900 px-8 py-4">
                <p className="text-purple-300 text-xs font-mono uppercase tracking-widest">
                    Documentation Helper • DevDebug AI
                </p>
            </div>
        </div>
    );
}
