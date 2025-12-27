import { useMemo } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  onClear: () => void;
  loading: boolean;
};

export default function PromptBox({ value, onChange, onSend, onClear, loading }: Props) {
  const canSend = useMemo(() => value.trim().length > 0 && !loading, [value, loading]);

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Enter sends, Shift+Enter adds newline
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div className={`inputWrap ${loading ? "isBusy" : ""}`}>
      <textarea
        className="textbox"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Type your prompt… (Enter to send, Shift+Enter for new line)"
        rows={3}
        spellCheck={false}
      />

      <div className="actions">
        <button className="btnGhost" type="button" onClick={onClear} disabled={loading && !value}>
          Clear
        </button>

        <button className="btnPrimary" type="button" onClick={onSend} disabled={!canSend}>
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Generating
            </>
          ) : (
            "Generate"
          )}
        </button>
      </div>
    </div>
  );
}
