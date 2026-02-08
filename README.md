# 🐞 DevDebug AI – Intelligent Error Debugging Assistant

DevDebug AI is an AI-powered debugging assistant that dynamically adapts its user interface based on the type of error a developer encounters. Instead of static chat replies, it generates context-aware debugging UIs such as code diffs, stack trace visualizations, dependency trees, and step-by-step fix guides.

Built using **Tambo’s Generative UI**, DevDebug AI turns error messages into interactive problem-solving experiences.

---

## 🚀 Features

- 🔍 Automatic error analysis and categorization  
- 🧩 Adaptive UI based on error type  
- 📝 Code diff viewer for before/after fixes  
- 🌳 Dependency tree visualization for package issues  
- 🧠 Stack trace analysis with root cause highlighting  
- ✅ Step-by-step guided fixes  

---

## 🧠 How Tambo Is Used

Tambo acts as the **core Generative UI engine** of the application.

When a user submits an error:
1. Tambo invokes custom tools to analyze the error and gather context.
2. Based on the error type, Tambo intelligently selects the most relevant UI components.
3. These components are streamed dynamically, creating an adaptive debugging interface instead of a static response.

### Example
- **TypeError** → Code diff viewer + step-by-step fix guide  
- **Module Not Found** → Dependency tree + install steps + docs  
- **Runtime Error** → Stack trace analyzer + root cause explanation  

This showcases advanced Tambo features like component composition, tool orchestration, schema validation, and real-time UI generation.

---

## 🛠 Tech Stack

- **Tambo SDK** – Generative UI framework  
- **React + TypeScript** – Frontend  
- **Tailwind CSS** – Styling  
- **Zod** – Schema validation  

---

## 🏗 Architecture Overview

User Error Input
↓
Tambo Tool Analysis
↓
Context Understanding
↓
Dynamic UI Component Selection
↓
Adaptive Debugging Interface





---

## ▶️ Demo

🔗 Live App: https://hacktambo.vercel.app/chat  

---

## 📦 Local Setup

```bash
git clone https://github.com/kshitij1439/hacktambo
cd hacktambo
npm install
npm run dev
