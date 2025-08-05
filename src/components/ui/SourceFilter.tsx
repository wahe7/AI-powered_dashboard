import * as React from "react";

interface SourceOption {
  name: string;
  color?: string;
}

interface SourceFilterProps {
  sources: SourceOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export const SourceFilter: React.FC<SourceFilterProps> = ({ sources, selected, onChange }) => {
  function toggle(source: string) {
    if (selected.includes(source)) {
      onChange(selected.filter(s => s !== source));
    } else {
      onChange([...selected, source]);
    }
  }
  return (
    <div className="flex flex-wrap gap-2">
      {sources.map(source => (
        <button
          key={source.name}
          type="button"
          className={`px-3 py-1 rounded-full border text-sm transition-all flex items-center gap-1
            ${selected.includes(source.name)
              ? 'bg-primary text-white border-primary dark:bg-primary/90 dark:text-white dark:border-primary'
              : 'bg-muted text-foreground border-muted-foreground hover:border-primary dark:bg-muted/70 dark:text-gray-200 dark:border-muted-foreground dark:hover:border-primary'}
          `}
          onClick={() => toggle(source.name)}
        >
          {source.color && (
            <span
              className="inline-block w-2 h-2 rounded-full mr-1 border border-white dark:border-gray-800"
              style={{ background: source.color }}
            />
          )}
          {source.name}
        </button>
      ))}
    </div>
  );
}
