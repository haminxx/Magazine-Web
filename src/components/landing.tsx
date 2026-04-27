"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type DragEvent,
  type RefObject,
} from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { generateDuotones, type DuotoneVariant } from "../lib/duotone";
import { DuotoneGallery } from "./duotone-gallery";

type State = "idle" | "processing" | "ready" | "exiting";

export function Landing() {
  const router = useRouter();
  const [state, setState] = useState<State>("idle");
  const [variants, setVariants] = useState<DuotoneVariant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showCam, setShowCam] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    router.prefetch("/issues");
  }, [router]);

  const handleImage = useCallback((dataUrl: string) => {
    setError(null);
    setState("processing");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = async () => {
      try {
        const v = await generateDuotones(img);
        if (v.length === 0) {
          setError("Couldn't process that image.");
          setState("idle");
          return;
        }
        setVariants(v);
        setState("ready");
      } catch {
        setError("Couldn't process that image.");
        setState("idle");
      }
    };
    img.onerror = () => {
      setError("Image failed to load.");
      setState("idle");
    };
    img.src = dataUrl;
  }, []);

  const onFiles = useCallback(
    (files: FileList | null) => {
      if (!files || !files[0]) return;
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        setError("That isn't an image file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => handleImage(reader.result as string);
      reader.onerror = () => setError("Couldn't read that file.");
      reader.readAsDataURL(file);
    },
    [handleImage]
  );

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    onFiles(e.dataTransfer.files);
  };

  const startCam = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      setShowCam(true);
      window.setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          void videoRef.current.play();
        }
      }, 30);
    } catch {
      setError("Camera access denied or unavailable.");
    }
  };

  const stopCam = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setShowCam(false);
  }, []);

  const snap = () => {
    const v = videoRef.current;
    if (!v) return;
    const c = document.createElement("canvas");
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(v, 0, 0);
    const dataUrl = c.toDataURL("image/jpeg", 0.9);
    stopCam();
    handleImage(dataUrl);
  };

  // Stop the camera stream on unmount.
  useEffect(() => () => stopCam(), [stopCam]);

  const enter = useCallback(() => {
    if (state !== "ready") return;
    setState("exiting");
    window.setTimeout(() => router.push("/issues"), 550);
  }, [state, router]);

  // When ready, click anywhere — or press Enter / Space — to advance.
  useEffect(() => {
    if (state !== "ready") return;
    const onClick = () => enter();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        enter();
      }
    };
    // small grace period so the click that produced the gallery doesn't immediately advance
    const armed = window.setTimeout(() => {
      window.addEventListener("click", onClick);
      window.addEventListener("keydown", onKey);
    }, 250);
    return () => {
      window.clearTimeout(armed);
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [state, enter]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: state === "exiting" ? 0 : 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-16"
    >
      {/* Title block */}
      <header className="w-full max-w-3xl text-center">
        <p className="helv text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
          &ldquo;A&nbsp;MAGAZINE&rdquo;&nbsp;&nbsp;C/O&nbsp;2026
        </p>
        <h1
          className="helv mt-4 font-bold leading-[0.85] tracking-[-0.04em] text-[var(--foreground)]"
          style={{ fontSize: "clamp(72px, 18vw, 220px)" }}
        >
          1+1=3
        </h1>
        <p className="helv mt-4 text-[11px] uppercase tracking-[0.22em] text-[var(--foreground)]/80">
          &ldquo;THE&nbsp;THIRD&rdquo;&nbsp;IS&nbsp;THE&nbsp;THING&nbsp;YOU&nbsp;DIDN&apos;T&nbsp;PLAN&nbsp;FOR.
        </p>
      </header>

      {/* Stage */}
      <div className="mt-10 flex flex-col items-center gap-5">
        {state === "idle" && !showCam && (
          <DropZone
            active={dragActive}
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDrop={onDrop}
            onPick={() => fileRef.current?.click()}
            onCam={startCam}
          />
        )}

        {showCam && (
          <CameraCapture
            videoRef={videoRef}
            onSnap={snap}
            onCancel={stopCam}
          />
        )}

        {state === "processing" && <ProcessingTile />}

        {state === "ready" && variants.length > 0 && (
          <DuotoneGallery variants={variants} />
        )}

        {error && (
          <p className="helv text-[10px] uppercase tracking-[0.28em] text-red-500">
            {error}
          </p>
        )}
      </div>

      {/* Footnote / CTA */}
      <footer className="mt-10 helv text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
        {state === "idle" && (
          <span>
            &ldquo;DROP&nbsp;AN&nbsp;IMAGE&rdquo;&nbsp;—&nbsp;OR&nbsp;TAKE&nbsp;A&nbsp;PICTURE&nbsp;—&nbsp;TO&nbsp;BEGIN.
          </span>
        )}
        {state === "processing" && <span>processing…</span>}
        {state === "ready" && (
          <button
            type="button"
            onClick={enter}
            className="text-[var(--foreground)] hover:underline underline-offset-4"
          >
            CLICK&nbsp;ANYWHERE&nbsp;TO&nbsp;ENTER&nbsp;<span aria-hidden>↘</span>
          </button>
        )}
      </footer>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onFiles(e.target.files)}
      />
    </motion.div>
  );
}

function DropZone({
  active,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onPick,
  onCam,
}: {
  active: boolean;
  onDragEnter: () => void;
  onDragLeave: () => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onPick: () => void;
  onCam: () => void;
}) {
  return (
    <div
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={
        "flex aspect-square w-[min(550px,86vw)] flex-col items-center justify-center gap-6 border border-dashed p-8 text-center transition-colors " +
        (active
          ? "border-[var(--foreground)] bg-[var(--foreground)]/[0.04]"
          : "border-[var(--line)]")
      }
    >
      <p className="helv text-[11px] uppercase tracking-[0.32em] text-[var(--muted)]">
        &ldquo;DROP&nbsp;AN&nbsp;IMAGE&rdquo;&nbsp;HERE
      </p>

      <p className="helv text-[14px] uppercase tracking-[0.18em] text-[var(--muted)]">
        — or —
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onPick}
          className="helv border border-[var(--foreground)] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)] transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]"
        >
          Browse File
        </button>
        <button
          type="button"
          onClick={onCam}
          className="helv border border-[var(--foreground)] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)] transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]"
        >
          Take a Picture
        </button>
      </div>
    </div>
  );
}

function CameraCapture({
  videoRef,
  onSnap,
  onCancel,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
  onSnap: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative aspect-square w-[min(550px,86vw)] overflow-hidden border border-[var(--line)] bg-black">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          playsInline
          muted
        />
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onSnap}
          className="helv border border-[var(--foreground)] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)] transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]"
        >
          Snap
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="helv text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function ProcessingTile() {
  return (
    <div className="flex aspect-square w-[min(550px,86vw)] items-center justify-center border border-[var(--line)] helv text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
      processing…
    </div>
  );
}
