import React, { useState } from 'react';
import { Award, RotateCcw, Check, BookOpen, ImageIcon, FileText, X } from 'lucide-react';
import { UserLevelAnswer, Level } from '../../types';
import logoPusbuk from '../../assets/logo-pusbuk.webp';

interface ResultPageProps {
  score: number;
  totalMisses: number;
  answers: UserLevelAnswer[];
  onRestart: () => void;
  getRank: (accuracy: number) => { title: string; desc: string; color: string };
  levels: Level[];
}

export function ResultPage({ score, totalMisses, answers, onRestart, getRank, levels }: ResultPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Total target anomalies across all levels (8 image hotspots + 5 text sentences = 13 targets)
  const totalTargets = levels.reduce((acc, lvl) => {
    if (lvl.type === 'image') {
      return acc + (lvl.hotspots ? lvl.hotspots.length : (lvl.hotspot ? 1 : 1));
    }
    return acc + 1;
  }, 0);

  // Precision calculation with guaranteed 60% minimum floor
  const misses = Math.max(0, totalMisses || 0);
  const precision = totalTargets / (totalTargets + misses);
  const accuracy = misses === 0 ? 100 : Math.min(100, Math.max(60, Math.round(60 + 40 * precision)));
  const rank = getRank(accuracy);

  return (
    <div id="result-page" className="h-screen w-screen bg-[#021324] relative flex flex-col items-center justify-center p-4 text-[#e2eaf4] scanlines overflow-hidden">
      {/* Top-Left Pusbuk Logo */}
      <div id="result-logo-container" className="absolute top-3 left-3 sm:top-5 sm:left-5 md:top-6 md:left-6 2xl:top-10 2xl:left-10 z-30 shrink-0 pointer-events-none select-none animate-fadeIn">
        <img
          id="result-logo-pusbuk"
          src={logoPusbuk}
          alt="Logo Pusbuk"
          className="h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 2xl:h-20 w-auto object-contain drop-shadow-md"
        />
      </div>

      {/* Glow background circles */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#1f568d]/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#f0c400]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="z-10 max-w-3xl w-full flex flex-col items-center select-none animate-fadeIn">
        {/* Headings */}
        <h2 id="result-page-title" className="text-xl sm:text-2xl md:text-3xl font-normal font-title mb-3 sm:mb-4 text-center uppercase tracking-wide text-white shrink-0">
          Evaluasi Laporan Investigasi
        </h2>

        {/* Score & Rank Dashboard Card (Side-by-side columns on all screens) */}
        <div id="result-dashboard-grid" className="grid grid-cols-2 gap-3 sm:gap-4 w-full mb-4 sm:mb-6 shrink-0">
          {/* Circular Score Gauge */}
          <div id="card-result-accuracy" className="bg-[#041a32]/90 border-2 border-[#1f568d]/60 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center text-center backdrop-blur-md shadow-xl">
            <span className="text-[8px] sm:text-[9px] font-mono font-bold text-[#8fabc6] uppercase tracking-widest mb-2 sm:mb-3">
              Indeks Akurasi Penyelidikan
            </span>
            <div id="gauge-accuracy-circle" className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-[#062444]"></div>
              <div 
                className="absolute inset-0 rounded-full border-4 border-[#f0c400]"
                style={{
                  clipPath: `polygon(50% 50%, -50% -50%, ${accuracy >= 25 ? '150% -50%' : '50% -50%'}, ${accuracy >= 50 ? '150% 150%' : '50% -50%'}, ${accuracy >= 75 ? '-50% 150%' : '50% -50%'}, ${accuracy >= 100 ? '-50% -50%' : '50% -50%'})`,
                  transform: 'rotate(45deg)'
                }}
              ></div>
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-black font-mono text-[#f0c400]">{accuracy}%</span>
                <span className="text-[7px] sm:text-[8px] font-mono text-[#8fabc6] uppercase font-bold mt-0.5 sm:mt-1">
                  {score}/{levels.length} Kasus Selesai
                </span>
              </div>
            </div>
            <span className="text-[8px] sm:text-[9px] font-mono text-[#8fabc6] mt-2">
              {misses === 0 ? '✨ Sempurna (0 Meleset)' : `⚠️ ${misses}x Salah Klik`}
            </span>
          </div>

          {/* Rank Badge description */}
          <div id="card-result-rank" className="bg-[#041a32]/90 border-2 border-[#1f568d]/60 rounded-2xl p-3 sm:p-4 flex flex-col justify-center backdrop-blur-md relative overflow-hidden shadow-xl">
            <span className="text-[8px] sm:text-[9px] font-mono font-bold text-[#8fabc6] uppercase tracking-widest mb-1">
              Pangkat Kredibilitas
            </span>
            
            <div className={`inline-flex self-start px-2.5 py-1 rounded text-[10px] sm:text-xs font-title font-normal tracking-wide mb-1.5 ${rank.color}`}>
              {rank.title}
            </div>

            <p className="text-[#c8d5e3] text-[10px] sm:text-xs leading-relaxed mb-2 line-clamp-2 sm:line-clamp-none font-medium text-justify font-sans">
              {rank.desc}
            </p>
            
            <div className="flex items-center gap-3 sm:gap-4 text-[8px] sm:text-[10px] font-mono text-[#8fabc6] font-bold">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f0c400] border border-[#062444]"></div>
                <span>Kasus: {score}/{levels.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#388ce0] border border-[#062444]"></div>
                <span>Target: {totalTargets} Anomali</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 border border-[#062444]"></div>
                <span>Meleset: {misses}x</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons (Side-by-side row on all screens) */}
        <div id="result-actions-bar" className="flex flex-row items-center gap-3 w-full max-w-lg shrink-0 font-mono">
          {/* Toggle Modal Table Button */}
          <button
            id="btn-open-case-details"
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex-1 py-2 sm:py-3 bg-[#041a32] hover:bg-[#062444] border border-[#1f568d] text-[#8fabc6] hover:text-white rounded-xl text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-[1.02] active:scale-98 shadow-md"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#388ce0]" />
            <span>Detail Kasus</span>
          </button>

          {/* Restart Button */}
          <button
            id="btn-restart-game"
            type="button"
            onClick={onRestart}
            className="flex-1 py-2 sm:py-3 bg-gradient-to-r from-[#1f568d] via-[#256eb4] to-[#022949] hover:from-[#2877c2] hover:to-[#043660] border border-[#388ce0]/60 text-white rounded-xl text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-[1.02] active:scale-98 shadow-[0_0_20px_rgba(31,86,141,0.4)]"
          >
            <RotateCcw className="w-3.5 h-3.5 text-white" />
            <span>Mulai Ulang</span>
          </button>
        </div>

        {/* MODAL WINDOW FOR CASE LOG TABLE */}
        {isModalOpen && (
          <div id="modal-case-log" className="absolute inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div id="modal-case-log-card" className="w-full max-w-3xl bg-[#041a32] border-2 border-[#1f568d] rounded-2xl p-4 sm:p-5 shadow-2xl relative max-h-[85vh] overflow-y-auto flex flex-col font-mono text-[#e2eaf4]">
              <button
                id="btn-close-case-log"
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-[#8fabc6] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 border-b border-[#0f3b66] pb-2 mb-4 shrink-0">
                <BookOpen className="w-4 h-4 text-[#f0c400]" />
                <h3 className="font-title text-sm font-normal text-[#f0c400] uppercase tracking-wider">
                  Rekapitulasi Temuan Halusinasi
                </h3>
              </div>

              <div className="overflow-x-auto overflow-y-auto max-h-[50vh] pr-1 mb-2">
                <table id="table-case-log" className="w-full text-left font-mono text-[11px] sm:text-xs text-[#c8d5e3]">
                  <thead>
                    <tr className="border-b border-[#0f3b66] text-[#8fabc6] pb-2">
                      <th className="pb-2 font-bold uppercase tracking-wider w-12 text-center">Kasus</th>
                      <th className="pb-2 font-bold uppercase tracking-wider">Topik/Kategori</th>
                      <th className="pb-2 font-bold uppercase tracking-wider text-center w-24">Tipe Mode</th>
                      <th className="pb-2 font-bold uppercase tracking-wider text-center w-24">Target</th>
                      <th className="pb-2 font-bold uppercase tracking-wider text-center w-28">Percobaan</th>
                      <th className="pb-2 font-bold uppercase tracking-wider text-center w-24">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0f3b66]/60">
                    {levels.map((c) => {
                      const ans = answers.find(a => a.levelId === c.id);
                      const targetCount = c.type === 'image' ? (c.hotspots?.length || (c.hotspot ? 1 : 1)) : 1;
                      const missInLevel = ans?.missCount || 0;

                      return (
                        <tr key={c.id} className="hover:bg-[#062444]/40">
                          <td className="py-2.5 text-center text-[#8fabc6]">#0{c.id}</td>
                          <td className="py-2.5 font-sans text-[#e2eaf4]">
                            <div className="font-bold text-white">{c.title}</div>
                            <div className="text-[9px] text-[#8fabc6]">{c.category}</div>
                          </td>
                          <td className="py-2.5 text-center">
                            <span className="inline-flex items-center gap-1 bg-[#021324]/80 border border-[#1f568d]/60 px-2 py-0.5 rounded text-[9px] font-bold text-[#388ce0]">
                              {c.type === 'image' ? (
                                <>
                                  <ImageIcon className="w-3 h-3 text-[#388ce0]" /> Citra
                                </>
                              ) : (
                                <>
                                  <FileText className="w-3 h-3 text-[#388ce0]" /> Teks
                                </>
                              )}
                            </span>
                          </td>
                          <td className="py-2.5 text-center text-[#8fabc6]">
                            {targetCount} Anomali
                          </td>
                          <td className="py-2.5 text-center">
                            {ans ? (
                              missInLevel === 0 ? (
                                <span className="text-emerald-400 font-bold">
                                  {ans.attemptsCount}x (Sempurna)
                                </span>
                              ) : (
                                <span className="text-amber-300">
                                  {ans.attemptsCount}x ({missInLevel} Meleset)
                                </span>
                              )
                            ) : (
                              <span className="text-[#8fabc6]">-</span>
                            )}
                          </td>
                          <td className="py-2.5 text-center">
                            <span className="inline-flex items-center gap-1 text-[#f0c400] bg-[#f0c400]/10 border border-[#f0c400]/30 px-2 py-0.5 rounded text-[9px] font-bold">
                              <Check className="w-3 h-3 text-[#f0c400]" /> Terpecahkan
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
