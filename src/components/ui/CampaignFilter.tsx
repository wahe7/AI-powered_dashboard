import * as React from "react";

interface CampaignFilterProps {
  campaigns: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export const CampaignFilter: React.FC<CampaignFilterProps> = ({
  campaigns,
  selected,
  onChange,
}) => {
  function toggle(campaign: string) {
    if (selected.includes(campaign)) {
      onChange(selected.filter((c) => c !== campaign));
    } else {
      onChange([...selected, campaign]);
    }
  }
  return (
    <div className="flex flex-wrap gap-2">
      {campaigns.map((campaign) => (
        <button
          key={campaign}
          type="button"
          className={`px-3 py-1 rounded-full border text-sm transition-all flex items-center gap-1
            ${
              selected.includes(campaign)
                ? "bg-primary text-white border-primary dark:bg-primary/90 dark:text-white dark:border-primary"
                : "bg-muted text-foreground border-muted-foreground hover:border-primary dark:bg-muted/70 dark:text-gray-200 dark:border-muted-foreground dark:hover:border-primary"
            }
          `}
          onClick={() => toggle(campaign)}
        >
          {campaign}
        </button>
      ))}
    </div>
  );
};
