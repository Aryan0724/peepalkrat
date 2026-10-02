"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart, Send, CheckCircle2, MessageSquare, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommunityNote {
  id: string;
  senderName: string;
  location: string;
  recipientArtisan: string;
  message: string;
  date: string;
}

const INITIAL_NOTES: CommunityNote[] = [
  {
    id: "1",
    senderName: "Ananya Roy",
    location: "London, UK",
    recipientArtisan: "Asmeena Begum (Nuh)",
    message: "Dearest Asmeena ji, the Moonj grass basket arrived in London yesterday. It occupies pride of place in our home. To know that your daughter’s college tuition is paid from your own hands makes it priceless. More power to you and your sisters.",
    date: "2 days ago",
  },
  {
    id: "2",
    senderName: "Siddharth & Meera Mehra",
    location: "New Delhi, India",
    recipientArtisan: "Parveena Khan (Taoru)",
    message: "Parveena ji, the geometric Phulkari silk stole was a gift for my mother’s 60th birthday. She was moved to tears by the signed artisan card. Thank you for preserving Haryana’s soul with so much dignity.",
    date: "4 days ago",
  },
  {
    id: "3",
    senderName: "Dr. Kavita Narang",
    location: "Bengaluru, India",
    recipientArtisan: "Rukhsana Bano (Punhana)",
    message: "Rukhsana ji, your terracotta baubles and brass chime bells brought the true spirit of Diwali and holidays to our home. Thank you for fighting for your autonomy. You inspire women across the country.",
    date: "1 week ago",
  },
  {
    id: "4",
    senderName: "Marcus Vance",
    location: "San Francisco, USA",
    recipientArtisan: "Shakila Bibi (Ferozepur Jhirka)",
    message: "The Panipat upcycled dhurrie rug is extraordinary in craftsmanship and durability. Knowing 72% directly funds your local self-help group made this the most meaningful purchase of the year.",
    date: "2 weeks ago",
  },
];

