"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useError } from "@/app/components/GlobalErrorProvider";

export default function AdminLoginPage() {
  const { setError: showError } = useError();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      console.error("Login error:", err);

      let errorMessage = "로그인에 실패했습니다.";

      // Firebase 에러 코드별 메시지
      const firebaseError = err as { code?: string; message?: string };

      if (firebaseError.code === "auth/invalid-credential") {
        errorMessage = "이메일 또는 비밀번호가 올바르지 않습니다.";
      } else if (firebaseError.code === "auth/user-not-found") {
        errorMessage = "등록되지 않은 이메일입니다.";
      } else if (firebaseError.code === "auth/wrong-password") {
        errorMessage = "비밀번호가 올바르지 않습니다.";
      } else if (firebaseError.code === "auth/too-many-requests") {
        errorMessage =
          "너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.";
      } else if (firebaseError.code === "auth/network-request-failed") {
        errorMessage =
          "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.";
      } else if (
        firebaseError.code === "auth/configuration-not-found" ||
        firebaseError.message?.includes("auth/invalid-api-key")
      ) {
        errorMessage =
          "Firebase Authentication이 올바르게 설정되지 않았습니다. Firebase Console에서 Authentication을 활성화해주세요.";
      }

      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-700 rounded-3xl shadow-lg shadow-purple-500/50">
            <span className="text-white font-bold text-3xl">🔐</span>
          </div>
        </div>

        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-pink-600 mb-2 text-center">
          관리자 로그인
        </h1>
        <p className="text-slate-400 text-center mb-8">
          Showcase 관리 대시보드에 접근하려면 로그인하세요
        </p>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-8 shadow-2xl">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              📧 이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              🔑 비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-700 text-red-100 rounded-xl text-sm">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 shadow-lg shadow-purple-500/30">
            {loading ? "⏳ 로그인 중..." : "🚀 로그인"}
          </button>
        </form>

        {/* Help Text */}
        <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 p-6">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
            <span className="mr-2">💡</span>
            Firebase 설정이 필요하신가요?
          </h3>
          <ol className="text-xs text-slate-400 space-y-2">
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">1.</span>
              <span>
                <a
                  href="https://console.firebase.google.com/u/0/project/i18nexus/authentication/users"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline">
                  Firebase Console
                </a>
                에서 Authentication 활성화
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">2.</span>
              <span>Sign-in method에서 &quot;Email/Password&quot; 활성화</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">3.</span>
              <span>Users 탭에서 관리자 계정 추가</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-2">4.</span>
              <span>Firestore Database도 생성 필요 (규칙: 테스트 모드)</span>
            </li>
          </ol>
        </div>
      </div>
    </main>
  );
}
