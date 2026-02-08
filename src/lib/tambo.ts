
import { z } from "zod";
import ErrorAnalysisCard from "@/components/error-analysis-card";
import CodeDiffViewer from "@/components/code-diff-viewer";
import StepByStepFix from "@/components/step-by-step-fix";
import DependencyTree from "@/components/dependency-tree";
import DocumentationSnippet from "@/components/documentation-snippet";
import StackTraceAnalyzer from "@/components/stack-trace-analyzer";

// Tambo Components Registry
export const components = [
    {
        name: "ErrorAnalysisCard",
        description:
            "A card that displays error analysis including error type, severity, possible causes, and quick fixes. Use this when analyzing any error or exception.",
        component: ErrorAnalysisCard,
        propsSchema: z.object({
            errorType: z.string().describe("The type/name of the error"),
            severity: z
                .enum(["critical", "high", "medium", "low"])
                .describe("The severity level of the error"),
            errorMessage: z.string().describe("The actual error message"),
            possibleCauses: z
                .array(z.string())
                .describe("List of possible causes for this error"),
            quickFixes: z
                .array(z.string())
                .describe("List of quick fixes to resolve the error"),
            detectedIn: z
                .string()
                .describe("The file or location where the error was detected"),
        }),
    },
    {
        name: "CodeDiffViewer",
        description:
            "Shows a before/after comparison of code with the bug and the fix. Use when showing how to fix code issues.",
        component: CodeDiffViewer,
        propsSchema: z.object({
            title: z.string().describe("Title of the code fix"),
            beforeCode: z.string().describe("The buggy code (before fix)"),
            afterCode: z.string().describe("The fixed code (after fix)"),
            language: z
                .string()
                .describe("Programming language (javascript, python, etc)"),
            fileName: z.string().describe("Name of the file being fixed"),
        }),
    },
    {
        name: "StepByStepFix",
        description:
            "A guided walkthrough with numbered steps to fix an issue. Use when providing detailed debugging instructions.",
        component: StepByStepFix,
        propsSchema: z.object({
            title: z.string().describe("Title of the fix walkthrough"),
            steps: z
                .array(
                    z.object({
                        title: z.string().describe("Step title"),
                        description: z.string().describe("Step description"),
                        command: z
                            .string()
                            .optional()
                            .describe(
                                "Terminal command to run (if applicable)"
                            ),
                        code: z
                            .string()
                            .optional()
                            .describe(
                                "Code snippet to add/modify (if applicable)"
                            ),
                    })
                )
                .describe("Array of steps to complete the fix"),
            estimatedTime: z
                .string()
                .describe("Estimated time to complete (e.g., '5 min')"),
        }),
    },
    {
        name: "DependencyTree",
        description:
            "Visualizes package dependencies and highlights dependency conflicts or issues. Use when analyzing npm/package dependency problems.",
        component: DependencyTree,
        propsSchema: z.object({
            title: z.string().describe("Title of the dependency analysis"),
            rootPackage: z.string().describe("The root package name"),
            dependencies: z
                .array(
                    z.object({
                        name: z.string().describe("Package name"),
                        version: z.string().describe("Package version"),
                        hasIssue: z
                            .boolean()
                            .optional()
                            .describe("Whether this dependency has an issue"),
                        issueDescription: z
                            .string()
                            .optional()
                            .describe("Description of the issue"),
                        children: z
                            .array(z.any())
                            .optional()
                            .describe("Child dependencies"),
                    })
                )
                .describe("Array of dependency nodes"),
            problemDescription: z
                .string()
                .optional()
                .describe("Overall description of the dependency problem"),
        }),
    },
    {
        name: "DocumentationSnippet",
        description:
            "Shows relevant documentation from official sources. Use when providing documentation references for error resolution.",
        component: DocumentationSnippet,
        propsSchema: z.object({
            title: z.string().describe("Title of the documentation"),
            source: z.string().describe("Source of the documentation"),
            sourceUrl: z.string().describe("URL to the full documentation"),
            snippet: z.string().describe("The relevant documentation text"),
            relevance: z
                .string()
                .describe("Why this documentation is relevant to the error"),
            relatedTopics: z
                .array(z.string())
                .describe("Related documentation topics"),
        }),
    },
    {
        name: "StackTraceAnalyzer",
        description:
            "Analyzes and visualizes error stack traces, highlighting the root cause. Use when analyzing stack traces from runtime errors.",
        component: StackTraceAnalyzer,
        propsSchema: z.object({
            errorMessage: z.string().describe("The main error message"),
            stackFrames: z
                .array(
                    z.object({
                        functionName: z
                            .string()
                            .describe("Name of the function"),
                        fileName: z
                            .string()
                            .describe("File where the error occurred"),
                        lineNumber: z.number().describe("Line number"),
                        columnNumber: z
                            .number()
                            .optional()
                            .describe("Column number (if available)"),
                        isHighlighted: z
                            .boolean()
                            .optional()
                            .describe("Whether this frame is the root cause"),
                        context: z
                            .string()
                            .optional()
                            .describe("Code context around this frame"),
                    })
                )
                .describe("Array of stack trace frames"),
            rootCause: z
                .string()
                .optional()
                .describe("Explanation of the root cause"),
        }),
    },
];

