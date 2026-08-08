import { useEffect } from "react";

export default function ResumeRedirect() {
  const resumeUrl = import.meta.env.VITE_RESUME_URL || "/SIDDHARTH-MALI_Resume.pdf";

  useEffect(() => {
    window.location.replace(resumeUrl);
  }, [resumeUrl]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary text-accent">
      <div className="text-center">
        <p className="text-lg">Redirecting to resume...</p>
      </div>
    </div>
  );
}
