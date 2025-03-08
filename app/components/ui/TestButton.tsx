'use client';

interface TestButtonProps {
  label: string;
  onClick?: () => void;
}

export default function TestButton({ label, onClick }: TestButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-secondary text-accent rounded-lg hover:bg-accent hover:text-primary transition-colors"
    >
      {label}
    </button>
  );
}