// Tambo Tools Registry
export const tools = [
    {
        name: "analyze-error-message",
        description:
            "Analyzes an error message to determine its type, severity, and provide initial insights. Use this as the first step when a user provides an error.",
        tool: (input: { errorMessage: string; stackTrace?: string }) => {
            // This is a mock tool - in a real implementation, you might use AI or regex patterns
            const { errorMessage } = input;

            // Simple error type detection
            let errorType = "Unknown Error";
            let severity: "critical" | "high" | "medium" | "low" = "medium";

            if (errorMessage.includes("TypeError")) {
                errorType = "TypeError";
                severity = "high";
            } else if (errorMessage.includes("ReferenceError")) {
                errorType = "ReferenceError";
                severity = "high";
            } else if (errorMessage.includes("SyntaxError")) {
                errorType = "SyntaxError";
                severity = "critical";
            } else if (errorMessage.includes("Cannot find module")) {
                errorType = "Module Not Found";
                severity = "high";
            } else if (errorMessage.includes("ENOENT")) {
                errorType = "File Not Found";
                severity = "medium";
            }

            return {
                errorType,
                severity,
                category: "Runtime Error",
                requiresDependencyCheck:
                    errorMessage.includes("module") ||
                    errorMessage.includes("import"),
                requiresCodeFix: true,
            };
        },
        inputSchema: z.object({
            errorMessage: z.string().describe("The error message to analyze"),
            stackTrace: z
                .string()
                .optional()
                .describe("The stack trace (if available)"),
        }),
        outputSchema: z.object({
            errorType: z.string(),
            severity: z.enum(["critical", "high", "medium", "low"]),
            category: z.string(),
            requiresDependencyCheck: z.boolean(),
            requiresCodeFix: z.boolean(),
        }),
    },
    {
        name: "search-documentation",
        description:
            "Searches official documentation for information related to the error. Use when you need to provide authoritative documentation.",
        tool: (input: { query: string; framework?: string }) => {
            // Mock documentation search results
            const mockDocs = {
                react: {
                    source: "React Official Docs",
                    url: "https://react.dev",
                    snippets: [
                        "React components must return a single root element. You can use a Fragment (<></>) to wrap multiple elements.",
                        "Hooks can only be called at the top level of your component. Don't call Hooks inside loops, conditions, or nested functions.",
                    ],
                },
                node: {
                    source: "Node.js Documentation",
                    url: "https://nodejs.org/docs",
                    snippets: [
                        "The require() function is used to import modules in Node.js. Make sure the module is installed via npm.",
                        "ENOENT errors indicate that a file or directory cannot be found. Check the file path.",
                    ],
                },
                default: {
                    source: "MDN Web Docs",
                    url: "https://developer.mozilla.org",
                    snippets: [
                        "A TypeError occurs when a value is not of the expected type.",
                        "A ReferenceError occurs when trying to access a variable that hasn't been declared.",
                    ],
                },
            };

            const framework = input.framework?.toLowerCase() || "default";
            const docs =
                mockDocs[framework as keyof typeof mockDocs] ||
                mockDocs.default;

            return {
                source: docs.source,
                url: docs.url,
                snippet: docs.snippets[0],
                relatedTopics: [
                    "Error Handling",
                    "Best Practices",
                    "Common Pitfalls",
                ],
            };
        },
        inputSchema: z.object({
            query: z.string().describe("What to search for in documentation"),
            framework: z
                .string()
                .optional()
                .describe("Framework or technology (react, node, etc)"),
        }),
        outputSchema: z.object({
            source: z.string(),
            url: z.string(),
            snippet: z.string(),
            relatedTopics: z.array(z.string()),
        }),
    },
    {
        name: "check-dependency-conflicts",
        description:
            "Checks for dependency version conflicts in a project. Use when dealing with module or package-related errors.",
        tool: (input: { packageName?: string }) => {
            // Mock dependency conflict checker
            return {
                hasConflicts: Math.random() > 0.5,
                conflictingPackages: [
                    {
                        name: "react",
                        installedVersion: "18.2.0",
                        requiredVersion: "^17.0.0",
                        dependentPackage: "some-old-library",
                    },
                ],
                recommendation:
                    "Update dependencies or use npm's --legacy-peer-deps flag",
            };
        },
        inputSchema: z.object({
            packageName: z
                .string()
                .optional()
                .describe("Specific package to check (optional)"),
        }),
        outputSchema: z.object({
            hasConflicts: z.boolean(),
            conflictingPackages: z.array(z.any()),
            recommendation: z.string(),
        }),
    },
    {
        name: "get-common-solutions",
        description:
            "Retrieves common solutions for a specific error type based on community knowledge. Use to provide battle-tested fixes.",
        tool: (input: { errorType: string }) => {
            // Mock common solutions database
            const solutions = {
                TypeError: [
                    "Check if the variable is undefined before accessing its properties",
                    "Ensure you're calling methods on the correct object type",
                    "Verify that async operations have completed before accessing their results",
                ],
                ReferenceError: [
                    "Make sure the variable is declared before using it",
                    "Check for typos in variable names",
                    "Ensure variables are in the correct scope",
                ],
                "Module Not Found": [
                    "Run 'npm install' to install missing dependencies",
                    "Check that the module name is spelled correctly",
                    "Verify the module path in your import statement",
                ],
            };

            const errorType = input.errorType;
            const commonSolutions = solutions[
                errorType as keyof typeof solutions
            ] || [
                "Review the error message carefully",
                "Check the documentation for the relevant API",
                "Search for similar issues on Stack Overflow",
            ];

            return {
                solutions: commonSolutions,
                successRate: "High",
                averageFixTime: "5-15 minutes",
            };
        },
        inputSchema: z.object({
            errorType: z
                .string()
                .describe("The type of error to find solutions for"),
        }),
        outputSchema: z.object({
            solutions: z.array(z.string()),
            successRate: z.string(),
            averageFixTime: z.string(),
        }),
    },
];
