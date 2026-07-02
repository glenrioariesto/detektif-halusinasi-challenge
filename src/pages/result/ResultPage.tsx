import React, { useState } from 'react';
import { Award, RotateCcw, Check, BookOpen, ImageIcon, FileText, X } from 'lucide-react';
import { UserLevelAnswer } from '../../types';
import { CAMPAIGN_LEVELS } from '../../data/questions';

interface ResultPageProps {
  score: number;
  answers: UserLevelAnswer[];
  onRestart: () => void;
  getRank: (score: number) => { title: string; desc: string; color: string };
}

export function ResultPage({ score, answers, onRestart, getRank }: ResultPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rank = getRank(score);
  const accuracy = Math.round((score / CAMPAIGN_LEVELS.length) * 100);

  return (
    <div className="h-screen w-screen bg-[#040804] bg-transparent relative flex flex-col items-center justify-center p-4 text-emerald-250 scanlines overflow-hidden">
      {/* Glow background circles */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="z-10 max-w-3xl w-full flex flex-col items-center select-none animate-fadeIn">
        {/* Victory Icon Badge */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#091509] border-2 border-emerald-500 flex items-center justify-center mb-2 sm:mb-3 glow-emerald shrink-0">
          <Award className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-emerald-400" />
        </div>

        {/* Headings */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold font-display mb-0.5 text-center uppercase tracking-wide text-emerald-100 shrink-0">
          Evaluasi Laporan Investigasi
        </h2>
        <p className="text-[8px] sm:text-[9px] font-mono text-emerald-500 uppercase tracking-widest mb-3 sm:mb-4 font-bold shrink-0">
          Kampanye Misi #HAL-102 Selesai Dievaluasi
        </p>

        {/* Score & Rank Dashboard Card (Side-by-side columns on all screens) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full mb-4 sm:mb-6 shrink-0">
          {/* Circular Score Gauge */}
          <div className="bg-[#081208]/90 border border-emerald-900 rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center text-center backdrop-blur-md">
            <span className="text-[8px] sm:text-[9px] font-mono font-bold text-emerald-500 uppercase tracking-widest mb-2 sm:mb-3">
              Indeks Akurasi
            </span>
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-950"></div>
              <div 
                className="absolute inset-0 rounded-full border-4 border-emerald-500"
                style={{
                  clipPath: `polygon(50% 50%, -50% -50%, ${accuracy >= 25 ? '150% -50%' : '50% -50%'}, ${accuracy >= 50 ? '150% 150%' : '50% -50%'}, ${accuracy >= 75 ? '-50% 150%' : '50% -50%'}, ${accuracy >= 100 ? '-50% -50%' : '50% -50%'})`,
                  transform: 'rotate(45deg)'
                }}
              ></div>
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-black font-mono text-emerald-100">{accuracy}%</span>
                <span className="text-[7px] sm:text-[8px] font-mono text-emerald-450 uppercase font-bold mt-0.5 sm:mt-1">
                  {score}/{CAMPAIGN_LEVELS.length} Terkunci
                </span>
              </div>
            </div>
          </div>

          {/* Rank Badge description */}
          <div className="bg-[#081208]/90 border border-emerald-900 rounded-2xl p-3 sm:p-4 flex flex-col justify-center backdrop-blur-md relative overflow-hidden">
            <span className="text-[8px] sm:text-[9px] font-mono font-bold text-emerald-500 uppercase tracking-widest mb-1">
              Pangkat Kredibilitas
            </span>
            
            <div className={`inline-flex self-start px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[8px] sm:text-[10px] font-mono font-bold mb-1.5 ${rank.color}`}>
              {rank.title}
            </div>

            <p className="text-emerald-300 text-[10px] sm:text-xs leading-relaxed mb-2 line-clamp-2 sm:line-clamp-none font-medium text-justify">
              {rank.desc}
            </p>
            
            <div className="flex items-center gap-3 sm:gap-4 text-[8px] sm:text-[10px] font-mono text-emerald-455 font-bold">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 border border-emerald-950"></div>
                <span>Sukses: {score}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400 border border-emerald-950"></div>
                <span>Total: {CAMPAIGN_LEVELS.length} Lvl</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons (Side-by-side row on all screens) */}
        <div className="flex flex-row items-center gap-3 w-full max-w-lg shrink-0">
          {/* Toggle Modal Table Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex-1 py-2 sm:py-3 bg-[#081208] hover:bg-emerald-950 border border-emerald-800 text-emerald-400 rounded-xl text-[10px] sm:text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-[1.02] active:scale-98"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Detail Kasus</span>
          </button>

          {/* Restart Button */}
          <button
            type="button"
            onClick={onRestart}
            className="flex-1 py-2 sm:py-3 bg-gradient-to-r from-emerald-500 to-green-600 border border-emerald-500 hover:from-emerald-400 hover:to-green-500 text-black rounded-xl text-[10px] sm:text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-[1.02] active:scale-98"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-950" />
            <span>Mulai Ulang</span>
          </button>
        </div>

        {/* MODAL WINDOW FOR CASE LOG TABLE */}
        {isModalOpen && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="w-full max-w-3xl bg-[#040804]/95 border-2 border-emerald-800 rounded-2xl p-4 sm:p-5 shadow-2xl relative max-h-[85vh] overflow-y-auto flex flex-col font-mono text-emerald-200">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-emerald-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 border-b border-emerald-950 pb-2 mb-4 shrink-0">
                <BookOpen className="w-4 h-4 text-emerald-455" />
                <h3 className="font-mono text-xs font-bold text-emerald-100 uppercase tracking-wider">
                  Rekapitulasi Temuan Halusinasi
                </h3>
              </div>

              <div className="overflow-x-auto overflow-y-auto max-h-[50vh] pr-1 mb-2">
                <table className="w-full text-left font-mono text-[11px] sm:text-xs text-emerald-250">
                  <thead>
                    <tr className="border-b border-emerald-950 text-emerald-500 pb-2">
                      <th className="pb-2 font-bold uppercase tracking-wider w-12 text-center">Kasus</th>
                      <th className="pb-2 font-bold uppercase tracking-wider">Topik/Kategori</th>
                      <th className="pb-2 font-bold uppercase tracking-wider text-center w-24">Tipe Mode</th>
                      <th className="pb-2 font-bold uppercase tracking-wider text-center w-24">Percobaan</th>
                      <th className="pb-2 font-bold uppercase tracking-wider text-center w-24">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-950/40">
                    {CAMPAIGN_LEVELS.map((c) => {
                      const ans = answers.find(a => a.levelId === c.id);
                      return (
                        <tr key={c.id} className="hover:bg-emerald-950/10">
                          <td className="py-2.5 text-center text-emerald-500">#0{c.id}</td>
                          <td className="py-2.5 font-sans text-emerald-100">
                            <div className="font-bold text-emerald-200">{c.title}</div>
                            <div className="text-[9px] text-emerald-500">{c.category}</div>
                          </td>
                          <td className="py-2.5 text-center">
                            <span className="inline-flex items-center gap-1 bg-[#020502]/60 border border-emerald-900 px-2 py-0.5 rounded text-[9px] font-bold text-emerald-300">
                              {c.type === 'image' ? (
                                <>
                                  <ImageIcon className="w-3 h-3 text-emerald-455" /> Citra
                                </>
                              ) : (
                                <>
                                  <FileText className="w-3 h-3 text-emerald-455" /> Teks
                                </>
                              )}
                            </span>
                          </td>
                          <td className="py-2.5 text-center text-emerald-300">
                            {ans ? `${ans.attemptsCount}x Klik` : '-'}
                          </td>
                          <td className="py-2.5 text-center">
                            <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/20 border border-emerald-900/30 px-2 py-0.5 rounded text-[9px] font-bold">
                              <Check className="w-3 h-3" /> Terpecahkan
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
