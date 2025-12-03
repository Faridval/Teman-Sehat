"use client"

interface PromptSuggestion {
  icon: string
  title: string
  description: string
  prompt: string
}

const suggestions: PromptSuggestion[] = [
  {
    icon: "😟",
    title: "Saya Pusing",
    description: "Ceritakan tentang pusing kamu",
    prompt: "Saya pusing, tolong bantu saya cek apa penyebabnya.",
  },
  {
    icon: "💰",
    title: "Tidak Ada Uang ke Dokter",
    description: "Cari pilihan kesehatan gratis",
    prompt: "Saya tidak punya uang ke dokter, bagaimana caranya?",
  },
  {
    icon: "🏥",
    title: "Tolong Cari Faskes Gratis",
    description: "Temukan fasilitas kesehatan BPJS terdekat",
    prompt: "Tolong bantu saya cari faskes gratis atau BPJS terdekat.",
  },
  {
    icon: "🤒",
    title: "Saya Demam",
    description: "Pertolongan pertama untuk demam",
    prompt: "Saya demam, bagaimana cara menanganinya di rumah?",
  },
]

export function PromptSuggestions({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.title}
          onClick={() => onSelect(suggestion.prompt)}
          className="p-5 bg-white border-2 border-border rounded-xl hover:border-primary-accent hover:shadow-lg transition-all text-left hover:bg-blue-50"
        >
          <div className="text-3xl mb-3">{suggestion.icon}</div>
          <h4 className="font-bold text-foreground text-sm">{suggestion.title}</h4>
          <p className="text-xs text-muted-foreground mt-2">{suggestion.description}</p>
        </button>
      ))}
    </div>
  )
}
