"use client";

import { useTranslation } from "i18nexus";
import Link from "next/link";

export default function I18nexusDocsPage() {
  const { t } = useTranslation();

  const features = [
    {
      title: "I18nProvider",
      description: "쿠키 기반 언어 영속성을 갖춘 React Context Provider",
      icon: "🎨",
      href: "/docs/i18nexus/provider",
      color: "blue",
    },
    {
      title: "useTranslation",
      description: "클라이언트 컴포넌트에서 번역 함수에 접근하기 위한 훅",
      icon: "🔤",
      href: "/docs/i18nexus/use-translation",
      color: "green",
    },
    {
      title: "useLanguageSwitcher",
      description: "쿠키 영속성을 통한 언어 변경 훅",
      icon: "🌐",
      href: "/docs/i18nexus/use-language-switcher",
      color: "purple",
    },
    {
      title: "Server Components",
      description: "하이드레이션 불일치 제로의 서버 사이드 번역",
      icon: "🖥️",
      href: "/docs/i18nexus/server-components",
      color: "orange",
    },
  ];

  const colorClasses = {
    blue: {
      border: "border-blue-500",
      bg: "bg-blue-500/10",
      hover: "hover:bg-blue-500/20",
      text: "text-blue-400",
      shadow: "shadow-blue-500/20",
    },
    green: {
      border: "border-green-500",
      bg: "bg-green-500/10",
      hover: "hover:bg-green-500/20",
      text: "text-green-400",
      shadow: "shadow-green-500/20",
    },
    purple: {
      border: "border-purple-500",
      bg: "bg-purple-500/10",
      hover: "hover:bg-purple-500/20",
      text: "text-purple-400",
      shadow: "shadow-purple-500/20",
    },
    orange: {
      border: "border-orange-500",
      bg: "bg-orange-500/10",
      hover: "hover:bg-orange-500/20",
      text: "text-orange-400",
      shadow: "shadow-orange-500/20",
    },
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300">
          {t("홈")}
        </Link>
        <span className="text-slate-500 mx-2">/</span>
        <span className="text-slate-300">{t("i18nexus 문서")}</span>
      </div>

      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg shadow-blue-500/50">
          <span className="text-white font-bold text-2xl">i18</span>
        </div>
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-4">
          {t("i18nexus 라이브러리")}
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          {t(
            "쿠키 기반 언어 관리 및 SSR 지원을 갖춘 완전한 React i18n 툴킷"
          )}
        </p>
      </div>

      {/* Installation */}
      <div className="bg-slate-900 rounded-xl border border-slate-700 p-8 mb-12">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
          <span className="mr-3">📦</span>
          {t("설치")}
        </h2>
        <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm">
          <code className="text-green-400">npm install i18nexus</code>
        </div>
        <p className="text-slate-400 mt-4">
          {t("또는 yarn 사용:")}{" "}
          <code className="text-green-400 bg-slate-950 px-2 py-1 rounded">
            yarn add i18nexus
          </code>
        </p>
      </div>

      {/* Features Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-8">
          {t("핵심 기능")}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const colors =
              colorClasses[feature.color as keyof typeof colorClasses];
            return (
              <Link
                key={feature.href}
                href={feature.href}
                className={`group bg-slate-900 rounded-xl border ${colors.border} p-6 transition-all hover:shadow-lg ${colors.shadow} hover:-translate-y-1`}>
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 ${colors.bg} ${colors.hover} rounded-lg mb-4 transition-colors`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {t(feature.title)}
                </h3>
                <p className="text-slate-400 mb-4">{t(feature.description)}</p>
                <div
                  className={`inline-flex items-center ${colors.text} font-medium`}>
                  {t("자세히 알아보기")}{" "}
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Start */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-8">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
          <span className="mr-3">🚀</span>
          {t("빠른 시작")}
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              1. {t("I18nProvider 설정")}
            </h3>
            <pre className="bg-slate-950 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-slate-300">{`// app/layout.tsx
import { I18nProvider } from "i18nexus";
import { translations } from "@/lib/i18n";

export default function RootLayout({ children }) {
  return (
    <I18nProvider initialLanguage="ko" translations={translations}>
      {children}
    </I18nProvider>
  );
}`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              2. {t("컴포넌트에서 사용")}
            </h3>
            <pre className="bg-slate-950 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-slate-300">{`"use client";
import { useTranslation, useLanguageSwitcher } from "i18nexus";

export default function MyComponent() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguageSwitcher();
  
  return (
    <div>
      <h1>{t("Welcome")}</h1>
      <button onClick={() => changeLanguage("en")}>
        English
      </button>
    </div>
  );
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
