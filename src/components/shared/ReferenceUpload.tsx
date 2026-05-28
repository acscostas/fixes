"use client";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReferenceUploadProps {
  label: string;
  required?: boolean;
  value?: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  icon?: React.ReactNode;
}

export function ReferenceUpload({
  label,
  required,
  value,
  onChange,
  error,
  icon,
}: ReferenceUploadProps) {
  const [preview, setPreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!value) { setPreview(null); return; }
    const url = URL.createObjectURL(value);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    onDrop: (accepted) => { if (accepted[0]) onChange(accepted[0]); },
  });

  if (preview && value) {
    return (
      <div className="relative flex flex-col items-center gap-1.5">
        <div className="relative w-16 h-[72px] rounded-md overflow-hidden border border-white/[0.08] bg-surface group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt={label} className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-0.5 right-0.5 h-5 w-5 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label={`Remover ${label}`}
          >
            <X className="h-3 w-3" />
          </button>
        </div>
        <span className="text-[10px] text-center text-muted-foreground leading-tight max-w-[64px] truncate">
          {value.name}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        {...getRootProps()}
        className={cn(
          "w-16 h-[72px] rounded-md border-[1.5px] border-dashed cursor-pointer transition-all flex flex-col items-center justify-center gap-1",
          isDragActive
            ? "border-[hsl(var(--accent-primary))] bg-[hsl(271_81%_66%_/_0.1)]"
            : "border-white/[0.12] bg-surface hover:border-white/[0.25] hover:bg-surface-elevated",
          error && "border-destructive"
        )}
      >
        <input {...getInputProps()} />
        {icon ?? <Upload className="h-4 w-4 text-muted-foreground" />}
      </div>
      <span
        className={cn(
          "text-[10px] text-center leading-tight",
          error ? "text-destructive" : "text-muted-foreground"
        )}
      >
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </span>
      {error && (
        <p className="text-[10px] text-destructive text-center leading-tight">{error}</p>
      )}
    </div>
  );
}