export default function CommunityPage() {
  const [notes, setNotes] = useState<CommunityNote[]>(INITIAL_NOTES);
  const [senderName, setSenderName] = useState("");
  const [location, setLocation] = useState("");
  const [recipientArtisan, setRecipientArtisan] = useState("All Mewat Women Makers");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !message) return;

    const newNote: CommunityNote = {
      id: Date.now().toString(),
      senderName,
      location: location || "India",
      recipientArtisan,
      message,
      date: "Just now",
    };

    setNotes([newNote, ...notes]);
    setSenderName("");
    setLocation("");
    setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Editorial Hero */}
      <div className="relative bg-[#1C1917] text-[#FAF7F2] py-24 px-4 sm:px-6 lg:px-8 border-b border-stone-800 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/peepalkraft/workshop/workshop-full-1.jpg"
            alt="Mewat women artisan collective"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-[#E8D1A7] text-xs uppercase tracking-[0.28em] font-semibold">
            <Sparkles className="w-4 h-4 text-[#E8D1A7]" />
            <span>The Sisterhood of Mewat · Artisan Voices</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-tight text-[#FAF7F2]">
            Financial Freedom from the Soil of Haryana
          </h1>
          <p className="text-[#FAF7F2]/90 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            In Mewat, a woman holding a bank passbook is not just a commercial event. It is a social revolution. Explore the real journeys of our artisan leaders and leave a personal message of gratitude.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        {/* Photo Story: The Nuh, Taoru, and Punhana Cooperatives */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-card space-y-4">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-stone-100">
              <Image
                src="/peepalkraft/workshop/artisan-portrait-1.jpg"
                alt="Asmeena Begum in Nuh"
                fill
                className="object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-[#1C1917]/80 text-[#D4A338] text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs font-semibold">
                Nuh Cluster
              </span>
            </div>
            <h3 className="font-serif text-xl font-medium text-charcoal">The Moonj Reed Revolution</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              Wild canal reeds (Moonj) that were previously burned or ignored are now transformed into museum-grade storage baskets by Asmeena Begum’s 28-woman cooperative in Nuh.
            </p>
            <div className="pt-2 text-[11px] text-[#4A6B52] font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% of daughters enrolled in senior school</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-card space-y-4">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-stone-100">
              <Image
                src="/peepalkraft/workshop/artisan-yellow-saree.jpg"
                alt="Parveena Khan in Taoru"
                fill
                className="object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-[#1C1917]/80 text-[#D4A338] text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs font-semibold">
                Taoru Cluster
              </span>
            </div>
            <h3 className="font-serif text-xl font-medium text-charcoal">Needles Against Forced Marriage</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              In Taoru, Parveena Khan established an after-school Phulkari apprenticeship where adolescent girls earn direct stipends, giving them the agency to delay marriage until adulthood.
            </p>
            <div className="pt-2 text-[11px] text-[#4A6B52] font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>35+ young women with personal savings</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-card space-y-4">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-stone-100">
              <Image
                src="/peepalkraft/workshop/artisan-ghagra.jpg"
                alt="Rukhsana Bano in Punhana"
                fill
                className="object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-[#1C1917]/80 text-[#D4A338] text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs font-semibold">
                Punhana Cluster
              </span>
            </div>
            <h3 className="font-serif text-xl font-medium text-charcoal">Solar Wheels & Clay Mastery</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              By replacing grueling manual foot-wheels with rooftop solar-powered potter wheels, Rukhsana Bano transformed Punhana into Haryana’s foremost female terracotta studio.
            </p>
            <div className="pt-2 text-[11px] text-[#4A6B52] font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero-emission craft production</span>
            </div>
          </div>
        </div>

        {/* The Live Patron Gratitude Wall */}
        <div className="bg-white rounded-sm border border-stone-200 p-8 sm:p-12 shadow-editorial space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#B84824] font-semibold block mb-1">
                Direct Patron Solidarity
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                Letters of Gratitude to the Makers
              </h2>
            </div>
            <p className="text-xs text-stone-500 max-w-md">
              Every message submitted here is read aloud during the weekly self-help guild meetings in Nuh and Taoru.
            </p>
          </div>

          {/* Form & Messages Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Note Submission Form */}
            <div className="bg-[#FAF8F5] p-6 rounded-sm border border-stone-200 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-semibold text-charcoal uppercase tracking-wider">
                <Send className="w-4 h-4 text-[#B84824]" />
                <span>Write a Note to a Maker</span>
              </div>

              {submitted && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xs text-xs animate-fade-in flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Your letter of gratitude has been added to the community wall!</span>
                </div>
              )}

              <form onSubmit={handleSubmitNote} className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Ananya Roy"
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-sm focus:outline-none focus:border-[#B84824]"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Your City / Country</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. New Delhi or London"
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-sm focus:outline-none focus:border-[#B84824]"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Addressed To</label>
                  <select
                    value={recipientArtisan}
                    onChange={(e) => setRecipientArtisan(e.target.value)}
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-sm focus:outline-none focus:border-[#B84824]"
                  >
                    <option value="All Mewat Women Makers">All Mewat Women Makers</option>
                    <option value="Asmeena Begum (Nuh)">Asmeena Begum (Nuh)</option>
                    <option value="Parveena Khan (Taoru)">Parveena Khan (Taoru)</option>
                    <option value="Rukhsana Bano (Punhana)">Rukhsana Bano (Punhana)</option>
                    <option value="Shakila Bibi (Ferozepur Jhirka)">Shakila Bibi (Ferozepur Jhirka)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share how her piece brought warmth to your home and your appreciation for her craftsmanship..."
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-sm focus:outline-none focus:border-[#B84824]"
                  />
                </div>

                <Button type="submit" variant="editorial" size="sm" className="w-full">
                  Post Letter to Community
                </Button>
              </form>
            </div>

            {/* Existing Letters Grid */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-[#FAF8F5]/80 p-5 rounded-sm border border-stone-200/90 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-stone-400">
                        <span className="font-semibold text-[#B84824] bg-white px-2 py-0.5 rounded-full border border-stone-200">
                          To: {note.recipientArtisan}
                        </span>
                        <span>{note.date}</span>
                      </div>
                      <p className="text-xs text-charcoal/90 leading-relaxed font-light italic">
                        “{note.message}”
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px]">
                      <span className="font-medium text-charcoal">{note.senderName}</span>
                      <span className="text-stone-400">{note.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pt-6 space-y-4">
          <h3 className="font-serif text-2xl text-charcoal">
            Participate in Mewat's Independence Movement
          </h3>
          <p className="text-xs text-stone-500 max-w-lg mx-auto">
            Every object in our collection carries living proof of rural women's dignity. Discover the catalog today.
          </p>
          <Link href="/shop" className="inline-block">
            <Button variant="editorial" size="lg" className="px-8">
              Explore Handcrafted Catalog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
